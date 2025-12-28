"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Upload, FileText, X, Rocket, Zap,
    Calendar, CalendarDays, Image as ImageIcon, Check, Trash2, Plus, FileSpreadsheet, File, Loader2, CheckCircle, RotateCcw, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { projectRequestService } from "@/lib/projectService";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";

// Storage key for session storage
const STORAGE_KEY = 'project_request_form_data';

// Constants
const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// Added doc types: PDF, Word, Excel
const ALLOWED_DOC_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/plain',
    'text/csv'
];

// Define params type
type ParamsProps = Promise<{ templateId: string }>;

export default function ProjectRequestPage({ params }: { params: ParamsProps }) {
    const router = useRouter();
    const [templateId, setTemplateId] = useState<string>("");

    // Form State
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        category: "Full Stack Development",
        subCategories: [] as string[],
        deliveryTime: "",
        budget: "",
        currency: "INR",
        additionalNotes: "",
        projectLinks: {
            github: "",
            figma: "",
            website: "",
            documentation: "",
            other: ""
        },
        projectType: "fixed_price",
        communicationPreference: "",
        priority: "medium"
    });

    // Most used currencies in the world
    const CURRENCIES = [
        { code: "USD", symbol: "$", name: "US Dollar" },
        { code: "EUR", symbol: "€", name: "Euro" },
        { code: "GBP", symbol: "£", name: "British Pound" },
        { code: "INR", symbol: "₹", name: "Indian Rupee" },
        { code: "JPY", symbol: "¥", name: "Japanese Yen" },
        { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
        { code: "AUD", symbol: "A$", name: "Australian Dollar" },
        { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
        { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
        { code: "KRW", symbol: "₩", name: "South Korean Won" },
        { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
        { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
        { code: "BRL", symbol: "R$", name: "Brazilian Real" },
        { code: "MXN", symbol: "$", name: "Mexican Peso" },
        { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    ];

    const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency) || CURRENCIES[0];

    // Image State
    const [images, setImages] = useState<{ id: string; url: string; file: File }[]>([]);
    const [isDraggingImages, setIsDraggingImages] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    // Attachment State
    const [attachments, setAttachments] = useState<{ id: string; name: string; size: string; type: string; file: File }[]>([]);
    const [isDraggingDocs, setIsDraggingDocs] = useState(false);
    const docInputRef = useRef<HTMLInputElement>(null);

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { isAuthenticated, openLoginModal } = useAuth();
    const isOnline = isAuthenticated;

    // Undo history state
    const [formHistory, setFormHistory] = useState<typeof formData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [validationError, setValidationError] = useState("");


    // Initial Load
    useEffect(() => {
        params.then((resolvedParams) => {
            setTemplateId(resolvedParams.templateId);
        });
    }, [params]);

    // Load saved form data from sessionStorage
    useEffect(() => {
        const savedData = sessionStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Ensure projectLinks exists
                if (!parsed.projectLinks) {
                    parsed.projectLinks = {
                        github: "",
                        figma: "",
                        website: "",
                        documentation: "",
                        other: ""
                    };
                }
                // Ensure new fields exist
                if (!parsed.projectType) parsed.projectType = "fixed_price";
                if (!parsed.communicationPreference) parsed.communicationPreference = "";
                if (!parsed.priority) parsed.priority = "medium";
                setFormData(parsed);
            } catch (e) {
                console.error('Error loading saved form data:', e);
            }
        }
    }, []);

    // Auto-save to sessionStorage whenever form data changes
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    // Clear sessionStorage on window/tab close
    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.removeItem(STORAGE_KEY);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Ctrl+Z undo functionality
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                handleUndo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [historyIndex, formHistory]);

    // Save to history when form data changes (for undo)
    const saveToHistory = useCallback((newData: typeof formData) => {
        setFormHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(newData);
            // Limit history to 50 items
            if (newHistory.length > 50) newHistory.shift();
            return newHistory;
        });
        setHistoryIndex(prev => Math.min(prev + 1, 49));
    }, [historyIndex]);

    // Undo function
    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            setHistoryIndex(prevIndex);
            setFormData(formHistory[prevIndex]);
        }
    };

    // Clear all form data
    const handleClearAll = () => {
        saveToHistory(formData); // Save current state before clearing
        const clearedData = {
            projectName: "",
            description: "",
            category: "Full Stack Development",
            subCategories: [] as string[],
            deliveryTime: "",
            budget: "",
            currency: "USD",
            additionalNotes: "",
            projectLinks: {
                github: "",
                figma: "",
                website: "",
                documentation: "",
                other: ""
            },
            projectType: "fixed_price",
            communicationPreference: "",
            priority: "medium"
        };
        setFormData(clearedData);
        setImages([]);
        setAttachments([]);
        sessionStorage.removeItem(STORAGE_KEY);
    };

    // Updated form setter that saves to history
    const updateFormData = (updates: Partial<typeof formData>) => {
        saveToHistory(formData);
        setFormData(prev => ({ ...prev, ...updates }));
    };

    // --- Helper: Format Bytes ---
    const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    // --- Image Logic ---
    const processImages = useCallback((files: FileList | File[]) => {
        if (images.length >= MAX_IMAGES) return;
        const newImages: { id: string; url: string; file: File }[] = [];
        const remainingSlots = MAX_IMAGES - images.length;

        Array.from(files).slice(0, remainingSlots).forEach(file => {
            if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
                newImages.push({
                    id: Math.random().toString(36).substr(2, 9),
                    url: URL.createObjectURL(file),
                    file: file
                });
            }
        });
        if (newImages.length > 0) setImages(prev => [...prev, ...newImages]);
    }, [images]);

    const handleImageDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingImages(false);
        processImages(e.dataTransfer.files);
    };

    // --- Attachment Logic ---
    const processDocs = useCallback((files: FileList | File[]) => {
        const newDocs: { id: string; name: string; size: string; type: string; file: File }[] = [];

        Array.from(files).forEach(file => {
            // Basic check or broader acceptance
            if (ALLOWED_DOC_TYPES.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                newDocs.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: formatBytes(file.size),
                    type: file.type,
                    file: file
                });
            }
        });
        if (newDocs.length > 0) setAttachments(prev => [...prev, ...newDocs]);
    }, []);

    const handleDocDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingDocs(false);
        processDocs(e.dataTransfer.files);
    };

    // --- Global Paste (Smartly routes images vs docs) ---
    const handlePaste = (e: React.ClipboardEvent) => {
        if (e.clipboardData.files.length > 0) {
            const files = Array.from(e.clipboardData.files);
            const imageFiles = files.filter(f => ALLOWED_IMAGE_TYPES.includes(f.type));
            const docFiles = files.filter(f => !ALLOWED_IMAGE_TYPES.includes(f.type));

            if (imageFiles.length > 0) processImages(imageFiles);
            if (docFiles.length > 0) processDocs(docFiles);
        }
    };

    // Helper to get icon
    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) return <FileSpreadsheet className="h-5 w-5" />;
        if (fileName.endsWith('.pdf')) return <FileText className="h-5 w-5" />;
        return <File className="h-5 w-5" />;
    };

    // Form Handlers
    const toggleSubCategory = (name: string) => {
        saveToHistory(formData);
        setFormData(prev => {
            const newSubs = prev.subCategories.includes(name)
                ? prev.subCategories.filter(s => s !== name)
                : [...prev.subCategories, name];
            return { ...prev, subCategories: newSubs };
        });
    };



    const handleSubmit = async () => {
        setValidationError("");

        // Validation
        if (!formData.projectName.trim()) {
            setValidationError("Project name is required.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.description.trim()) {
            setValidationError("Description is required.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare project data
            const projectData = {
                ...formData,
                templateId,
                clientId: "user_temp", 
                isDraft: false,
                imageUrls: [], // Will be populated by service with hardcoded values
                attachmentUrls: [] // Will be populated by service with hardcoded values
            };

            // Publish project to Firebase Realtime Database
            const projectId = await projectRequestService.publishProject(projectData);
            
            console.log('Project published with ID:', projectId);
            
            setIsSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);

        } catch (error) {
            console.error("Error submitting project:", error);
            setValidationError("Failed to submit project. Please try again.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Dynamic Sub-Categories Logic ---
    // --- Dynamic Sub-Categories Logic ---
    const SUB_CATEGORIES_MAP: Record<string, string[]> = {
        "Full Stack Development": ["React", "Next.js", "Node.js", "Vue.js", "Angular", "Python", "Django", "Flask", "Java", "Spring Boot", ".NET", "PHP", "Laravel", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Ruby on Rails", "Go"],
        "Mobile App Development": ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter", "Ionic", "Xamarin", "Java", "Objective-C", "Maui"],
        "Cloud Computing": ["AWS", "Google Cloud (GCP)", "Azure", "Docker", "Kubernetes", "Terraform", "Serverless", "Lambda", "Microservices", "CI/CD", "OpenStack"],
        "Cyber Security": ["Penetration Testing", "Network Security", "Application Security", "Ethical Hacking", "Cryptography", "Security Auditing", "Incident Response", "Firewall Configuration", "SIEM", "SOC Analyst"],
        "AI & Machine Learning": ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision", "Data Science", "Scikit-Learn", "Deep Learning", "Chatbots (LLMs)", "Generative AI", "RAG"],
        "Data & Analytics": ["Data Engineering", "Big Data (Hadoop/Spark)", "Power BI", "Tableau", "SQL", "ETL Pipelines", "Snowflake", "Data Warehousing", "Apache Kafka", "Databricks"],
        "Game Development": ["Unity 3D", "Unreal Engine", "Godot", "C#", "C++", "2D Game Design", "3D Modeling", "AR/VR Development", "Blender"],
        "DevOps & QA": ["Jenkins", "GitLab CI", "Ansible", "Chef", "Puppet", "Prometheus", "Grafana", "Linux Admin", "Selenium", "Cypress", "Appium", "Performance Testing", "Manual Testing"],
        "Blockchain": ["Smart Contracts", "Solidity", "Ethereum", "Web3.js", "DeFi", "NFTs", "Hyperledger", "Crypto Wallet Dev", "Rust (Solana)"],
        "E-commerce & CMS": ["Shopify", "WooCommerce", "Magento", "WordPress", "Webflow", "Wix", "PrestaShop", "BigCommerce", "Squarespace"],
        "ERP & CRM": ["Salesforce", "SAP", "Oracle ERP", "Zoho CRM", "HubSpot", "Odoo", "Microsoft Dynamics 365", "NetSuite"],
        "Embedded & IoT": ["Arduino", "Raspberry Pi", "Firmware Development", "IoT Sensors", "C/C++ Embedded", "RTOS", "PCB Design"],
        "Design": ["UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Brand Identity", "Prototyping", "Wireframing", "Motion Graphics"],
        "Digital Marketing": ["SEO", "Content Marketing", "Social Media Marketing", "PPC", "Email Marketing", "Google Analytics", "Growth Hacking", "ASO"]
    };

    const categories = Object.keys(SUB_CATEGORIES_MAP);
    const subCategories = SUB_CATEGORIES_MAP[formData.category] || [];

    // Reset sub-categories when main category changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, subCategories: [] }));
    }, [formData.category]);

    return (
        <div className={`min-h-screen font-sans transition-all duration-500 ${isOnline ? 'bg-black text-white' : 'bg-zinc-950 text-white'}`} onPaste={handlePaste}>
            {/* Header */}
            <div className={`sticky top-0 z-50 flex h-16 items-center border-b px-4 md:px-8 backdrop-blur-md transition-all duration-500 ${isOnline ? 'border-zinc-800 bg-black/90' : 'border-red-900/50 bg-red-950/20'}`}>
                <Link href="/" className="mr-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="h-5 w-5 text-zinc-400 hover:text-white" />
                </Link>
                <div className="flex flex-1 items-center justify-between">
                    <span className="font-semibold text-white">Project creation</span>
                    {isOnline ? (
                        <div className="flex items-center gap-2">
                            <UserMenu />
                        </div>
                    ) : (
                        <button
                            onClick={openLoginModal}
                            className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all text-zinc-400 hover:text-white"
                        >
                            <User className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Validation Error Banner */}
                        <AnimatePresence>
                            {validationError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-500 font-medium flex items-center gap-2"
                                >
                                    <X className="h-5 w-5" />
                                    {validationError}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {/* Project Name */}
                        <div className="space-y-2">
                            <label className="text-base font-semibold text-zinc-300">Project name<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                    placeholder="Enter project name"
                                    maxLength={100}
                                    value={formData.projectName}
                                    onChange={e => updateFormData({ projectName: e.target.value })}
                                />
                                <span className="absolute right-3 top-3 text-xs text-zinc-600">{formData.projectName.length} / 100</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-base font-semibold text-zinc-300">Description<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></label>
                            <div className="relative">
                                <textarea
                                    className={`h-48 w-full resize-none rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium leading-relaxed custom-scrollbar ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                    placeholder="Describe your project..."
                                    maxLength={800}
                                    value={formData.description}
                                    onChange={e => updateFormData({ description: e.target.value })}
                                />
                                <span className="absolute right-3 bottom-3 text-xs text-zinc-600">{formData.description.length} / 800</span>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="space-y-3">
                            <label className="text-base font-semibold text-zinc-300">Categories<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></label>
                            <div className="flex flex-wrap gap-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => updateFormData({ category: cat })}
                                        className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-200 border ${formData.category === cat
                                            ? isOnline
                                                ? "bg-brand-green text-black border-brand-green shadow-lg shadow-brand-green/20"
                                                : "bg-red-500/20 text-red-200 border-red-500/50 shadow-lg shadow-red-500/20"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sub-Categories */}
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-zinc-300">Sub-Categories</label>
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-6 sm:grid-cols-3 md:grid-cols-4">
                                    {subCategories.map((sub) => (
                                        <label key={sub} className="flex cursor-pointer items-center gap-3 group">
                                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200 ${formData.subCategories.includes(sub)
                                                ? isOnline
                                                    ? 'border-brand-green bg-brand-green shadow-md shadow-brand-green/20'
                                                    : 'border-red-500 bg-red-500/20 shadow-md shadow-red-500/20'
                                                : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                                                }`}>
                                                {formData.subCategories.includes(sub) && <Check className={`h-3.5 w-3.5 ${isOnline ? 'text-black' : 'text-red-200'}`} strokeWidth={3} />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.subCategories.includes(sub)}
                                                onChange={() => toggleSubCategory(sub)}
                                            />
                                            <span className={`truncate text-sm select-none transition-colors ${formData.subCategories.includes(sub) ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'
                                                }`}>{sub}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Project Type */}
                        <div className="space-y-3">
                            <label className="text-base font-semibold text-zinc-300">Project Type</label>
                            <p className="text-xs text-zinc-500 -mt-2">Select how you&lsquo;d like to work with us and get billed</p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <button
                                    onClick={() => updateFormData({ projectType: "fixed_price" })}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                                        formData.projectType === "fixed_price"
                                            ? isOnline
                                                ? "bg-brand-green/10 border-brand-green text-white"
                                                : "bg-red-500/10 border-red-500/50 text-red-200"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                                    }`}
                                >
                                    <div className="font-bold text-sm mb-1">Fixed Price</div>
                                    <div className="text-xs opacity-80">One agreed price for the entire project scope</div>
                                </button>
                                <button
                                    onClick={() => updateFormData({ projectType: "hourly" })}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                                        formData.projectType === "hourly"
                                            ? isOnline
                                                ? "bg-brand-green/10 border-brand-green text-white"
                                                : "bg-red-500/10 border-red-500/50 text-red-200"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                                    }`}
                                >
                                    <div className="font-bold text-sm mb-1">Hourly Rate</div>
                                    <div className="text-xs opacity-80">Pay per hour worked (minimum 5-6 hours)</div>
                                </button>
                            </div>
                        </div>



                       

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="text-base font-semibold text-zinc-300">Delivery<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></label>
                                <div className="relative group">
                                    <input
                                        type="date"
                                        className={`w-full rounded-xl border px-4 py-3.5 focus:outline-none focus:ring-4 transition-all group-hover:border-zinc-700 [color-scheme:dark] ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/10' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/10'}`}
                                        value={formData.deliveryTime}
                                        onChange={e => updateFormData({ deliveryTime: e.target.value })}
                                    />
                                    
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-base font-semibold text-zinc-300">Budget<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></label>
                                <div className="flex gap-2">
                                    {/* Currency Selector */}
                                    <div className="relative">
                                        <select
                                            value={formData.currency}
                                            onChange={e => updateFormData({ currency: e.target.value })}
                                            className={`h-full appearance-none rounded-xl border pl-3 pr-8 py-3.5 font-semibold focus:outline-none focus:ring-4 transition-all hover:border-zinc-700 cursor-pointer ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/10' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/10'}`}
                                        >
                                            {CURRENCIES.map(currency => (
                                                <option key={currency.code} value={currency.code} className="bg-zinc-900 text-white">
                                                    {currency.code} ({currency.symbol})
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Amount Input */}
                                    <div className="relative group flex-1">
                                        <span className={`absolute left-4 top-3.5 font-semibold transition-colors ${isOnline ? 'text-zinc-500 group-focus-within:text-brand-green' : 'text-red-400/60 group-focus-within:text-red-500'}`}>
                                            {selectedCurrency.symbol}
                                        </span>
                                        <input
                                            type="number"
                                            className={`w-full rounded-xl border pl-10 pr-4 py-3.5 font-semibold focus:outline-none focus:ring-4 transition-all group-hover:border-zinc-700 ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/10' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/10'}`}
                                            placeholder="2,000.00"
                                            value={formData.budget}
                                            onChange={e => updateFormData({ budget: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Drag & Drop Image Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-zinc-300">Images</h3>
                                    <p className="text-xs text-zinc-500">Drag & drop or paste images (Optional - Max 10)</p>
                                </div>
                                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md">
                                    {images.length} / {MAX_IMAGES}
                                </span>
                            </div>

                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDraggingImages(true); }}
                                onDragLeave={(e) => { e.preventDefault(); setIsDraggingImages(false); }}
                                onDrop={handleImageDrop}
                                onClick={() => imageInputRef.current?.click()}
                                className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 ${isDraggingImages
                                    ? isOnline
                                        ? "border-brand-green bg-brand-green/10 scale-[1.02]"
                                        : "border-red-500 bg-red-500/10 scale-[1.02]"
                                    : isOnline
                                        ? "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900"
                                        : "border-red-900/30 bg-red-950/20 hover:border-red-500/30 hover:bg-red-900/10"
                                    }`}
                            >
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => processImages(e.target.files!)}
                                />
                                <div className="rounded-full bg-zinc-800 p-3 shadow-sm mb-2">
                                    <Upload className={`h-6 w-6 ${isDraggingImages ? (isOnline ? 'text-brand-green' : 'text-red-500') : 'text-zinc-400'}`} />
                                </div>
                                <p className="text-sm font-medium text-zinc-300">Click or drag images here</p>
                                <p className="text-xs text-zinc-500 mt-1">supports .png, .jpg, .webp</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <AnimatePresence>
                                    {images.map((img) => (
                                        <motion.div
                                            key={img.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm"
                                        >
                                            <img src={img.url} alt="preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setImages(prev => prev.filter(i => i.id !== img.id)); }}
                                                    className="rounded-full bg-white/20 p-2 text-white hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Drag & Drop Attachments Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-zinc-300">Attachments<span className={`ml-0.5 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>*</span></h3>
                                    <p className="text-xs text-zinc-500">PDF, Word, Excel, etc (Required - Max 10MB)</p>
                                </div>
                            </div>

                            {/* Attachment List */}
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {attachments.map((file) => (
                                        <motion.div
                                            key={file.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="flex items-center justify-between rounded-lg bg-zinc-900 p-3 hover:bg-zinc-800 transition-colors group border border-zinc-800 hover:border-zinc-700"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                                                    {getFileIcon(file.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-zinc-300 truncate">{file.name}</p>
                                                    <p className="text-[10px] text-zinc-500">{file.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setAttachments(prev => prev.filter(a => a.id !== file.id))}
                                                className="ml-2 rounded-full p-1 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Attachment Drop Zone */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDraggingDocs(true); }}
                                onDragLeave={(e) => { e.preventDefault(); setIsDraggingDocs(false); }}
                                onDrop={handleDocDrop}
                                onClick={() => docInputRef.current?.click()}
                                className={`relative flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 ${isDraggingDocs
                                    ? isOnline
                                        ? "border-brand-green bg-brand-green/10 scale-[1.01]"
                                        : "border-red-500 bg-red-500/10 scale-[1.01]"
                                    : isOnline
                                        ? "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900"
                                        : "border-red-900/30 bg-red-950/20 hover:border-red-500/30 hover:bg-red-900/10"
                                    }`}
                            >
                                <input
                                    ref={docInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
                                    className="hidden"
                                    onChange={(e) => processDocs(e.target.files!)}
                                />
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm font-medium">Add or drop files</span>
                                </div>
                            </div>
                        </div>

                      

                         {/* Project Links Section */}
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-zinc-300">Project Links</label>
                            <p className="text-xs text-zinc-500 -mt-2">Share relevant project resources and references</p>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">GitHub Repository</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                        placeholder="https://github.com/username/repository"
                                        value={formData.projectLinks.github}
                                        onChange={e => updateFormData({ projectLinks: { ...formData.projectLinks, github: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Figma Design</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                        placeholder="https://figma.com/file/..."
                                        value={formData.projectLinks.figma}
                                        onChange={e => updateFormData({ projectLinks: { ...formData.projectLinks, figma: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Live Website/Demo</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                        placeholder="https://yourproject.com"
                                        value={formData.projectLinks.website}
                                        onChange={e => updateFormData({ projectLinks: { ...formData.projectLinks, website: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Documentation/Requirements</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                        placeholder="https://docs.google.com/... or Notion link"
                                        value={formData.projectLinks.documentation}
                                        onChange={e => updateFormData({ projectLinks: { ...formData.projectLinks, documentation: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Other Resources</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all font-medium ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                        placeholder="Any other relevant links"
                                        value={formData.projectLinks.other}
                                        onChange={e => updateFormData({ projectLinks: { ...formData.projectLinks, other: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </div>
                          {/* Additional Notes Section */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                            <div>
                                <h3 className="text-base font-semibold text-zinc-300">Additional Notes</h3>
                                <p className="text-xs text-zinc-500">Any specific details or requirements?</p>
                            </div>

                            <div className="relative group">
                                <textarea
                                    className={`h-32 w-full resize-none rounded-xl border px-4 py-3 placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all group-hover:border-zinc-700 ${isOnline ? 'border-zinc-800 bg-zinc-900/50 text-white focus:border-brand-green focus:ring-brand-green/20' : 'border-red-900/30 bg-red-950/20 text-red-200 focus:border-red-500/50 focus:ring-red-500/20'}`}
                                    placeholder="e.g. I need a responsive design, SEO optimization, and dark mode support."
                                    maxLength={500}
                                    value={formData.additionalNotes}
                                    onChange={e => updateFormData({ additionalNotes: e.target.value })}
                                />
                                <span className="absolute right-3 bottom-3 text-xs text-zinc-600">{formData.additionalNotes?.length || 0} / 500</span>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-4 pb-12">
                    <Button
                        size="lg"
                        disabled={isSubmitting}
                        className={`w-full max-w-md rounded-xl py-7 text-lg font-bold shadow-lg transform transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${isOnline ? 'bg-brand-green text-black shadow-brand-green/20 hover:shadow-brand-green/40 hover:bg-green-400' : 'bg-red-500/20 text-red-200 border border-red-500/50 shadow-red-500/20 hover:shadow-red-500/40 hover:bg-red-500/30'}`}
                        onClick={() => {
                            if (!isOnline) {
                                openLoginModal();
                            } else {
                                handleSubmit();
                            }
                        }}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Publishing...
                            </div>
                        ) : isOnline ? "Publish Project" : "Sign In Required"}
                    </Button>

                    {/* Action Bar - Sleek modern design */}
                    <div className="w-full max-w-md rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            {/* Left: Quick Actions */}
                            <div className="flex items-center gap-2">
                                {/* Undo Button */}
                                <button
                                    type="button"
                                    onClick={handleUndo}
                                    disabled={historyIndex <= 0}
                                    className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/50 border border-zinc-800 text-zinc-400 transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed ${isOnline ? 'hover:text-brand-green hover:border-brand-green/50' : 'hover:text-red-500 hover:border-red-500/50'}`}
                                    title="Undo (Ctrl+Z)"
                                >
                                    <RotateCcw className="h-3.5 w-3.5 group-hover:rotate-[-20deg] transition-transform duration-200" />
                                    <span className="text-xs font-medium">Undo</span>
                                </button>

                                {/* Clear Button */}
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/50 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500/50 transition-all duration-200 shadow-sm"
                                >
                                    <Trash2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-xs font-medium">Clear</span>
                                </button>
                            </div>

                            {/* Right: Keyboard shortcut */}
                            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-600">
                                <span>or</span>
                                <div className="flex items-center gap-0.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-500 shadow-sm">⌘</kbd>
                                    <span className="text-zinc-600">+</span>
                                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-500 shadow-sm">Z</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Overlay */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="flex flex-col items-center text-center p-8 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
                            >
                                <div className="h-24 w-24 rounded-full bg-brand-green/20 flex items-center justify-center mb-6">
                                    <CheckCircle className="h-12 w-12 text-brand-green" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Project Published!</h2>
                                <p className="text-zinc-400 max-w-xs">Your project request has been successfully submitted. Redirecting you home...</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
