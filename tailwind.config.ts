import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./emails/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F8AB8C",
          title: "#8B0D19",
          subtitle: "#FFFFFF",
          text: "#DA5367",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          50: "#FDFCFA",
          100: "#FAF7F2",
          200: "#F3EDE3",
        },
        terracotta: {
          DEFAULT: "#C4714F",
          light: "#D4927A",
          dark: "#A05A3A",
        },
        rose: {
          dusty: "#D4A5A0",
          light: "#E8C5C0",
          dark: "#B88580",
        },
        espresso: {
          DEFAULT: "#2C1A0E",
          light: "#4A3020",
          medium: "#6B4C35",
        },
        sage: {
          DEFAULT: "#8A9E7E",
          light: "#A8BA9E",
          dark: "#6E8062",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 24px rgba(44, 26, 14, 0.08)",
        "warm-lg": "0 8px 40px rgba(44, 26, 14, 0.12)",
        "warm-sm": "0 2px 8px rgba(44, 26, 14, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
      },
    },
  },
  plugins: [],
};

export default config;
