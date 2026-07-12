// WhatsApp Business Cloud API (Meta) — server-side only.
//
// Required env (all optional — every helper no-ops gracefully without them):
//   WHATSAPP_PHONE_NUMBER_ID   the sender phone-number id from Meta dev console
//   WHATSAPP_ACCESS_TOKEN      permanent System User token (never NEXT_PUBLIC)
//   WHATSAPP_FOUNDERS_NUMBER   where internal notifications go, digits only
//   WHATSAPP_VERIFY_TOKEN      any secret string; must match the webhook config
//   NEXT_PUBLIC_WA_NUMBER      public wa.me number for deep links, digits only

const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const API = "https://graph.facebook.com/v21.0";

export const whatsappConfigured = Boolean(PHONE_ID && TOKEN);

/** Send a plain text message. Returns true on delivery-accepted. */
export async function sendWhatsAppText(
  to: string,
  body: string
): Promise<boolean> {
  if (!whatsappConfigured) return false;
  try {
    const res = await fetch(`${API}/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: body.slice(0, 4000), preview_url: false },
      }),
    });
    if (!res.ok) {
      console.error("WhatsApp send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("WhatsApp send error:", e);
    return false;
  }
}

/** Send an approved template message (required for business-initiated
 *  conversations outside the 24h customer-service window). */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode = "en",
  bodyParams: string[] = []
): Promise<boolean> {
  if (!whatsappConfigured) return false;
  try {
    const res = await fetch(`${API}/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          ...(bodyParams.length > 0 && {
            components: [
              {
                type: "body",
                parameters: bodyParams.map((text) => ({ type: "text", text })),
              },
            ],
          }),
        },
      }),
    });
    if (!res.ok) {
      console.error("WhatsApp template failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("WhatsApp template error:", e);
    return false;
  }
}

/** Internal heads-up to the founders' WhatsApp. Fire-and-forget semantics. */
export async function notifyFoundersWhatsApp(body: string): Promise<boolean> {
  const to = process.env.WHATSAPP_FOUNDERS_NUMBER;
  if (!to) return false;
  return sendWhatsAppText(to, body);
}
