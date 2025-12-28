"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Check,
  FileText,
  Image as ImageIcon,
  Loader2,
  Rocket,
  Trash2,
  X,
  Home,
  BarChart2,
  Wifi,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ParamsProps = Promise<{ templateId: string }>;

export default function ProjectRequestPage({
  params,
}: {
  params: ParamsProps;
}) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setTemplateId(resolvedParams.templateId);
    });
  }, [params]);

  // Form State
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    category: "Art",
    subCategories: ["Vectors"] as string[],
    date: "",
    budget: "2,000.00",
    boost: "driven" as "standard" | "driven",
  });

  const categories = ["Art", "Programming", "Design", "Video", "Music"];
  const subCategories = [
    "Adobe Photoshop",
    "CorelDRAW",
    "Figma",
    "Canva",
    "Realistic",
    "Anime",
    "Vectors",
    "Portrait",
    "Icons",
    "Minimal",
    "Logo",
    "3D",
    "Vintage",
    "Cartoon",
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. SIDEBAR (Fixed Left Rail) */}
      <div className="sticky top-0 hidden h-screen w-20 flex-col items-center border-r border-slate-200 bg-white py-8 md:flex">
        <div className="mb-8">
          <div className="h-8 w-8 rounded-full bg-purple-500"></div>{" "}
          {/* Brand Icon placeholder */}
        </div>
        <div className="flex flex-1 flex-col gap-6 w-full items-center">
          <button className="text-slate-400 hover:text-purple-600">
            <Home className="h-6 w-6" />
          </button>
          <button className="text-slate-400 hover:text-purple-600">
            <BarChart2 className="h-6 w-6" />
          </button>
          <button className="text-slate-400 hover:text-purple-600">
            <Wifi className="h-6 w-6 rotate-45" />
          </button>
          <button className="text-slate-400 hover:text-purple-600">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-purple-600 relative">
            <User className="h-6 w-6" />
            <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-purple-600"></div>
          </button>
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <button className="text-slate-400 hover:text-purple-600">
            <Settings className="h-6 w-6" />
          </button>
          <button className="text-slate-400 hover:text-red-500">
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-slate-100 bg-white px-8 py-4 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Top Search (Visual Match) */}
            <div className="flex items-center gap-4 w-full max-w-3xl">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-full border border-blue-100 bg-white py-2.5 pl-12 pr-4 text-sm text-slate-600 shadow-sm focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">The me:</span>
                <div className="h-6 w-10 rounded-full bg-blue-100 p-1">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
                <Settings className="h-5 w-5 text-blue-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-6 max-w-7xl px-8 pb-20">
          {/* Breadcrumbs & Title */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
              <span>Profile</span>
              <span>&gt;</span>
              <span className="text-slate-500">Create project</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-400">
              Project creation
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-7 space-y-8">
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Project name*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-16 text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-50 outline-none shadow-sm transition-all"
                    placeholder=""
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    maxLength={100}
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-slate-300">
                    {formData.projectName.length} / 100
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Description*
                </label>
                <div className="relative">
                  <textarea
                    className="min-h-[200px] w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-50 outline-none shadow-sm transition-all"
                    placeholder=""
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    maxLength={800}
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-slate-300">
                    {formData.description.length} / 800
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">
                  Categories*
                </label>
                <p className="text-xs text-slate-400 -mt-3">
                  Select the project category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        setFormData({ ...formData, category: cat })
                      }
                      className={cn(
                        "rounded-full px-5 py-1.5 text-xs font-semibold transition-colors shadow-sm",
                        formData.category === cat
                          ? "bg-blue-400 text-white"
                          : "bg-blue-100 text-blue-400 hover:bg-blue-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Categories (Checklist Style) */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">
                  Sub-Categories
                </label>
                <p className="text-xs text-slate-400 -mt-3">
                  Select sub-category
                </p>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          const newSubs = formData.subCategories.includes(sub)
                            ? formData.subCategories.filter((s) => s !== sub)
                            : [...formData.subCategories, sub];
                          setFormData({ ...formData, subCategories: newSubs });
                        }}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center transition-all",
                            formData.subCategories.includes(sub)
                              ? "border-blue-500 bg-blue-500"
                              : "border-slate-300 group-hover:border-blue-400"
                          )}
                        >
                          {formData.subCategories.includes(sub) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-medium text-left",
                            formData.subCategories.includes(sub)
                              ? "text-slate-800"
                              : "text-slate-500"
                          )}
                        >
                          {sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Estimated delivery time*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-full max-w-xs rounded-lg border border-blue-200 bg-white px-4 py-2.5 outline-none text-slate-600 placeholder:text-slate-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  />
                  <Calendar className="absolute left-[200px] sm:left-[280px] top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400" />
                </div>
              </div>

              {/* Estimated Value */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Estimated value (BRL)*
                </label>
                <p className="text-xs text-slate-400">Set your budget</p>
                <div className="flex items-center max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                  <span className="mr-4 text-xs font-bold text-slate-300">
                    R$
                  </span>
                  <input
                    type="text"
                    className="w-full border-none bg-transparent p-0 outline-none text-slate-700 font-medium text-right"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                  />
                  <div className="ml-2 flex flex-col">
                    <button className="h-2 w-2 text-purple-400 hover:text-purple-600">
                      ▲
                    </button>
                    <button className="h-2 w-2 text-purple-400 hover:text-purple-600">
                      ▼
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 max-w-md mt-1 leading-relaxed">
                  Note: We suggest a minimum value of R$15.00. You can negotiate
                  it with a provider later.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: MEDIA & UPLOAD (Sticky) */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28 space-y-6">
                {/* User Avatar Floating over Images Card like in Screenshot */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-lg">
                    {/* Just a placeholder graphic or mock image */}
                    <div className="h-full w-full bg-slate-800 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Bubble tail maybe? CSS only */}
                </div>

                {/* Images Card */}
                <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm pt-10">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-bold text-slate-800">
                      Images
                    </label>
                    <span className="text-xs text-slate-400">3/4</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Images of references to the project
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 border border-slate-100"
                      >
                        {/* Mock content */}
                        <div className="h-full w-full bg-purple-50 flex items-center justify-center">
                          <div className="h-8 w-16 bg-purple-200 rounded opacity-50"></div>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mb-4">
                    Allowed extensions: .png, .jpg, .jpeg, .gif, ...
                  </p>
                  <div className="flex justify-end">
                    <button className="rounded-lg border border-purple-200 bg-white px-6 py-1.5 text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors">
                      Select image
                    </button>
                  </div>
                </div>

                {/* Attachments Card */}
                <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
                  <label className="text-sm font-bold text-slate-800 mb-1 block">
                    Attachments
                  </label>
                  <p className="text-xs text-slate-400 mb-6">
                    Project Requirements Attachments
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      "Requirements.pdf",
                      "CorporateBusinessRules.pdf",
                      "Frontend.pdf",
                      "MaisExigências.pdf",
                    ].map((file) => (
                      <div
                        key={file}
                        className="flex items-center justify-between rounded-lg bg-blue-50/50 p-3 hover:bg-blue-100/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-blue-500">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              {file}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              09/04/2022 • 258.4 KB
                            </p>
                          </div>
                        </div>
                        <button className="text-slate-300 hover:text-slate-500">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mb-4">
                    Allowed extensions: .pdf Maximum size: 10MB
                  </p>
                  <div className="flex justify-end">
                    <button className="rounded-lg border border-purple-200 bg-white px-6 py-1.5 text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors">
                      Add file
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BOOST SECTION (Full Width Bottom) */}
            <div className="lg:col-span-12 mt-4 border-t border-slate-100 pt-8">
              <label className="text-sm font-bold text-slate-800">
                Boost (paid feature)
              </label>
              <p className="text-xs text-slate-400 mb-8">
                Have a greater reach with your publication.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                {/* Cards Column */}
                <div className="lg:col-span-7 flex gap-6">
                  {/* Standard Card */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, boost: "standard" })
                    }
                    className={cn(
                      "flex-1 cursor-pointer rounded-xl border bg-white p-6 transition-all text-center relative",
                      formData.boost === "standard"
                        ? "border-slate-300"
                        : "border-slate-100 opacity-60"
                    )}
                  >
                    <p className="text-xs text-slate-500 mb-1">Standard</p>
                    <p className="text-2xl font-light text-slate-400 mb-6">
                      Free
                    </p>

                    <div className="mx-auto mb-6 h-28 w-28 rounded-full border border-purple-100 bg-white shadow-[0_0_20px_rgba(230,230,255,0.8)] flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-purple-200" />
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <div
                        className={cn(
                          "h-4 w-4 rounded-full border-2",
                          formData.boost === "standard"
                            ? "border-purple-400 bg-white"
                            : "border-slate-300"
                        )}
                      ></div>
                    </div>
                  </div>

                  {/* Driven (Boosted) Card */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, boost: "driven" })
                    }
                    className={cn(
                      "flex-1 cursor-pointer rounded-xl border bg-white p-6 transition-all text-center relative shadow-lg",
                      formData.boost === "driven"
                        ? "border-purple-200 shadow-[0_10px_40px_rgba(168,85,247,0.1)]"
                        : "border-slate-100"
                    )}
                  >
                    <p className="text-xs text-slate-500 mb-1">Driven</p>
                    <p className="text-2xl font-light text-slate-600 mb-6">
                      R$50
                    </p>

                    <div className="mx-auto mb-6 h-28 w-28 rounded-full border-2 border-purple-100 bg-white shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-white"></div>
                      <Rocket className="h-10 w-10 text-purple-500 relative z-10 drop-shadow-md" />
                    </div>

                    <p className="text-[10px] font-bold text-slate-800 mb-8">
                      Greater visibility
                    </p>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      {/* Radio filled with dot */}
                      <div
                        className={cn(
                          "h-4 w-4 rounded-full border border-purple-400 bg-white flex items-center justify-center",
                          formData.boost === "driven" ? "" : "border-slate-300"
                        )}
                      >
                        {formData.boost === "driven" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-sm"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation Column */}
                <div className="lg:col-span-5 text-[10px] leading-relaxed text-slate-400 space-y-4 pt-2">
                  <p>
                    With the &rdquo;boosted&rdquo; option, your publication is
                    publicized with greater reach, being announced in the first
                    display results on the platform,
                  </p>
                  <p>
                    Included in the boost:
                    <br />
                    One-time payment (once for each publication)
                    <br />
                    Greater visibility
                    <br />
                    Featured in display
                  </p>
                  <hr className="border-slate-100 my-4" />
                  <p>Recommended for large projects.</p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="lg:col-span-12 mt-8 flex justify-center pb-8">
              <Button
                size="lg"
                className="w-full max-w-xs h-12 bg-gradient-to-r from-purple-400 to-purple-500 text-base font-bold text-white shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-purple-600 transition-all rounded-lg"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
