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
  // Removed scroll logic as we want a static top bar appearance (or always visible)

  return (
    <motion.div
      className={cn("sticky inset-x-0 top-0 z-[100] w-full border-b border-white/10 bg-black text-white", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible: true }, // Always visible
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, isOnline = true }: NavBodyProps & { isOnline?: boolean }) => {
  return (
    <div
      className={cn(
        "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between px-8 py-4 lg:flex max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick, isOnline = true }: NavItemsProps & { isOnline?: boolean }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-row items-center justify-center space-x-6 text-sm font-medium transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            if (onItemClick) onItemClick();
          }}
          className={cn(
            "relative px-3 py-1.5 transition-colors whitespace-nowrap",
            isOnline ? "text-zinc-400 hover:text-white" : "text-red-300/60 hover:text-red-200"
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className={cn(
                "absolute inset-0 h-full w-full rounded-full",
                isOnline ? "bg-white/5" : "bg-red-500/10"
              )}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-black px-4 py-4 lg:hidden border-b border-white/10",
        className,
      )}
    >
      {children}
    </div>
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
        isOnline ? "bg-brand-green" : "bg-red-500"
      )}>
        CG
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
