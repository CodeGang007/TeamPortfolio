"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Code, Zap, Shield, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const FAQS = [
    {
        id: 1,
        icon: Code,
        question: "What services do you offer?",
        answer: "We specialize in full-stack web development, mobile app development (React Native & Flutter), UI/UX design, e-commerce solutions, API development, and cloud deployment. We also provide ongoing maintenance, SEO optimization, and digital consulting services.",
    },
    {
        id: 2,
        icon: Zap,
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity. Simple websites take 2-3 weeks, custom web applications 4-8 weeks, and mobile apps 6-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
    },
    {
        id: 3,
        icon: Users,
        question: "What's your development process?",
        answer: "We follow an agile methodology: Discovery & Planning → Design & Prototyping → Development & Testing → Deployment & Launch → Ongoing Support. You'll receive regular updates and can provide feedback at each stage.",
    },
    {
        id: 4,
        icon: MessageCircle,
        question: "What are your pricing options?",
        answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer packages. Pricing depends on project scope, complexity, and timeline. Contact us for a free consultation and detailed quote tailored to your needs.",
    },
    {
        id: 5,
        icon: Shield,
        question: "Do you provide post-launch support?",
        answer: "Yes! We include 3 months of free support covering bug fixes and minor updates. We also offer extended support packages, hosting management, security updates, and feature enhancements to keep your project running smoothly.",
    },
];

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <Reveal className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                        Frequently Asked{" "}
                        <span className="text-brand-green">Questions</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto text-zinc-400">
                        Everything you need to know about working with us.
                    </p>
                </Reveal>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQS.map((faq) => {
                        const isOpen = openId === faq.id;
                        const Icon = faq.icon;

                        return (
                            <div
                                key={faq.id}
                                className="rounded-xl border transition-colors duration-300 bg-zinc-900/40 border-white/[0.06] hover:border-brand-green/25"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-6 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg transition-colors duration-300 ${isOpen ? 'bg-brand-green/20 text-brand-green' : 'bg-zinc-800/50 text-zinc-400 group-hover:bg-brand-green/10 group-hover:text-brand-green'}`}>
                                            <Icon size={20} />
                                        </div>
                                        <h3 className={`flex-1 text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-brand-green' : 'text-white group-hover:text-brand-green/80'}`}>
                                            {faq.question}
                                        </h3>
                                        <div
                                            className={`p-1 transition-all duration-300 ${isOpen ? 'text-brand-green rotate-180' : 'text-zinc-400 group-hover:text-brand-green/60'}`}
                                        >
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>

                                    {/* CSS grid-rows accordion — no animation library needed */}
                                    <div
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="pt-4 pl-4 md:pl-12 pr-8 pb-2 text-sm leading-relaxed text-zinc-300">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
