/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayLight: "#E0E0E0",
        grayMedium: "#8A8A8A",
        grayDark: "#5C5C5C",
        grayDarker: "#515151",
        blackMuted: "#332E2E",
      },
    },
  },
  plugins: [],
};
