"use client";

import { Brain, Code, Palette, Smartphone, User } from "lucide-react"; // Imported User just in case, though removed from usage
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

// Enhanced Data
const TESTIMONIALS = [
    {
        id: 1,
        category: "WEB DEVELOPMENT",
        categoryIcon: Code,
        categoryColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        chartColor: "from-blue-500/20 to-blue-500/5",
        name: "Aarav Gupta",
        designation: "Founder, TechSagar",
        clientImage: "https://plus.unsplash.com/premium_photo-1725021054837-bd4117e907b8?q=80&w=200&auto=format&fit=crop", // User selected Indian male
        rating: 4,
        story: "CodeGang has a bunch of good developers who helped in the growth of my website. They really understood what I wanted and delivered it perfectly. Highly recommended for any startup.",
    },
    {
        id: 2,
        category: "AI SOLUTIONS",
        categoryIcon: Brain,
        categoryColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        chartColor: "from-emerald-500/20 to-emerald-500/5",
        name: "Emily Carter",
        designation: "Director, Horizon Inc.",
        clientImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", // Professional woman
        rating: 5,
        story: "I was struggling to find a team that could handle our complex backend requirements. This team stepped in and fixed everything in record time. Truly impressed with their problem-solving skills!",
    },
    {
        id: 3,
        category: "MOBILE APP",
        categoryIcon: Smartphone,
        categoryColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
        chartColor: "from-orange-500/20 to-orange-500/5",
        name: "Vikram Singh",
        designation: "Product Manager, StartupHub",
        clientImage: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=200&auto=format&fit=crop", // User selected Indian male professional


        rating: 4.5,
        story: "The attention to detail is amazing. They didn't just write code, they helped improve the entire user flow. My app feels so much more premium now thanks to their design inputs.",
    },
    {
        id: 4,
        category: "CREATIVE DESIGN",
        categoryIcon: Palette,
        categoryColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        chartColor: "from-purple-500/20 to-purple-500/5",
        name: "David Miller",
        designation: "CEO, NextGen Solutions",
        clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", // Authentic Western male
        rating: 3.5,
        story: "Honestly, the best dev experience I've had. Communication was smooth, updates were regular, and the final product exceeded my expectations. They define professionalism.",
    },
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
                    key={isOnline ? 'online' : 'offline'}
                    items={TESTIMONIALS}
                    direction="right"
                    speed="slow"
                    className="max-w-[100vw]"
                    isOnline={isOnline}
                />
            </div>
        </section>
    );
}
