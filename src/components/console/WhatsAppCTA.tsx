"use client";

import { usePathname } from "next/navigation";
import { getConsoleProject } from "@/content/projects";
import { whatsappHref } from "@/content/site";
import WhatsAppGlyph from "@/components/console/WhatsAppGlyph";

// Floating WhatsApp button with a per-route prefilled message, so a lead
// arrives pre-qualified ("saw the Verse AI case study…") instead of "hi".
function contextMessage(pathname: string): string {
  if (pathname.startsWith("/work/")) {
    const slug = pathname.split("/")[2];
    const p = slug ? getConsoleProject(slug) : undefined;
    if (p) {
      return `Hi CodeGang, I just read the ${p.name} case study and want to build something similar.`;
    }
  }
  if (pathname.startsWith("/work"))
    return "Hi CodeGang, I was looking through your case studies and want to discuss a project.";
  if (pathname.startsWith("/studio"))
    return "Hi CodeGang. I'd like to talk to one of the engineers about a project.";
  if (pathname.startsWith("/contact") || pathname.startsWith("/project-request"))
    return "Hi CodeGang, I want to discuss a project.";
  return "Hi CodeGang, I found you through codegang.online and want to discuss a project.";
}

export default function WhatsAppCTA() {
  const pathname = usePathname() ?? "/";

  return (
    <a
      href={whatsappHref(contextMessage(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CodeGang on WhatsApp"
      className="group fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] active:scale-95 sm:bottom-6 sm:right-6"
    >
      {/* Attention ring. Hidden for anyone who asked for reduced motion. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s] motion-reduce:hidden"
      />
      <WhatsAppGlyph className="h-7 w-7" />

      {/* Label slides out on hover. Pointer devices only, on touch there is
          no hover state, so the tooltip would just sit there permanently. */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-[0.75rem] font-medium text-bone opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 [@media(hover:hover)]:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
