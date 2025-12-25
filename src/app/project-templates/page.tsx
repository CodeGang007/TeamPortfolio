"use client";

import AppLayout from "@/components/AppLayout";
import ProjectCard from "@/components/ProjectCard";
import TemplateFilter from "@/components/TemplateFilter";
import Pagination from "@/components/Pagination";
import { Search, SlidersHorizontal, Rocket, Sparkles, ArrowRight } from "lucide-react";
import heroStyles from "@/components/projectPage/HeroGlassCard.module.css";
import glassBtnStyles from "@/components/projectPage/buttons/GlassButton.module.css";
import { useState, useEffect } from "react";

// Real-world Trending Data - Expanded Catalog
const ALL_TEMPLATES = [
    { id: "aws-migration", title: "Migrate Monolith to AWS Lambda Serverless", tags: ["AWS", "Serverless", "Cloud"], priceRange: "R$ 350+", category: "Programming", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", author: { name: "Sarah Chen", avatarColor: "bg-emerald-500" } },
    // ... (I will skip the middle lines to avoid context errors, I should target specifically the import section and the button separately if possible, or use multi_replace if they are far apart. 
    // However, the tool documentation says "Use this tool ONLY when you are making a SINGLE CONTIGUOUS block of edits".
    // The import is at the filtered top (line 5-10) and the button is at line ~129. They are far apart.
    // I must use multi_replace_file_content.

    { id: "k8s-microservices", title: "Kubernetes Cluster for High-Scale Microservices", tags: ["Kubernetes", "DevOps"], priceRange: "R$ 450+", category: "Programming", image: "/k8s-cluster.png", author: { name: "David Miller", avatarColor: "bg-blue-600" } },
    { id: "ai-saas-platform", title: "Generative AI SaaS Platform Boilerplate", tags: ["AI", "Next.js", "Stripe"], priceRange: "R$ 299+", category: "AI-Powered Services", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", author: { name: "Alex Rivera", avatarColor: "bg-violet-500" } },
    { id: "fintech-mobile", title: "Modern Fintech Mobile App Design & Dev", tags: ["React Native", "Fintech"], priceRange: "R$ 500+", category: "Programming", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800", author: { name: "Michael Chang", avatarColor: "bg-indigo-500" } },
    { id: "defi-exchange", title: "Decentralized Exchange (DEX) Smart Contracts", tags: ["Web3", "Solidity"], priceRange: "R$ 600+", category: "Programming", image: "/web3-dex.png", author: { name: "Elena Volkov", avatarColor: "bg-orange-500" } },
    { id: "brand-guidelines", title: "Premium Corporate Brand Guidelines Kit", tags: ["Branding", "Identity"], priceRange: "R$ 150+", category: "Design", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800", author: { name: "Emma Davis", avatarColor: "bg-pink-500" } },
    { id: "seo-dominance", title: "SEO Content Strategy for Tech Startups", tags: ["Marketing", "SEO"], priceRange: "R$ 100/mo", category: "Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", author: { name: "Chris Wilson", avatarColor: "bg-teal-500" } },
    { id: "startup-pitch", title: "Investment-Ready Pitch Deck Design", tags: ["Business", "Pitch"], priceRange: "R$ 200+", category: "Business", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800", author: { name: "Robert Taylor", avatarColor: "bg-slate-600" } },
    { id: "3d-product", title: "Photorealistic 3D Product Animation", tags: ["3D", "Animation"], priceRange: "R$ 250+", category: "Video and Animation", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", author: { name: "Lucas Garcia", avatarColor: "bg-yellow-500" } },

    // New Consulting & Audio Projects
    { id: "growth-strategy", title: "Tech Startup Growth Strategy & Audit", tags: ["Strategy", "Growth"], priceRange: "R$ 300+", category: "Consulting", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", author: { name: "James Lee", avatarColor: "bg-cyan-600" } },
    { id: "podcast-editing", title: "Professional Podcast Editing & Production", tags: ["Audio", "Podcast"], priceRange: "R$ 120/ep", category: "Music and Audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800", author: { name: "Sophie Hall", avatarColor: "bg-rose-500" } },
    { id: "sound-design", title: "Custom Sound Design for Games & Apps", tags: ["SFX", "Gaming"], priceRange: "R$ 180+", category: "Music and Audio", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800", author: { name: "Marcus Beats", avatarColor: "bg-fuchsia-600" } },

    // E-commerce Projects
    { id: "shopify-store", title: "Complete Shopify E-commerce Store Setup", tags: ["Shopify", "E-commerce", "Dropshipping"], priceRange: "R$ 280+", category: "Programming", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", author: { name: "Nina Rodriguez", avatarColor: "bg-green-500" } },

    // Cyber Security Projects
    { id: "security-audit", title: "Enterprise Cyber Security Audit & Penetration Testing", tags: ["Cyber Security", "Pentesting", "SOC"], priceRange: "R$ 550+", category: "Programming", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", author: { name: "Viktor Petrov", avatarColor: "bg-red-600" } },

    // Data Analysis Projects
    { id: "data-dashboard", title: "Business Intelligence Dashboard with Power BI & SQL", tags: ["Power BI", "SQL", "Excel", "Analytics"], priceRange: "R$ 220+", category: "Programming", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", author: { name: "Priya Sharma", avatarColor: "bg-amber-500" } },

    { id: "custom-vision-card", title: "Define Your Own Vision", tags: ["Custom"], priceRange: "Negotiable", category: "Custom", image: "", author: { name: "You", avatarColor: "bg-slate-900" }, isCustom: true },
];

const CATEGORIES = ["All", "Programming", "Design", "AI-Powered Services", "Video and Animation", "Marketing", "Business", "Consulting", "Music and Audio"];
const ITEMS_PER_PAGE = 8;

export default function ProjectTemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter Logic
    let filteredTemplates = ALL_TEMPLATES.filter(t => {
        const matchesCategory = selectedCategory === "All" || t.category === selectedCategory || (selectedCategory === "All" && t.isCustom);
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
    const paginatedTemplates = filteredTemplates.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-transparent font-sans selection:bg-indigo-100 selection:text-indigo-900">

                {/* Modern Header - Centered Search (Scrolls away) */}
                <div className="bg-transparent border-b border-white/20 py-4 backdrop-blur-sm">
                    <div className="container mx-auto px-6 md:px-12 flex items-center justify-center">
                        <div className="relative w-full max-w-xl group">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for templates, skills, or projects..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full rounded-full border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 outline-none transition-all hover:border-white/50 focus:border-indigo-500 focus:bg-white/40 focus:ring-4 focus:ring-indigo-500/10 shadow-sm backdrop-blur-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 pt-6 pb-2 md:px-12">


                    {/* Floating Hero Section - Compact */}
                    <div className={`${heroStyles.card} mb-8 px-6 py-8 md:px-12 md:py-10 group`}>
                        {/* Abstract Animated Background */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-[80px] animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-600/20 blur-[60px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="max-w-xl space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200 backdrop-blur-md border border-white/10">
                                    <Sparkles className="h-3 w-3" />
                                    <span>Premium Templates</span>
                                </div>
                                <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] text-white">
                                    Boost your ecosystem
                                </h1>
                                <p className="text-sm md:text-base text-slate-300 max-w-md leading-relaxed">
                                    Access a curated library of high-performance project templates. Launch faster.
                                </p>
                                <div className={`${glassBtnStyles.container} mt-4`} style={{ fontSize: '0.9rem' } as React.CSSProperties}>
                                    <button
                                        onClick={() => document.getElementById('discover-templates')?.scrollIntoView({ behavior: 'smooth' })}
                                        className={glassBtnStyles.button}
                                    >
                                        <span className={glassBtnStyles.text}>
                                            <span className="flex items-center gap-2">
                                                Start a Project
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </span>
                                    </button>
                                    <div className={glassBtnStyles.shadow}></div>
                                </div>
                            </div>

                            {/* Rocket Illustration - Smaller */}
                            <div className="relative hidden md:flex items-center justify-center">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                                <div className="relative h-32 w-32 animate-float">
                                    <Rocket className="h-full w-full text-indigo-300 drop-shadow-xl" strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="discover-templates" className="sticky top-28 z-40 mb-8 -mx-6 bg-transparent px-6 py-2 md:-mx-12 md:px-12 border-b border-white/10 backdrop-blur-md">
                        <div className="container mx-auto">
                            <TemplateFilter
                                categories={CATEGORIES}
                                selectedCategory={selectedCategory}
                                onSelect={handleCategoryChange}
                            />
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="min-h-[600px] mb-16">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    {selectedCategory === 'All' ? 'Trending now' : `${selectedCategory} Templates`}
                                </h2>
                                <p className="text-sm text-slate-500">Discover projects that align with your vision.</p>
                            </div>
                            <span className="hidden md:block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                {filteredTemplates.length} results
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {paginatedTemplates.map((template) => (
                                template.isCustom ? (
                                    // Premium Custom Card
                                    <div key={template.id} className="group relative flex h-full flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-indigo-200 bg-indigo-50/30 p-8 text-center transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer min-h-[420px]">
                                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                                            <Sparkles className="h-10 w-10 text-indigo-600" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-slate-900">Create Custom</h3>
                                        <p className="text-sm text-slate-600 mb-8 max-w-[200px] leading-relaxed">
                                            Have a unique vision? Build your project from scratch with our expert network.
                                        </p>
                                        <button className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95">
                                            Define Vision
                                        </button>
                                    </div>
                                ) : (
                                    <ProjectCard
                                        key={template.id}
                                        id={template.id}
                                        title={template.title}
                                        tags={template.tags}
                                        priceRange={template.priceRange}
                                        image={template.image}
                                        author={template.author}
                                    />
                                )
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="mb-6 rounded-full bg-slate-100 p-6">
                                    <Search className="h-10 w-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">No projects found</h3>
                                <p className="mt-2 text-slate-500 max-w-xs mx-auto">
                                    We couldn't find anything matching "{searchQuery}". Try adjusting your filters.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="mt-6 font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pb-20">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </AppLayout>
    );
}
