"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";

import {
    User, Mail, Phone, Building2, Save,
    Briefcase, MapPin, Loader2, ArrowLeft, Camera, X, Upload,
    Code, Github, Linkedin, Instagram, Crown, ShieldCheck, Lock, Search, Users
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/PhoneInput";
import { developerService, Developer } from "@/lib/developerService";
import { userService, User as AppUser } from "@/lib/userService";

// Types
type BusinessModel = "individual" | "enterprise";
type EnterpriseSize = "1-10" | "11-50" | "51-200" | "201+";

interface UserProfileData {
    phoneNumber: string;
    businessModel: BusinessModel;
    enterpriseDetails?: {
        size: EnterpriseSize;
        email?: string;
        phone?: string;
        address?: string;
    };
}

const ROLES = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Data Scientist",
    "Product Manager",
    "QA Engineer",
    "Solutions Architect"
];

const TECH_STACK_OPTIONS = [
    "React", "Next.js", "Vue", "Angular", "Svelte",
    "Node.js", "Python", "Django", "Flask", "Java", "Spring Boot",
    "Go", "Rust", "C++", "C#", ".NET",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase",
    "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes",
    "TypeScript", "JavaScript", "TailwindCSS", "GraphQL"
].sort();

function ProfileContent() {
    const { user, isAuthenticated, loading, displayPhotoURL, role: currentUserRole } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get('uid') || user?.uid;
    const isOwnProfile = targetUserId === user?.uid;
    const isAdmin = currentUserRole === 'admin';

    // State
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Admin User Search State
    const [allUsers, setAllUsers] = useState<AppUser[]>([]);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const userSearchRef = useRef<HTMLDivElement>(null);

    // Profile Data State
    const [profileUser, setProfileUser] = useState<any>(null); // To store target user basic info (name, email)
    const [targetRole, setTargetRole] = useState<'client' | 'developer' | 'admin'>('client');
    const [displayPhoto, setDisplayPhoto] = useState<string | null>(null);

    // Avatar editing state
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    // Forms
    const [formData, setFormData] = useState<UserProfileData>({
        phoneNumber: "",
        businessModel: "individual",
        enterpriseDetails: {
            size: "1-10",
            email: "",
            phone: "",
            address: ""
        }
    });

    const [developerForm, setDeveloperForm] = useState<Partial<Developer>>({
        role: "",
        description: "",
        techStack: [],
        socials: { github: "", linkedin: "", instagram: "" },
        projectUrl: "" // Portfolio URL
    });

    // Check if we should open avatar modal from URL
    useEffect(() => {
        if (searchParams.get('tab') === 'avatar') {
            setShowAvatarModal(true);
        }
    }, [searchParams]);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, loading, router]);

    // Fetch All Users for Admin
    useEffect(() => {
        if (isAdmin) {
            userService.getAllUsers().then(users => {
                setAllUsers(users);
            });
        }
    }, [isAdmin]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userSearchRef.current && !userSearchRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch Target User Data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!targetUserId) return;
            // ... (rest of the logic)

            try {
                // 1. Fetch User Profile
                const docRef = doc(db, "users", targetUserId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data(); // Allow loose typing for now to get role/customPhoto
                    const profileData = data as UserProfileData;

                    setProfileUser({
                        displayName: data.displayName,
                        email: data.email,
                        uid: targetUserId
                    });

                    // Determine Role
                    const r = data.role || data.profile?.role || 'client';
                    setTargetRole(r);

                    // Determine Photo
                    setDisplayPhoto(data.customPhotoURL || data.photoURL || null);

                    // Set Client Form Data
                    setFormData(prev => ({
                        ...prev,
                        ...profileData,
                        enterpriseDetails: {
                            size: "1-10",
                            ...(prev.enterpriseDetails || {}),
                            ...(profileData.enterpriseDetails || {})
                        }
                    }));

                    // 2. If Developer, Fetch Developer Details from 'team' collection OR 'users' fallback
                    // Start by checking if there is a 'team' entry
                    if (r === 'developer') {
                        const devProfile = await developerService.getDeveloperById(targetUserId);
                        if (devProfile) {
                            setDeveloperForm({
                                role: devProfile.role,
                                description: devProfile.description,
                                techStack: devProfile.techStack,
                                socials: devProfile.socials,
                                projectUrl: devProfile.projectUrl,
                                // New Fields
                                experienceLevel: devProfile.experienceLevel,
                                hourlyRate: devProfile.hourlyRate,
                                languages: devProfile.languages,
                                availability: devProfile.availability,
                            });
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [targetUserId, isAuthenticated]);

    const approveAsDeveloper = async () => {
        if (!targetUserId) return;

        try {
            // Step 1: Update User Role to 'developer' -> This "Unlocks" the section
            await setDoc(doc(db, "users", targetUserId), { role: 'developer' }, { merge: true });

            setTargetRole('developer');
            setSuccessMessage("Access Unlocked! User can now edit their profile.");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            console.error("Approval Error:", error);
            // Check if it's a permission error
            if (error.code === 'permission-denied') {
                alert(`Permission Error: Firebase Rules blocked the unlock action.\n\nEven though you are just unlocking, this requires saving "Role: Developer" to their database account.\n\nPlease update your Firestore Rules to allow Admins to write to 'users' collection.`);
            } else {
                alert(`Failed to approve: ${error.message || "Unknown error"}`);
            }
        }
    };

    const handleSave = async () => {
        if (!targetUserId) return;

        setIsSaving(true);
        setSuccessMessage("");

        try {
            const userRef = doc(db, "users", targetUserId);

            // 1. Save Client Data
            const dataToSave = {
                ...formData,
                updatedAt: serverTimestamp()
            };
            await setDoc(userRef, dataToSave, { merge: true });

            // 2. If Developer, Save/Sync Developer Data
            if (targetRole === 'developer') {
                await developerService.createOrUpdateDeveloper(targetUserId, {
                    name: profileUser?.displayName, // Ensure name stays synced
                    role: developerForm.role,
                    description: developerForm.description,
                    techStack: developerForm.techStack,
                    socials: developerForm.socials,
                    projectUrl: developerForm.projectUrl,
                    imageUrl: displayPhoto || "", // Ensure photo synced
                    // New Fields
                    experienceLevel: developerForm.experienceLevel,
                    hourlyRate: developerForm.hourlyRate,
                    languages: developerForm.languages,
                    availability: developerForm.availability,
                });
            }

            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            console.error("Error saving profile:", error);
            if (error.code === 'permission-denied') {
                alert("Permission Error: Failed to save to 'team' collection. You need to update Firestore Rules to allow Developers to edit their own team card.");
            } else {
                alert(`Failed to save changes: ${error.message || "Unknown error"}`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const updateEnterpriseDetail = (field: keyof NonNullable<UserProfileData['enterpriseDetails']>, value: string) => {
        setFormData(prev => ({
            ...prev,
            enterpriseDetails: {
                ...prev.enterpriseDetails!,
                [field]: value
            }
        }));
    };

    if (loading || isLoadingData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
        );
    }

    if (!profileUser) return null;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-brand-green/30">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 px-4 py-4 backdrop-blur-md md:px-8">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-xl font-bold">My Profile</h1>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </header>

            {/* ... Existing Profile Content ... */}

            <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
                <div className="grid gap-8 md:grid-cols-12">

                    {/* Left Column: Read-only Identity */}
                    <div className="md:col-span-4 space-y-6">

                        {/* ADMIN ONLY: User Selector */}
                        {isAdmin && (
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-4 relative z-50">
                                <div className="flex items-center gap-2 text-brand-green">
                                    <ShieldCheck className="h-5 w-5" />
                                    <h3 className="font-semibold">Admin Tools</h3>
                                </div>

                                <div className="relative" ref={userSearchRef}>
                                    <div
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors"
                                    >
                                        <Search className="h-4 w-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            value={userSearchQuery}
                                            onChange={(e) => {
                                                setUserSearchQuery(e.target.value);
                                                setIsUserDropdownOpen(true);
                                            }}
                                            placeholder="Find user..."
                                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 w-full"
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl max-h-60 overflow-y-auto"
                                            >
                                                {allUsers
                                                    .filter(u =>
                                                        u.displayName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                                                        u.email?.toLowerCase().includes(userSearchQuery.toLowerCase())
                                                    )
                                                    .map(u => (
                                                        <button
                                                            key={u.uid}
                                                            onClick={() => {
                                                                router.push(`/profile?uid=${u.uid}`);
                                                                setUserSearchQuery("");
                                                                setIsUserDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors flex items-center gap-3 ${targetUserId === u.uid ? 'bg-zinc-800/50' : ''}`}
                                                        >
                                                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                                                                {u.displayName?.[0] || "U"}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-white truncate">{u.displayName || "Unknown User"}</p>
                                                                <p className="text-xs text-zinc-500 truncate">{u.email}</p>
                                                            </div>
                                                            {u.role === 'developer' && <Crown className="h-3 w-3 text-brand-green" />}
                                                        </button>
                                                    ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {isOwnProfile ? (
                                    <p className="text-xs text-zinc-500">Viewing your own profile.</p>
                                ) : (
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-zinc-400">Viewing: <span className="text-white font-medium">{profileUser?.displayName}</span></span>
                                        <Link href="/profile" className="text-brand-green hover:underline">Back to me</Link>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col items-center text-center">
                            {/* ... Avatar Logic (keep as is, maybe disable upload if viewing another user) ... */}
                            {/* Simplified for brevity in this replace block, ideally would keep existing and just patch around it, but easier to replace the structure if needed. 
                                Actually, I will just INSERT the Admin Logic below the Avatar/Name section in the Left Column.
                            */}

                            <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-zinc-700 shadow-xl group">
                                {displayPhoto ? (
                                    <img
                                        src={displayPhoto}
                                        alt={profileUser.displayName || "User"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-4xl font-bold text-zinc-500">
                                        {(profileUser.displayName?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                                {/* Edit Avatar Overlay - Only if own profile */}
                                {isOwnProfile && (
                                    <button
                                        onClick={() => setShowAvatarModal(true)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <div className="flex flex-col items-center gap-1 text-white">
                                            <Camera className="h-6 w-6" />
                                            <span className="text-xs font-medium">Edit</span>
                                        </div>
                                    </button>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 justify-center">
                                {profileUser.displayName || "User Name"}
                                {targetRole === 'developer' && <Crown className="h-4 w-4 text-brand-green fill-brand-green/20" />}
                                {targetRole === 'admin' && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                            </h2>
                            <p className="text-sm text-zinc-400 mt-1">{profileUser.email}</p>

                            {/* Admin Actions */}
                            {isAdmin && !isOwnProfile && targetRole === 'client' && (
                                <Button
                                    onClick={approveAsDeveloper}
                                    className="mt-4 w-full bg-brand-green/10 text-brand-green hover:bg-brand-green/20 border border-brand-green/20"
                                >
                                    <Crown className="mr-2 h-4 w-4" /> Approve as Developer
                                </Button>
                            )}

                            {/* Read-only Fields */}
                            <div className="mt-6 w-full space-y-4">
                                {/* ... Name/Email Inputs ... */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            disabled
                                            value={profileUser.displayName || ""}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-zinc-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            disabled
                                            value={profileUser.email || ""}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-zinc-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Editable Details */}
                    <div className="md:col-span-8 space-y-6">

                        {/* Success Message */}
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400 font-medium text-center"
                            >
                                {successMessage}
                            </motion.div>
                        )}

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 space-y-8">

                            {/* Personal Details */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-2 border-b border-zinc-800">
                                    <Briefcase className="h-5 w-5 text-brand-green" />
                                    <h3 className="text-lg font-semibold text-white">Professional Details</h3>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Phone Number</label>
                                        <PhoneInput
                                            value={formData.phoneNumber}
                                            onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
                                            placeholder="Enter phone number"
                                            disabled={!isOwnProfile && !isAdmin}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Business Model</label>
                                        <div className="relative">
                                            <select
                                                value={formData.businessModel}
                                                onChange={(e) => setFormData({ ...formData, businessModel: e.target.value as BusinessModel })}
                                                disabled={!isOwnProfile && !isAdmin}
                                                className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 pl-4 pr-10 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all cursor-pointer disabled:opacity-50"
                                            >
                                                <option value="individual">Individual / Freelancer</option>
                                                <option value="enterprise">Enterprise / Company</option>
                                            </select>
                                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enterprise Details - Conditional */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: formData.businessModel === "enterprise" ? "auto" : 0,
                                    opacity: formData.businessModel === "enterprise" ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-6 pt-6 border-t border-zinc-800/50">
                                    <div className="flex items-center gap-3 pb-2 border-b border-zinc-800">
                                        <Building2 className="h-5 w-5 text-brand-green" />
                                        <h3 className="text-lg font-semibold text-white">Enterprise Information</h3>
                                    </div>
                                    {/* ... Keep existing enterprise fields (wrapped in fragment or just inline if replacing block) ... */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Copied from original for fidelity */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Company Size</label>
                                            <select
                                                value={formData.enterpriseDetails?.size || "1-10"}
                                                onChange={(e) => updateEnterpriseDetail("size", e.target.value)}
                                                disabled={!isOwnProfile && !isAdmin}
                                                className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 pl-4 pr-10 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all cursor-pointer disabled:opacity-50"
                                            >
                                                <option value="1-10">1-10 Employees</option>
                                                <option value="11-50">11-50 Employees</option>
                                                <option value="51-200">51-200 Employees</option>
                                                <option value="201+">201+ Employees</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Enterprise Phone</label>
                                            <input
                                                type="text"
                                                value={formData.enterpriseDetails?.phone || ""}
                                                onChange={(e) => updateEnterpriseDetail("phone", e.target.value)}
                                                disabled={!isOwnProfile && !isAdmin}
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-zinc-300">Enterprise Email</label>
                                            <input
                                                type="email"
                                                value={formData.enterpriseDetails?.email || ""}
                                                onChange={(e) => updateEnterpriseDetail("email", e.target.value)}
                                                disabled={!isOwnProfile && !isAdmin}
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-zinc-300">Headquarters Address</label>
                                            <textarea
                                                value={formData.enterpriseDetails?.address || ""}
                                                onChange={(e) => updateEnterpriseDetail("address", e.target.value)}
                                                disabled={!isOwnProfile && !isAdmin}
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 min-h-[100px] text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* DEVELOPER SECTION */}
                        {(targetRole === 'developer' || isAdmin) && (
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 space-y-8 relative overflow-hidden">

                                {/* LOCKED OVERLAY */}
                                {targetRole !== 'developer' && (
                                    <div className="absolute inset-0 z-20 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 border border-zinc-800/50">
                                        <div className="h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-lg">
                                            <Lock className="h-8 w-8 text-zinc-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Developer Profile Locked</h3>
                                        <p className="text-zinc-400 max-w-sm mb-6 text-sm">
                                            This section contains specialized developer information. Access is restricted to approved technical team members.
                                        </p>

                                        {isAdmin && !isOwnProfile ? (
                                            <Button
                                                onClick={approveAsDeveloper}
                                                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold shadow-brand-glow"
                                            >
                                                <Crown className="mr-2 h-4 w-4" /> Approve Access
                                            </Button>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-mono uppercase tracking-wider">
                                                    Admin Approval Required
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Background Decoration */}
                                {targetRole === 'developer' && <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Crown className="h-32 w-32" /></div>}

                                <div className={`space-y-6 relative z-10 transition-all duration-300 ${targetRole !== 'developer' ? 'opacity-20 blur-sm pointer-events-none grayscale' : ''}`}>
                                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800 py-2">
                                        <div className="flex items-center gap-3">
                                            <Code className="h-5 w-5 text-brand-green" />
                                            <h3 className="text-lg font-semibold text-white">Developer Profile</h3>
                                        </div>
                                        {targetRole === 'developer' && (
                                            <span className="text-[10px] uppercase font-bold text-brand-green border border-brand-green/20 bg-brand-green/5 px-2 py-1 rounded">
                                                Verified Developer
                                            </span>
                                        )}
                                    </div>

                                    {/* Role & Experience */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Designation / Role</label>
                                            <div className="relative">
                                                <select
                                                    value={developerForm.role || ""}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, role: e.target.value })}
                                                    className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                                >
                                                    <option value="" disabled>Select Role</option>
                                                    {ROLES.map(role => (
                                                        <option key={role} value={role}>{role}</option>
                                                    ))}
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Experience Level</label>
                                            <div className="relative">
                                                <select
                                                    value={developerForm.experienceLevel || "Junior"}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, experienceLevel: e.target.value as any })}
                                                    className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                                >
                                                    <option value="Junior">Junior (0-2 years)</option>
                                                    <option value="Mid">Mid-Level (2-5 years)</option>
                                                    <option value="Senior">Senior (5+ years)</option>
                                                    <option value="Lead">Lead / Principal</option>
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability & Rate */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Availability Status</label>
                                            <div className="relative">
                                                <select
                                                    value={developerForm.availability || "Freelance"}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, availability: e.target.value as any })}
                                                    className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                                >
                                                    <option value="Freelance">Open to Freelance</option>
                                                    <option value="Full-time">Full-time (Employed)</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Unavailable">Currently Unavailable</option>
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Hourly Rate (USD) <span className="text-zinc-500 text-xs">(Optional)</span></label>
                                            <input
                                                type="text"
                                                value={developerForm.hourlyRate || ""}
                                                onChange={(e) => setDeveloperForm({ ...developerForm, hourlyRate: e.target.value })}
                                                placeholder="e.g. 50"
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Skills & Bio */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Tech Stack</label>
                                        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-3 ring-offset-2 focus-within:ring-1 focus-within:ring-brand-green/20 focus-within:border-brand-green">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {developerForm.techStack?.map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-white text-xs border border-zinc-700">
                                                        {skill}
                                                        <button
                                                            onClick={() => setDeveloperForm({
                                                                ...developerForm,
                                                                techStack: developerForm.techStack?.filter((_, i) => i !== index)
                                                            })}
                                                            className="hover:text-red-400"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="relative group/tech">
                                                <select
                                                    className="w-full bg-transparent text-sm text-zinc-400 focus:outline-none cursor-pointer py-1"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val && !developerForm.techStack?.includes(val)) {
                                                            setDeveloperForm({
                                                                ...developerForm,
                                                                techStack: [...(developerForm.techStack || []), val]
                                                            });
                                                        }
                                                        e.target.value = ""; // Reset
                                                    }}
                                                >
                                                    <option value="" className="bg-zinc-900">Add technology...</option>
                                                    {TECH_STACK_OPTIONS.map(opt => (
                                                        <option key={opt} value={opt} className="bg-zinc-900 text-white">{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-500">Select technologies from the list to add them.</p>
                                    </div>

                                    {/* Photo Upload Shortcut */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Profile Photo</label>
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/50">
                                            <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                                                {displayPhoto ? (
                                                    <img src={displayPhoto} alt="Profile" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex bg-zinc-800 h-full w-full items-center justify-center font-bold text-zinc-600">
                                                        {profileUser?.displayName?.[0] || "?"}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-white font-medium">Developer Profile Photo</p>
                                                <p className="text-xs text-zinc-500">This photo will be displayed on your team card.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowAvatarModal(true)}
                                                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
                                            >
                                                <Camera className="mr-2 h-4 w-4" /> Change Photo
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Spoken Languages <span className="text-zinc-500 text-xs">(Comma separated)</span></label>
                                        <input
                                            value={developerForm.languages ? developerForm.languages.join(', ') : ""}
                                            onChange={(e) => setDeveloperForm({ ...developerForm, languages: e.target.value.split(',').map(s => s.trim()) })}
                                            placeholder="English, Spanish, Hindi..."
                                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Professional Bio</label>
                                        <textarea
                                            value={developerForm.description || ""}
                                            onChange={(e) => setDeveloperForm({ ...developerForm, description: e.target.value })}
                                            placeholder="Brief description of your expertise and what you build..."
                                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 min-h-[120px] text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                        />
                                    </div>

                                    {/* Portfolio URL */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Portfolio / Website</label>
                                        <input
                                            value={developerForm.projectUrl || ""}
                                            onChange={(e) => setDeveloperForm({ ...developerForm, projectUrl: e.target.value })}
                                            placeholder="https://your-portfolio.com"
                                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                                        />
                                    </div>

                                    {/* Socials */}
                                    <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                                        <h4 className="text-sm font-medium text-zinc-400">Social Connections</h4>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                                    <Github className="h-4 w-4 text-white" />
                                                </div>
                                                <input
                                                    value={developerForm.socials?.github || ""}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, socials: { ...developerForm.socials!, github: e.target.value } })}
                                                    placeholder="GitHub URL"
                                                    className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                                    <Linkedin className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <input
                                                    value={developerForm.socials?.linkedin || ""}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, socials: { ...developerForm.socials!, linkedin: e.target.value } })}
                                                    placeholder="LinkedIn URL"
                                                    className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                                    <Instagram className="h-4 w-4 text-pink-500" />
                                                </div>
                                                <input
                                                    value={developerForm.socials?.instagram || ""}
                                                    onChange={(e) => setDeveloperForm({ ...developerForm, socials: { ...developerForm.socials!, instagram: e.target.value } })}
                                                    placeholder="Instagram URL"
                                                    className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Avatar Edit Modal */}
            <AnimatePresence>
                {
                    showAvatarModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                            onClick={() => {
                                setShowAvatarModal(false);
                                setAvatarPreview(null);
                                setSelectedFile(null);
                                // Remove the tab query param
                                router.replace('/profile');
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Edit Avatar</h3>
                                    <button
                                        onClick={() => {
                                            setShowAvatarModal(false);
                                            setAvatarPreview(null);
                                            setSelectedFile(null);
                                            router.replace('/profile');
                                        }}
                                        className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Preview Area */}
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-zinc-700 shadow-xl bg-zinc-800">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : displayPhotoURL ? (
                                            <img
                                                src={displayPhotoURL}
                                                alt="Current Avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-zinc-500">
                                                {(user?.displayName?.[0] || "U").toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Custom Predefined Avatars */}
                                    <div className="w-full">
                                        <p className="text-sm font-medium text-zinc-400 mb-3">Choose a preset</p>
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {[
                                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
                                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
                                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
                                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Trouble",
                                                "https://api.dicebear.com/7.x/bottts/svg?seed=Gizmo",
                                                "https://api.dicebear.com/7.x/bottts/svg?seed=Max"
                                            ].map((avatarUrl, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setAvatarPreview(avatarUrl);
                                                        // Convert URL to file-like object if needed, or just handle URL update
                                                        // For now, we'll just set the preview. We might need logic to handle 'saving' a URL vs a File.
                                                        // Actually, we can just save the URL directly if no file is selected.
                                                        setSelectedFile(null); // Clear manual file selection
                                                    }}
                                                    className={`flex-shrink-0 h-12 w-12 rounded-full border-2 overflow-hidden transition-all ${avatarPreview === avatarUrl
                                                        ? "border-brand-green scale-110"
                                                        : "border-zinc-700 hover:border-zinc-500"
                                                        }`}
                                                >
                                                    <img src={avatarUrl} alt={`Avatar ${index + 1}`} className="h-full w-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center w-full gap-4">
                                        <div className="h-px bg-zinc-800 flex-1" />
                                        <span className="text-xs text-zinc-500 font-medium">OR UPLOAD</span>
                                        <div className="h-px bg-zinc-800 flex-1" />
                                    </div>

                                    {/* File Input */}
                                    <label className="w-full">
                                        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-700 rounded-xl p-6 hover:border-brand-green/50 hover:bg-zinc-800/50 transition-all cursor-pointer">
                                            <Upload className="h-8 w-8 text-zinc-500" />
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-zinc-300">
                                                    {selectedFile ? selectedFile.name : "Click to upload"}
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-1">
                                                    PNG, JPG or WebP (max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp,image/gif"
                                            className="hidden"
                                            onClick={(e) => { (e.target as HTMLInputElement).value = ''; }} // Reset to allow re-selecting same file
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    console.log("File selected:", file.name, file.size);
                                                    // Limit: 5MB
                                                    if (file.size > 5 * 1024 * 1024) {
                                                        alert(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB).\nPlease choose an image under 5MB.`);
                                                        return;
                                                    }
                                                    setSelectedFile(file);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setAvatarPreview(reader.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 w-full">
                                        <Button
                                            onClick={() => {
                                                setShowAvatarModal(false);
                                                setAvatarPreview(null);
                                                setSelectedFile(null);
                                                router.replace('/profile');
                                            }}
                                            variant="outline"
                                            className="flex-1 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={async () => {
                                                if (!user) return;
                                                if (!selectedFile && !avatarPreview) return;

                                                setIsUploadingAvatar(true);
                                                try {
                                                    let downloadURL = avatarPreview;

                                                    // If a file is selected, upload it
                                                    if (selectedFile) {
                                                        const storageRef = ref(storage, `avatars/${user.uid}`);
                                                        await uploadBytes(storageRef, selectedFile);
                                                        downloadURL = await getDownloadURL(storageRef);
                                                    }

                                                    if (downloadURL) {
                                                        // Save as customPhotoURL in Firestore only
                                                        // This preserves the original email provider photo in user.photoURL
                                                        const userRef = doc(db, "users", user.uid);
                                                        await setDoc(userRef, { customPhotoURL: downloadURL, updatedAt: serverTimestamp() }, { merge: true });
                                                    }

                                                    // Close modal and refresh
                                                    setShowAvatarModal(false);
                                                    setAvatarPreview(null);
                                                    setSelectedFile(null);
                                                    router.replace('/profile');
                                                    setSuccessMessage("Avatar updated successfully!");
                                                    setTimeout(() => setSuccessMessage(""), 3000);
                                                } catch (error: any) {
                                                    console.error("Error uploading avatar:", error);
                                                    alert(`Failed to upload avatar: ${error.message || "Unknown error"}. Check console for details.`);
                                                } finally {
                                                    setIsUploadingAvatar(false);
                                                }
                                            }}
                                            disabled={(!selectedFile && !avatarPreview) || isUploadingAvatar}
                                            className="flex-1 bg-brand-green text-black hover:bg-brand-green/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isUploadingAvatar ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save Avatar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </div >
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
        }>
            <ProfileContent />
        </Suspense>
    );
}
