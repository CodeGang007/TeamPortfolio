"use client";

import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "@/components/auth/SignInModal";

export default function ModalWrapper() {
    const { isLoginModalOpen, closeLoginModal } = useAuth();

    return (
        <SignInModal
            isOpen={isLoginModalOpen}
            onClose={closeLoginModal}
        />
    );
}
