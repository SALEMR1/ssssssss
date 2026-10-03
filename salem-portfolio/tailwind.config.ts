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
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        heading: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#FBFCFF",
        foreground: "#07152E",
        card: "#FFFFFF",
        saey: {
          navy:   "#07152E",
          blue:   "#146CFF",
          violet: "#6A3DFF",
          white:  "#FFFFFF",
          gray:   "#F4F7FF",
          dark:   "#07152E",
          muted:  "#52627A",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":       "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(20,108,255,0.08), transparent)",
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "float":      "float 6s ease-in-out infinite",
        "glow":       "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(20,108,255,0.3)" },
          to:   { boxShadow: "0 0 60px rgba(106,61,255,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
