"use client";

import React from "react";

export function SmokeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111", // The dark body background
        zIndex: -1, // Puts it behind everything
        overflow: "hidden",
      }}
    >
      <svg
        width="80vw"
        height="80vh"
        style={{
          background: "#366",
          borderRadius: "20px",
          boxShadow: "0 0 50px rgba(0,0,0,0.5)", // Added a slight shadow for depth
        }}
      >
        <defs>
          <linearGradient id="kawaiiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9999" />
            <stop offset="50%" stopColor="#cc99ff" />
            <stop offset="100%" stopColor="#99ffcc" />
          </linearGradient>
          
          <filter id="smoke" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.713"
              numOctaves="340"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.00713;0.005;0.00713"
                dur="15s"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.25 0 0.75 1; 0.42 0 0.58 1"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur stdDeviation="2" in="noise" result="blur" />
            <feColorMatrix
              type="matrix"
              in="blur"
              result="tinted"
              values="1 0 0 0 0.9
                      0 1 0 0 0.1
                      0 0 1 0 0.1
                      0 0 0 0.9 0"
            />
            <feBlend
              mode="overlay"
              in="tinted"
              in2="SourceGraphic"
              result="smokeWithGradient"
            />
          </filter>
        </defs>
        
        <rect
          width="100%"
          height="100%"
          fill="url(#kawaiiGradient)"
          filter="url(#smoke)"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="5"
          rx="20"
        />
      </svg>
    </div>
  );
}