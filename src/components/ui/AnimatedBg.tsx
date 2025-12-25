"use client";

import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-black">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Subtle Green Glow */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-brand-green/5 blur-[120px] rounded-full"></div>
    </div>
  );
}