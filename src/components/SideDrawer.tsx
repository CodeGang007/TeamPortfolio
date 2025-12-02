"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Menu, X, Home, Briefcase, Mail, User } from "lucide-react";

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#", icon: <Home size={20} /> },
    { name: "Projects", href: "#", icon: <Briefcase size={20} /> },
    { name: "About", href: "#", icon: <User size={20} /> },
    { name: "Contact", href: "#", icon: <Mail size={20} /> },
  ];

  return (
    <>
      {/* Trigger Button (Fixed to top-left) */}
      <Button
        isIconOnly
        variant="flat"
        className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
        onPress={() => setIsOpen(true)}
      >
        <Menu />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 1. Backdrop (Click to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* 2. The Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-white/10 z-50 shadow-2xl p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    AURA
                  </h2>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-gray-400 hover:text-white"
                    onPress={() => setIsOpen(false)}
                  >
                    <X />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                      onPress={() => setIsOpen(false)}
                    >
                      <span className="group-hover:text-purple-400 transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium text-lg">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-white/10">
                <Button
                  fullWidth
                  className="bg-gradient-to-tr from-purple-500 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/20"
                >
                  Hire Me
                </Button>
                <p className="text-center text-xs text-gray-600 mt-4">
                  © 2024 Portfolio.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}