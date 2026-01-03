"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Minus } from "lucide-react";

// Simple, Professional FAQ Data
const FAQS = [
    {
        id: 1,
        question: "What services do you offer?",
        answer: "We provide web design & development, mobile apps, SEO, and ongoing maintenance & support.",
    },
    {
        id: 2,
        question: "How long does a project take?",
        answer: "Most projects are completed in 4-8 weeks, depending on scope and complexity.",
    },
    {
        id: 3,
        question: "What are your pricing options?",
        answer: "We offer fixed-price quotes and hourly rates. Contact us for a free, no-obligation estimate.",
    },
    {
        id: 4,
        question: "Do you provide post-launch support?",
        answer: "Yes, we include 3 months of free support and offer flexible retainer packages after that.",
    },
    {
        id: 5,
        question: "Who owns the final product?",
        answer: "You do. All code, designs, and assets are fully transferred to you upon project completion.",
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
        <section id="faq" className="py-24 relative">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                {/* Simple Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isOnline ? 'text-white' : 'text-red-50'}`}>
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Clean Accordion List */}
                <div className="divide-y divide-zinc-800">
                    {FAQS.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                                className="cursor-pointer"
                            >
                                <div className="py-6 flex justify-between items-center gap-4">
                                    <h3 className={`text-lg font-medium ${isOnline
                                        ? `${isOpen ? 'text-brand-green' : 'text-white'}`
                                        : `${isOpen ? 'text-red-400' : 'text-red-100'}`
                                        }`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`flex-shrink-0 transition-colors ${isOnline
                                        ? `${isOpen ? 'text-brand-green' : 'text-zinc-500'}`
                                        : `${isOpen ? 'text-red-400' : 'text-red-500/50'}`
                                        }`}>
                                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <p className={`pb-6 text-base leading-relaxed ${isOnline ? 'text-zinc-400' : 'text-red-200/70'}`}>
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
