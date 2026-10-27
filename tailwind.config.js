/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Bricolage Grotesque', 'Manrope', 'sans-serif'],
      },
      colors: {
        ink: '#050a0a',
        ink2: '#0b1413',
        ink3: '#122020',
        lime: '#c8ff4d',
        aqua: '#4de8cf',
        sand: '#f3eee3',
        coral: '#ff7a5c',
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee 46s linear infinite reverse',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
      },
    },
  },
  plugins: [],
}
