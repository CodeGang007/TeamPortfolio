"use client";

import AppLayout from "@/components/AppLayout";
import { FileText } from "lucide-react";

export default function TermsOfService() {
    return (
        <AppLayout>
            <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-full h-[50vh] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6 text-brand-green">
                            <FileText className="w-6 h-6" />
                            <span className="text-sm font-bold tracking-widest uppercase">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Rules of engagement. By accessing CodeGang, you agree to the following terms designed to ensure fair, secure, and professional collaboration.
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    By accessing or using our services, you confirm your agreement to be bound by these terms. If you do not agree to these terms, simply do not use the services.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">2. Intellectual Property</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    The code, design, and content provided on this platform are key assets of CodeGang. Unless explicitly stated otherwise (e.g., in open-source components), all materials are protected by intellectual property laws.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">3. User Conduct</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    You agree to use our systems responsibly. Any attempt to disrupt services, inject malicious code, or scrape data unauthorizedly will result in immediate termination of access and potential legal action.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    CodeGang provides services "as is" without any express or implied warranties. We are not liable for any damages arising from the use or inability to use our services.
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
