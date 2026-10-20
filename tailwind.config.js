/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stone-50': '#F5F4F0',
        'surface': '#FFFFFF',
        'ink': '#1D1D1F',
        'brass-600': '#8A6A3B',
        'sage-600': '#5E7A6A',
        'graphite-500': '#6E6E73',
        'hairline': '#D2D2D7',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '60px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline': ['40px', { lineHeight: '44px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'title': ['28px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['17px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        'card': '18px',
        'input': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(29, 29, 31, 0.05)',
        'soft-lift': '0 8px 30px rgba(29, 29, 31, 0.08)',
        'modal': '0 20px 50px rgba(29, 29, 31, 0.12)',
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '16': '64px',
        '24': '96px',
      }
    },
  },
  plugins: [],
}
