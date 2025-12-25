"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    email: string;
    name: string;
    photoURL?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isMounted: boolean;
    signIn: (userData: User) => void;
    signOut: () => void;
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    triggerAuth: (callback?: () => void) => void;
    showAuthToast: boolean;
    dismissAuthToast: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize auth state synchronously to prevent flash
const getInitialAuthState = () => {
    if (typeof window === 'undefined') return { user: null, isAuthenticated: false };

    try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            return { user: userData, isAuthenticated: true };
        }
    } catch (error) {
        console.error('Failed to parse stored user:', error);
    }

    return { user: null, isAuthenticated: false };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initialState = getInitialAuthState();
    const [user, setUser] = useState<User | null>(initialState.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showAuthToast, setShowAuthToast] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted after hydration to prevent SSR mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Show toast repeatedly every 7.5 seconds if not authenticated
    useEffect(() => {
        if (isMounted && !isAuthenticated) {
            // Show first toast after 2 seconds
            const initialTimeout = setTimeout(() => {
                setShowAuthToast(true);
            }, 200000);

            // Then show every 7.5 seconds
            const interval = setInterval(() => {
                setShowAuthToast(true);
            }, 200000);

            return () => {
                clearTimeout(initialTimeout);
                clearInterval(interval);
            };
        } else {
            // Hide toast when authenticated
            setShowAuthToast(false);
        }
    }, [isAuthenticated, isMounted]);

    const signIn = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authUser', JSON.stringify(userData));
        setIsLoginModalOpen(false);
        setShowAuthToast(false); // Dismiss toast on signin
    };

    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authUser');
        sessionStorage.removeItem('hasSeenAuthToast'); // Reset toast flag
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const triggerAuth = (callback?: () => void) => {
        if (isAuthenticated) {
            callback?.();
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const dismissAuthToast = () => setShowAuthToast(false);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: isMounted ? isAuthenticated : false, // Always false on server until mounted
            isLoading,
            isMounted,
            signIn,
            signOut,
            isLoginModalOpen,
            openLoginModal,
            closeLoginModal,
            triggerAuth,
            showAuthToast,
            dismissAuthToast
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
