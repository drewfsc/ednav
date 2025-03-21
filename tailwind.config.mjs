import {plugin} from "mongoose";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
      import("daisyui"),
      plugin(function({ addUtilities }) {
        addUtilities({
          /* Chrome, Safari and Opera */
          ".scrollbar-hidden::-webkit-scrollbar": {
            display: "none",
          },
          ".scrollbar-hidden": {
            "scrollbar-width": "none" /* Firefox */,
            "-ms-overflow-style": "none" /* IE and Edge */,
          }
        })
      })
  ],
  daisyui: {
    styled: true,
    themes: ["night", "sunset", "abyss", "silk", "autumn", "garden"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
