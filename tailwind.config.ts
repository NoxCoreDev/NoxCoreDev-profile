import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1326",
        surface: "#161D36",
        surface2: "#1D2648",
        line: "#2B3560",
        text: "#EDEFF7",
        muted: "#8B91AC",
        accent: "#6C63FF",
        accent2: "#8F88FF",
        signal: "#FFB454",
        ok: "#3DDC97",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        measure: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
