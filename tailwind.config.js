/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // escaneia os ficheiros do React
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Azul moderno
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#9333EA", // Roxo vibrante
          light: "#A855F7",
          dark: "#7E22CE",
        },
        accent: {
          DEFAULT: "#F59E0B", // Amarelo para destaques
          light: "#FBBF24",
          dark: "#B45309",
        },
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#374151",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        strong: "0 8px 30px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        "xs": "480px", // breakpoint extra para mobile
      },
    },
  },
  plugins: [],
};
