"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-5 z-[100] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, isOnline = true }: NavBodyProps & { isOnline?: boolean }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        backgroundColor: visible ? "rgba(0, 0, 0, 0.7)" : "transparent",
        boxShadow: visible
          ? isOnline
            ? "0 0 24px rgba(0, 255, 65, 0.1), 0 1px 1px rgba(0, 255, 65, 0.05), 0 0 0 1px rgba(0, 255, 65, 0.1)"
            : "0 0 24px rgba(239, 68, 68, 0.1), 0 1px 1px rgba(239, 68, 68, 0.05), 0 0 0 1px rgba(239, 68, 68, 0.1)"
          : "none",
        width: visible ? "auto" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: visible ? "auto" : "auto",
        maxWidth: "fit-content",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-auto flex-row items-center justify-between self-start rounded-full px-8 py-2 lg:flex border border-transparent gap-10",
        visible && "border-white/10 bg-black/80 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, isOnline = true }: NavItemsProps & { isOnline?: boolean }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-row items-center justify-center space-x-2 lg:flex", // Reduced spacing: space-x-6 -> space-x-2
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            if (onItemClick) onItemClick();
          }}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center justify-center",
            isOnline
              ? "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-brand-green/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:bg-white/10"
              : "bg-red-950/10 border-red-500/10 text-red-500/70 hover:text-red-400 hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:bg-red-950/20"
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {/* Active/Hover Background - Keeping it subtle or removing if the border style is enough. Let's keep a very subtle internal glow */}
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className={cn(
                "absolute inset-0 h-full w-full rounded-full z-0",
                isOnline ? "bg-brand-green/5" : "bg-red-500/5"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        backgroundColor: visible ? "rgba(0,0,0,0.8)" : "transparent",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-zinc-950/90 border border-zinc-800 px-4 py-8 shadow-2xl backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <X className="text-white" onClick={onClick} />
  ) : (
    <Menu className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = ({ isOnline = true }: { isOnline?: boolean }) => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <div className={cn(
        "h-6 w-6 rounded flex items-center justify-center font-bold text-black text-xs transition-colors duration-500",
        isOnline ? "bg-transparent" : "bg-red-500/20"
      )}>
        <img
          src="/assets/cg-logo.png"
          alt="CodeGang Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <span className={cn(
        "font-medium transition-colors duration-500",
        isOnline ? "text-white" : "text-red-200"
      )}>CodeGang</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "neon";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-md",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    dark: "bg-black text-white border border-zinc-800",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
    neon: "bg-brand-green text-black shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
