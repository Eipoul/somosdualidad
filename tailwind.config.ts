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
          bg: "#F5EAD0",
          blush: "#F0AFA6",
          title: "#E8620A",
          subtitle: "#FDF8EE",
          text: "#3D1F0A",
          lavender: "#C8A8D2",
          sage: "#9DC4B2",
        },
        cream: {
          DEFAULT: "#F5EAD0",
          50: "#FDFAF3",
          100: "#F5EAD0",
          200: "#EDD9B8",
        },
        terracotta: {
          DEFAULT: "#E8620A",
          light: "#F07A30",
          dark: "#B84D08",
        },
        rose: {
          dusty: "#F0AFA6",
          light: "#F5C8C2",
          dark: "#D4857C",
        },
        espresso: {
          DEFAULT: "#3D1F0A",
          light: "#5C3318",
          medium: "#7A4A28",
        },
        sage: {
          DEFAULT: "#9DC4B2",
          light: "#B8D6C8",
          dark: "#6EA890",
        },
        lavender: {
          DEFAULT: "#C8A8D2",
          light: "#DBC4E4",
          dark: "#A882B8",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 24px rgba(61, 31, 10, 0.08)",
        "warm-lg": "0 8px 40px rgba(61, 31, 10, 0.12)",
        "warm-sm": "0 2px 8px rgba(61, 31, 10, 0.06)",
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
