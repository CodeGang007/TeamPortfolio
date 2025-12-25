"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, openLoginModal } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Projects", link: "/project" },
    { name: "Team", link: "/team" },
    { name: "About", link: "/about" },
    { name: "Contact Us", link: "/contactus" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Ensure bg is transparent (default is usually transparent, but safe to be sure)
    <div className="relative w-full bg-transparent">
      {/* NAVBAR */}
      <Navbar>
        {/* Only render Navbar content after client-side hydration to prevent flash mismatch */}
        <NavBody isOnline={isAuthenticated} visible={true}>
          <NavbarLogo isOnline={isAuthenticated} />
          <NavItems
            items={navItems}
            isOnline={isAuthenticated}
          />
          <NavbarButton
            variant={isAuthenticated ? "primary" : "secondary"}
            className={isAuthenticated ? "" : "border-red-500/50 text-red-400 hover:bg-red-500/10"}
            onClick={() => {
              if (isAuthenticated) {
                router.push('/contactus');
              } else {
                openLoginModal();
              }
            }}
          >
            {isAuthenticated ? "Book a call" : "System Offline"}
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo isOnline={isAuthenticated} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  router.push(item.link);
                }}
                className={`block w-full p-2 text-lg font-medium transition-colors ${isAuthenticated ? "text-zinc-400 hover:text-white" : "text-red-400 hover:text-red-300"
                  }`}
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* PAGE CONTENT */}
      <main className="mt-32 relative z-10">{children}</main>
    </div>
  );
}