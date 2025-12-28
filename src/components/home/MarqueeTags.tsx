"use client";

import { motion } from "framer-motion";

// ============================================
// MINI STICKER ICONS FOR SERVICE TAGS
// ============================================

// Python Icon
const PythonIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3776ab" stroke="#000" strokeWidth="1.5" />
        <path d="M12 6 L8 6 L8 10 L12 10 L12 14 L16 14 L16 10 L12 10" fill="#ffd43b" stroke="#000" strokeWidth="1" />
    </svg>
);

// React Icon
const ReactIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#61dafb" stroke="#000" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#000" />
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#000" strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#000" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#000" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
);

// Machine Learning Brain Icon
const MLIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#ff90e8" stroke="#000" strokeWidth="1.5" />
        <path d="M8 10 Q12 6 16 10 Q12 14 8 10" fill="#fff" stroke="#000" strokeWidth="1" />
        <circle cx="12" cy="10" r="1.5" fill="#000" />
    </svg>
);

// AWS Cloud Icon
const AWSIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <path d="M4 14 Q2 14 2 12 Q2 9 5 9 Q5 6 9 6 Q12 6 13 8 Q14 6 17 6 Q21 6 21 10 Q23 10 23 13 Q23 15 20 15 L4 15 Z" fill="#ff9f43" stroke="#000" strokeWidth="1.5" />
    </svg>
);

// Logo Design Palette Icon
const LogoIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <circle cx="9" cy="9" r="2" fill="#ff6b6b" stroke="#000" strokeWidth="1" />
        <circle cx="15" cy="9" r="2" fill="#00d084" stroke="#000" strokeWidth="1" />
        <circle cx="12" cy="14" r="2" fill="#90e0ff" stroke="#000" strokeWidth="1" />
    </svg>
);

// SQL Database Icon
const SQLIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#a855f7" stroke="#000" strokeWidth="1.5" />
        <rect x="4" y="6" width="16" height="12" fill="#a855f7" stroke="none" />
        <line x1="4" y1="6" x2="4" y2="18" stroke="#000" strokeWidth="1.5" />
        <line x1="20" y1="6" x2="20" y2="18" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="12" cy="18" rx="8" ry="3" fill="#a855f7" stroke="#000" strokeWidth="1.5" />
    </svg>
);

// Chatbot Icon
const ChatbotIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="4" y="6" width="16" height="12" rx="2" fill="#90e0ff" stroke="#000" strokeWidth="1.5" />
        <circle cx="9" cy="11" r="1.5" fill="#000" />
        <circle cx="15" cy="11" r="1.5" fill="#000" />
        <rect x="8" y="14" width="8" height="2" rx="1" fill="#000" />
        <rect x="10" y="2" width="4" height="4" fill="#90e0ff" stroke="#000" strokeWidth="1" />
    </svg>
);

// Payment Gateway Icon
const PaymentIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="5" width="20" height="14" rx="2" fill="#00d084" stroke="#000" strokeWidth="1.5" />
        <rect x="2" y="8" width="20" height="3" fill="#000" />
        <rect x="5" y="14" width="6" height="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// Bug Fixing Icon
const BugIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <ellipse cx="12" cy="14" rx="6" ry="7" fill="#ff6b6b" stroke="#000" strokeWidth="1.5" />
        <circle cx="12" cy="7" r="4" fill="#ff6b6b" stroke="#000" strokeWidth="1.5" />
        <line x1="6" y1="10" x2="3" y2="8" stroke="#000" strokeWidth="1.5" />
        <line x1="18" y1="10" x2="21" y2="8" stroke="#000" strokeWidth="1.5" />
        <line x1="6" y1="16" x2="3" y2="18" stroke="#000" strokeWidth="1.5" />
        <line x1="18" y1="16" x2="21" y2="18" stroke="#000" strokeWidth="1.5" />
    </svg>
);

// API Icon
const APIIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#84cc16" stroke="#000" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">API</text>
    </svg>
);

// UI/UX Icon
const UIUXIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#ff90e8" stroke="#000" strokeWidth="1.5" />
        <rect x="5" y="5" width="6" height="4" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="5" y="11" width="14" height="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="5" y="15" width="14" height="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// Node.js Icon
const NodeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="#68a063" stroke="#000" strokeWidth="1.5" />
        <text x="12" y="14" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#fff">N</text>
    </svg>
);

// Docker Icon
const DockerIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="10" width="20" height="10" rx="2" fill="#2496ed" stroke="#000" strokeWidth="1.5" />
        <rect x="4" y="6" width="4" height="4" fill="#2496ed" stroke="#000" strokeWidth="1" />
        <rect x="10" y="6" width="4" height="4" fill="#2496ed" stroke="#000" strokeWidth="1" />
        <rect x="4" y="12" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="8" y="12" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="12" y="12" width="3" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// Data Analytics Icon
const AnalyticsIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="5" y="14" width="3" height="6" fill="#000" />
        <rect x="10" y="10" width="3" height="10" fill="#000" />
        <rect x="15" y="6" width="3" height="14" fill="#000" />
    </svg>
);

// WordPress Icon
const WordPressIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#21759b" stroke="#000" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">W</text>
    </svg>
);

// E-commerce Cart Icon
const EcommerceIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <path d="M4 4 L6 4 L8 16 L18 16 L20 6 L7 6" fill="none" stroke="#000" strokeWidth="1.5" />
        <rect x="7" y="6" width="12" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <circle cx="9" cy="19" r="2" fill="#000" />
        <circle cx="17" cy="19" r="2" fill="#000" />
    </svg>
);

// Firebase Icon
const FirebaseIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <polygon points="12,2 20,20 4,20" fill="#ffca28" stroke="#000" strokeWidth="1.5" />
        <polygon points="12,8 16,20 8,20" fill="#ff9f43" stroke="#000" strokeWidth="1" />
    </svg>
);

// Automation Gear Icon
const AutomationIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="4" fill="#a855f7" stroke="#000" strokeWidth="1.5" />
        <path d="M12 2 L14 6 L12 6 L12 2" fill="#a855f7" stroke="#000" strokeWidth="1" />
        <path d="M12 22 L10 18 L12 18 L12 22" fill="#a855f7" stroke="#000" strokeWidth="1" />
        <path d="M2 12 L6 10 L6 12 L2 12" fill="#a855f7" stroke="#000" strokeWidth="1" />
        <path d="M22 12 L18 14 L18 12 L22 12" fill="#a855f7" stroke="#000" strokeWidth="1" />
    </svg>
);

// Landing Page Icon
const LandingIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#90e0ff" stroke="#000" strokeWidth="1.5" />
        <rect x="3" y="3" width="18" height="5" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
        <circle cx="6" cy="5.5" r="1" fill="#ff6b6b" />
        <circle cx="9" cy="5.5" r="1" fill="#ffc900" />
        <circle cx="12" cy="5.5" r="1" fill="#00d084" />
        <rect x="5" y="10" width="14" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="8" y="15" width="8" height="3" rx="1" fill="#ff90e8" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// GraphQL Icon
const GraphQLIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="#e535ab" stroke="#000" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
);

// Kubernetes Icon
const KubernetesIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="#326ce5" stroke="#000" strokeWidth="1.5" />
        <polygon points="12,6 16,12 12,18 8,12" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
);

// Flutter Icon
const FlutterIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <polygon points="12,2 22,12 12,22 7,17 12,12 7,7" fill="#02569b" stroke="#000" strokeWidth="1.5" />
        <polygon points="7,17 12,12 12,22" fill="#54c5f8" stroke="#000" strokeWidth="1" />
    </svg>
);

// Chrome Extension Icon
const ChromeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="#fff" stroke="#000" strokeWidth="1" />
        <path d="M12 2 A10 10 0 0 1 20 8 L12 12 Z" fill="#00d084" stroke="#000" strokeWidth="0.5" />
        <path d="M20 8 A10 10 0 0 1 12 22 L12 12 Z" fill="#ff6b6b" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// Scraping Bot Icon
const ScrapingIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
        <circle cx="9" cy="10" r="2" fill="#00d084" />
        <circle cx="15" cy="10" r="2" fill="#00d084" />
        <rect x="8" y="14" width="8" height="2" fill="#00d084" />
    </svg>
);

// Dashboard Icon
const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#90e0ff" stroke="#000" strokeWidth="1.5" />
        <rect x="4" y="4" width="8" height="6" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="14" y="4" width="6" height="6" fill="#ff90e8" stroke="#000" strokeWidth="0.5" />
        <rect x="4" y="12" width="6" height="8" fill="#ffc900" stroke="#000" strokeWidth="0.5" />
        <rect x="12" y="12" width="8" height="8" fill="#fff" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// CI/CD Pipeline Icon
const CICDIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="6" cy="12" r="3" fill="#00d084" stroke="#000" strokeWidth="1.5" />
        <circle cx="18" cy="12" r="3" fill="#00d084" stroke="#000" strokeWidth="1.5" />
        <line x1="9" y1="12" x2="15" y2="12" stroke="#000" strokeWidth="2" />
        <polygon points="14,9 17,12 14,15" fill="#000" />
    </svg>
);

// OAuth/Security Icon
const OAuthIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <circle cx="12" cy="12" r="10" fill="#ff9f43" stroke="#000" strokeWidth="1.5" />
        <rect x="9" y="10" width="6" height="7" rx="1" fill="#fff" stroke="#000" strokeWidth="1" />
        <path d="M10 10 L10 8 Q10 5 12 5 Q14 5 14 8 L14 10" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
);

// Testing Icon
const TestingIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#84cc16" stroke="#000" strokeWidth="1.5" />
        <path d="M8 8 L11 11 L16 6" fill="none" stroke="#000" strokeWidth="2" />
        <rect x="7" y="14" width="10" height="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <rect x="7" y="18" width="6" height="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
    </svg>
);

// ============================================
// LARGER STICKER ICONS (for visual breaks)
// ============================================

// AI Robot Head (Pink)
const AIRobotIcon = () => (
    <svg viewBox="0 0 60 60" className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
        <rect x="10" y="15" width="40" height="35" rx="6" fill="#ff90e8" stroke="#000" strokeWidth="3" />
        <line x1="30" y1="15" x2="30" y2="6" stroke="#000" strokeWidth="3" />
        <circle cx="30" cy="5" r="4" fill="#ff90e8" stroke="#000" strokeWidth="2" />
        <circle cx="20" cy="30" r="5" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="40" cy="30" r="5" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="20" cy="30" r="2" fill="#000" />
        <circle cx="40" cy="30" r="2" fill="#000" />
        <rect x="18" y="40" width="24" height="5" rx="2" fill="#000" />
    </svg>
);

// Mobile Phone with Chat Bubble (Yellow)
const MobileIcon = () => (
    <svg viewBox="0 0 50 70" className="w-10 h-14 md:w-12 md:h-16 flex-shrink-0">
        <rect x="5" y="5" width="40" height="60" rx="6" fill="#ffc900" stroke="#000" strokeWidth="3" />
        <rect x="10" y="12" width="30" height="42" rx="2" fill="#fff" stroke="#000" strokeWidth="2" />
        <rect x="13" y="18" width="15" height="8" rx="3" fill="#90e0ff" stroke="#000" strokeWidth="1.5" />
        <rect x="22" y="30" width="15" height="8" rx="3" fill="#ff90e8" stroke="#000" strokeWidth="1.5" />
        <rect x="13" y="42" width="12" height="6" rx="2" fill="#00d084" stroke="#000" strokeWidth="1.5" />
        <circle cx="25" cy="58" r="3" fill="#fff" stroke="#000" strokeWidth="1.5" />
    </svg>
);

// Browser Window with Cursor (Teal)
const WebBrowserIcon = () => (
    <svg viewBox="0 0 70 55" className="w-14 h-11 md:w-16 md:h-12 flex-shrink-0">
        <rect x="3" y="3" width="64" height="49" rx="5" fill="#90e0ff" stroke="#000" strokeWidth="3" />
        <rect x="3" y="3" width="64" height="12" fill="#1a1a1a" stroke="#000" strokeWidth="3" />
        <circle cx="12" cy="9" r="3" fill="#ff6b6b" />
        <circle cx="22" cy="9" r="3" fill="#ffc900" />
        <circle cx="32" cy="9" r="3" fill="#00d084" />
        <rect x="8" y="20" width="54" height="28" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <polygon points="40,28 40,42 45,38 48,45 52,43 49,36 55,36" fill="#000" />
    </svg>
);

// Security Shield/Lock (Orange)
const SecurityShieldIcon = () => (
    <svg viewBox="0 0 50 60" className="w-10 h-12 md:w-12 md:h-14 flex-shrink-0">
        <path d="M25 5 L45 15 L45 35 Q45 50 25 55 Q5 50 5 35 L5 15 Z" fill="#ff9f43" stroke="#000" strokeWidth="3" />
        <rect x="17" y="28" width="16" height="14" rx="2" fill="#fff" stroke="#000" strokeWidth="2" />
        <path d="M20 28 L20 22 Q20 16 25 16 Q30 16 30 22 L30 28" fill="none" stroke="#000" strokeWidth="3" />
        <circle cx="25" cy="34" r="3" fill="#000" />
        <rect x="24" y="35" width="2" height="5" fill="#000" />
    </svg>
);

// Database Cylinder (Purple)
const DatabaseLargeIcon = () => (
    <svg viewBox="0 0 50 60" className="w-10 h-12 md:w-12 md:h-14 flex-shrink-0">
        <ellipse cx="25" cy="12" rx="20" ry="8" fill="#a855f7" stroke="#000" strokeWidth="3" />
        <rect x="5" y="12" width="40" height="36" fill="#a855f7" stroke="none" />
        <line x1="5" y1="12" x2="5" y2="48" stroke="#000" strokeWidth="3" />
        <line x1="45" y1="12" x2="45" y2="48" stroke="#000" strokeWidth="3" />
        <ellipse cx="25" cy="48" rx="20" ry="8" fill="#a855f7" stroke="#000" strokeWidth="3" />
        <ellipse cx="25" cy="26" rx="20" ry="6" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,3" />
        <ellipse cx="25" cy="38" rx="20" ry="6" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4,3" />
    </svg>
);

// Code Brackets Icon (Lime Green)
const CodeLargeIcon = () => (
    <svg viewBox="0 0 60 50" className="w-12 h-10 md:w-14 md:h-11 flex-shrink-0">
        <rect x="3" y="3" width="54" height="44" rx="6" fill="#84cc16" stroke="#000" strokeWidth="3" />
        <text x="18" y="34" fontSize="24" fontWeight="900" fill="#000">&lt;</text>
        <text x="32" y="34" fontSize="24" fontWeight="900" fill="#000">/</text>
        <text x="42" y="34" fontSize="24" fontWeight="900" fill="#000">&gt;</text>
    </svg>
);

// ============================================
// SERVICE TAG WITH ICON COMPONENT
// ============================================

interface ServiceTagProps {
    label: string;
    icon: React.ReactNode;
}

const ServiceTag = ({ label, icon }: ServiceTagProps) => (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-white border border-black rounded-full text-sm md:text-base font-semibold text-black whitespace-nowrap flex-shrink-0 hover:bg-gumroad-yellow hover:shadow-[3px_3px_0px_0px_#000] transition-all cursor-default">
        {icon}
        <span>{label}</span>
    </div>
);

// ============================================
// MARQUEE ROW COMPONENT
// ============================================

interface MarqueeRowProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    duration?: number;
}

const MarqueeRow = ({ children, direction = "left", duration = 25 }: MarqueeRowProps) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap py-2">
            <motion.div
                className="flex items-center gap-4"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: duration,
                        ease: "linear"
                    }
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function MarqueeTags() {
    // Row 1 content (scrolls left)
    const row1Items = (
        <>
            <ServiceTag label="Machine Learning" icon={<MLIcon />} />
            <AIRobotIcon />
            <ServiceTag label="AWS Setup" icon={<AWSIcon />} />
            <ServiceTag label="Logo Design" icon={<LogoIcon />} />
            <MobileIcon />
            <ServiceTag label="API Development" icon={<APIIcon />} />
            <ServiceTag label="UI/UX Design" icon={<UIUXIcon />} />
            <WebBrowserIcon />
            <ServiceTag label="Python Script" icon={<PythonIcon />} />
            <ServiceTag label="React Native" icon={<ReactIcon />} />
        </>
    );

    // Row 2 content (scrolls right)
    const row2Items = (
        <>
            <SecurityShieldIcon />
            <ServiceTag label="Payment Gateway" icon={<PaymentIcon />} />
            <ServiceTag label="Bug Fixing" icon={<BugIcon />} />
            <CodeLargeIcon />
            <ServiceTag label="Node.js" icon={<NodeIcon />} />
            <ServiceTag label="Docker Setup" icon={<DockerIcon />} />
            <DatabaseLargeIcon />
            <ServiceTag label="Data Analytics" icon={<AnalyticsIcon />} />
            <ServiceTag label="SQL Database" icon={<SQLIcon />} />
            <ServiceTag label="Chatbot" icon={<ChatbotIcon />} />
        </>
    );

    // Row 3 content (scrolls left)
    const row3Items = (
        <>
            <ServiceTag label="Firebase" icon={<FirebaseIcon />} />
            <MobileIcon />
            <ServiceTag label="GraphQL" icon={<GraphQLIcon />} />
            <ServiceTag label="Kubernetes" icon={<KubernetesIcon />} />
            <WebBrowserIcon />
            <ServiceTag label="WordPress" icon={<WordPressIcon />} />
            <ServiceTag label="E-commerce" icon={<EcommerceIcon />} />
            <AIRobotIcon />
            <ServiceTag label="Automation" icon={<AutomationIcon />} />
            <ServiceTag label="Landing Page" icon={<LandingIcon />} />
        </>
    );

    // Row 4 content (scrolls right)
    const row4Items = (
        <>
            <CodeLargeIcon />
            <ServiceTag label="Scraping Bot" icon={<ScrapingIcon />} />
            <ServiceTag label="Dashboard" icon={<DashboardIcon />} />
            <SecurityShieldIcon />
            <ServiceTag label="CI/CD Pipeline" icon={<CICDIcon />} />
            <ServiceTag label="OAuth Setup" icon={<OAuthIcon />} />
            <DatabaseLargeIcon />
            <ServiceTag label="Testing Suite" icon={<TestingIcon />} />
            <ServiceTag label="Flutter App" icon={<FlutterIcon />} />
            <ServiceTag label="Chrome Extension" icon={<ChromeIcon />} />
        </>
    );

    return (
        <section className="w-full py-16 md:py-24 bg-gumroad-cream overflow-hidden">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 italic"
                >
                    Everything you need to build your product.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-black/70 font-medium max-w-2xl mx-auto"
                >
                    From simple scripts to full-scale SaaS platforms. Post a requirement and get it done.
                </motion.p>
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-3 md:gap-4">
                <MarqueeRow direction="left" duration={35}>
                    {row1Items}
                </MarqueeRow>

                <MarqueeRow direction="right" duration={32}>
                    {row2Items}
                </MarqueeRow>

                <MarqueeRow direction="left" duration={38}>
                    {row3Items}
                </MarqueeRow>

                <div className="hidden md:block">
                    <MarqueeRow direction="right" duration={30}>
                        {row4Items}
                    </MarqueeRow>
                </div>
            </div>
        </section>
    );
}
