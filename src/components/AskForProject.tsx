import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Import Link for navigation

export default function AskForProject() {
    return (
        <div className="relative my-20 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50/50 via-purple-50/50 to-white px-6 py-24 text-center shadow-sm ring-1 ring-black/5 md:px-12">
            {/* Grain overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <h2 className="mb-6 bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
                Have a vision in mind?
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-slate-600 md:text-xl">
                We specialize in delivering high-quality technical solutions. Let's discuss how we can help you achieve your goals.
            </p>

            <Link
                href="/project-templates"
                className="group relative inline-flex h-14 items-center gap-2 rounded-full border border-white/40 bg-white/30 px-8 text-lg font-medium text-slate-900 shadow-xl backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/40 hover:shadow-2xl"
            >
                Ask for a Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}
