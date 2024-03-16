/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray2 :'#222831',
        customgray: '#31363F',
        white2:'#EEEEEE',
        hovercolor:'#76ABAE'
      },
    },
  },
  plugins: [],
}