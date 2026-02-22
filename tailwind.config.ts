import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        foreground: "#1B1B1B",
        accentLight: "#C8A97E",
        accentDark: "#2B2A2A",
        warmGray: {
          50: "#F9F7F4",
          100: "#F2EEE8",
          150: "#ECDCC8",
          200: "#E8E1D7",
          300: "#D7CFC3",
          500: "#8F8678"
        }
      },
      boxShadow: {
        soft: "0 12px 32px rgba(27, 27, 27, 0.08)",
        subtle: "0 4px 16px rgba(27, 27, 27, 0.04)",
        refined: "0 8px 24px rgba(27, 27, 27, 0.06)"
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "44px" }],
        "5xl": ["48px", { lineHeight: "56px" }],
        "6xl": ["60px", { lineHeight: "72px" }]
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px"
      }
    }
  },
  plugins: []
};

export default config;
