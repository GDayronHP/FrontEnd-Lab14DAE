/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header : ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
