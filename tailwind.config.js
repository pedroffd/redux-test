/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        landingPage: "url('../public/images/background-landing.jpg')",
      },
    },
  },
  plugins: [],
}

