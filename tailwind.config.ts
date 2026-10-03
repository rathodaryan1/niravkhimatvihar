import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: {
          DEFAULT: "#A8432F",
          dark: "#892B19",
          deep: "#3A2418",
          light: "#C55B46",
          soft: "#FDF2EF",
        },
        sandstone: {
          DEFAULT: "#D9B08C",
          soft: "#F5EBE1",
          light: "#EADCD0",
          dark: "#B8865D",
          hero: "#D9B08C",
        },
        cream: {
          DEFAULT: "#FAF6F0",
          light: "#FFFDF9",
          dark: "#EFE8D8",
        },
        ink: {
          DEFAULT: "#2A1A11",
          2: "#5A4234",
          3: "#786052",
          4: "#9E8A7D",
          muted: "#6B584C",
        },
        line: "#E6D7C8",
        "input-line": "#DEC8B5",
        brand: {
          deep: "#3A2418",          // Deep Earth Brown
          charcoal: "#241A15",      // Dark Charcoal Brown
          warmBrown: "#6B4630",     // Warm Earth Brown
          sandstone: "#9B7049",     // Warm Sandstone
          sandstoneLight: "#BA926D",
          sandstoneDark: "#8B633F",
          gold: "#C7A15A",          // Muted Antique Gold
          goldLight: "#DFBE7D",
          goldDark: "#9E7B35",
          ivory: "#F8F3E8",         // Pure Ivory
          warmWhite: "#FFFDF8",     // Warm White
          cream: "#EFE8D8",
          lightSand: "#F1E8DA",     // Light Sandstone
          warm: "#4A3528",
          saffron: "#D35400",       // Subtle saffron accent
          terracotta: "#A8432F",
        },
        text: {
          primary: "#241A15",
          secondary: "#5C4D42",
          muted: "#8C7B70",
          light: "#F8F3E8",
        },
        status: {
          success: "#2E7D32",
          warning: "#ED6C02",
          error: "#C62828",
          info: "#0288D1",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "var(--font-hind-vadodara)", "system-ui", "-apple-system", "sans-serif"],
        gujarati: ["var(--font-hind-vadodara)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.2rem, 5vw, 4rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        lead: ["1.15rem", { lineHeight: "1.7" }],
        nav: ["0.925rem", { lineHeight: "1.4" }],
        label: ["0.75rem", { lineHeight: "1.2" }],
        body: ["0.95rem", { lineHeight: "1.6" }],
      },
      letterSpacing: {
        widest: "0.2em",
        editorial: "0.15em",
        tightest: "-0.04em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        subtle: "0 2px 12px rgba(42, 26, 17, 0.04)",
        card: "0 6px 24px -2px rgba(42, 26, 17, 0.07)",
        elevated: "0 12px 32px rgba(58, 36, 24, 0.16)",
        cinematic: "0 25px 60px -10px rgba(42, 26, 17, 0.35)",
        goldGlow: "0 0 25px rgba(199, 161, 90, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
