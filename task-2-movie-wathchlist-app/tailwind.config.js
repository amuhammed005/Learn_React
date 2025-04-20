/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important for React
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#ffd100",
        "primary-light": "#ffee32",
        "bg-dark": "#060d17",
        "bg-light": "#333533",
        "text-dark": "#d6d6d6",
        "text-light": "#f7f7f7",
        "danger-dark": "#d90429",
        "danger-light": "#ef233c",
      },
    },
  },
  plugins: [],
};
