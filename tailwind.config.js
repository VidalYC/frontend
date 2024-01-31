/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.config.js",
  ],
  theme: {
    extend: {
      extend: {
        backgroundImage: {
          app: "url('/img/02.jpeg')",
        },
        colors: {
          "vtd-primary": colors.blue,
        },
      },
    },
  },
  plugins: [],
};
