"use client";

import { useAuth } from "@/contexts/AuthContext";

const GEOGRAPHIES = ["Brazil", "Australia", "India", "United States", "Europe"];

const CAPABILITIES = [
  "Next.js", "React", "TypeScript", "Tailwind", "NestJS", "FastAPI",
  "Node.js", "Python", "AWS", "Docker", "GitHub Actions", "PostgreSQL",
  "Supabase", "Redis", "OpenAI", "TensorFlow", "PyTorch", "Android",
  "Flutter", "Bedrock + Gemini",
];

export default function TrustStrip() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;
  const accent = isOnline ? "text-brand-green" : "text-red-500";

  return (
    <section className="relative z-10 py-14 border-y border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        {/* Geographies */}
        <p className="text-center text-sm md:text-base text-zinc-500 mb-3">
          Currently shipping for clients in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-10">
          {GEOGRAPHIES.map((g, i) => (
            <span key={g} className="flex items-center gap-3">
              <span className="text-base md:text-lg font-bold text-white">{g}</span>
              {i < GEOGRAPHIES.length - 1 && (
                <span className={`${accent} text-xs`}>●</span>
              )}
            </span>
          ))}
        </div>

        {/* Capabilities marquee (pure CSS, pauses for reduced motion) */}
        <div className="relative overflow-hidden marquee-mask">
          <div className="flex w-max marquee-track gap-3">
            {[...CAPABILITIES, ...CAPABILITIES].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="shrink-0 text-xs md:text-sm font-mono px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
          );
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
