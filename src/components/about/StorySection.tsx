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
                                <strong>CodeGang007</strong> isn't just a development team; we are a collective of digital craftsmen. Founded by 4 visionary technologists, we emerged from a shared frustration: the web was becoming stale, functional but uninspired.
                            </p>
                            <p>
                                We set out to change that. We believe that every line of code should serve a purpose, and every interface should tell a story. We combine <strong>technical rigor</strong> with <strong>artistic fluidity</strong>, creating platforms that don't just work—they perform.
                            </p>
                            <p>
                                From the first whiteboard sketch to the final server deployment, we handle the entire lifecycle of digital product creation. We are obsessed with performance, accessibility, and the "wow" factor that turns visitors into loyal customers.
                            </p>
                            <blockquote className={`border-l-4 pl-6 italic text-white/90 my-8 ${isAuthenticated ? "border-brand-green" : "border-red-500"}`}>
                                "We don't build websites. We build digital experiences that define brands."
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
                        <div className={`absolute -bottom-10 -left-10 bg-black/90 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl z-20 transition-colors ${isAuthenticated ? "hover:border-brand-green/50" : "hover:border-red-500/50"}`}>
                            <div className="flex items-center gap-4">
                                <div className={`text-5xl font-bold ${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>4</div>
                                <div className="text-white text-sm font-medium leading-tight">Founding<br />Partners</div>
                            </div>
                            <div className="mt-2 text-xs text-zinc-500 uppercase tracking-wider">United by Code</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
