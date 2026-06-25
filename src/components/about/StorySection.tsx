"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export function StorySection() {
    const { isAuthenticated } = useAuth();
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`h-[1px] w-12 ${isAuthenticated ? "bg-brand-green" : "bg-red-500"}`}></div>
                            <span className={`uppercase tracking-widest text-sm font-bold ${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>Who We Are</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Architects of the <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isAuthenticated ? "from-brand-green to-emerald-600" : "from-red-500 to-rose-600"}`}>
                                Digital Future.
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                            <p>
                                <strong>CodeGang</strong> is a tight engineering studio that helps founders and enterprises ship software that actually moves the business — production AI, multi-tenant platforms, mobile apps, and the data plumbing under all of it.
                            </p>
                            <p>
                                We currently ship for clients in Brazil, Australia, India, the United States, and Europe. The engineer in the meeting is the one writing the code — no layers between brief and build.
                            </p>
                            <p>
                                We design for multi-tenant, observable, queue-decoupled systems on day one. Concrete RAG pipelines, fine-tuned models, and deep-learning modules that run in production — not slide-deck promises.
                            </p>
                            <blockquote className={`border-l-4 pl-6 italic text-white/90 my-8 ${isAuthenticated ? "border-brand-green" : "border-red-500"}`}>
                                "Small team. Senior hands. We build software that ships."
                            </blockquote>
                        </div>
                    </motion.div>

                    {/* Visual/Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Abstract Grid Background */}
                        <div className={`absolute -inset-4 blur-3xl rounded-full z-0 opacity-20 ${isAuthenticated ? "bg-brand-green/20" : "bg-red-500/20"}`}></div>

                        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl z-10 aspect-[4/3]">
                            <div className={`absolute inset-0 bg-gradient-to-tr to-transparent mix-blend-overlay z-10 pointer-events-none ${isAuthenticated ? "from-brand-green/20" : "from-red-500/20"}`} />
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Brainstorming"
                                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className={`absolute -bottom-4 -left-4 md:-bottom-10 md:-left-10 bg-black/90 backdrop-blur-xl border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl z-20 transition-colors ${isAuthenticated ? "hover:border-brand-green/50" : "hover:border-red-500/50"}`}>
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className={`text-3xl md:text-5xl font-bold ${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>5</div>
                                <div className="text-white text-xs md:text-sm font-medium leading-tight">Live<br />Engagements</div>
                            </div>
                            <div className="mt-2 text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider">5 Geographies · 10K+ Users</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
