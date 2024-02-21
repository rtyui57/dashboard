/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primarycolor: "#0a4382", // Cambia este valor al color primario que deseas utilizar
      },
    },
  },
  plugins: [],
};
