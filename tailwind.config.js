const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: isProd
        ? {
            primary: '#1e293b',
          }
        : {
            primary: '#4ade80',
          },
    },
  },
  plugins: [],
};
