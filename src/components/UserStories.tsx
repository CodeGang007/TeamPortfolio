"use client";

import { Brain, Code, Palette, Smartphone, User } from "lucide-react"; // Imported User just in case, though removed from usage
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

// Enhanced Data
const TESTIMONIALS = [
    {
        id: 1,
        category: "AI SERVICES",
        categoryIcon: Brain,
        categoryColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        chartColor: "from-emerald-500/20 to-emerald-500/5",
        name: "Rick S.",
        designation: "CTO, TechFlow",
        clientImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        story: "Rick is a fantastic AI/ML engineer with specialization in LLMs, delivering end-to-end solutions. We had a few concepts when we started; ultimately, he delivered a working solution.",
    },
    {
        id: 2,
        category: "DEV & IT",
        categoryIcon: Code,
        categoryColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        chartColor: "from-blue-500/20 to-blue-500/5",
        name: "Haris S.",
        designation: "Product Lead",
        clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        story: "Haris came in and helped us transfer knowledge from our departing developer, meeting a serious deadline, without fail. His knowledge and experience are exceptional.",
    },
    {
        id: 3,
        category: "DESIGN & CREATIVE",
        categoryIcon: Palette,
        categoryColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        chartColor: "from-purple-500/20 to-purple-500/5",
        name: "Ezzan D.",
        designation: "Content Creator",
        clientImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        story: "Ezzan did an amazing job editing my videos—fast turnaround, great attention to detail. He follows directions well and delivers high-quality work consistently.",
    },
    {
        id: 4,
        category: "MOBILE DEV",
        categoryIcon: Smartphone,
        categoryColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
        chartColor: "from-orange-500/20 to-orange-500/5",
        name: "Sarah J.",
        designation: "Startup Founder",
        clientImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        story: "The team built a seamless medical app that passed all compliance checks on the first go. The attention to UI details and performance optimization was outstanding.",
    },
    // Duplicate added to ensure smooth infinite loop if needed, but InfiniteMovingCards component usually handles duplication
];

export default function UserStories() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section className="py-24 relative overflow-visible">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-6 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                            Client <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline
                                ? 'from-white via-brand-green to-emerald-400'
                                : 'from-red-200 via-red-500 to-orange-600'
                                }`}>Experiences</span>
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto font-light leading-relaxed ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
                            Impactful collaborations that define our legacy.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="relative w-full flex flex-col items-center justify-center overflow-hidden antialiased z-10">
                <InfiniteMovingCards
                    items={TESTIMONIALS}
                    direction="right"
                    speed="slow"
                    className="max-w-[100vw]"
                />
            </div>
        </section>
    );
}
