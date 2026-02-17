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
          100: "#F2EEE8",
          200: "#E8E1D7",
          300: "#D7CFC3",
          500: "#8F8678"
        }
      },
      boxShadow: {
        soft: "0 12px 32px rgba(27, 27, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
