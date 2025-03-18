/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [import("daisyui"), import('tailwind-scrollbar-hide')],
  daisyui: {
    styled: true,
    themes: ["night", "sunset", "abyss", "silk", "autumn", "garden"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
