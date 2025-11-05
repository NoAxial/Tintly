/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0D0F11',
          secondary: '#111315',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.10)',
          lighter: 'rgba(255, 255, 255, 0.15)',
        },
        accent: {
          lavender: '#B7A9FF',
          teal: '#86D1C8',
          peach: '#FFB5A7',
          lime: '#C6F68D',
          sky: '#A7DFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Outfit', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(183, 169, 255, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
