/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "16rem",
      },
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 20s linear infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        border: "border 4s linear infinite",
        borderFast: "border 1s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        border: {
          to: { "--border-angle": "360deg" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" }, // Start and end neutral
          "10%": { transform: "rotate(-20deg)" }, // Wiggle left
          "20%": { transform: "rotate(20deg)" }, // Wiggle right
          "30%": { transform: "rotate(-10deg)" }, // Small wiggle left
          "40%": { transform: "rotate(10deg)" }, // Small wiggle right
          "50%": { transform: "rotate(0deg)" }, // Back to center
          "100%": { transform: "rotate(0deg)" }, // Pause for rest of animation
        },
      },
      colors: {
        transparent: "transparent",
        white: {
          DEFAULT: "#FFFFFF",
        },
        djungleBlue: {
          "50": "#D6E6FF",
          DEFAULT: "#454bf7",
        },
        djungleBeige: {
          "50": "#fffefa",
          "200": "#fff2ab",
          DEFAULT: "#fffbe6",
        },
        djungleYellow: {
          DEFAULT: "#FFD700",
        },
        djungleBlack: {
          "50": "#e3e1e1",
          "100": "#474747",
          DEFAULT: "#171717",
        },
        djungleGreen: {
          "25": "#edf9e6",
          "50": "#e2f6d6",
          "100": "#C0EBA6",
          DEFAULT: "#347928",
        },
        djungleOrange: {
          "100": "#faf3de",
          "200": "#fade7d",
          DEFAULT: "#FCCD2A",
        },
        djunglePurple: {
          "100": "#FEEBFC",
          DEFAULT: "#C24FAE",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-container-break-out"),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
