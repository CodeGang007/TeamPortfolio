"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    User
} from "firebase/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    customPhotoURL: string | null; // User-uploaded custom avatar
    displayPhotoURL: string | null; // Resolved: custom → email fallback
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

    // Subscribe to Firestore for customPhotoURL changes
    useEffect(() => {
        if (!user) {
            setCustomPhotoURL(null);
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCustomPhotoURL(data.customPhotoURL || null);
            } else {
                setCustomPhotoURL(null);
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
            // Show first toast after 2 seconds
            const initialTimeout = setTimeout(() => {
                setShowAuthToast(true);
            }, 1000);

            // Then show every 7.5 seconds
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
            // State updates handled by onAuthStateChanged
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
