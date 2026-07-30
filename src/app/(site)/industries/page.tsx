import type { Metadata } from "next";
import { industries } from "@/content/pages";
import { stats } from "@/content/site";
import IndexTemplate from "@/components/site/IndexTemplate";

export const metadata: Metadata = {
  title: "Industries",
  description: `Healthcare, ecommerce, logistics, fintech, manufacturing and SaaS — the sectors our ${stats.live} live systems run in.`,
  openGraph: {
    title: "Industries — CodeGang",
    description: "The sectors our production systems already run in.",
    url: "/industries",
  },
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <IndexTemplate
      eyebrow="Industries"
      lead="Where our systems"
      trail="are running right now"
      intro={`Healthcare, enterprise SaaS, trade and logistics, PropTech and HR — ${stats.live} systems live across ${stats.regions} regions, ${stats.building} in build.`}
      plate="Map — systems by region"
      items={industries}
      base="/industries"
      closing="Seven sectors."
    />
  );
}
