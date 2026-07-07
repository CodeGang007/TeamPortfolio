// Server component — geography + capabilities band under the hero. No JS, CSS-only marquee.
const GEOGRAPHIES = ["Brazil", "Australia", "India", "United States", "Europe"];

const CAPABILITIES = [
  "Next.js", "React", "TypeScript", "Tailwind", "NestJS", "FastAPI",
  "Node.js", "Python", "AWS", "Docker", "GitHub Actions", "PostgreSQL",
  "Supabase", "Redis", "OpenAI", "TensorFlow", "PyTorch", "Android",
  "Flutter", "Bedrock + Gemini",
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 py-14 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Geographies */}
        <p className="text-center text-sm text-zinc-500 mb-3">
          Currently shipping for clients in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-10">
          {GEOGRAPHIES.map((g, i) => (
            <span key={g} className="flex items-center gap-3">
              <span className="text-base md:text-lg font-semibold text-white">{g}</span>
              {i < GEOGRAPHIES.length - 1 && (
                <span className="text-brand-green text-[10px]">●</span>
              )}
            </span>
          ))}
        </div>

        {/* Capabilities marquee (pure CSS via tailwind `animate-scroll`) */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max gap-3 animate-scroll motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
            {[...CAPABILITIES, ...CAPABILITIES].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="shrink-0 text-xs md:text-sm font-mono px-3 py-1.5 rounded-full border border-white/[0.06] bg-zinc-900/40 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
