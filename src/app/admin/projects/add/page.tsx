"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectService } from "@/services/projects";
import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    Upload, 
    X, 
    Loader2, 
    Save, 
    Link as LinkIcon,
    Type,
    AlignLeft,
    Image as ImageIcon,
    Tag,
    Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AddProjectPage() {
    const { user, role, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        link: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check authentication and role
    if (!authLoading && (!isAuthenticated || role !== 'admin')) {
        router.push('/');
        return null;
    }

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
        );
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large. Maximum size is 5MB.");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!CLOUD_NAME || !UPLOAD_PRESET) {
            throw new Error("Cloudinary configuration missing");
        }

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("folder", "projects");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: data
        });

        const json = await res.json();
        if (json.secure_url) {
            return json.secure_url;
        } else {
            throw new Error(json.error?.message || "Upload failed");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title || !formData.category) {
            alert("Please fill in all required fields (Title and Category)");
            return;
        }

        setIsSubmitting(true);

        try {
            let imageUrl = "";

            if (selectedFile) {
                setIsUploading(true);
                imageUrl = await uploadToCloudinary(selectedFile);
                setIsUploading(false);
            }

            await ProjectService.createProject({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                link: formData.link,
                image: imageUrl,
                order: 999 // Default low priority
            });

            alert("Project created successfully!");
            router.push("/project");
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Failed to create project. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-xl">
                <div className="mx-auto max-w-5xl px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link 
                                href="/project" 
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-brand-green" />
                                    Add New Project
                                </h1>
                                <p className="text-xs text-zinc-500">
                                    Create a new portfolio project entry
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Image Upload Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                            <ImageIcon className="h-5 w-5 text-brand-green" />
                            <h2 className="text-lg font-semibold">Project Image</h2>
                        </div>
                        
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-video w-full rounded-xl border-2 border-dashed border-brand-green/30 bg-brand-green/5 hover:bg-brand-green/10 transition-colors cursor-pointer overflow-hidden group"
                        >
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="text-center">
                                            <Upload className="h-8 w-8 text-brand-green mx-auto mb-2" />
                                            <p className="text-sm font-medium text-white">Click to change image</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                                    <Upload className="h-12 w-12 mb-3 text-brand-green" />
                                    <span className="text-sm font-medium text-white">Click to upload project image</span>
                                    <span className="text-xs text-zinc-600 mt-2">PNG, JPG or WebP (max 5MB)</span>
                                    <span className="text-xs text-zinc-700 mt-1">Recommended: 1920x1080 (16:9)</span>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        {selectedFile && (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-800">
                                        {imagePreview && <img src={imagePreview} alt="Thumb" className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                                        <p className="text-xs text-zinc-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                        setImagePreview(null);
                                    }}
                                    className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Project Details Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-6"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                            <Type className="h-5 w-5 text-brand-green" />
                            <h2 className="text-lg font-semibold">Project Information</h2>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <span className="text-red-400">*</span>
                                Project Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="e.g. E-Commerce Platform Redesign"
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <AlignLeft className="h-4 w-4" />
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Briefly describe the project, its goals, and key features..."
                                rows={5}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm resize-none"
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <span className="text-red-400">*</span>
                                    <Tag className="h-4 w-4" />
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 pr-10 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm cursor-pointer"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Apps">Mobile Apps</option>
                                        <option value="Desktop Apps">Desktop Apps</option>
                                        <option value="Game Development">Game Development</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Machine Learning / AI">Machine Learning / AI</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                                        <option value="Blockchain">Blockchain</option>
                                        <option value="IoT">IoT</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="SaaS">SaaS</option>
                                        <option value="Consulting">Consulting</option>
                                        <option value="Open Source">Open Source</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Project Link */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    Project URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                                    placeholder="https://example.com"
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-4 pt-4"
                    >
                        <Link
                            href="/project"
                            className="flex-1 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-white/5 hover:text-white hover:border-zinc-600 transition-all font-medium text-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="flex-1 px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-green/90 text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Uploading Image...
                                </>
                            ) : isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Creating Project...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Create Project
                                </>
                            )}
                        </button>
                    </motion.div>

                </form>
            </main>
        </div>
    );
}
