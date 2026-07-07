"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeGangLogo } from "./CodeGangLogo";
import { Menu, X } from "lucide-react";

import React, { useEffect, useRef, useState } from "react";


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
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 100);
        ticking = false;
      });
    };

    // Set initial state (e.g. page loaded mid-scroll)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
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
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      style={{
        maxWidth: "fit-content",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-auto flex-row items-center justify-between self-start rounded-full px-10 py-3 lg:flex border border-transparent gap-8 transition-all duration-300",
        visible
          ? "translate-y-5 border-white/10 bg-black/80 backdrop-blur-md shadow-[0_0_24px_rgba(0,255,65,0.1),0_1px_1px_rgba(0,255,65,0.05),0_0_0_1px_rgba(0,255,65,0.1)]"
          : "translate-y-0 bg-transparent shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-row items-center justify-center space-x-2 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={() => {
            if (onItemClick) onItemClick();
          }}
          className={cn(
            "relative px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 border flex items-center justify-center whitespace-nowrap",
            "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-brand-green/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:bg-white/10"
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {/* Active/Hover Background - Keeping it subtle or removing if the border style is enough. Let's keep a very subtle internal glow */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full rounded-full z-0 bg-brand-green/5 transition-opacity duration-200",
              hovered === idx ? "opacity-100" : "opacity-0",
            )}
          />
          <span className="relative z-10">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent py-2 lg:hidden transition-all duration-300",
        visible
          ? "translate-y-5 w-[90%] px-3 rounded-[4px] bg-black/80 backdrop-blur-md"
          : "translate-y-0 px-0 rounded-[2rem]",
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
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-zinc-950/90 border border-zinc-800 px-4 py-8 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
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

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 font-normal"
    >
      <div className="h-12 w-12 flex items-center justify-center drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
        <CodeGangLogo />
      </div>
      <span className="font-bold text-xl tracking-tight text-white">CodeGang</span>

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
    "px-5 py-2.5 rounded-md text-[15px] font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

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
