import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-bg': '#171717',
        'primary': '#FF6B00',    // Vibrant orange
        'secondary': '#00B4D8',  // Bright blue
        'accent': '#FFB800',     // Warm yellow/gold
        'earth': {
          100: '#F5D0A9',  // Light terra cotta
          200: '#E6B17A',  // Sandy brown
          300: '#D2691E',  // Chocolate
          400: '#8B4513',  // Saddle brown
        },
        'nature': {
          100: '#90EE90',  // Light green
          200: '#228B22',  // Forest green
          300: '#006400',  // Dark green
          400: '#004225',  // Deep forest
        },
        'sunset': {
          100: '#FFE4B5',  // Moccasin
          200: '#FFA07A',  // Light salmon
          300: '#FF6347',  // Tomato
          400: '#8B0000',  // Dark red
        },
        'success': '#2ECC71',    
        'warning': '#F1C40F',    
        'error': '#E74C3C',      
        'gray': {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
