"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Home",
    "Portfolio",
    "Services",
    "Contact",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-transparent backdrop-blur-md fixed top-0 z-50">
      <NavbarContent>
        {/* The Hamburger Button */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-white text-xl tracking-widest">AURA</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu (Hidden on mobile) */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarMenuItem>
          <Link color="foreground" href="#" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive>
          <Link href="#" aria-current="page" className="text-secondary font-bold">
            Portfolio
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="#" className="text-gray-300 hover:text-white transition-colors">
            Integrations
          </Link>
        </NavbarMenuItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button as={Link} color="primary" href="#" variant="flat" className="font-semibold">
          Hire Me
        </Button>
      </NavbarContent>

      {/* The Mobile Drawer / Menu */}
      <NavbarMenu className="bg-black/90 pt-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-4xl font-bold text-gray-400 hover:text-white hover:scale-105 transition-transform duration-200 py-4"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}