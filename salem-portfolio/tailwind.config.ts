import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#111827",
        card: "#FFFFFF",
        saey: {
          navy: "#0B1020",
          blue: "#2563EB",
          violet: "#6D5DFB",
          white: "#FFFFFF",
          gray: "#F5F7FA",
          dark: "#111827",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(37,99,235,0.08), transparent)",
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" },
          to: { boxShadow: "0 0 60px rgba(37, 99, 235, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
