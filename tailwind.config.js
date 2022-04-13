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
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#333333',
      gray: '#c8c9cc',
      'gray-light': '#f5f5f5',
      green: '#1ea79d',
      'green-dark': '#168077',
      wine: '#a31621',
      brown: '#420c14',
      orange: '#f58f29',
      yellow: '#ffe464',
      'yellow-light': '#fcf8e3',
      'mark-red': '#f87171',
      'mark-green': '#4caf50',
    },
    fontSize: {
      xl: '32px',
      lg: '24px',
      md: '22px',
      base: '20px',
      sm: '18px',
      xs: '16px',
      xxs: '14px',
    },
    minWidth: {
      sm: '200px',
    },
    extend: {},
  },
  plugins: [],
};
