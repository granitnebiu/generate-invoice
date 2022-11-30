/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "paper-bg": "url('/src/images/bg-logo.png')",
      },
      colors: {
        primary: "#EF4444",
      },
    },
  },
  plugins: [],
};
