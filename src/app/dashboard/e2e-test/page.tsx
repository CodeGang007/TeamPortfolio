"use client";

// One-click end-to-end test of the project pipeline, run with YOUR admin
// session (the database correctly refuses anonymous access, so this must
// execute in a signed-in browser). It exercises the exact same service
// calls the real UI uses:
//   1. delete every existing project request        (destructive — opt-in)
//   2. publishProject  → RTDB write + real Telegram notification
//   3. getDevelopers   → assign the first developer (progress + assignments)
//   4. walk workflowStatus: collected → inProgress → inTransaction → completed
//   5. read everything back and verify
// Delete this page whenever you're done with it.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { projectRequestService } from "@/lib/projectService";
import { CheckCircle2, XCircle, Loader2, PlayCircle } from "lucide-react";

type LogLine = { ok: boolean | null; text: string };

export default function E2ETestPage() {
    const { user, role, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [confirmWipe, setConfirmWipe] = useState(false);
    const [running, setRunning] = useState(false);
    const [log, setLog] = useState<LogLine[]>([]);

    if (!loading && (!isAuthenticated || role !== "admin")) {
        router.push("/");
        return null;
    }

    const add = (ok: boolean | null, text: string) =>
        setLog((l) => [...l, { ok, text }]);

    const run = async () => {
        if (!user) return;
        setRunning(true);
        setLog([]);
        try {
            // 1 — wipe
            add(null, "Fetching existing project requests…");
            const existing = await projectRequestService.getAllProjects();
            add(true, `Found ${existing.length} existing project(s).`);
            if (confirmWipe) {
                for (const p of existing) {
                    if (p.id) await projectRequestService.deleteProject(p.id);
                }
                const after = await projectRequestService.getAllProjects();
                add(after.length === 0, `Deleted all — remaining: ${after.length}`);
            } else {
                add(null, "Wipe skipped (checkbox not ticked).");
            }

            // 2 — publish (fires the real Telegram notification internally)
            add(null, "Publishing test project…");
            const projectId = await projectRequestService.publishProject({
                projectName: "E2E Test — CodeGang Pipeline",
                description:
                    "<p>End-to-end pipeline verification project. Safe to delete.</p>",
                category: "Full Stack Development",
                subCategories: ["Next.js"],
                deliveryTime: new Date(Date.now() + 30 * 86400000)
                    .toISOString()
                    .slice(0, 10),
                budget: "5000",
                currency: "USD",
                projectType: "custom",
                templateId: "custom",
                userId: user.uid,
                userName: user.displayName || "E2E Admin",
                userEmail: user.email || "",
                isDraft: false,
                attachmentUrls: [],
                imageUrls: [],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
            add(!!projectId, `Published → id ${projectId} (Telegram notification fired — check the chat).`);

            // 3 — assign the first developer
            add(null, "Fetching developers (users with role=developer)…");
            const devs = await projectRequestService.getDevelopers();
            add(devs.length > 0, `Found ${devs.length} developer(s).`);
            if (devs.length > 0) {
                const dev = devs[0];
                await projectRequestService.initializeProjectProgress(projectId);
                await projectRequestService.updateProjectProgress(projectId, {
                    status: "active",
                    assignedDevelopers: [
                        {
                            uid: dev.uid,
                            name: dev.name,
                            email: dev.email || "unknown@example.com",
                            role: dev.role || "developer",
                        },
                    ],
                    teamSize: 1,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any);
                await projectRequestService.assignProject(projectId, dev.uid);
                add(true, `Assigned ${dev.name} (${dev.uid}) — progress + assignments written.`);
            } else {
                add(false, "No developers found — add a user with role=developer to test assignment.");
            }

            // 4 — walk the workflow
            for (const step of ["collectedAt", "inProgressAt", "inTransactionAt", "completedAt"]) {
                await projectRequestService.updateProjectStatus(
                    projectId,
                    `workflowStatus/${step}`,
                    new Date().toISOString()
                );
                add(true, `Workflow → ${step.replace("At", "")} ✓`);
            }

            // 5 — read back
            const readback = await projectRequestService.getProjectById(projectId);
            const wf = readback?.workflowStatus;
            add(
                !!(wf?.initiatedAt && wf?.collectedAt && wf?.inProgressAt && wf?.inTransactionAt && wf?.completedAt),
                `Readback: all five workflow timestamps present — ${readback?.projectName}`
            );
            add(true, "E2E COMPLETE. Open Manage Publications to see the project, and check Telegram.");
        } catch (e) {
            const err = e as Error;
            add(false, `FAILED: ${err.message}`);
        } finally {
            setRunning(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-24">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-2xl font-bold text-slate-900">
                    Pipeline E2E test
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Runs the full project lifecycle with your admin session:
                    wipe → publish (real Telegram) → assign developer → workflow
                    walk → verify. Delete this page when done (
                    <code className="rounded bg-slate-200 px-1">src/app/dashboard/e2e-test</code>).
                </p>

                <label className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <input
                        type="checkbox"
                        checked={confirmWipe}
                        onChange={(e) => setConfirmWipe(e.target.checked)}
                        className="mt-0.5 h-4 w-4"
                    />
                    <span className="text-sm text-red-800">
                        <strong>Delete ALL existing project requests first.</strong>{" "}
                        This is permanent. Leave unticked to keep current data and
                        only run publish → assign → workflow.
                    </span>
                </label>

                <button
                    onClick={run}
                    disabled={running}
                    className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 disabled:opacity-60"
                >
                    {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
                    {running ? "Running…" : "Run end-to-end test"}
                </button>

                <div className="mt-8 space-y-2">
                    {log.map((l, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
                        >
                            {l.ok === true && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />}
                            {l.ok === false && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />}
                            {l.ok === null && <Loader2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />}
                            <span className={l.ok === false ? "text-red-700" : "text-slate-700"}>{l.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
