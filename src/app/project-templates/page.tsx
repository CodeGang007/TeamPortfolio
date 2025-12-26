"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectTemplatesPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/project-request/custom-vision-card");
    }, [router]);

    return null;
}
