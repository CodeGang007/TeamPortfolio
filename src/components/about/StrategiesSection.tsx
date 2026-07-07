"use client";

import { motion } from "framer-motion";
import { Cloud, Smartphone, BrainCircuit, Database } from "lucide-react";

const strategies = [
    {
        icon: Cloud,
        title: "Cloud & System Design",
        label: "AWS-Native Infrastructure",
        description: "Multi-tenant, scalable-by-default architectures on AWS. CloudFront, ECS Fargate, RDS MultiAZ, SQS, Cognito, KMS — production-grade on day one.",
        color: "bg-brand-green"
    },
    {
        icon: BrainCircuit,
        title: "Applied AI & ML",
        label: "RAG · LLMs · Deep Learning",
        description: "RAG pipelines, LLM gateways (Anthropic, OpenAI, Bedrock), demand forecasting with LSTM, anomaly detection, invoice OCR, and dealer-risk classifiers — running in production.",
        color: "bg-white"
    },
    {
        icon: Smartphone,
        title: "Mobile & Web Apps",
        label: "Android · Flutter · Next.js",
        description: "Full-stack web platforms and native-quality mobile apps. From medical-education Android apps with 10K+ installs to multi-module ERP suites deployed on Vercel.",
        color: "bg-white"
    },
    {
        icon: Database,
        title: "Data Pipelines",
        label: "Ingestion · ETL · Observability",
        description: "Nightly Airflow batch jobs, embedding queues, time-series feature stores, and FastAPI inference services backed by Redis — all wired to your product UI.",
        color: "bg-white"
    },
];

export function StrategiesSection() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Our <span className="text-brand-green">Expertise</span> Ecosystem
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg">
                    We provide a 360-degree digital solution. Whether it's code, design, or intelligence, we have the mastery to execute it perfectly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {strategies.map((strat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`relative p-8 rounded-[30px] flex flex-col items-center min-h-[400px] transition-all duration-300 group text-left
                        ${strat.color === 'bg-brand-green'
                                    ? 'bg-brand-green text-black shadow-[0_10px_40px_rgba(0,255,65,0.2)]'
                                    : 'bg-zinc-900 text-white border border-zinc-800'
                                }
                    `}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-3xl
                        ${strat.color === 'bg-brand-green'
                                    ? 'bg-black/10 text-black'
                                    : 'bg-zinc-950 text-white border border-zinc-800'
                                }
                     `}>
                                <strat.icon size={32} />
                            </div>

                            <div className="w-full">
                                <div className="uppercase tracking-widest text-xs font-bold mb-2 opacity-60">
                                    {strat.title}
                                </div>
                                <h3 className="text-2xl font-bold leading-tight mb-4">
                                    {strat.label}
                                </h3>
                                <p className={`text-sm leading-relaxed ${strat.color === 'bg-brand-green' ? 'text-black/80 font-medium' : 'text-zinc-400'}`}>
                                    {strat.description}
                                </p>
                            </div>

                            {/* Arrow (Visual) */}
                            <div className="mt-auto pt-8 self-end opacity-50">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
