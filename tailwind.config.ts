import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#f2fcfb",
          "100": "#e4f7f5",
          "200": "#beede6",
          "300": "#96e0d4",
          "400": "#58ccb5",
          "500": "#21b692",
          "600": "#1aa37f",
          "700": "#128760",
          "800": "#0c6e48",
          "900": "#075230",
          "950": "#03361c",
        },
      },
    },
    plugins: [],
  },
};
export default config;
