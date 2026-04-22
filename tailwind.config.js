/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', 'Courier New', 'Courier', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}
