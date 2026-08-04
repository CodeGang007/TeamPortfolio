"use client";

import { Cookie } from "lucide-react";

export default function CookiePolicy() {
    return (
        <>
            <div className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6 text-signal">
                            <Cookie className="w-6 h-6" />
                            <span className="text-sm font-bold tracking-widest uppercase">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Cookie Policy</h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            We use digital cookies to enhance your experience. Not the edible kind, but essential for session management and preference tracking.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900">1. What are Cookies?</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Cookies are small text files stored on your device. They allow us to remember your login state, preferences, and understand how you navigate our platform to improve performance.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900">2. Cookies We Use</h2>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li><strong className="text-slate-900">Essential Cookies:</strong> Required for the site to function (e.g., authentication).</li>
                                    <li><strong className="text-slate-900">Performance Cookies:</strong> Help us analyze site traffic and performance.</li>
                                    <li><strong className="text-slate-900">Functional Cookies:</strong> Remember your settings and choices.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900">3. Managing Preferences</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    You can control cookie settings through your browser. However, disabling essential cookies may impact your ability to use certain features of CodeGang, such as persistent login.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
