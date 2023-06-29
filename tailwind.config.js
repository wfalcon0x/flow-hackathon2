/** @type {import('tailwindcss').Config} */
module.exports = {
  "content": [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  "theme": {
    "extend": {
      "colors": {
        "purple": "#57006a",
        "white": "#fff",
        "gray": {
          "100": "#010101",
          "200": "rgba(255, 255, 255, 0.22)"
        },
        "whitesmoke": {
          "100": "#f6f7f9",
          "200": "#eee"
        },
        "gainsboro": "#e3e3e3",
        "slategray": "#6b6f80",
        "darkgray": "#989aa2",
        "black": "#000"
      },
      "fontFamily": {
        "outfit": "Outfit",
        "neue-montreal": "'Neue Montreal'"
      },
      "borderRadius": {
        "21xl": "40px",
        "lg": "18px",
        "6xl": "25px"
      }
    },
    "fontSize": {
      "base": "16px",
      "xs": "12px",
      "lg": "18px"
    }
  },
  "corePlugins": {
    "preflight": false
  }
}