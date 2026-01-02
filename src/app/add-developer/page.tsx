"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import { developerService } from "@/lib/developerService";

export default function AddDeveloperPage() {
    const { user, role } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        description: "",
        imageUrl: "",
        projectUrl: "",
        rating: 5.0,
        order: 1,
        active: true,
        email: "",
        phone: "",
        techStack: [] as string[],
        socials: {
            github: "",
            linkedin: "",
            instagram: ""
        }
    });

    const [newTech, setNewTech] = useState("");
    const [customRole, setCustomRole] = useState("");

    // Redirect if not admin
    if (role !== 'admin') {
        router.push('/dashboard/projects');
        return null;
    }

    const addTechStack = () => {
        if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
            setFormData({
                ...formData,
                techStack: [...formData.techStack, newTech.trim()]
            });
            setNewTech("");
        }
    };

    const removeTechStack = (tech: string) => {
        setFormData({
            ...formData,
            techStack: formData.techStack.filter(t => t !== tech)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalRole = formData.role === "custom" ? customRole : formData.role;
        if (!formData.name || !finalRole || !formData.description || !formData.email) {
            alert("Please fill in all required fields");
            return;
        }

        setIsLoading(true);
        try {
            await developerService.addDeveloper({
                ...formData,
                role: finalRole
            });
            router.push('/dashboard/projects');
        } catch (error) {
            console.error("Failed to add developer:", error);
            alert("Failed to add developer");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#121212]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/projects" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold text-white">Add Developer</h1>
                            <p className="text-[11px] text-[#71717a]">Add a new team member to the platform</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                        <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role *</label>
                                <select
                                    value={formData.role === "custom" ? "custom" : formData.role}
                                    onChange={(e) => {
                                        if (e.target.value === "custom") {
                                            setFormData({...formData, role: "custom"});
                                        } else {
                                            setFormData({...formData, role: e.target.value});
                                            setCustomRole("");
                                        }
                                    }}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors mb-3"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Mobile Developer">Mobile Developer</option>
                                    <option value="iOS Developer">iOS Developer</option>
                                    <option value="Android Developer">Android Developer</option>
                                    <option value="React Native Developer">React Native Developer</option>
                                    <option value="Flutter Developer">Flutter Developer</option>
                                    <option value="DevOps Engineer">DevOps Engineer</option>
                                    <option value="Cloud Engineer">Cloud Engineer</option>
                                    <option value="Site Reliability Engineer">Site Reliability Engineer</option>
                                    <option value="UI/UX Designer">UI/UX Designer</option>
                                    <option value="UI Designer">UI Designer</option>
                                    <option value="UX Designer">UX Designer</option>
                                    <option value="Product Designer">Product Designer</option>
                                    <option value="Graphic Designer">Graphic Designer</option>
                                    <option value="Data Scientist">Data Scientist</option>
                                    <option value="Data Engineer">Data Engineer</option>
                                    <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                                    <option value="AI Engineer">AI Engineer</option>
                                    <option value="Data Analyst">Data Analyst</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Scrum Master">Scrum Master</option>
                                    <option value="Business Analyst">Business Analyst</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="Test Automation Engineer">Test Automation Engineer</option>
                                    <option value="Security Engineer">Security Engineer</option>
                                    <option value="Blockchain Developer">Blockchain Developer</option>
                                    <option value="Game Developer">Game Developer</option>
                                    <option value="AR/VR Developer">AR/VR Developer</option>
                                    <option value="Software Architect">Software Architect</option>
                                    <option value="Technical Lead">Technical Lead</option>
                                    <option value="Engineering Manager">Engineering Manager</option>
                                    <option value="CTO">CTO</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Freelancer">Freelancer</option>
                                    <option value="custom">Other (Custom Role)</option>
                                </select>
                                {formData.role === "custom" && (
                                    <input
                                        type="text"
                                        value={customRole}
                                        onChange={(e) => setCustomRole(e.target.value)}
                                        className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                        placeholder="Enter custom role"
                                        required
                                    />
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors min-h-[100px]"
                                    placeholder="Passionate about building scalable and beautiful web interfaces."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile & Links */}
                    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                        <h2 className="text-lg font-semibold mb-6">Profile & Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="/team/john.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Project URL</label>
                                <input
                                    type="text"
                                    value={formData.projectUrl}
                                    onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="/projects"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Rating</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Order</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.order}
                                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                        <h2 className="text-lg font-semibold mb-6">Tech Stack</h2>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <select
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    className="flex-1 rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors"
                                >
                                    <option value="">Select Technology</option>
                                    <option value="React">React</option>
                                    <option value="Next.js">Next.js</option>
                                    <option value="Vue.js">Vue.js</option>
                                    <option value="Angular">Angular</option>
                                    <option value="TypeScript">TypeScript</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Node.js">Node.js</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="C#">C#</option>
                                    <option value="PHP">PHP</option>
                                    <option value="Go">Go</option>
                                    <option value="Rust">Rust</option>
                                    <option value="MongoDB">MongoDB</option>
                                    <option value="PostgreSQL">PostgreSQL</option>
                                    <option value="MySQL">MySQL</option>
                                    <option value="Redis">Redis</option>
                                    <option value="Docker">Docker</option>
                                    <option value="Kubernetes">Kubernetes</option>
                                    <option value="AWS">AWS</option>
                                    <option value="Azure">Azure</option>
                                    <option value="GCP">GCP</option>
                                    <option value="Tailwind CSS">Tailwind CSS</option>
                                    <option value="Bootstrap">Bootstrap</option>
                                    <option value="Sass">Sass</option>
                                    <option value="GraphQL">GraphQL</option>
                                    <option value="REST API">REST API</option>
                                    <option value="Firebase">Firebase</option>
                                    <option value="Supabase">Supabase</option>
                                </select>
                                <Button
                                    type="button"
                                    onClick={addTechStack}
                                    className="bg-brand-green hover:bg-brand-green/90 text-black"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm border border-brand-green/20"
                                    >
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => removeTechStack(tech)}
                                            className="hover:text-red-400"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                        <h2 className="text-lg font-semibold mb-6">Social Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={formData.socials.github}
                                    onChange={(e) => setFormData({...formData, socials: {...formData.socials, github: e.target.value}})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.socials.linkedin}
                                    onChange={(e) => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Instagram</label>
                                <input
                                    type="url"
                                    value={formData.socials.instagram}
                                    onChange={(e) => setFormData({...formData, socials: {...formData.socials, instagram: e.target.value}})}
                                    className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] px-4 py-3 text-white placeholder:text-[#71717a] focus:outline-none focus:border-brand-green transition-colors"
                                    placeholder="https://instagram.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-6">
                        <h2 className="text-lg font-semibold mb-6">Status</h2>
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                                className="w-4 h-4 text-brand-green bg-[#27272a] border-[#3f3f46] rounded focus:ring-brand-green focus:ring-2"
                            />
                            <span className="text-sm">Active (visible on website)</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            variant="outline"
                            className="border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-brand-green hover:bg-brand-green/90 text-black font-medium"
                        >
                            {isLoading ? "Adding..." : "Add Developer"}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}