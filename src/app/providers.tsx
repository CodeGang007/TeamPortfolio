"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {/* "dark" theme forces modern dark mode styling */}
      <main className="dark text-foreground bg-background min-h-screen">
        {children}
      </main>
    </NextUIProvider>
  );
}