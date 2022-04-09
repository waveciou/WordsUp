module.exports = {
  prefix: 'tw-',
  purge: {
    content: [
      './pages/*.{js,ts,jsx,tsx}',
      './components/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './styles/*.{scss,module.scss}',
    ],
  },
  theme: {
    screens: {
      mobile: '480px',
      mobile_space: `${480 + 30}px`,
      tablet: '768px',
      tablet_space: `${768 + 30}px`,
      develop: '1025px',
      develop_space: `${1024 + 30}px`,
    },
    extend: {},
  },
  plugins: [],
};
