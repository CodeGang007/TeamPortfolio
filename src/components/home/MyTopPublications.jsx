"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { HoverEffect } from "../ui/card-hover-effect";

const projects = [
    {
        title: "Web Development",
        description: "Full-stack web applications with modern frameworks like Next.js, React, and Node.js.",
        link: "/web-development",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    },
    {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
        link: "/mobile-apps",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    },
    {
        title: "UI/UX Design",
        description: "User-centered design solutions that create engaging and intuitive digital experiences.",
        link: "/ui-ux-design",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    },
    {
        title: "E-commerce",
        description: "Scalable online stores with payment integration and inventory management systems.",
        link: "/e-commerce",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    },
    {
        title: "Cloud Solutions",
        description: "AWS and Azure cloud infrastructure for scalable and secure application deployment.",
        link: "/cloud-solutions",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
        title: "SEO & Analytics",
        description: "Search engine optimization and data analytics to boost your online presence.",
        link: "/seo-analytics",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
];

export default function FloatingHero() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    // const services = [
    //     {
    //         title: "Web Design",
    //         description: "Award-winning UI/UX interfaces.",
    //         image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?w=800&q=80",
    //         tags: ["UI/UX", "Figma"],
    //     },
    //     {
    //         title: "App Development",
    //         description: "Native & Cross-platform solutions.",
    //         image: "https://images.unsplash.com/photo-1551650975-87bd5c8e2282?w=800&q=80",
    //         tags: ["iOS", "Android"],
    //     },
    //     {
    //         title: "SEO Boost",
    //         description: "Rank #1 on Google Search.",
    //         image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    //         tags: ["Growth", "Analytics"],
    //     },
    //     {
    //         title: "Branding",
    //         description: "Identity that tells your story.",
    //         image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80",
    //         tags: ["Logo", "Strategy"],
    //     },
    //     {
    //         title: "Cloud Solutions",
    //         description: "Scalable infrastructure.",
    //         image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    //         tags: ["AWS", "Azure"],
    //     },
    //     {
    //         title: "Maintenance",
    //         description: "24/7 Support & Updates.",
    //         image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    //         tags: ["Security", "Uptime"],
    //     },
    // ];

    return (
        <section className="relative min-h-[90vh] overflow-hidden flex flex-col justify-center">

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-32"
                >
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                            isOnline ? 'text-white' : 'text-red-50'
                        }`}>
                            Our <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                                isOnline ? 'from-brand-green to-blue-400' : 'from-red-400 to-red-300'
                            }`}>Publications</span>
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                            isOnline ? 'text-zinc-400' : 'text-red-300/70'
                        }`}>
                            Explore our expertise across different domains and technologies
                        </p>
                    </div>
                    
                    <HoverEffect items={projects} />
                </motion.div>

               
            </div>
        </section>
    );
}
