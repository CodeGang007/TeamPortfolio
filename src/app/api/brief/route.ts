import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { notifyFoundersWhatsApp } from "@/lib/whatsapp";
import {
  budgets,
  buildTypes,
  engagements,
  startingPoints,
  timelines,
} from "@/content/brief";

// Project brief dispatch. Same rails as /api/lead — Telegram is primary and
// its failure fails the request, WhatsApp and email are best-effort — but the
// payload is structured, so the founders get a readable brief rather than a
// wall of text.
//
// No auth. A prospect describing their project should never meet a login
// wall; the whole point of this endpoint is that a stranger can use it.

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Resolve a submitted choice id back to its label. Unknown ids are dropped
 *  rather than echoed — the id space is ours, not the client's. */
function labelFor(list: { id: string; label: string }[], id?: string) {
  return list.find((c) => c.id === id)?.label;
}

interface BriefPayload {
  buildType?: string;
  startingPoint?: string;
  budget?: string;
  timeline?: string;
  engagement?: string;
  description?: string;
  links?: string;
  notes?: string;
  files?: { name: string; url: string }[];
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: BriefPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const description = body.description?.trim();

  if (!name || !email || !description) {
    return NextResponse.json(
      { error: "Your name, email, and a description of the project are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email does not look right." }, { status: 400 });
  }
  if (description.length > 5000) {
    return NextResponse.json({ error: "Description is too long." }, { status: 400 });
  }

  const files = Array.isArray(body.files) ? body.files.slice(0, 10) : [];

  const fields: [string, string | undefined][] = [
    ["Building", labelFor(buildTypes, body.buildType)],
    ["Starting from", labelFor(startingPoints, body.startingPoint)],
    ["Budget", labelFor(budgets, body.budget)],
    ["Timeline", labelFor(timelines, body.timeline)],
    ["Engagement", labelFor(engagements, body.engagement)],
    ["Company", body.company?.trim() || undefined],
    ["Phone", body.phone?.trim() || undefined],
  ];

  const text = [
    "📋 <b>New project brief — codegang.online</b>",
    `From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;`,
    "",
    ...fields
      .filter(([, v]) => v)
      .map(([k, v]) => `<b>${k}:</b> ${escapeHtml(v as string)}`),
    "",
    "<b>The project</b>",
    escapeHtml(description),
    body.links?.trim() ? `\n<b>Links</b>\n${escapeHtml(body.links.trim())}` : null,
    body.notes?.trim() ? `\n<b>Notes</b>\n${escapeHtml(body.notes.trim())}` : null,
    files.length
      ? `\n<b>Attachments</b>\n${files
          .map((f) => `${escapeHtml(f.name)} — ${escapeHtml(f.url)}`)
          .join("\n")}`
      : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const tgRes = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!tgRes.ok) {
    console.error("Brief Telegram dispatch failed:", await tgRes.text());
    return NextResponse.json(
      { error: "Could not deliver your brief. Please email us directly." },
      { status: 502 }
    );
  }

  notifyFoundersWhatsApp(
    `📋 New project brief — ${name} <${email}>\n${fields
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}\n\n${description.slice(0, 800)}`
  ).catch(() => {});

  if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
      });
      await transporter.sendMail({
        from: `"CodeGang" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "We have your brief — CodeGang",
        text: [
          `Hi ${name},`,
          "",
          "Your brief just landed in the founders' Telegram. An engineer — not a salesperson — will come back to you, usually within a business day.",
          "",
          "What you sent:",
          description,
          "",
          "If anything changed since you sent it, just reply to this email.",
          "",
          "— CodeGang",
          "https://www.codegang.online",
        ].join("\n"),
      });
    } catch (err) {
      console.error("Brief confirmation email failed (non-fatal):", err);
    }
  }

  return NextResponse.json({ success: true });
}
