import type { SystemStatus } from "@/content/projects";

// Green means actually live; amber means actually in build.
// Never use these decoratively.
export default function StatusDot({
  status,
  pulse = true,
  className = "",
}: {
  status: SystemStatus;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block h-2 w-2 rounded-full ${
        status === "live" ? "bg-emerald-500" : "bg-amber-500"
      } ${pulse ? "pulse-dot" : ""} ${className}`}
    />
  );
}
