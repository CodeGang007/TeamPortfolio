"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

// Service data for animated transitions
const services = [
    {
        id: 0,
        name: "Cloud Solutions",
        projectName: "Enterprise Cloud Platform",
        description: "Scalable AWS & Azure infrastructure with auto-scaling and 99.9% uptime",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        color: "from-sky-500 to-blue-600",
        glowColor: "rgba(56, 189, 248, 0.6)",
        floatDelay: 0,
    },
    {
        id: 1,
        name: "Web Development",
        projectName: "E-Commerce Platform",
        description: "Full-stack Next.js with payment integration and SEO optimization",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        color: "from-emerald-500 to-teal-600",
        glowColor: "rgba(16, 185, 129, 0.6)",
        floatDelay: 0.5,
    },
    {
        id: 2,
        name: "AI/ML Integration",
        projectName: "AI-Powered Analytics",
        description: "ML models for predictive analytics and NLP chatbots",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        color: "from-violet-500 to-purple-600",
        glowColor: "rgba(139, 92, 246, 0.6)",
        floatDelay: 1,
    },
    {
        id: 3,
        name: "Data Analytics",
        projectName: "Business Intelligence Suite",
        description: "Real-time dashboards and automated reporting systems",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        color: "from-orange-500 to-amber-600",
        glowColor: "rgba(249, 115, 22, 0.6)",
        floatDelay: 1.5,
    },
];

export default function ServiceWorkflow() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;
    const [activeService, setActiveService] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [matchingPhase, setMatchingPhase] = useState(0); // 0: brief moving, 1: analyzing, 2: matching, 3: matched
    const [matchingCycle, setMatchingCycle] = useState(0); // Track cycles for unique keys
    const [showCursor, setShowCursor] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    // Auto-cycle through services and trigger cursor after all 4
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveService((prev) => {
                const next = (prev + 1) % services.length;
                // When we complete a full cycle (going from 3 back to 0), show cursor
                if (next === 0) {
                    setShowCursor(true);
                    // Simulate button press after cursor appears
                    setTimeout(() => setIsButtonPressed(true), 800);
                    // Hide cursor and reset button after animation
                    setTimeout(() => {
                        setIsButtonPressed(false);
                        setShowCursor(false);
                    }, 1600);
                }
                return next;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Typing animation effect
    useEffect(() => {
        setIsTyping(true);
        const timeout = setTimeout(() => setIsTyping(false), 800);
        return () => clearTimeout(timeout);
    }, [activeService]);

    // Developer matching animation phases
    useEffect(() => {
        const phaseTimings = [2500, 2000, 1500, 2000]; // Duration for each phase
        const timeout = setTimeout(() => {
            setMatchingPhase((prev) => {
                const next = (prev + 1) % 4;
                // Increment cycle when returning to phase 0
                if (next === 0) {
                    setMatchingCycle(c => c + 1);
                }
                return next;
            });
        }, phaseTimings[matchingPhase]);
        return () => clearTimeout(timeout);
    }, [matchingPhase]);

    // Milestone completion animation - cycles through completing milestones
    const [activeMilestone, setActiveMilestone] = useState(0);
    useEffect(() => {
        const milestoneInterval = setInterval(() => {
            setActiveMilestone((prev) => (prev + 1) % 5); // 0-3 milestones, then reset at 4
        }, 2000);
        return () => clearInterval(milestoneInterval);
    }, []);

    const currentService = services[activeService];

    return (
        <section className="relative py-20 overflow-hidden pb-05">
            {/* Background Glow Effects */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen opacity-50 md:opacity-100 ${isOnline ? 'bg-brand-green/10' : 'bg-red-600/10'}`} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen opacity-50 md:opacity-100" />

            <div className="container mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl md:text-5xl font-black mb-4 ${isOnline ? 'text-white' : 'text-red-50'}`}>
                        How We <span className={isOnline ? 'text-brand-green' : 'text-red-400'}>Work</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isOnline ? 'text-zinc-400' : 'text-red-200/60'}`}>
                        Our streamlined 4-step process delivers exceptional results
                    </p>
                </motion.div>

                {/* Workflow Grid */}
                <div className="grid grid-cols-1 gap-12 md:gap-6 lg:gap-8 items-start lg:grid-cols-4">

                    {/* Step 1: Define Requirements - Clean horizontal tabs design */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`w-full h-[380px] max-h-[380px] rounded-xl relative overflow-hidden transition-all duration-500 border ${isOnline ? 'border-slate-700/60 hover:border-brand-green/40' : 'border-red-900/40 hover:border-red-500/40'}`}
                            style={{
                                background: isOnline
                                    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.99))'
                                    : 'linear-gradient(145deg, rgba(60, 20, 20, 0.98), rgba(40, 15, 15, 0.99))',
                                backdropFilter: 'blur(20px)',
                                boxShadow: isOnline
                                    ? '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                                    : '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                            }}
                        >
                            {/* Top Header Bar */}
                            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isOnline ? 'border-slate-700/50 bg-slate-800/30' : 'border-red-800/30 bg-red-900/20'}`}>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isOnline ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-400'}`}>
                                        STEP 1
                                    </span>
                                    {/* <span className={`text-[11px] font-bold uppercase tracking-wide ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        Define Requirements
                                    </span> */}
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
                                </div>
                            </div>

                            {/* Service Tabs - Horizontal row */}
                            <div className="px-3 py-3">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {services.map((service, index) => (
                                        <motion.button
                                            key={service.id}
                                            onClick={() => setActiveService(index)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${activeService === index
                                                ? `bg-gradient-to-r ${service.color} text-white shadow-lg`
                                                : isOnline
                                                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-600/40'
                                                    : 'bg-red-900/40 text-red-200 hover:bg-red-800/40 border border-red-700/40'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            animate={{
                                                y: activeService === index ? [0, -2, 0] : 0
                                            }}
                                            transition={{
                                                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            style={{
                                                boxShadow: activeService === index ? `0 4px 15px ${service.glowColor}` : 'none'
                                            }}
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />}
                                                {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                                                {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
                                                {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                                            </svg>
                                            {service.name}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="px-4 pb-4 flex flex-col gap-3">
                                {/* Project Name Field */}
                                <div>
                                    <label className={`text-[9px] uppercase tracking-wider font-semibold mb-1 block ${isOnline ? 'text-slate-400' : 'text-red-300'}`}>
                                        Project Name
                                    </label>
                                    <div className={`h-10 w-full rounded-lg border flex items-center px-3 ${isOnline ? 'bg-slate-800/60 border-slate-700/60' : 'bg-red-900/40 border-red-800/50'}`}>
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={currentService.projectName}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                transition={{ duration: 0.25 }}
                                                className={`text-[12px] font-medium ${isOnline ? 'text-white' : 'text-red-100'}`}
                                            >
                                                {currentService.projectName}
                                            </motion.span>
                                        </AnimatePresence>
                                        {isTyping && (
                                            <motion.div
                                                className={`ml-1 w-0.5 h-4 ${isOnline ? 'bg-brand-green' : 'bg-red-400'}`}
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex gap-3 items-start">
                                    <motion.div
                                        key={`icon-${activeService}`}
                                        initial={{ scale: 0.8, rotate: -5 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br ${currentService.color}`}
                                        style={{ boxShadow: `0 3px 12px ${currentService.glowColor}` }}
                                    >
                                        <span className="text-white scale-75">{currentService.icon}</span>
                                    </motion.div>
                                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                                        <span className={`text-[9px] font-bold uppercase tracking-wide ${isOnline ? 'text-slate-400' : 'text-red-300'}`}>
                                            Description
                                        </span>
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={currentService.description}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`text-[10px] leading-relaxed ${isOnline ? 'text-slate-300' : 'text-red-200/80'}`}
                                            >
                                                {currentService.description}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className={`rounded-lg border border-dashed p-2.5 flex items-center justify-between ${isOnline ? 'border-slate-600/50 bg-slate-900/40' : 'border-red-700/50 bg-red-950/40'}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-md bg-red-500/15">
                                            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-medium block ${isOnline ? 'text-white' : 'text-red-100'}`}>requirements.pdf</span>
                                            <span className="text-[8px] text-slate-500">Document Ready</span>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40"
                                        style={{ boxShadow: '0 0 6px rgba(34,197,94,0.3)' }}
                                    >
                                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Submit Button with Cursor Animation */}
                                <div className="relative">
                                    {/* Animated Cursor - moves from top-right to center then clicks */}
                                    <AnimatePresence>
                                        {showCursor && (
                                            <motion.div
                                                className="absolute z-50 pointer-events-none"
                                                initial={{
                                                    right: -20,
                                                    top: -40,
                                                    opacity: 0,
                                                    scale: 0.6
                                                }}
                                                animate={{
                                                    right: isButtonPressed ? '45%' : '48%',
                                                    top: isButtonPressed ? 8 : -5,
                                                    opacity: 1,
                                                    scale: isButtonPressed ? 0.85 : 1,
                                                    rotate: isButtonPressed ? -5 : 0
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    top: -30,
                                                    scale: 0.6
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 14,
                                                    duration: 0.8
                                                }}
                                            >
                                                {/* Cursor trail effect */}
                                                <motion.div
                                                    className={`absolute -z-10 w-8 h-8 rounded-full blur-md ${isOnline ? 'bg-white/30' : 'bg-red-300/30'}`}
                                                    animate={{
                                                        scale: [1, 1.5, 1],
                                                        opacity: [0.5, 0.2, 0.5]
                                                    }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                />

                                                {/* Cursor Icon - Classic pointer */}
                                                <motion.svg
                                                    className={`w-8 h-8 ${isOnline ? 'text-white' : 'text-red-200'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    animate={{
                                                        scale: isButtonPressed ? 0.85 : 1
                                                    }}
                                                    style={{
                                                        filter: isOnline
                                                            ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(255,255,255,0.8))'
                                                            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(239,68,68,0.8))',
                                                    }}
                                                >
                                                    <path d="M4 4l16 11.5-6.5 0.5 3.5 7-2.2 1.2-3.8-7-5 4.5z" />
                                                </motion.svg>

                                                {/* Click ripple effect */}
                                                {isButtonPressed && (
                                                    <motion.div
                                                        className={`absolute top-3 left-1 w-6 h-6 rounded-full ${isOnline ? 'bg-brand-green' : 'bg-red-400'}`}
                                                        initial={{ scale: 0, opacity: 0.8 }}
                                                        animate={{ scale: 4, opacity: 0 }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                    />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        animate={{
                                            scale: isButtonPressed ? 0.95 : 1,
                                            y: isButtonPressed ? 2 : 0
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 relative overflow-hidden ${isOnline ? 'bg-gradient-to-r from-brand-green to-emerald-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                                        style={{
                                            boxShadow: isButtonPressed
                                                ? isOnline ? '0 2px 10px rgba(57,224,121,0.4)' : '0 2px 10px rgba(239,68,68,0.4)'
                                                : isOnline ? '0 4px 20px rgba(57,224,121,0.25)' : '0 4px 20px rgba(239,68,68,0.25)'
                                        }}
                                    >
                                        <span className={`text-[10px] font-bold tracking-wider uppercase ${isOnline ? 'text-black' : 'text-white'}`}>Submit Request</span>
                                        <svg className={`w-3.5 h-3.5 ${isOnline ? 'text-black/70' : 'text-white/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                        {/* Shimmer */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "200%" }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                                        />
                                        {/* Press flash effect */}
                                        {isButtonPressed && (
                                            <motion.div
                                                className={`absolute inset-0 ${isOnline ? 'bg-white/30' : 'bg-red-300/30'}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.button>
                                </div>

                                {/* Progress dots */}
                                <div className="flex justify-center gap-1.5 pt-1">
                                    {services.map((_, index) => (
                                        <motion.div
                                            key={index}
                                            className={`h-1 rounded-full cursor-pointer ${activeService === index
                                                ? isOnline ? 'bg-brand-green w-5' : 'bg-red-500 w-5'
                                                : isOnline ? 'bg-slate-600 w-1.5' : 'bg-red-800 w-1.5'
                                                }`}
                                            onClick={() => setActiveService(index)}
                                            whileHover={{ scale: 1.3 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 border ${isOnline ? 'bg-slate-900/60 border-brand-green/20' : 'bg-red-950/60 border-red-500/20'}`}
                            style={{ backdropFilter: 'blur(20px)' }}
                        >
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'text-white' : 'text-red-100'}`}>1. Define Requirements</span>
                        </div>
                    </motion.div>

                    {/* Step 2: AI Expert Matching - Brain Visualization */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`w-full h-[380px] max-h-[380px] rounded-xl relative overflow-hidden transition-all duration-500 border ${isOnline ? 'border-slate-700/60 hover:border-brand-green/40' : 'border-red-900/40 hover:border-red-500/40'}`}
                            style={{
                                background: isOnline
                                    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.99))'
                                    : 'linear-gradient(145deg, rgba(60, 20, 20, 0.98), rgba(40, 15, 15, 0.99))',
                                backdropFilter: 'blur(20px)',
                                boxShadow: isOnline
                                    ? '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                                    : '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                            }}
                        >
                            {/* Header Bar */}
                            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isOnline ? 'border-slate-700/50 bg-slate-800/30' : 'border-red-800/30 bg-red-900/20'}`}>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${isOnline ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-400'}`}>
                                        STEP 2
                                    </span>
                                    {/* <span className={`text-[11px] font-bold uppercase tracking-wide whitespace-nowrap ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        Developer Matching
                                    </span> */}
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
                                </div>
                            </div>

                            {/* Main Visualization Area */}
                            <div className="relative flex items-center justify-center py-8 px-6 h-[300px]">

                                {/* Outer Neural Rings - Always visible */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        className={`w-48 h-48 border rounded-full ${isOnline ? 'border-cyan-500/20' : 'border-red-500/20'}`}
                                        animate={{
                                            rotate: 360,
                                            opacity: matchingPhase >= 1 ? 0.4 : 0.15
                                        }}
                                        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
                                    />
                                    <motion.div
                                        className={`absolute w-36 h-36 border rounded-full ${isOnline ? 'border-cyan-400/30' : 'border-red-400/30'}`}
                                        animate={{
                                            rotate: -360,
                                            opacity: matchingPhase >= 1 ? 0.5 : 0.2
                                        }}
                                        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
                                    />
                                    <motion.div
                                        className={`absolute w-24 h-24 rounded-full ${isOnline ? 'border border-cyan-300/30' : 'border border-red-300/30'}`}
                                        animate={{
                                            scale: matchingPhase === 1 ? [1, 1.2, 1] : [1, 1.05, 1],
                                            opacity: matchingPhase >= 1 ? 0.6 : 0.3
                                        }}
                                        transition={{ scale: { duration: matchingPhase === 1 ? 1 : 3, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                                    />
                                </div>

                                {/* Brief Document - Travels INTO Code Gang and disappears */}
                                <AnimatePresence>
                                    {matchingPhase === 0 && (
                                        <motion.div
                                            className="absolute left-6 flex flex-col items-center gap-2 z-40"
                                            initial={{ x: 0, opacity: 1, scale: 1 }}
                                            animate={{
                                                x: [0, 30, 80, 110],
                                                opacity: [1, 1, 0.8, 0],
                                                scale: [1, 1, 0.7, 0.3]
                                            }}
                                            exit={{ opacity: 0, scale: 0, x: 110 }}
                                            transition={{
                                                duration: 2.2,
                                                times: [0, 0.3, 0.7, 1],
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <motion.div
                                                className={`w-12 h-14 rounded-lg border-2 flex flex-col items-center justify-center shadow-xl ${isOnline ? 'bg-slate-800/90 border-cyan-500/60' : 'bg-red-900/80 border-red-500/60'}`}
                                                style={{
                                                    boxShadow: isOnline
                                                        ? '0 8px 25px rgba(0,0,0,0.4), 0 0 25px rgba(6, 182, 212, 0.4)'
                                                        : '0 8px 25px rgba(0,0,0,0.4), 0 0 25px rgba(239, 68, 68, 0.4)'
                                                }}
                                                animate={{
                                                    borderColor: isOnline
                                                        ? ['rgba(6, 182, 212, 0.6)', 'rgba(6, 182, 212, 1)', 'rgba(6, 182, 212, 0.6)']
                                                        : ['rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 1)', 'rgba(239, 68, 68, 0.6)'],
                                                    boxShadow: isOnline
                                                        ? ['0 0 20px rgba(6, 182, 212, 0.3)', '0 0 40px rgba(6, 182, 212, 0.6)', '0 0 20px rgba(6, 182, 212, 0.3)']
                                                        : ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 40px rgba(239, 68, 68, 0.6)', '0 0 20px rgba(239, 68, 68, 0.3)']
                                                }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                            >
                                                <svg className={`w-5 h-5 ${isOnline ? 'text-cyan-300' : 'text-red-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div className={`w-4 h-0.5 mt-1 rounded ${isOnline ? 'bg-cyan-400/60' : 'bg-red-400/60'}`} />
                                            </motion.div>
                                            <motion.span
                                                className={`text-[9px] font-semibold tracking-wider uppercase ${isOnline ? 'text-cyan-400' : 'text-red-400'}`}
                                                animate={{ opacity: [1, 0.6, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                Brief
                                            </motion.span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>



                                {/* Central Code Gang Orb */}
                                <div className="relative z-30 flex flex-col items-center">
                                    {/* Pulsing Glow - Enhanced during analysis phase */}
                                    <motion.div
                                        className={`absolute w-28 h-28 rounded-full blur-xl ${isOnline ? 'bg-cyan-500/30' : 'bg-red-500/30'}`}
                                        animate={{
                                            scale: matchingPhase === 1 ? [1, 1.5, 1] : [1, 1.2, 1],
                                            opacity: matchingPhase === 1 ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2]
                                        }}
                                        transition={{ duration: matchingPhase === 1 ? 1 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Brain Orb */}
                                    <motion.div
                                        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center ${isOnline ? 'bg-gradient-to-br from-slate-900 to-cyan-950 border-cyan-400/60' : 'bg-gradient-to-br from-slate-900 to-red-950 border-red-400/60'}`}
                                        animate={{
                                            boxShadow: matchingPhase === 1
                                                ? isOnline
                                                    ? ['0 0 40px rgba(6, 182, 212, 0.6)', '0 0 80px rgba(6, 182, 212, 1)', '0 0 40px rgba(6, 182, 212, 0.6)']
                                                    : ['0 0 40px rgba(239, 68, 68, 0.6)', '0 0 80px rgba(239, 68, 68, 1)', '0 0 40px rgba(239, 68, 68, 0.6)']
                                                : isOnline
                                                    ? ['0 0 30px rgba(6, 182, 212, 0.5)', '0 0 50px rgba(6, 182, 212, 0.7)', '0 0 30px rgba(6, 182, 212, 0.5)']
                                                    : ['0 0 30px rgba(239, 68, 68, 0.5)', '0 0 50px rgba(239, 68, 68, 0.7)', '0 0 30px rgba(239, 68, 68, 0.5)'],
                                            scale: matchingPhase === 1 ? [1, 1.08, 1] : 1
                                        }}
                                        transition={{ duration: matchingPhase === 1 ? 0.8 : 2, repeat: Infinity }}
                                    >
                                        {/* Phase-based Icon - Always visible, content changes */}
                                        <motion.div
                                            key={`phase-icon-${matchingPhase}-${matchingCycle}`}
                                            className="relative flex items-center justify-center"
                                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            {/* Phase 0: Receiving - Download icon */}
                                            {matchingPhase === 0 && (
                                                <>
                                                    <motion.svg
                                                        className={`w-10 h-10 ${isOnline ? 'text-cyan-400' : 'text-red-400'}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        animate={{ y: [0, 4, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                                        style={{ filter: isOnline ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 1))' : 'drop-shadow(0 0 12px rgba(239, 68, 68, 1))' }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </motion.svg>
                                                    <motion.div
                                                        className={`absolute w-12 h-12 rounded-full border ${isOnline ? 'border-cyan-400/50' : 'border-red-400/50'}`}
                                                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                                                        transition={{ duration: 1.2, repeat: Infinity }}
                                                    />
                                                </>
                                            )}

                                            {/* Phase 1: Analyzing - Spinning gear */}
                                            {matchingPhase === 1 && (
                                                <>
                                                    <motion.svg
                                                        className={`w-10 h-10 ${isOnline ? 'text-cyan-400' : 'text-red-400'}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        style={{ filter: isOnline ? 'drop-shadow(0 0 15px rgba(6, 182, 212, 1))' : 'drop-shadow(0 0 15px rgba(239, 68, 68, 1))' }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </motion.svg>
                                                    <motion.div
                                                        className={`absolute w-3 h-3 rounded-full ${isOnline ? 'bg-cyan-400' : 'bg-red-400'}`}
                                                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                                                        transition={{ duration: 0.6, repeat: Infinity }}
                                                        style={{ boxShadow: isOnline ? '0 0 10px rgba(6, 182, 212, 1)' : '0 0 10px rgba(239, 68, 68, 1)' }}
                                                    />
                                                </>
                                            )}

                                            {/* Phase 2: Matching - Search icon */}
                                            {matchingPhase === 2 && (
                                                <motion.svg
                                                    className={`w-10 h-10 ${isOnline ? 'text-cyan-400' : 'text-red-400'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        x: [0, 3, -3, 0]
                                                    }}
                                                    transition={{
                                                        scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                                                        x: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                                                    }}
                                                    style={{ filter: isOnline ? 'drop-shadow(0 0 15px rgba(6, 182, 212, 1))' : 'drop-shadow(0 0 15px rgba(239, 68, 68, 1))' }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </motion.svg>
                                            )}

                                            {/* Phase 3: Matched - Success checkmark */}
                                            {matchingPhase === 3 && (
                                                <motion.svg
                                                    className={`w-10 h-10 ${isOnline ? 'text-green-400' : 'text-red-400'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    style={{ filter: isOnline ? 'drop-shadow(0 0 15px rgba(74, 222, 128, 1))' : 'drop-shadow(0 0 15px rgba(239, 68, 68, 1))' }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </motion.svg>
                                            )}
                                        </motion.div>

                                        {/* Inner Pulse Ring - Faster during analysis */}
                                        <motion.div
                                            className={`absolute w-full h-full rounded-full border ${isOnline ? 'border-cyan-400/50' : 'border-red-400/50'}`}
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: matchingPhase === 1 ? 0.6 : 1.5, repeat: Infinity }}
                                        />
                                    </motion.div>

                                    {/* Status Label - Changes based on phase */}
                                    <motion.span
                                        className={`mt-3 text-[10px] font-bold tracking-widest ${isOnline ? 'text-cyan-400' : 'text-red-400'}`}
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: matchingPhase === 1 ? 0.5 : 2, repeat: Infinity }}
                                        style={{ textShadow: isOnline ? '0 0 10px rgba(6, 182, 212, 0.8)' : '0 0 10px rgba(239, 68, 68, 0.8)' }}
                                    >
                                        {matchingPhase === 0 && "RECEIVING..."}
                                        {matchingPhase === 1 && "ANALYZING..."}
                                        {matchingPhase === 2 && "MATCHING..."}
                                        {matchingPhase === 3 && "CODE GANG"}
                                    </motion.span>
                                </div>



                                {/* Developer Avatars - Right Side - Only visible in phase 2+ */}
                                <AnimatePresence>
                                    {matchingPhase >= 2 && (
                                        <motion.div
                                            className="absolute right-6 flex flex-col items-center gap-2 z-20"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {/* Scanning Line Effect - Only during phase 2 */}
                                            {matchingPhase === 2 && (
                                                <motion.div
                                                    className={`absolute inset-x-0 h-1 rounded-full z-30 ${isOnline ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' : 'bg-gradient-to-r from-transparent via-red-400 to-transparent'}`}
                                                    initial={{ top: 0, opacity: 0 }}
                                                    animate={{
                                                        top: ['0%', '100%', '0%'],
                                                        opacity: [0.8, 1, 0.8]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    style={{
                                                        boxShadow: isOnline
                                                            ? '0 0 20px rgba(6, 182, 212, 0.9), 0 0 40px rgba(6, 182, 212, 0.5)'
                                                            : '0 0 20px rgba(239, 68, 68, 0.9), 0 0 40px rgba(239, 68, 68, 0.5)'
                                                    }}
                                                />
                                            )}

                                            {/* Blurred top avatar */}
                                            <motion.div
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center opacity-40 blur-[1px] ${isOnline ? 'bg-slate-800/80 border-slate-600/40' : 'bg-red-900/60 border-red-700/40'}`}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: matchingPhase === 2 ? [0.2, 0.5, 0.2] : 0.4, y: 0 }}
                                                transition={{ opacity: { duration: 0.8, repeat: matchingPhase === 2 ? Infinity : 0 }, y: { duration: 0.3, delay: 0.1 } }}
                                            >
                                                <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </motion.div>

                                            {/* Selected Developer - Main */}
                                            <motion.div
                                                className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center ${isOnline ? 'bg-slate-800 border-cyan-400' : 'bg-red-900 border-red-400'}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: matchingPhase === 3 ? [1, 1.05, 1] : matchingPhase === 2 ? [0.95, 1.05, 0.95] : 1,
                                                    borderColor: matchingPhase === 2
                                                        ? isOnline ? ['rgba(6, 182, 212, 0.4)', 'rgba(6, 182, 212, 1)', 'rgba(6, 182, 212, 0.4)']
                                                            : ['rgba(239, 68, 68, 0.4)', 'rgba(239, 68, 68, 1)', 'rgba(239, 68, 68, 0.4)']
                                                        : undefined
                                                }}
                                                transition={{
                                                    opacity: { duration: 0.4 },
                                                    scale: { duration: matchingPhase === 2 ? 0.6 : 2, repeat: Infinity },
                                                    borderColor: { duration: 0.6, repeat: matchingPhase === 2 ? Infinity : 0 }
                                                }}
                                                style={{
                                                    boxShadow: matchingPhase === 3
                                                        ? isOnline ? '0 0 30px rgba(6, 182, 212, 0.8)' : '0 0 30px rgba(239, 68, 68, 0.8)'
                                                        : isOnline ? '0 0 15px rgba(6, 182, 212, 0.4)' : '0 0 15px rgba(239, 68, 68, 0.4)'
                                                }}
                                            >
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                                {/* Checkmark Badge - Only in phase 3 */}
                                                <AnimatePresence>
                                                    {matchingPhase === 3 && (
                                                        <motion.div
                                                            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900"
                                                            initial={{ scale: 0, rotate: -180 }}
                                                            animate={{ scale: 1, rotate: 0 }}
                                                            exit={{ scale: 0 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                            style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 1)' }}
                                                        >
                                                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* Blurred bottom avatar */}
                                            <motion.div
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center opacity-40 blur-[1px] ${isOnline ? 'bg-slate-800/80 border-slate-600/40' : 'bg-red-900/60 border-red-700/40'}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: matchingPhase === 2 ? [0.2, 0.5, 0.2] : 0.4, y: 0 }}
                                                transition={{ opacity: { duration: 0.8, repeat: matchingPhase === 2 ? Infinity : 0, delay: 0.2 }, y: { duration: 0.3, delay: 0.2 } }}
                                            >
                                                <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </motion.div>

                                            <motion.span
                                                className={`text-[9px] font-semibold tracking-wider uppercase ${matchingPhase === 3 ? (isOnline ? 'text-cyan-400' : 'text-red-400') : (isOnline ? 'text-slate-400' : 'text-red-300')}`}
                                                animate={{ opacity: matchingPhase === 2 ? [0.5, 1, 0.5] : 1 }}
                                                transition={{ duration: 0.6, repeat: matchingPhase === 2 ? Infinity : 0 }}
                                            >
                                                {matchingPhase === 2 ? "Scanning..." : "Matched!"}
                                            </motion.span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Floating Particles - More active during analysis */}
                                {[...Array(matchingPhase === 1 ? 10 : 5)].map((_, i) => {
                                    // Use deterministic positions based on index to avoid hydration mismatch
                                    const positions = [
                                        { left: 30, top: 35 }, { left: 55, top: 45 }, { left: 40, top: 60 },
                                        { left: 65, top: 30 }, { left: 35, top: 55 }, { left: 50, top: 40 },
                                        { left: 60, top: 65 }, { left: 45, top: 50 }, { left: 70, top: 55 },
                                        { left: 38, top: 42 }
                                    ];
                                    const pos = positions[i % positions.length];
                                    return (
                                        <motion.div
                                            key={`particle-${matchingPhase}-${i}`}
                                            className={`absolute w-1 h-1 rounded-full ${isOnline ? 'bg-cyan-400/60' : 'bg-red-400/60'}`}
                                            style={{
                                                left: `${pos.left}%`,
                                                top: `${pos.top}%`,
                                            }}
                                            animate={{
                                                y: [0, -25, 0],
                                                x: matchingPhase === 1 ? [0, (i % 2 === 0 ? 10 : -10), 0] : 0,
                                                opacity: [0, 0.8, 0],
                                                scale: matchingPhase === 1 ? [0.5, 1.5, 0.5] : [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: matchingPhase === 1 ? 1.5 + (i * 0.1) : 2.5 + (i * 0.2),
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full border ${isOnline ? 'bg-slate-900/80 border-slate-700/50' : 'bg-red-950/80 border-red-800/50'}`}
                            style={{ backdropFilter: 'blur(20px)' }}
                        >
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'text-white' : 'text-red-100'}`}>2. Developer Matching</span>
                        </div>
                    </motion.div>

                    {/* Step 3: Development & QA - Professional Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div
                            className={`w-full h-[380px] max-h-[380px] rounded-xl relative overflow-hidden transition-all duration-500 border ${isOnline ? 'border-slate-700/60 hover:border-brand-green/40' : 'border-red-900/40 hover:border-red-500/40'}`}
                            style={{
                                background: isOnline
                                    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.99))'
                                    : 'linear-gradient(145deg, rgba(60, 20, 20, 0.98), rgba(40, 15, 15, 0.99))',
                                backdropFilter: 'blur(20px)',
                                boxShadow: isOnline
                                    ? '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                                    : '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                            }}
                        >
                            {/* Background glow */}
                            <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none ${isOnline ? 'bg-cyan-500/10' : 'bg-red-500/10'}`} />

                            {/* Header - Matching Step 1 and Step 2 style */}
                            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isOnline ? 'border-slate-700/50 bg-slate-800/30' : 'border-red-800/30 bg-red-900/20'}`}>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isOnline ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-400'}`}>
                                        STEP 3
                                    </span>
                                    {/* <span className={`text-[11px] font-bold uppercase tracking-wide ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        Development & QA
                                    </span> */}
                                    <motion.div className="relative ml-1">
                                        <span className="flex h-2 w-2">
                                            <motion.span
                                                className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                                                animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                        </span>
                                    </motion.div>
                                    <span className="text-[9px] text-green-400 font-medium">LIVE</span>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
                                </div>
                            </div>

                            {/* Main Content - Two Column Layout */}
                            <div className="flex flex-1 p-5 gap-6">
                                {/* Left: Animated Milestones */}
                                <div className="flex-1 flex flex-col">
                                    <span className={`text-xs font-bold uppercase tracking-wider mb-4 ${isOnline ? 'text-slate-400' : 'text-red-400/70'}`}>
                                        Milestones
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { name: 'Project Setup', time: '2 days' },
                                            { name: 'Backend API', time: '5 days' },
                                            { name: 'Frontend UI', time: '3 days' },
                                            { name: 'Testing & QA', time: '4 days' },
                                        ].map((milestone, i) => {
                                            const status = i < activeMilestone ? 'done' : i === activeMilestone ? 'active' : 'pending';

                                            return (
                                                <motion.div
                                                    key={milestone.name}
                                                    className="flex items-center gap-3"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    {/* Timeline dot + line */}
                                                    <div className="flex flex-col items-center">
                                                        <motion.div
                                                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${status === 'done'
                                                                ? 'bg-green-500'
                                                                : status === 'active'
                                                                    ? isOnline ? 'bg-cyan-400' : 'bg-red-400'
                                                                    : 'bg-slate-700 border border-slate-600'
                                                                }`}
                                                            animate={{
                                                                scale: status === 'active' ? [1, 1.15, 1] : 1,
                                                                boxShadow: status === 'active'
                                                                    ? isOnline
                                                                        ? ['0 0 0px rgba(6,182,212,0)', '0 0 20px rgba(6,182,212,0.8)', '0 0 0px rgba(6,182,212,0)']
                                                                        : ['0 0 0px rgba(239,68,68,0)', '0 0 20px rgba(239,68,68,0.8)', '0 0 0px rgba(239,68,68,0)']
                                                                    : status === 'done'
                                                                        ? '0 0 12px rgba(74,222,128,0.6)'
                                                                        : 'none'
                                                            }}
                                                            transition={{
                                                                scale: { duration: 1, repeat: status === 'active' ? Infinity : 0 },
                                                                boxShadow: { duration: 1.5, repeat: status === 'active' ? Infinity : 0 }
                                                            }}
                                                        >
                                                            {status === 'done' && (
                                                                <motion.svg
                                                                    className="w-3 h-3 text-white"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ type: "spring", stiffness: 500 }}
                                                                >
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </motion.svg>
                                                            )}
                                                            {status === 'active' && (
                                                                <motion.div
                                                                    className="w-2 h-2 rounded-full bg-white"
                                                                    animate={{ scale: [1, 1.5, 1] }}
                                                                    transition={{ duration: 1, repeat: Infinity }}
                                                                />
                                                            )}
                                                        </motion.div>
                                                        {i < 3 && (
                                                            <motion.div
                                                                className={`w-0.5 h-5 transition-all duration-500 rounded-full ${i < activeMilestone ? 'bg-green-500/70' : 'bg-slate-700'
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                    {/* Milestone info */}
                                                    <div className="flex-1 flex items-center justify-between">
                                                        <span className={`text-xs font-medium transition-all duration-300 ${status === 'done' ? 'text-slate-400 line-through' :
                                                            status === 'active' ? isOnline ? 'text-white' : 'text-red-100' :
                                                                'text-slate-500'
                                                            }`}>
                                                            {milestone.name}
                                                        </span>
                                                        <span className={`text-[10px] font-medium transition-all duration-300 ${status === 'active' ? isOnline ? 'text-cyan-400' : 'text-red-400' : 'text-slate-600'
                                                            }`}>
                                                            {milestone.time}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right: Tech Stack + Progress Circle */}
                                <div className="w-36 flex flex-col gap-4">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isOnline ? 'text-slate-400' : 'text-red-400/70'}`}>
                                        Tech Stack
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Node', 'AWS', 'Docker'].map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                className={`px-2.5 py-1 rounded text-[11px] font-bold ${isOnline ? 'bg-slate-700/60 text-slate-300 border border-slate-600/40' : 'bg-red-900/40 text-red-300 border border-red-700/40'}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Progress Circle */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <motion.div className="relative w-24 h-24">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    className={isOnline ? 'stroke-slate-700' : 'stroke-red-900/50'}
                                                    strokeWidth="3"
                                                    fill="none"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <motion.path
                                                    className={isOnline ? 'stroke-cyan-400' : 'stroke-red-400'}
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    fill="none"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    animate={{ strokeDasharray: `${Math.min(activeMilestone * 25, 100)}, 100` }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                    style={{ filter: isOnline ? 'drop-shadow(0 0 8px rgba(6,182,212,0.6))' : 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <motion.span
                                                    key={activeMilestone}
                                                    className={`text-xl font-bold ${isOnline ? 'text-white' : 'text-red-100'}`}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {Math.min(activeMilestone * 25, 100)}%
                                                </motion.span>
                                                <span className="text-[9px] text-slate-500">Complete</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Activity Input */}
                            <div className={`px-5 py-3 border-t ${isOnline ? 'border-slate-700/50' : 'border-red-800/30'}`}>
                                <motion.div
                                    className={`flex items-center gap-3 h-9 px-4 rounded-lg border transition-all ${isOnline
                                        ? 'bg-slate-800/40 border-slate-700/40 hover:border-cyan-500/40'
                                        : 'bg-red-950/30 border-red-800/30 hover:border-red-500/40'
                                        }`}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <motion.div
                                        className={`w-0.5 h-4 rounded-full ${isOnline ? 'bg-cyan-400' : 'bg-red-400'}`}
                                        animate={{ opacity: [1, 0.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-xs text-slate-500 flex-1">Add update for the team...</span>
                                    <motion.button
                                        className={`w-6 h-6 rounded flex items-center justify-center ${isOnline ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>

                        <div className={`px-4 py-2 rounded-full border ${isOnline ? 'bg-slate-900/80 border-slate-700/50' : 'bg-red-950/80 border-red-800/50'}`}
                            style={{ backdropFilter: 'blur(20px)' }}
                        >
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'text-white' : 'text-red-100'}`}>3. Development & QA</span>
                        </div>
                    </motion.div>

                    {/* Step 4: Delivery & Scaling - Professional Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div
                            className={`w-full h-[380px] max-h-[380px] rounded-xl relative overflow-hidden transition-all duration-500 border ${isOnline ? 'border-slate-700/60 hover:border-brand-green/40' : 'border-red-900/40 hover:border-red-500/40'}`}
                            style={{
                                background: isOnline
                                    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.99))'
                                    : 'linear-gradient(145deg, rgba(60, 20, 20, 0.98), rgba(40, 15, 15, 0.99))',
                                backdropFilter: 'blur(20px)',
                                boxShadow: isOnline
                                    ? '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                                    : '0 25px 50px -15px rgba(0, 0, 0, 0.7)'
                            }}
                        >
                            {/* Animated background glows */}
                            <motion.div
                                className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none ${isOnline ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className={`absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none ${isOnline ? 'bg-purple-500/10' : 'bg-red-500/10'}`}
                                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            {/* Header - Matching other cards */}
                            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isOnline ? 'border-slate-700/50 bg-slate-800/30' : 'border-red-800/30 bg-red-900/20'}`}>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap inline-flex ${isOnline ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-400'}`}>
                                        STEP 4
                                    </span>
                                    {/* <span className={`text-[11px] font-bold uppercase tracking-wide ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        Delivery & Scaling
                                    </span> */}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <motion.div
                                            className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <span className={`text-[8px] font-bold uppercase ${isOnline ? 'text-green-400' : 'text-red-400'}`}>Deployed</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex flex-col p-3 gap-5">
                                {/* Deployment Status */}
                                <div className="flex flex-col gap-3">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isOnline ? 'text-slate-400' : 'text-red-400/70'}`}>
                                        Deployment Status
                                    </span>
                                    <div className="flex gap-3">
                                        {[
                                            { name: 'Production', status: 'live', icon: '🚀', progress: 100 },
                                            { name: 'Staging', status: 'ready', icon: '🔧', progress: 85 },
                                            { name: 'CI/CD', status: 'active', icon: '⚡', progress: 100 },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.name}
                                                className={`flex-1 p-1 rounded-lg border relative overflow-hidden ${isOnline ? 'bg-slate-800/40 border-slate-700/40' : 'bg-red-900/30 border-red-800/40'}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ scale: 1, borderColor: isOnline ? 'rgba(74,222,128,0.5)' : 'rgba(239,68,68,0.5)' }}
                                            >
                                                {/* Shimmer effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '200%' }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                                />

                                                <div className="flex items-center gap-2 mb-2">
                                                    <motion.span
                                                        className="text-sm"
                                                        animate={{
                                                            rotate: item.name === 'CI/CD' ? [0, 10, -10, 0] : 0,
                                                            scale: [1, 1.1, 1]
                                                        }}
                                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                                    >
                                                        {item.icon}
                                                    </motion.span>
                                                    <span className={`text-[10px] font-bold ${isOnline ? 'text-white' : 'text-red-100'}`}>{item.name}</span>
                                                </div>

                                                {/* Animated progress bar */}
                                                <div className={`h-1 rounded-full mb-1 ${isOnline ? 'bg-slate-700' : 'bg-red-900/50'}`}>
                                                    <motion.div
                                                        className={`h-full rounded-full ${item.status === 'live' ? 'bg-gradient-to-r from-green-500 to-emerald-400' : isOnline ? 'bg-gradient-to-r from-cyan-500 to-blue-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.progress}%` }}
                                                        transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeOut" }}
                                                        style={{ boxShadow: item.status === 'live' ? '0 0 10px rgba(74,222,128,0.5)' : isOnline ? '0 0 10px rgba(6,182,212,0.5)' : '0 0 10px rgba(239,68,68,0.5)' }}
                                                    />
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <motion.div
                                                        className={`w-1.5 h-1.5 rounded-full ${item.status === 'live' ? 'bg-green-500' : isOnline ? 'bg-cyan-400' : 'bg-red-400'}`}
                                                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                                    />
                                                    <span className={`text-[9px] uppercase font-medium ${item.status === 'live' ? 'text-green-400' : isOnline ? 'text-cyan-400' : 'text-red-400'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isOnline ? 'text-slate-400' : 'text-red-400/70'}`}>
                                            Performance
                                        </span>
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${isOnline ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                            <svg className={`w-3 h-3 ${isOnline ? 'text-green-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className={`text-[9px] font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>+150%</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'Uptime', value: '99.9%', color: 'green' },
                                            { label: 'Response', value: '45ms', color: 'cyan' },
                                            { label: 'Users', value: '10K+', color: 'purple' },
                                        ].map((metric, i) => (
                                            <motion.div
                                                key={metric.label}
                                                className={`text-center p-2.5 rounded-lg border ${isOnline ? 'bg-slate-800/30 border-slate-700/30' : 'bg-red-900/20 border-red-800/30'}`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <motion.span
                                                    className={`text-lg font-bold block ${metric.color === 'green' ? 'text-green-400' :
                                                        metric.color === 'cyan' ? isOnline ? 'text-cyan-400' : 'text-red-400' :
                                                            isOnline ? 'text-purple-400' : 'text-red-400'
                                                        }`}
                                                    animate={{ opacity: [1, 0.7, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                >
                                                    {metric.value}
                                                </motion.span>
                                                <span className="text-[9px] text-slate-500 uppercase">{metric.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Support & Scaling */}
                                <div className="flex gap-3">
                                    {/* 24/7 Support */}
                                    <motion.div
                                        className={`flex-1 p-3 rounded-lg border flex items-center gap-3 relative overflow-hidden ${isOnline ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-green-500/30' : 'bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/30'}`}
                                        whileHover={{ scale: 1.05, boxShadow: isOnline ? '0 0 30px rgba(16,185,129,0.3)' : '0 0 30px rgba(239,68,68,0.3)' }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center relative ${isOnline ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            <motion.svg
                                                className={`w-5 h-5 ${isOnline ? 'text-green-400' : 'text-red-400'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </motion.svg>
                                        </motion.div>
                                        <div>
                                            <span className={`text-xs font-bold block ${isOnline ? 'text-green-400' : 'text-red-400'}`}>24/7 Support</span>
                                            <motion.span
                                                className="text-[9px] text-slate-500"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                Always available
                                            </motion.span>
                                        </div>
                                    </motion.div>

                                    {/* Auto Scaling */}
                                    <motion.div
                                        className={`flex-1 p-3 rounded-lg border flex items-center gap-3 relative overflow-hidden ${isOnline ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border-purple-500/30' : 'bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/30'}`}
                                        whileHover={{ scale: 1.05, boxShadow: isOnline ? '0 0 30px rgba(168,85,247,0.3)' : '0 0 30px rgba(239,68,68,0.3)' }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                                        />
                                        <motion.div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isOnline ? 'bg-purple-500/20' : 'bg-red-500/20'}`}>
                                            <motion.svg
                                                className={`w-5 h-5 ${isOnline ? 'text-purple-400' : 'text-red-400'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </motion.svg>
                                        </motion.div>
                                        <div>
                                            <span className={`text-xs font-bold block ${isOnline ? 'text-purple-400' : 'text-red-400'}`}>Auto Scaling</span>
                                            <motion.span
                                                className="text-[9px] text-slate-500"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                            >
                                                Infinite capacity
                                            </motion.span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className={`px-4 py-2 rounded-full border ${isOnline ? 'bg-slate-900/80 border-slate-700/50' : 'bg-red-950/80 border-red-800/50'}`}
                            style={{ backdropFilter: 'blur(20px)' }}
                        >
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'text-white' : 'text-red-100'}`}>4. Delivery & Scaling</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes laser-shoot {
                    0% { width: 0; opacity: 0; }
                    10% { opacity: 1; }
                    50% { width: 100%; opacity: 1; }
                    100% { width: 100%; opacity: 0.6; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
