/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-gray-200',
    'bg-orange-200',
    'bg-pink-200',
    'max-w-100',
    'max-h-100',
    'max-w-50',
    'max-h-50',
    // ajoutez toutes les autres couleurs que vous utilisez
  ],
} 