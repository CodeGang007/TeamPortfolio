import { NextRequest, NextResponse } from "next/server";

// WhatsApp Cloud API webhook.
// GET  — Meta's one-time verification handshake (hub.challenge echo).
// POST — incoming messages/statuses. Incoming texts are forwarded to the
//        founders' Telegram so replies are never missed, even before a
//        WhatsApp inbox workflow exists.
//
// Configure in Meta dev console → WhatsApp → Configuration:
//   Callback URL:  https://www.codegang.online/api/whatsapp/webhook
//   Verify token:  must equal WHATSAPP_VERIFY_TOKEN

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

interface WaMessage {
  from: string;
  type: string;
  text?: { body: string };
}

interface WaContact {
  profile?: { name?: string };
  wa_id?: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const entries = payload?.entry ?? [];
    for (const entry of entries) {
      for (const change of entry?.changes ?? []) {
        const value = change?.value;
        const messages: WaMessage[] = value?.messages ?? [];
        const contacts: WaContact[] = value?.contacts ?? [];
        const name = contacts[0]?.profile?.name || "Unknown";

        for (const msg of messages) {
          const preview =
            msg.type === "text"
              ? msg.text?.body ?? ""
              : `[${msg.type} message]`;

          // Forward to founders' Telegram — replies must never vanish
          if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
            await fetch(
              `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: TELEGRAM_CHAT_ID,
                  text: `📱 <b>WhatsApp message</b>\nFrom: ${name} (+${msg.from})\n\n${preview.slice(0, 1000)}`,
                  parse_mode: "HTML",
                }),
              }
            ).catch((e) => console.error("WA→TG forward failed:", e));
          }
        }
      }
    }

    // Always 200 fast — Meta retries aggressively on non-2xx
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("WhatsApp webhook error:", e);
    return NextResponse.json({ received: true });
  }
}
