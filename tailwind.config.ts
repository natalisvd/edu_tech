import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#03A473",
          accent: "#038f00",
          neutral: "#E0E0E0",
          "neutral-content": "BDBDBD",
          "base-100": "#fff",
          "base-200": "#E0E0E0",
          "base-300": "#5B5B5B",
          "base-content": "#363636",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#03A473",
          accent: "#038f00",
          neutral: "#232323",
          "neutral-content": "BDBDBD",
          "base-100": "#101010",
          "base-200": "#232323",
          "base-300": "#5B5B5B",
          "base-content": "#888"
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
