"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Loader2, Link2, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { founderService, CreateFounderData } from "@/services/founderService";

declare global {
    interface Window {
        cloudinary: any;
    }
}

export default function FounderForm() {
    const { user, isAuthenticated, loading, role } = useAuth();
    const router = useRouter();
    const params = useParams();
    const founderId =  params?.id as string | undefined;
    const isEditMode = !!founderId;

    const [formData, setFormData] = useState<CreateFounderData>({
        name: "",
        role: "Founder",
        imageUrl: "",
        description: "",
        techStack: [],
        projectUrl: "",
        socials: {
            linkedin: "",
            github: "",
            instagram: "",
        },
        active: true,
    });

    const [techStackInput, setTechStackInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(isEditMode);
    const [imageUploading, setImageUploading] = useState(false);

    // Redirect if not admin
    useEffect(() => {
        if (!loading && (!isAuthenticated || role !== 'admin')) {
            router.push("/");
        }
    }, [loading, isAuthenticated, role, router]);

    // Load founder data in edit mode
    useEffect(() => {
        if (isEditMode && founderId) {
            const loadFounder = async () => {
                try {
                    const founder = await founderService.getFounderById(founderId);
                    if (founder) {
                        setFormData({
                            name: founder.name,
                            role: founder.role,
                            imageUrl: founder.imageUrl,
                            description: founder.description,
                            techStack: founder.techStack || [],
                            projectUrl: founder.projectUrl || "",
                            socials: founder.socials || {},
                            active: founder.active,
                        });
                        setTechStackInput(founder.techStack?.join(", ") || "");
                    }
                } catch (error) {
                    console.error("Failed to load founder", error);
                    alert("Failed to load founder data");
                } finally {
                    setIsLoadingData(false);
                }
            };
            loadFounder();
        }
    }, [isEditMode, founderId]);

    // Load Cloudinary widget script
    useEffect(() => {
        if (!document.getElementById('cloudinary-upload-widget')) {
            const script = document.createElement('script');
            script.id = 'cloudinary-upload-widget';
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handleImageUpload = () => {
        if (!window.cloudinary) {
            alert("Cloudinary widget is not loaded yet. Please try again.");
            return;
        }

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            alert("Cloudinary configuration is missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in environment variables.");
            return;
        }

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName,
                uploadPreset,
                sources: ['local', 'url', 'camera'],
                multiple: false,
                cropping: true,
                croppingAspectRatio: 1,
                croppingShowDimensions: true,
                folder: 'founders',
                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                maxFileSize: 5000000, // 5MB
            },
            (error: any, result: any) => {
                if (error) {
                    console.error("Upload error:", error);
                    alert("Failed to upload image");
                    setImageUploading(false);
                    return;
                }

                if (result.event === 'success') {
                    setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
                    setImageUploading(false);
                }

                if (result.event === 'close') {
                    setImageUploading(false);
                }
            }
        );

        setImageUploading(true);
        widget.open();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.imageUrl || !formData.description.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        try {
            // Parse tech stack from comma-separated input
            const techStack = techStackInput
                .split(",")
                .map(s => s.trim())
                .filter(s => s.length > 0);

            const dataToSubmit = {
                ...formData,
                techStack,
            };

            if (isEditMode && founderId) {
                await founderService.updateFounder(founderId, dataToSubmit);
            } else {
                await founderService.createFounder(dataToSubmit);
            }

            router.push("/dashboard/founders");
        } catch (error) {
            console.error("Failed to save founder", error);
            alert("Failed to save founder. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || isLoadingData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#121212]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
                    <p className="text-zinc-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#121212]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-5xl px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/founders" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold text-white">
                                {isEditMode ? "Edit Founder" : "Add New Founder"}
                            </h1>
                            <p className="text-[11px] text-[#71717a]">
                                {isEditMode ? "Update founder information" : "Create a new founder profile"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="mx-auto max-w-3xl px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Profile Image <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-6">
                            {formData.imageUrl && (
                                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <Button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={imageUploading}
                                    className="bg-[#27272a] text-white hover:bg-[#3f3f46] border border-[#3f3f46]"
                                >
                                    {imageUploading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4 mr-2" />
                                            {formData.imageUrl ? "Change Image" : "Upload Image"}
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-[#71717a] mt-2">
                                    Recommended: Square image, JPG or PNG, max 5MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                            Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors resize-none"
                            placeholder="Brief description about the founder..."
                            required
                        />
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label htmlFor="techStack" className="block text-sm font-medium text-white mb-2">
                            Tech Stack / Expertise
                        </label>
                        <input
                            id="techStack"
                            type="text"
                            value={techStackInput}
                            onChange={(e) => setTechStackInput(e.target.value)}
                            className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                            placeholder="React, TypeScript, Node.js (comma separated)"
                        />
                        <p className="text-xs text-[#71717a] mt-1">
                            Enter skills or technologies separated by commas
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white">Social Links</h3>
                        
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Linkedin className="h-4 w-4 text-[#71717a]" />
                                <label htmlFor="linkedin" className="text-sm text-[#a1a1aa]">LinkedIn</label>
                            </div>
                            <input
                                id="linkedin"
                                type="url"
                                value={formData.socials?.linkedin || ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socials: { ...prev.socials, linkedin: e.target.value }
                                }))}
                                className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Github className="h-4 w-4 text-[#71717a]" />
                                <label htmlFor="github" className="text-sm text-[#a1a1aa]">GitHub</label>
                            </div>
                            <input
                                id="github"
                                type="url"
                                value={formData.socials?.github || ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socials: { ...prev.socials, github: e.target.value }
                                }))}
                                className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Instagram className="h-4 w-4 text-[#71717a]" />
                                <label htmlFor="instagram" className="text-sm text-[#a1a1aa]">Instagram</label>
                            </div>
                            <input
                                id="instagram"
                                type="url"
                                value={formData.socials?.instagram || ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socials: { ...prev.socials, instagram: e.target.value }
                                }))}
                                className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                                placeholder="https://instagram.com/username"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link2 className="h-4 w-4 text-[#71717a]" />
                                <label htmlFor="projectUrl" className="text-sm text-[#a1a1aa]">Portfolio/Website</label>
                            </div>
                            <input
                                id="projectUrl"
                                type="url"
                                value={formData.projectUrl || ""}
                                onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                                className="w-full rounded-lg bg-[#18181b] border border-[#27272a] px-4 py-2.5 text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-[#18181b] border border-[#27272a]">
                        <input
                            id="active"
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                            className="w-4 h-4 rounded border-[#3f3f46] text-brand-green focus:ring-brand-green focus:ring-offset-0 bg-[#27272a]"
                        />
                        <label htmlFor="active" className="text-sm text-white">
                            Display on public About page
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-3 pt-6">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !formData.name || !formData.imageUrl || !formData.description}
                            className="bg-brand-green hover:bg-brand-green/90 text-black font-bold flex-1"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                isEditMode ? "Update Founder" : "Create Founder"
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/dashboard/founders")}
                            className="bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46]"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
