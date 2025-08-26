/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // agar tum pages router use kar rahe ho
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",     // optional, agar app router bhi hai
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
