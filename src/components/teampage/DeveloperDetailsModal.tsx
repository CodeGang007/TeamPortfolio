"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Github, Linkedin, Instagram, Calendar, Clock, DollarSign, Award, MessageSquare } from "lucide-react";
import { TeamMember } from "./types";

interface DeveloperDetailsModalProps {
    member: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DeveloperDetailsModal({ member, isOpen, onClose }: DeveloperDetailsModalProps) {
    if (!member) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto flex flex-col md:flex-row">

                            {/* Left Side: Image & Quick Stats */}
                            <div className="w-full md:w-1/3 bg-zinc-950 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-zinc-800">
                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-zinc-800 shadow-xl mb-4">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <h2 className="text-xl font-bold text-white text-center mb-1">{member.name}</h2>
                                <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
                                    {member.role.split(" ")[0]}
                                </span>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                        <Award className="h-4 w-4 text-zinc-500" />
                                        <span>{member.experienceLevel || "Mid"} Level</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                        <Clock className="h-4 w-4 text-zinc-500" />
                                        <span>{member.availability || "Freelance"}</span>
                                    </div>
                                    {member.hourlyRate && (
                                        <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                            <DollarSign className="h-4 w-4 text-zinc-500" />
                                            <span>${member.hourlyRate}/hr</span>
                                        </div>
                                    )}
                                </div>

                                {/* Socials Row */}
                                <div className="flex gap-4 mt-8">
                                    {member.socials?.github && (
                                        <a href={member.socials.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
                                    )}
                                    {member.socials?.linkedin && (
                                        <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
                                    )}
                                    {member.socials?.instagram && (
                                        <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-400 transition-colors"><Instagram className="h-5 w-5" /></a>
                                    )}
                                    {member.projectUrl && (
                                        <a href={member.projectUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-brand-green transition-colors"><Globe className="h-5 w-5" /></a>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Detailed Info */}
                            <div className="flex-1 p-6 md:p-8 relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">About</h3>
                                        <p className="text-zinc-300 leading-relaxed text-sm">
                                            {member.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {member.techStack?.map((tech) => (
                                                <span key={tech} className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {(member.projects && member.projects.length > 0) && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Showcase Projects</h3>
                                            <div className="grid gap-3">
                                                {member.projects.map((project, idx) => (
                                                    <div key={idx} className="group rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 hover:border-brand-green/30 transition-colors">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-white group-hover:text-brand-green transition-colors">{project.title}</h4>
                                                                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{project.description}</p>
                                                            </div>
                                                            {project.githubUrl && (
                                                                <a
                                                                    href={project.githubUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                                                    title="View Code"
                                                                >
                                                                    <Github className="h-4 w-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {(member.languages && member.languages.length > 0) && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Languages</h3>
                                            <div className="flex flex-wrap gap-2 text-sm text-zinc-300">
                                                {member.languages.join(", ")}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-800 hidden">
                                        {/* Contact details handled via platform specific messaging or hidden for privacy */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
