const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // ✅ Make sure app folder is included
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: isProd
        ? { primary: '#1e293b' }
        : { primary: '#4ade80' },
      fontFamily: {
        barlow: 'var(--font-barlow)',
        chewy: 'var(--font-chewy)',
        roboto: 'var(--font-roboto)',
      },
    },
  },
  plugins: [],
};
