/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0A0A1E",
        "glass-bg": "rgba(10, 10, 30, 0.5)",
        "neon-cyan": "#00F0FF",
        "neon-violet": "#8F00FF",
        "glow-blue": "rgba(0, 240, 255, 0.3)",
      },
      fontFamily: {
        sans: ['"Orbitron"', "sans-serif"],
        body: ['"Roboto Mono"', "monospace"],
      },
      boxShadow: {
        holographic:
          "0 0 15px rgba(0, 240, 255, 0.4), 0 0 5px rgba(0, 240, 255, 0.6)",
        "holographic-lg":
          "0 0 30px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.7)",
        "holographic-violet":
          "0 0 15px rgba(143, 0, 255, 0.4), 0 0 5px rgba(143, 0, 255, 0.6)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        booting: "booting 1s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        booting: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};