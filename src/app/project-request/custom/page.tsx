import { redirect } from "next/navigation";

/**
 * `/project-request/custom` was the public "submit a full brief" URL. The
 * client-facing brief now lives at `/start-a-project` — guided, no sign-in,
 * and inside the marketing chrome.
 *
 * A static segment wins over the `[templateId]` route, so this only catches
 * the public URL; the dashboard's own template ids still reach the original
 * authenticated form. Server redirect rather than a client effect, so the
 * 307 is visible to crawlers and anyone holding the old link.
 */
export default function CustomProjectRequestRedirect() {
  redirect("/start-a-project");
}
