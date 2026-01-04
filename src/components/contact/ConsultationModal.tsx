"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        time: "",
        description: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Consultation scheduled! Check your email for the invite.");
                onClose();
            } else {
                const data = await response.json();
                alert("Failed to schedule: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            alert("Error scheduling call.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto flex flex-col p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-2">Book Consultation</h2>
                            <p className="text-zinc-400 text-sm mb-6">Fill in the details below to schedule a call with our team.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        startContent={<User size={16} className="text-zinc-500" />}
                                        classNames={{
                                            inputWrapper: "bg-zinc-950 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                                            input: "text-white placeholder:text-zinc-600"
                                        }}
                                        required
                                    />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        startContent={<Mail size={16} className="text-zinc-500" />}
                                        classNames={{
                                            inputWrapper: "bg-zinc-950 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                                            input: "text-white placeholder:text-zinc-600"
                                        }}
                                        required
                                    />
                                </div>

                                <Input
                                    type="datetime-local"
                                    placeholder="Preferred Time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    startContent={<Calendar size={16} className="text-zinc-500" />}
                                    classNames={{
                                        inputWrapper: "bg-zinc-950 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                                        input: "text-white placeholder:text-zinc-600"
                                    }}
                                    required
                                />

                                <Textarea
                                    placeholder="Briefly describe your project needs..."
                                    minRows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    classNames={{
                                        inputWrapper: "bg-zinc-950 border border-zinc-800 hover:border-brand-green/50 focus-within:border-brand-green",
                                        input: "text-white placeholder:text-zinc-600"
                                    }}
                                />

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="w-full bg-brand-green text-black font-bold mt-2"
                                >
                                    Schedule Call
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
