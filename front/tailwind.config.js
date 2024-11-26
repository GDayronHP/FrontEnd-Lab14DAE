/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header : ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#000000",
        primaryHover: "#141414",
        secondary: "#0f0f0f",
        secondaryHover: "#141414",
        tertiary: "#1d1d1d",
        tertiaryHover: "#222222",
      }
    },
  },
  plugins: [],
};
