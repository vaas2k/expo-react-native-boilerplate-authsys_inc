/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont : ["Mont","sans-serif"],
        mont_semi : ["Mont-Semi",],
        mont_bold : ["Mont-Bold",],
      }
    },
  },
  plugins: [],
}

