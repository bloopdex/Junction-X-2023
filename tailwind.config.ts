import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'popins': ['Poppins', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        'input': '#F2F2F2',
        'green_custom': '#21B692',
        'bg_custom': '#ECFBF1',
      },
    },
  },
  plugins: [],
} satisfies Config;
