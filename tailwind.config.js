/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'redcolor':'#e02828',
        'redhover-color':'#c41414',
        'bluecolor':'rgb(124, 124, 250)',
        'bluehover-color':'rgb(81, 81, 250)',
        'slatecolor':'slategray',
      }
    },
  },
  plugins: [],
}

