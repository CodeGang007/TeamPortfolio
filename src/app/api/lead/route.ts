import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getConsoleProject } from "@/content/projects";
import { notifyFoundersWhatsApp } from "@/lib/whatsapp";

// Lead dispatch: Telegram to the founders' group is the primary rail
// (instant), email is best-effort. If Telegram fails the request fails —
// a lead silently dropped is worse than an error the client can retry.

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

// Best-effort per-IP rate limit (resets on cold start, fine for a lead form).
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
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string; about?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const about = body.about ? getConsoleProject(body.about)?.name : undefined;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length > 5000) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  // 1. Telegram — the rail that matters
  const text = [
    "🟢 <b>New lead — codegang.online</b>",
    about ? `Context: saw the <b>${escapeHtml(about)}</b> case study` : null,
    `From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;`,
    "",
    escapeHtml(message),
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
      }),
    }
  );

  if (!tgRes.ok) {
    console.error("Lead Telegram dispatch failed:", await tgRes.text());
    return NextResponse.json(
      { error: "Could not deliver your message. Please email us directly." },
      { status: 502 }
    );
  }

  // 2. WhatsApp — best-effort mirror to the founders (needs Cloud API creds)
  notifyFoundersWhatsApp(
    `🟢 New lead — codegang.online\n${about ? `Context: ${about}\n` : ""}From: ${name} <${email}>\n\n${message}`
  ).catch(() => {});

  // 3. Email — best-effort confirmation to the lead; never fails the request
  if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: `"CodeGang" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "We got your message — CodeGang",
        text: `Hi ${name},\n\nYour message just landed in the founders' Telegram. One of the engineers will get back to you.\n\nWhat you sent:\n${message}\n\n— CodeGang\nhttps://www.codegang.online`,
      });
    } catch (err) {
      console.error("Lead confirmation email failed (non-fatal):", err);
    }
  }

  return NextResponse.json({ success: true });
}
