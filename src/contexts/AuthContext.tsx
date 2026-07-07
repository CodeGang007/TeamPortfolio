"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { formalAvatar, type Gender } from "@/lib/avatars";

// Firebase is loaded lazily (dynamic import) so the SDK stays out of the
// first-load JS of every public page; auth state resolves just after hydration.
const loadAuth = async () => {
    const [{ auth }, authMod] = await Promise.all([
        import("@/lib/firebaseAuth"),
        import("firebase/auth"),
    ]);
    return { auth, ...authMod };
};
const loadDb = async () => {
    const [{ db }, dbMod] = await Promise.all([
        import("@/lib/firebaseDb"),
        import("firebase/firestore"),
    ]);
    return { db, ...dbMod };
};

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
        const [gender, setGender] = useState<Gender | null>(null); // For gender-based default avatar

    // UI State
    const [showAuthToast, setShowAuthToast] = useState(false);
    const [authToastDismissed, setAuthToastDismissed] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        let unsubscribe: (() => void) | undefined;
        let cancelled = false;

        loadAuth().then(({ auth, onAuthStateChanged }) => {
            if (cancelled) return;
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
        });

        return () => {
            cancelled = true;
            unsubscribe?.();
        };
    }, []);

    // Sync Auth Data to Firestore (displayName & email) to ensure Admin Dashboard has data
    useEffect(() => {
        const syncUserToFirestore = async () => {
            if (!user) return;
            try {
                const { db, doc, setDoc, serverTimestamp } = await loadDb();
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
            setGender(null);
            return;
        }

        let unsubscribe: (() => void) | undefined;
        let cancelled = false;

        loadDb().then(({ db, doc, onSnapshot }) => {
            if (cancelled) return;
            const userDocRef = doc(db, "users", user.uid);
            unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCustomPhotoURL(data.customPhotoURL || null);
                    // Check both root-level role and nested profile.role
                    const fetchedRole = data.role || data.profile?.role;
                    setRole((fetchedRole?.toLowerCase() as UserRole) || 'client');
                    const fetchedGender = (data.gender || data.profile?.gender) as Gender | undefined;
                    setGender(fetchedGender === 'male' || fetchedGender === 'female' ? fetchedGender : null);
                } else {
                    setCustomPhotoURL(null);
                    setRole('client');
                    setGender(null);
                }
            }, (error) => {
                console.error("Error listening to user document:", error);
            });
        });

        return () => {
            cancelled = true;
            unsubscribe?.();
        };
    }, [user]);

    // Compute display photo. Legacy casual/emoji avatars (old DiceBear presets)
    // are ignored so they no longer override the professional defaults.
    const seed = user?.uid || user?.email || "user";
    const isLegacyAvatar = (u: string | null | undefined) => !!u && u.includes("dicebear");
    const realCustomPhoto = customPhotoURL && !isLegacyAvatar(customPhotoURL) ? customPhotoURL : null;
    const displayPhotoURL =
        realCustomPhoto ||                                 // a real upload or a chosen business icon
        (gender ? formalAvatar(gender, seed) : null) ||    // explicit gender → matching icon
        user?.photoURL ||                                  // auth-provider photo
        formalAvatar("male", seed);                        // default professional icon

    // Recurring Toast Logic (Only when not authenticated)
    useEffect(() => {
        if (!loading && !user && !authToastDismissed) {
             // ... existing toast logic ...
            const initialTimeout = setTimeout(() => {
                setShowAuthToast(true);
            }, 8000);

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
            const { auth, GoogleAuthProvider, signInWithPopup } = await loadAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const { auth, signOut } = await loadAuth();
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const refreshUser = async () => {
        const { auth } = await loadAuth();
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
