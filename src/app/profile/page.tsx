"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import {
    User, Mail, Phone, Building2, Save,
    Briefcase, MapPin, Loader2, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function ProfilePage() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    // Form State
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, loading, router]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as UserProfileData;
                    // Merge with default state to ensure structure
                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        enterpriseDetails: {
                            ...prev.enterpriseDetails,
                            ...(data.enterpriseDetails || {})
                        }
                    }));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        setIsSaving(true);
        setSuccessMessage("");

        try {
            const userRef = doc(db, "users", user.uid);

            // Clean up data based on business model
            const dataToSave = {
                ...formData,
                updatedAt: serverTimestamp()
            };

            // If individual, we might want to clear enterprise details or just ignore them.
            // Keeping them in state is fine, but maybe redundant in DB. 
            // For now, we save everything to preserve draft-like state if they switch back.

            await setDoc(userRef, dataToSave, { merge: true });

            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Error saving profile:", error);
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

    if (!user) return null;

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

            <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
                <div className="grid gap-8 md:grid-cols-12">

                    {/* Left Column: Read-only Identity */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col items-center text-center">
                            <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-zinc-700 shadow-xl">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "User"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-4xl font-bold text-zinc-500">
                                        {(user.displayName?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-white">{user.displayName || "User Name"}</h2>
                            <p className="text-sm text-zinc-400 mt-1">{user.email}</p>

                            <div className="mt-6 w-full space-y-4">
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            disabled
                                            value={user.displayName || ""}
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
                                            value={user.email || ""}
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
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                            <input
                                                type="text"
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                placeholder="+91 ...."
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Business Model</label>
                                        <div className="relative">
                                            <select
                                                value={formData.businessModel}
                                                onChange={(e) => setFormData({ ...formData, businessModel: e.target.value as BusinessModel })}
                                                className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 pl-4 pr-10 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all cursor-pointer"
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

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Company Size</label>
                                            <select
                                                value={formData.enterpriseDetails?.size || "1-10"}
                                                onChange={(e) => updateEnterpriseDetail("size", e.target.value)}
                                                className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 pl-4 pr-10 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all cursor-pointer"
                                            >
                                                <option value="1-10">1-10 Employees</option>
                                                <option value="11-50">11-50 Employees</option>
                                                <option value="51-200">51-200 Employees</option>
                                                <option value="201+">201+ Employees</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Enterprise Phone <span className="text-zinc-500 text-xs ml-1">(Optional)</span></label>
                                            <input
                                                type="text"
                                                value={formData.enterpriseDetails?.phone || ""}
                                                onChange={(e) => updateEnterpriseDetail("phone", e.target.value)}
                                                placeholder="Company contact"
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-zinc-300">Enterprise Email <span className="text-zinc-500 text-xs ml-1">(Optional)</span></label>
                                            <input
                                                type="email"
                                                value={formData.enterpriseDetails?.email || ""}
                                                onChange={(e) => updateEnterpriseDetail("email", e.target.value)}
                                                placeholder="contact@company.com"
                                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-zinc-300">Headquarters Address <span className="text-zinc-500 text-xs ml-1">(Optional)</span></label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                                <textarea
                                                    value={formData.enterpriseDetails?.address || ""}
                                                    onChange={(e) => updateEnterpriseDetail("address", e.target.value)}
                                                    placeholder="Full office address..."
                                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-3 min-h-[100px] text-white placeholder:text-zinc-600 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
