/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#F7F7F5",
        mist: "#EEEEEA",
        dust: "#E4E4DE",
        mute: "#6B6B6B",
        line: "#D9D9D4",
        oxide: "#B5441C",
      },
      fontFamily: {
        sans: ["Geist Sans", "Inter", "Helvetica Neue", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        label: "0.16em",
        tightest: "-0.045em",
      },
      maxWidth: {
        page: "1440px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};
