"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, MessageCircle, Code, Zap, Shield, Users } from "lucide-react";

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
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" className="py-24 relative overflow-hidden">

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-50'
                        }`}>
                        Frequently Asked{" "}
                        <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${isOnline
                                ? 'from-brand-green to-blue-400'
                                : 'from-red-400 to-red-300'
                            }`}>
                            Questions
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/70'
                        }`}>
                        Everything you need to know about working with us.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        const Icon = faq.icon;

                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`rounded-xl border backdrop-blur-sm transition-all duration-300 ${isOnline
                                        ? 'bg-zinc-900/40 border-white/10 hover:border-brand-green/30'
                                        : 'bg-red-950/20 border-red-900/30 hover:border-red-400/40'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-6 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg transition-all duration-300 ${isOnline
                                                ? `${isOpen ? 'bg-brand-green/20 text-brand-green' : 'bg-zinc-800/50 text-zinc-400 group-hover:bg-brand-green/10 group-hover:text-brand-green'}`
                                                : `${isOpen ? 'bg-red-500/20 text-red-400' : 'bg-red-900/30 text-red-500/70 group-hover:bg-red-500/10 group-hover:text-red-400'}`
                                            }`}>
                                            <Icon size={20} />
                                        </div>
                                        <h3 className={`flex-1 text-lg font-semibold transition-colors duration-300 ${isOnline
                                                ? `${isOpen ? 'text-brand-green' : 'text-white group-hover:text-brand-green/80'}`
                                                : `${isOpen ? 'text-red-400' : 'text-red-100 group-hover:text-red-300'}`
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`p-1 transition-colors duration-300 ${isOnline
                                                    ? `${isOpen ? 'text-brand-green' : 'text-zinc-400 group-hover:text-brand-green/60'}`
                                                    : `${isOpen ? 'text-red-400' : 'text-red-500/70 group-hover:text-red-400/80'}`
                                                }`}
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className={`pt-4 pl-4 md:pl-12 pr-8 pb-2 text-sm leading-relaxed transition-colors duration-300 ${isOnline ? 'text-zinc-300' : 'text-red-200/80'
                                                    }`}>
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

