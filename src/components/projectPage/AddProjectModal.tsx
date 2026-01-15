"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, Link as LinkIcon } from "lucide-react";
import { ProjectService } from "@/services/projects";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isOnline: boolean;
}

export function AddProjectModal({ isOpen, onClose, onSuccess, isOnline }: AddProjectModalProps) {
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
      alert("Please fill in all required fields");
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

      // Reset form
      setFormData({ title: "", description: "", category: "", link: "" });
      setSelectedFile(null);
      setImagePreview(null);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const themeColor = isOnline ? "#00ff64" : "#ef4444";
  const themeBorder = isOnline ? "border-brand-green" : "border-red-500";
  const themeBg = isOnline ? "bg-brand-green" : "bg-red-500";
  const themeHover = isOnline ? "hover:bg-brand-green/90" : "hover:bg-red-500/90";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-zinc-950 to-black border-2 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative overflow-hidden"
            style={{ borderColor: themeColor }}
          >
            {/* Glow Effect */}
            <div 
              className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor}, transparent 70%)` }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${themeBg} animate-pulse`} />
                Add New Project
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Project Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative aspect-video w-full rounded-xl border-2 border-dashed ${themeBorder} ${isOnline ? 'bg-brand-green/5 hover:bg-brand-green/10' : 'bg-red-500/5 hover:bg-red-500/10'} transition-colors cursor-pointer overflow-hidden`}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                      <Upload className="h-10 w-10 mb-2" style={{ color: themeColor }} />
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-zinc-600 mt-1">PNG, JPG or WebP (max 5MB)</span>
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
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full rounded-lg border ${themeBorder} bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all`}
                  style={{ focusRingColor: themeColor }}
                  placeholder="Enter project name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={`w-full rounded-lg border ${themeBorder} bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all resize-none`}
                  placeholder="Brief description of the project"
                />
              </div>

              {/* Category & Link */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full rounded-lg border ${themeBorder} bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="e.g. Web Design"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <LinkIcon className="h-3 w-3" />
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className={`w-full rounded-lg border ${themeBorder} bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className={`flex-1 px-4 py-3 rounded-lg ${themeBg} ${themeHover} text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading Image...
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
