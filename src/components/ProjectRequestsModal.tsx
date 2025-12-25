"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/modal";

interface ProjectRequestsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectRequestsModal({
    isOpen,
    onClose,
}: ProjectRequestsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Start a Project</DialogTitle>
                    <DialogDescription>
                        Tell us about your project to get started.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p className="text-sm text-foreground">
                        This feature is coming soon!
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
