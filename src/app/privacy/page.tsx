"use client";

import AppLayout from "@/components/AppLayout";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <AppLayout>
            <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6 text-brand-green">
                            <Shield className="w-6 h-6" />
                            <span className="text-sm font-bold tracking-widest uppercase">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Your privacy is non-negotiable. At CodeGang, we believe in transparency and security by default.
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">1. Data Collection</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    We collect minimal data necessary to provide our services. This includes information you explicitly provide (name, email) and technical data for system performance (IP address, browser type). We do not sell your data to third parties.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">2. Usage & Analytics</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    We use analytics to understand how our systems are used and to optimize performance. All analytics data is anonymized where possible. We track engagement to improve the CodeGang experience.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">3. Security Infrastructure</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Our systems are built with security-first architecture. We employ industry-standard encryption for data at rest and in transit. While no system is impenetrable, we maintain rigorous security protocols to protect your information.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">4. Your Rights</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    You have the right to access, correct, or delete your personal data. Contact us at <span className="text-brand-green">hello@codegang.dev</span> for any privacy-related inquiries.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
