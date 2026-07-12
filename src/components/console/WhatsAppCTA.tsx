"use client";

import { usePathname } from "next/navigation";
import { getConsoleProject } from "@/content/projects";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER; // digits only

// Floating WhatsApp button with a per-route prefilled message, so a lead
// arrives pre-qualified ("saw the Verse AI case study…") instead of "hi".
// Renders nothing until NEXT_PUBLIC_WA_NUMBER is set.
function contextMessage(pathname: string): string {
  if (pathname.startsWith("/work/")) {
    const slug = pathname.split("/")[2];
    const p = slug ? getConsoleProject(slug) : undefined;
    if (p) {
      return `Hi CodeGang — I just read the ${p.name} case study and want to build something similar.`;
    }
  }
  if (pathname.startsWith("/work"))
    return "Hi CodeGang — I was looking through your case studies and want to discuss a project.";
  if (pathname.startsWith("/studio"))
    return "Hi CodeGang — I'd like to talk to one of the engineers about a project.";
  if (pathname.startsWith("/contact") || pathname.startsWith("/project-request"))
    return "Hi CodeGang — I want to discuss a project.";
  return "Hi CodeGang — I found you through codegang.online and want to discuss a project.";
}

export default function WhatsAppCTA() {
  const pathname = usePathname() ?? "/";

  if (!WA_NUMBER) return null;

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(contextMessage(pathname))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-600"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
