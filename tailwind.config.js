const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Warm-bone marketing palette ──────────────────────────────
      // Only these nine tokens are allowed on the (site) surface. If a
      // colour is not here, it does not belong on a marketing page.
      colors: {
        bone: "#F5F3EF", // page canvas
        "bone-alt": "#EFECE6", // recessed band
        paper: "#FBFAF8", // raised card
        ink: "#1C1B19", // primary text / dark pills
        "ink-soft": "#3D3A35", // secondary text
        mute: "#6B6862", // tertiary text, mono labels
        line: "#E2DFD8", // hairline
        "line-strong": "#D6D2C9", // emphasised hairline
        signal: "#2E7DF0", // the single accent — links, live dots, charts
        "signal-soft": "#E8F0FE",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "120rem", // full-bleed-ish; real edges come from Shell padding
      },
      boxShadow: {
        // Diorama frames: a hairline ring plus a very soft lift. Never a
        // coloured or heavy shadow — that is what makes a page look cheap.
        frame:
          "0 1px 2px rgba(28,27,25,0.04), 0 12px 32px -12px rgba(28,27,25,0.14)",
        "frame-lg":
          "0 1px 2px rgba(28,27,25,0.05), 0 32px 64px -24px rgba(28,27,25,0.20)",
        pill: "0 1px 2px rgba(28,27,25,0.16)",
      },
      keyframes: {
        "trace-dash": {
          to: { strokeDashoffset: "-24" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        "caret-blink": {
          "0%,45%": { opacity: "1" },
          "50%,95%": { opacity: "0" },
        },
      },
      animation: {
        "trace-dash": "trace-dash 1.1s linear infinite",
        "rise-in": "rise-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "caret-blink": "caret-blink 1.2s steps(1) infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
