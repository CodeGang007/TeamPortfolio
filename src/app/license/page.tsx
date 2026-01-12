"use client";

import AppLayout from "@/components/AppLayout";
import { CheckCircle } from "lucide-react";

export default function License() {
    return (
        <AppLayout>
            <div className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50vh] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6 text-brand-green">
                            <CheckCircle className="w-6 h-6" />
                            <span className="text-sm font-bold tracking-widest uppercase">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">License Information</h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Understand how our digital assets are licensed. We believe in open source where possible, and strict protection where necessary.
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">1. Commercial Projects</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    Custom solutions built by CodeGang for clients are transferred with full ownership rights upon final payment, subject to the specific terms of the service agreement.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">2. Open Source Contributions</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    CodeGang actively contributes to the open source community. Projects identified as open source on our GitHub are typically licensed under MIT or Apache 2.0. Please check individual repositories for specific license files.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">3. Third-Party Assets</h2>
                                <p className="text-zinc-400 leading-relaxed">
                                    This website and our projects may utilize third-party libraries and assets. We strictly adhere to their respective licenses and attribute them where required.
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
