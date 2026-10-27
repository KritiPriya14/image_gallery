/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        ink: '#20231f',
        paper: '#f8f7f4',
        muted: '#777970',
        accent: '#e65f45',
      },
      boxShadow: {
        card: '0 12px 36px rgba(32, 35, 31, 0.07)',
      },
    },
  },
  plugins: [],
}
