import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";


export default function AskForProject() {
    const { isAuthenticated, openLoginModal } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <div className="relative my-20 flex flex-col items-center justify-center px-6 py-32 text-center md:px-12 bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000]">

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">

                {/* Icon Badge */}
                <div className="mb-8 flex items-center justify-center h-20 w-20 rounded-sm border-2 border-black bg-gumroad-yellow shadow-[4px_4px_0px_0px_#000]">
                    <Sparkles className="h-10 w-10 text-black" strokeWidth={2.5} />
                </div>

                {/* Heading */}
                <h2 className="mb-6 text-5xl md:text-7xl font-black tracking-tighter leading-tight text-black">
                    Have a <span className="text-gumroad-pink" style={{ textShadow: "3px 3px 0px #000" }}>vision</span><br />
                    in mind?
                </h2>

                {/* Description */}
                <p className="mb-12 max-w-2xl text-lg md:text-xl leading-relaxed font-bold text-black/80">
                    We specialize in delivering <span className="bg-gumroad-blue px-1 border border-black shadow-[2px_2px_0px_0px_#000] text-black">high-quality technical solutions</span>. Let's discuss how we can help you achieve your goals.
                </p>

                {/* Simple Decoration instead of Loki Helmet */}
                <div className="absolute -top-12 -left-4 w-24 h-24 bg-gumroad-pink border-2 border-black rounded-full shadow-[4px_4px_0px_0px_#000] z-0 hidden md:block" />
                <div className="absolute -bottom-8 -right-4 w-16 h-16 bg-gumroad-yellow border-2 border-black rotate-45 shadow-[4px_4px_0px_0px_#000] z-0 hidden md:block" />

                {/* CTA Button Wrapper */}
                <div className="relative">
                    {/* CTA Button */}
                    <Link
                        href="/project-request/custom-vision-card"
                        className="group relative inline-flex h-16 items-center gap-3 rounded-sm border-2 border-black px-10 text-lg font-black transition-all duration-300 z-20 bg-gumroad-green shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 hover:bg-green-400 text-black"
                        style={{ backgroundColor: '#4ADE80' }}
                    >
                        <span className="relative z-10">START BUILDING</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
