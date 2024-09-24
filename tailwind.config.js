/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lalezar: "Lalezar",
        VazirRegular: "Vazir Regular",
        VazirMedium: "Vazir Medium",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
      boxShadow: {
        custom: "0px 1px 10px rgba(0, 0, 0, 0.09)",
      },
      animation: {
        progress: "progress 4s linear forwards",
      },
      keyframes: {
        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      screens: {
        xs: "420px",
      },
      fontSize: {
        xxs: ["8px", "10px"],
      },
      backgroundImage: {
        "hero-pattern": "url('./../../public/images/hero3.jpg')",
        "category-pattern": "url('./../../public/images/category.jpg')",
        "login-pattern": "url('./../../public/images/lavender.jpeg')",
      },
      colors: {
        black: "#13101e",
        wheat: "#faebd7",
        teal: "#283F47",
        cadetblue: "#5F9EA0",
        orange: "#ff8c4b",
        darkslategray: "#293542",
        brown: "#6f4e37",
        green: "#15803d",
        silver: "#C0C0C0",
        blue: "#6495ED",
        lightblue: "#87cefa",
        palevioletred: "#be185d",
        lightgray: "#c0c2c9",
        red: "#b00020",
        lightgreen: "#4ade80",
        violet: "#E6E6FA",
        pink: "#FFC0CB",
        tint: "#639599",
        "modal-bg": "rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
  ],
};
