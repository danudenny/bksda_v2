import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  safelist: [
    {
      pattern: /sonner-toast/,
    },
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
      animationDelay: {
        "2000": "2000ms",
        "4000": "4000ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
