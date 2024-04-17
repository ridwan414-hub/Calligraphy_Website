/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "valentine","lemonade"],
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],
}