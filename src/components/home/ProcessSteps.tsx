"use client";

import { motion } from "framer-motion";
import { Search, Code, Database, Rocket, Clock, DollarSign, Check, Brain, Smartphone, Cloud, Shield } from "lucide-react";

export default function ProcessSteps() {
    return (
        <section className="py-24 bg-[#f5f4f0] overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:items-stretch -space-y-6 lg:space-y-0 lg:-space-x-8">

                    {/* --- LEFT CARD: Image & New Summary Card --- */}
                    <div className="relative z-10 w-full max-w-lg lg:max-w-xl flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <img
                                src="/left-card.png"
                                alt="Post Your Requirements"
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </motion.div>

                        {/* New "Post Requirements" Summary Card */}
                        <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_#000] w-full max-w-sm mx-auto lg:ml-auto lg:mr-4 lg:-mt-12 relative z-20">
                            <h3 className="text-2xl font-black text-black mb-6 leading-tight">
                                Post<br />Requirements
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 text-gumroad-blue">
                                        <Brain className="w-full h-full stroke-[2px]" />
                                    </div>
                                    <span className="text-black font-bold text-lg">AI Integration</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 text-gumroad-green">
                                        <Smartphone className="w-full h-full stroke-[2px]" />
                                    </div>
                                    <span className="text-black font-bold text-lg">App Development</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 text-gumroad-pink">
                                        <Database className="w-full h-full stroke-[2px]" />
                                    </div>
                                    <span className="text-black font-bold text-lg">Database Creation</span>
                                </div>
                            </div>

                            <p className="text-black font-medium text-sm leading-relaxed">
                                Simply post your technical needs to find the perfect team.
                            </p>
                        </div>
                    </div>

                    {/* --- RIGHT CARD: Find the Perfect Match (Code) --- */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col w-full max-w-lg lg:max-w-xl h-auto">

                        <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
                            Find the Perfect<br />Match
                        </h2>
                        <p className="text-lg md:text-xl font-medium text-black/80 leading-relaxed mb-12 max-w-sm">
                            Connect with experts for any tech project. We make it simple to build your vision.
                        </p>

                        {/* Experts List */}
                        <div className="space-y-0 relative z-10 border-t-2 border-black">

                            {/* Expert 1 (Active) */}
                            <div className="bg-white border-b-2 border-black p-4 flex items-center gap-4 relative">
                                <div className="w-12 h-12 rounded-full border-2 border-black bg-[#FF6B6B] overflow-hidden shrink-0 flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&mouth=smile&eyebrows=default" alt="Aarti" className="w-full h-full" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-black text-black text-lg">AI Specialist - Aarti</div>
                                    <div className="text-xs font-bold text-black/70">Build machine learning models</div>
                                </div>
                            </div>

                            {/* Expert 2 (Yellow Bg - Highlighted) */}
                            <div className="bg-gumroad-yellow border-b-2 border-black p-4 flex items-center gap-4 relative -mx-4 px-8 border-r-2 border-l-2 py-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)_inset]">
                                <div className="w-12 h-12 rounded-full border-2 border-black bg-[#FFD93D] overflow-hidden shrink-0 flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&mouth=smile&eyebrows=default" alt="Vikram" className="w-full h-full" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-black text-lg">App Developer - Vikram</div>
                                    <div className="text-xs font-bold text-black/70">Design scalable apps</div>
                                </div>
                            </div>

                            {/* Expert 3 (Standard) */}
                            <div className="bg-white/50 p-4 flex items-center gap-4 relative">
                                <div className="w-12 h-12 rounded-full border-2 border-black bg-[#4D96FF] overflow-hidden shrink-0 flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&mouth=smile&eyebrows=default" alt="Arjun" className="w-full h-full" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-black text-lg">Database Architect - Arjun</div>
                                    <div className="text-xs font-bold text-black/70">PostgreSQL Expert</div>
                                </div>
                            </div>

                        </div>

                        {/* --- STICKERS (RIGHT) --- */}

                        {/* GET MATCHED */}
                        <motion.div
                            animate={{ rotate: [10, 12, 10] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-[-1rem] top-24 z-20"
                        >
                            <div className="bg-gumroad-yellow border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] rotate-[10deg] w-28 h-24 flex items-center justify-center text-center">
                                <span className="font-black text-[#2A8C78] text-sm leading-none block" style={{ textShadow: "0.5px 0.5px 0 #000" }}>GET<br />MATCHED</span>
                            </div>
                            <div className="w-1 h-12 bg-black absolute left-1/2 -bottom-10 -z-10" />
                        </motion.div>

                        {/* BUILD IT */}
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-0 bottom-24 z-20 translate-x-6"
                        >
                            <div className="bg-[#2A8C78] border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000] rotate-[-10deg] rounded-md">
                                <span className="font-black text-gumroad-yellow text-xl tracking-wide uppercase" style={{ textShadow: "1.5px 1.5px 0 #000" }}>BUILD IT</span>
                            </div>
                        </motion.div>

                    </div>


                </div>

                {/* --- CONNECT WITH EXPERTS SECTION (2-Column Layout) --- */}
                <div className="mt-12 lg:mt-24 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                            {/* --- LEFT COLUMN: Text Content --- */}
                            <div className="flex flex-col">
                                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-black leading-tight">
                                    Connect with <br /> Experts
                                </h2>

                                {/* Expertise Section with Ribbon */}
                                <div className="relative mb-10">
                                    {/* Top Services Ribbon */}
                                    <div className="absolute -top-4 right-0 md:right-8 transform rotate-6 z-10 pointer-events-none">
                                        <div className="relative">
                                            <div className="absolute top-1 -left-2 w-6 h-8 bg-[#F7C948] border-2 border-black transform -skew-y-12 z-0"></div>
                                            <div className="absolute top-1 -right-2 w-6 h-8 bg-[#F7C948] border-2 border-black transform skew-y-12 z-0"></div>
                                            <div className="relative bg-[#D3453D] border-2 border-black px-4 py-1.5 z-10 transform -skew-x-3">
                                                <span className="text-white font-bold text-sm uppercase tracking-wide" style={{ textShadow: "1px 1px 0 #9B2C26" }}>Top Services</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-medium mb-6 text-black">Our Expertise</h3>

                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 group cursor-default">
                                            <Brain className="w-6 h-6 text-black group-hover:text-[#D3453D] transition-colors" />
                                            <span className="text-lg font-normal text-black">Machine Learning</span>
                                        </li>
                                        <li className="flex items-center gap-3 group cursor-default">
                                            <Database className="w-6 h-6 text-black group-hover:text-[#D3453D] transition-colors" />
                                            <span className="text-lg font-normal text-black">Full-Stack Dev</span>
                                        </li>
                                        <li className="flex items-center gap-3 group cursor-default">
                                            <Cloud className="w-6 h-6 text-black group-hover:text-[#D3453D] transition-colors" />
                                            <span className="text-lg font-normal text-black">Cloud Solutions</span>
                                        </li>
                                        <li className="flex items-center gap-3 group cursor-default">
                                            <Shield className="w-6 h-6 text-black group-hover:text-[#D3453D] transition-colors" />
                                            <span className="text-lg font-normal text-black">Cybersecurity</span>
                                        </li>
                                    </ul>
                                </div>

                                <p className="text-lg md:text-xl leading-snug text-black/80 max-w-sm">
                                    Our community of skilled developers will bring your vision to life.
                                </p>
                            </div>

                            {/* --- RIGHT COLUMN: Dashboard Card (Smaller) --- */}
                            <div className="relative flex flex-col items-center">
                                {/* NEW FEATURES Sticker */}
                                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-30 transform rotate-12 pointer-events-none drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
                                    <div className="absolute top-1 -left-1.5 w-6 h-8 bg-red-500 border-2 border-black transform -skew-y-12 z-0"></div>
                                    <div className="absolute top-1 -right-1.5 w-6 h-8 bg-red-500 border-2 border-black transform skew-y-12 z-0"></div>
                                    <div className="relative bg-[#fbbf24] border-2 border-black px-4 py-1.5 z-10 flex items-center gap-1.5">
                                        <Rocket className="w-4 h-4 text-black" />
                                        <span className="text-black font-bold text-sm whitespace-nowrap tracking-wide">NEW FEATURES!</span>
                                    </div>
                                </div>

                                {/* Browser/Dashboard Frame */}
                                <div className="bg-blue-500 rounded-2xl p-2 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
                                    <div className="bg-[#f0f2f5] rounded-xl border-[3px] border-black overflow-hidden relative">
                                        {/* Browser Header */}
                                        <div className="bg-white border-b-[3px] border-black p-2 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex -space-x-0.5">
                                                    <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-black"></div>
                                                    <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-black"></div>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block flex-1 mx-3 h-3 bg-gray-200 rounded-full border-2 border-black opacity-50"></div>
                                        </div>

                                        {/* Content Grid */}
                                        <div className="p-4 grid grid-cols-3 gap-3">
                                            {/* AI Project Card */}
                                            <div className="flex flex-col bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                                <div className="bg-[#5b9bd5] h-16 flex items-center justify-center border-b-2 border-black">
                                                    <Brain className="w-8 h-8 text-black stroke-[1.5]" />
                                                </div>
                                                <div className="p-2 flex flex-col gap-1">
                                                    <h3 className="text-xs font-bold text-black">AI Project</h3>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Clock className="w-3 h-3" /> 13 years
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Check className="w-3 h-3" /> Dach e soment...
                                                    </div>
                                                    <div className="mt-2 w-1/2 h-2 rounded-full bg-[#5b9bd5] border border-black"></div>
                                                </div>
                                            </div>

                                            {/* Mobile App Card */}
                                            <div className="flex flex-col bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                                <div className="bg-[#5aba70] h-16 flex items-center justify-center border-b-2 border-black">
                                                    <Smartphone className="w-8 h-8 text-black stroke-[1.5]" />
                                                </div>
                                                <div className="p-2 flex flex-col gap-1">
                                                    <h3 className="text-xs font-bold text-black">Mobile App</h3>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Clock className="w-3 h-3" /> 13 years
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Check className="w-3 h-3" /> Dach e soment...
                                                    </div>
                                                    <div className="mt-2 w-1/2 h-2 rounded-full bg-[#5aba70] border border-black"></div>
                                                </div>
                                            </div>

                                            {/* DB Migration Card */}
                                            <div className="flex flex-col bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                                <div className="bg-[#a78bfa] h-16 flex items-center justify-center border-b-2 border-black">
                                                    <Database className="w-8 h-8 text-black stroke-[1.5]" />
                                                </div>
                                                <div className="p-2 flex flex-col gap-1">
                                                    <h3 className="text-xs font-bold text-black">DB Migration</h3>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Clock className="w-3 h-3" /> 13 years
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600 text-[10px] font-semibold">
                                                        <Check className="w-3 h-3" /> Dach avinnrise
                                                    </div>
                                                    <div className="mt-2 w-1/2 h-2 rounded-full bg-[#a78bfa] border border-black"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TRUSTED EXPERTS Badge */}
                                <div className="relative z-20 -mt-5 bg-white p-1 rounded-full inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                                    <div className="flex items-center bg-blue-500 border-2 border-black rounded-full px-2 py-1.5 pr-4">
                                        <div className="relative w-8 h-8 bg-[#fbbf24] rounded-full border-2 border-black flex items-center justify-center -ml-2 z-10">
                                            <svg className="w-10 h-10 absolute text-black" fill="currentColor" viewBox="0 0 100 100">
                                                <path d="M50 0 L61 10 L75 5 L78 20 L92 22 L88 36 L100 45 L90 56 L98 70 L84 75 L85 90 L70 86 L62 98 L50 88 L38 98 L30 86 L15 90 L16 75 L2 70 L10 56 L0 45 L12 36 L8 22 L22 20 L25 5 L39 10 Z" fill="#fbbf24" stroke="black" strokeWidth="3"></path>
                                            </svg>
                                            <Check className="w-5 h-5 text-black relative z-20 stroke-[3px]" />
                                        </div>
                                        <div className="ml-1.5">
                                            <h2 className="text-sm font-black text-white uppercase tracking-wider drop-shadow-[1px_1px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>TRUSTED EXPERTS</h2>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Categories */}
                                <div className="mt-8 flex flex-wrap justify-center gap-6">
                                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-14 h-14 bg-[#5b9bd5] rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-transform group-hover:scale-110">
                                            <Brain className="w-7 h-7 text-black" />
                                        </div>
                                        <span className="text-sm font-bold text-black">AI Experts</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-14 h-14 bg-[#5aba70] rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-transform group-hover:scale-110">
                                            <Code className="w-7 h-7 text-black" />
                                        </div>
                                        <span className="text-sm font-bold text-black">Developers</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-14 h-14 bg-[#fbbf24] rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-transform group-hover:scale-110">
                                            <Database className="w-7 h-7 text-black" />
                                        </div>
                                        <span className="text-sm font-bold text-black">Data Engineers</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>

                {/* --- CODE GANG SUCCESS IMAGE --- */}
                <div className="mt-12 lg:mt-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <img
                            src="/code-gang-success.png"
                            alt="Code Gang Success - Connect with experts instead of hiring a full team"
                            className="w-full h-auto object-contain mix-blend-multiply pointer-events-none"
                        />
                    </motion.div>
                </div>

                {/* --- REVENUE & TESTIMONIALS SECTION --- */}
                <div className="mt-16 lg:mt-28 w-full">
                    {/* Revenue Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-black tracking-tighter leading-none">
                            $2,400,000
                        </h2>
                        <p className="text-xl md:text-2xl font-medium text-black/80 mt-6 max-w-2xl mx-auto leading-relaxed">
                            The revenue generated by startups built on Code Gang last month.
                        </p>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

                        {/* Testimonial 1 - Sarah */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                I had the idea for an AI-powered travel planner for years, but I don't know a single line of Python. I posted my requirements on Code Gang, and within 4 weeks, I had a working MVP. Today, that "side project" is my full-time job. Code Gang didn't just build my app; they built my freedom.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-pink border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/sarah.png" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">Sarah Jenkins</div>
                                    <div className="text-sm text-black/60">Built an AI Travel SaaS</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 2 - Marcus */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                Agencies quoted me $15k just to set up the database architecture for my e-commerce store. That would have killed my budget. I posted the scope on Code Gang, found a specialist, and got it done for $2k. The code was clean, documented, and scalable.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-blue border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/marcus.png" alt="Marcus" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">Marcus Davila</div>
                                    <div className="text-sm text-black/60">Needed a scalable SQL Database</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 3 - FlowStack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                We were stuck. Our in-house team was great at backend, but we had zero experience with mobile UI. Instead of hiring a full-time employee, we posted the frontend requirements on Code Gang. We received a polished Flutter build in 10 days. We now use Code Gang for all our "overflow" work.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-green border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/flowstack.png" alt="FlowStack" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">Team FlowStack</div>
                                    <div className="text-sm text-black/60">Outsourced Mobile App Development</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 4 - Elena */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                I love Code Gang because it cuts out the meeting fatigue. I upload a text file with my requirements, set a bounty, and I get a GitHub repo back. It is literally that simple. It feels like a vending machine for high-quality software.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-yellow border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/elena.png" alt="Elena" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">Elena Rostova</div>
                                    <div className="text-sm text-black/60">Serial Entrepreneur</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Additional Cloud Success Stories */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mt-6 lg:mt-8">

                        {/* Testimonial 5 - David (AWS) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                Migrating our legacy monolith to AWS Lambda seemed impossible with our current team size. Code Gang connected us with a Serverless specialist who re-architected our entire backend. We cut hosting costs by 60% and scaled to 1M daily requests without a single hiccup.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-blue border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/david.png" alt="David" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">David Kim</div>
                                    <div className="text-sm text-black/60">Global Cloud Architect</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 6 - Priya (DevOps/Kubernetes) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="text-4xl font-serif text-black/20 mb-4">"</div>
                            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-6">
                                We needed a multi-region Kubernetes cluster setup with strict compliance requirements for FinTech. The expert we hired automated the entire CI/CD pipeline using Terraform and ArgoCD. It was plug-and-play secure infrastructure delivered in under 3 weeks.
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                                <div className="w-12 h-12 rounded-full bg-gumroad-pink border-2 border-black flex items-center justify-center overflow-hidden">
                                    <img src="/testimonials/priya.png" alt="Priya" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-black">Priya Patel</div>
                                    <div className="text-sm text-black/60">Lead DevOps Engineer</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
