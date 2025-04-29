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
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-gray-300',
    'bg-orange-300',
    'bg-pink-300',
    'bg-green-400',
    'bg-black',
    'bg-yellow-400',
    'max-w-100',
    'max-h-100',
    'max-w-50',
    'max-h-50',
  ],
} 