/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"],
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {},
  plugins: [require("@tailwindcss/forms")],
};
