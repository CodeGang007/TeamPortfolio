import { redirect } from "next/navigation";

// Server-side redirect. The previous version was a client `useEffect` that
// rendered `null`, so a crawler (and anyone with JS disabled) got a blank
// page instead of being forwarded.
export default function ProjectTemplatesPage() {
  redirect("/project-request/custom-vision-card");
}
