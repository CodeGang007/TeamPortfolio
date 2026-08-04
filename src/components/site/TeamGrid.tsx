import Image from "next/image";
import { Github, Instagram, Linkedin, Link2, Mail } from "lucide-react";
import { team, lineOfTheDay, type TeamMember } from "@/content/team";
import { Item, Stagger } from "./motion";

/* ═══════════════════════════════════════════════════════════════════
   TEAM GRID
   Portrait, name, role, what the person owns, their line, their links.
   Everything is driven by content/team.ts: this file renders, it does
   not hold data.
   ═══════════════════════════════════════════════════════════════════ */

const ICONS = {
  linkedin: { Icon: Linkedin, label: "LinkedIn" },
  instagram: { Icon: Instagram, label: "Instagram" },
  github: { Icon: Github, label: "GitHub" },
  portfolio: { Icon: Link2, label: "Portfolio" },
  email: { Icon: Mail, label: "Email" },
} as const;

type LinkKey = keyof typeof ICONS;
const ORDER: LinkKey[] = ["linkedin", "portfolio", "github", "instagram", "email"];

function Links({ member }: { member: TeamMember }) {
  // Only render a link that actually has a value — an empty field in the
  // config must produce no icon rather than an href="" that goes nowhere.
  const present = ORDER.filter((k) => {
    const v = member.links?.[k];
    return typeof v === "string" && v.trim().length > 0;
  });

  if (present.length === 0) return null;

  return (
    <div className="mt-4 flex items-center gap-1.5">
      {present.map((key) => {
        const { Icon, label } = ICONS[key];
        const raw = member.links![key]!.trim();
        const href = key === "email" ? `mailto:${raw}` : raw;
        const external = key !== "email";
        return (
          <a
            key={key}
            href={href}
            aria-label={`${member.name} on ${label}`}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-mute transition-colors hover:border-line-strong hover:bg-bone hover:text-ink"
          >
            <Icon aria-hidden className="h-[0.9rem] w-[0.9rem]" />
          </a>
        );
      })}
    </div>
  );
}

export default function TeamGrid() {
  return (
    <>
      <p className="font-serif text-[1.15rem] italic leading-snug text-ink-soft sm:text-[1.3rem]">
        &ldquo;{lineOfTheDay()}&rdquo;
      </p>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <Item key={m.id} className="h-full">
            <figure className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-frame">
              <div className="relative aspect-square w-full overflow-hidden bg-bone">
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role} at CodeGang`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {m.cofounder ? (
                  <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-wider text-bone backdrop-blur-sm">
                    Co-founder
                  </span>
                ) : null}
              </div>

              <figcaption className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.05rem] font-medium tracking-tight text-ink">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-signal">
                  {m.role}
                </p>
                {m.location ? (
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                    {m.location}
                  </p>
                ) : null}
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
                  {m.owns}
                </p>
                {m.quote ? (
                  <blockquote className="mt-4 border-l-2 border-line pl-3 font-serif text-[0.95rem] italic leading-snug text-mute">
                    {m.quote}
                  </blockquote>
                ) : null}
                <div className="mt-auto">
                  <Links member={m} />
                </div>
              </figcaption>
            </figure>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
