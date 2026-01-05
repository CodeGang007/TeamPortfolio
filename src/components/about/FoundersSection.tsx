"use client";

import { foundersData } from "@/config/founders";
import { TeamMember } from "@/components/teampage/types";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Globe, Instagram } from "lucide-react";

const SocialIcon = ({ type, url }: { type: string; url: string }) => {
    if (!url) return null;

    const icons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        instagram: Instagram,
        website: Globe,
        default: Globe
    };

    const Icon = icons[type as keyof typeof icons] || icons.default;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-brand-green hover:text-black text-white transition-all duration-300 backdrop-blur-md border border-white/5 hover:scale-110"
        >
            <Icon size={18} />
        </a>
    );
};

export function FoundersSection() {
    const founders = foundersData;

    return (
        <section className="relative py-32 bg-zinc-950 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-brand-green/50"></div>
                        <span className="text-brand-green/80 uppercase tracking-[0.2em] text-sm font-medium">Core Leadership</span>
                        <div className="h-[1px] w-12 bg-brand-green/50"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                    >
                        Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Thinkers</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-2xl text-lg font-light leading-relaxed"
                    >
                        The architects behind the digital revolution. Combining strategic foresight with technical mastery to redefine what's possible.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[90rem] mx-auto">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative h-[420px] lg:h-[480px] perspective-1000"
                        >
                            <div className="relative w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-x-2">
                                {/* Layer 1: Background Glow (Behind) */}
                                <div className="absolute inset-2 bg-brand-green/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

                                {/* Layer 2: Main Card Container */}
                                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-brand-green/30">

                                    {/* Layer 2a: Image (Parallax Scale) */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-zinc-900/20 z-10" />
                                        <img
                                            src={founder.imageUrl}
                                            alt={founder.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                    </div>

                                    {/* Layer 2b: Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80 z-20" />

                                    {/* Layer 3: Floating Content (Z-Index High) */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-30">

                                        {/* Name & Role Badge - Always Visible but Shifts */}
                                        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-brand-green/10 border border-brand-green/20 backdrop-blur-sm">
                                                <span className="text-brand-green text-xs font-bold tracking-wider uppercase">{founder.role}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-1 leading-tight drop-shadow-lg">{founder.name}</h3>
                                        </div>

                                        {/* Description & Socials - Reveal Animation */}
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                            <div className="overflow-hidden">
                                                <div className="pt-4 border-t border-white/10 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                                    <p className="text-zinc-300 text-sm leading-relaxed mb-5 line-clamp-3">
                                                        {founder.description}
                                                    </p>

                                                    <div className="flex items-center gap-3">
                                                        {founder.socials?.linkedin && <SocialIcon type="linkedin" url={founder.socials.linkedin} />}
                                                        {founder.socials?.github && <SocialIcon type="github" url={founder.socials.github} />}
                                                        {founder.socials?.instagram && <SocialIcon type="instagram" url={founder.socials.instagram} />}
                                                        {founder.projectUrl && <SocialIcon type="website" url={founder.projectUrl} />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Layer 4: Tech Stack Floating Items (Optional/Decorative) */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {(founder.techStack || []).slice(0, 2).map((tech, i) => (
                                            <div key={i} className="px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/5 text-[10px] text-zinc-400 text-right">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
