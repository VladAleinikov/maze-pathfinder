import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        tile: "7px",
        "tile-lg": "17px",
        "tile-md": "15px",
        "tile-xs": "8px",
      },
      height: {
        tile: "7px",
        "tile-lg": "17px",
        "tile-md": "15px",
        "tile-xs": "8px",
      },
    },
  },
  plugins: [],
};
export default config;
