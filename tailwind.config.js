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
        
        customblue:'#008DDA',
        customskyblue:'#41C9E2'
       
      },
    },
  },
  plugins: [],
}