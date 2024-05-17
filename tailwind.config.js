/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js}",
    "./src/functions/**/*.js",],
  theme: {
    extend: {
      keyframes: {
        bounceTwice: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%, 80%': { transform: 'translateY(-10px)' },
          '40%, 60%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        bounceTwice: 'bounceTwice 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

