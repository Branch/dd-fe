import type { Config } from "tailwindcss";

const config: Config = {
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
    colors: {
      white: {
        DEFAULT: "#FFFFFF",
      },
      djungleBlack: {
        DEFAULT: "#171717",
        100: "#474747",
        50: "#e3e1e1",
      },
      djungleGreen: {
        DEFAULT: "#347928",
      },
      djungleOrange: {
        DEFAULT: "#FCCD2A",
        100: "#faf3de",
      },
      djunglePurple: {
        DEFAULT: "#C24FAE",
        100: "#FEEBFC",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
