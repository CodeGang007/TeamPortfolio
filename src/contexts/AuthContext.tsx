"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    User
} from "firebase/auth";

    export type UserRole = 'admin' | 'developer' | 'client';

    interface AuthContextType {
        isAuthenticated: boolean;
        user: User | null;
        loading: boolean;
        role: UserRole; // Added role
        customPhotoURL: string | null;
        displayPhotoURL: string | null;
        login: () => Promise<void>;
        logout: () => Promise<void>;
        refreshUser: () => Promise<void>;
        triggerAuth: () => void;
        showAuthToast: boolean;
        setShowAuthToast: (show: boolean) => void;
        dismissAuthToast: () => void;
        authToastDismissed: boolean;
        setAuthToastDismissed: (dismissed: boolean) => void;
        openLoginModal: () => void;
        closeLoginModal: () => void;
        isLoginModalOpen: boolean;
    }

    const AuthContext = createContext<AuthContextType>({
        isAuthenticated: false,
        user: null,
        loading: true,
        role: 'client', // Default
        customPhotoURL: null,
        displayPhotoURL: null,
        login: async () => { },
        logout: async () => { },
        refreshUser: async () => { },
        triggerAuth: () => { },
        showAuthToast: false,
        setShowAuthToast: () => { },
        dismissAuthToast: () => { },
        authToastDismissed: false,
        setAuthToastDismissed: () => { },
        openLoginModal: () => { },
        closeLoginModal: () => { },
        isLoginModalOpen: false,
    });

    export const useAuth = () => useContext(AuthContext);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const [user, setUser] = useState<User | null>(null);
        const [loading, setLoading] = useState(true);
        const [isMounted, setIsMounted] = useState(false);
        const [customPhotoURL, setCustomPhotoURL] = useState<string | null>(null);
        const [role, setRole] = useState<UserRole>('client'); // Role state

    // UI State
    const [showAuthToast, setShowAuthToast] = useState(false);
    const [authToastDismissed, setAuthToastDismissed] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        // Subscribe to Firebase Auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            // If user logs in, dismiss toast and close modal
            if (currentUser) {
                setShowAuthToast(false);
                setAuthToastDismissed(true);
                setIsLoginModalOpen(false);
            } else {
                // Clear custom photo when logged out
                setCustomPhotoURL(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Sync Auth Data to Firestore (displayName & email) to ensure Admin Dashboard has data
    useEffect(() => {
        const syncUserToFirestore = async () => {
            if (!user) return;
            try {
                const userDocRef = doc(db, "users", user.uid);
                // We use setDoc with merge: true to avoid overwriting existing profile data
                // Only update if we have a name/email to give
                if (user.displayName || user.email) {
                    await setDoc(userDocRef, {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL, // Also helpful to sync
                        updatedAt: serverTimestamp()
                    }, { merge: true });
                }
            } catch (err) {
                console.error("Failed to sync user data to Firestore:", err);
            }
        };

        if (user) {
            syncUserToFirestore();
        }
    }, [user]);

    // Subscribe to Firestore for user data (customPhotoURL + role)
    useEffect(() => {
        if (!user) {
            setCustomPhotoURL(null);
            setRole('client'); // Default to client on logout
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCustomPhotoURL(data.customPhotoURL || null);
                // Check both root-level role and nested profile.role
                const fetchedRole = data.role || data.profile?.role;
                setRole((fetchedRole?.toLowerCase() as UserRole) || 'client');
            } else {
                setCustomPhotoURL(null);
                setRole('client');
            }
        }, (error) => {
            console.error("Error listening to user document:", error);
        });

        return () => unsubscribe();
    }, [user]);

    // Compute display photo: custom → email provider fallback
    const displayPhotoURL = customPhotoURL || user?.photoURL || null;

    // Recurring Toast Logic (Only when not authenticated)
    useEffect(() => {
        if (!loading && !user && !authToastDismissed) {
             // ... existing toast logic ...
            const initialTimeout = setTimeout(() => {
                setShowAuthToast(true);
            }, 1000);

            const interval = setInterval(() => {
                if (!user) {
                    setShowAuthToast(true);
                }
            }, 330000);

            return () => {
                clearTimeout(initialTimeout);
                clearInterval(interval);
            };
        }
    }, [loading, user, authToastDismissed]);


    const login = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const refreshUser = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            setUser({ ...auth.currentUser });
        }
    };

    const triggerAuth = () => {
        setIsLoginModalOpen(true);
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const dismissAuthToast = () => {
        setShowAuthToast(false);
    };

    // Hydration safety: ensure server and client match initially
    const isAuthenticated = isMounted ? !!user : false;

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                role,
                customPhotoURL,
                displayPhotoURL,
                login,
                logout,
                refreshUser,
                triggerAuth,
                showAuthToast,
                setShowAuthToast,
                dismissAuthToast,
                authToastDismissed,
                setAuthToastDismissed,
                openLoginModal,
                closeLoginModal,
                isLoginModalOpen,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
