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
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, User, FileText, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/UserMenu";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, openLoginModal, logout, role } = useAuth();
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
          {!isAuthenticated && (
            <NavbarButton
                variant="secondary" 
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={openLoginModal}
            >
                System Offline
            </NavbarButton>
          )}
          {isAuthenticated && (
            <div className="ml-2">
              <UserMenu />
            </div>
          )}
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

            <div className="mt-4 w-full h-px bg-white/10" />

            {/* Mobile Sign In (if not authenticated) */}
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="mt-4 w-full rounded-md px-4 py-3 text-sm font-bold shadow-md transition-all active:scale-95 bg-red-500/20 text-red-200 border border-red-500/50 hover:bg-red-500/30"
              >
                System Offline
              </button>
            )}

            {/* Mobile User Links (if authenticated) */}
            {isAuthenticated && (
              <>
                <a
                  href="/profile"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    router.push('/profile');
                  }}
                  className="mt-2 w-full rounded-md px-4 py-3 text-sm font-bold text-zinc-400 hover:bg-white/5 transition-all text-left flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </a>

                <a
                  href="/dashboard/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    router.push('/dashboard/projects');
                  }}
                  className="mt-2 w-full rounded-md px-4 py-3 text-sm font-bold text-zinc-400 hover:bg-white/5 transition-all text-left flex items-center gap-2"
                >
                  {role === 'admin' ? (
                      <LayoutGrid className="h-4 w-4" />
                  ) : (
                      <FileText className="h-4 w-4" />
                  )}
                  <span>{role === 'admin' ? "Manage Publications" : (role === 'developer' ? "Assigned Publications" : "My Publications")}</span>
                </a>
              </>
            )}

            {/* Mobile Sign Out (if authenticated) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="mt-2 w-full rounded-md px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all text-left flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* PAGE CONTENT */}
      <main className="mt-32 relative z-10">{children}</main>
    </div>
  );
}