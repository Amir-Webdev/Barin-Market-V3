import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2AB5F6",
        "primary-dark": "#1994d6",
        secondary: "#EFF6FF",
        background: "#FFFFFF",
        surface: "#F1F5F9",
        "text-primary": "#1E293B",
        "text-secondary": "#64748B",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        border: "#E2E8F0",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [daisyui],
};
