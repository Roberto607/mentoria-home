import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#dce9ff',
          200: '#b4d3ff',
          300: '#80b4ff',
          400: '#4b8dff',
          500: '#1f68e1',
          600: '#1a56c4',
          700: '#1646a0',
          800: '#133a84',
          900: '#112f6c',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
