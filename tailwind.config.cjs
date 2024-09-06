/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
      fontFamily: {
          sans: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        '14-19.6': ['14px', '19.6px'],
        '14-16': ['14px', '16px'],
        '16-24': ['16px', '24px'],
        '21-24': ['21px', '24px'],
        '32-32': ['32px', '32px'],
      },
      borderRadius: {
        'c99': '99px'
      },
      colors: {
          xExchange: {
          'Neutral/200': '#CDD0DB',
          'Neutral/300': '#9195A3',
          'Neutral/400': '#757985',
          'Neutral/500': '#60626D',
          'Neutral/750': '#2A2C34',
          'Neutral/850': '#1E1F25',
          'Neutral/900': '#14151A',
          'Confirm-blue': '#007CFF',
          'Max-bg-blue': '#1E65E733',
          'Max-blue': '#77DCFD',
          'Swap-gray': '#212121'
          },
      },
      width: {
        '15': '15px',
        '30': '30px',
        '34': '34px',
        '35': '35px',
        '46': '46px',
        '50': '50px',
        '54': '54px',
        '57': '57px',
        '58': '58px',
        '78': '78px',
        '61': '61px',
        '70': '70px',
        '77': '77px',
        '81': '81px',
        '80': '80px',
        '94': '94px',
        '98': '98px',
        '100': '100px',
        '114': '114px',
        '119': '119px',
        '127': '127px',
        '129': '129px',
        '139': '139px',
        '240': '240px',
        '255': '255px',
        '398': '398px',
        '446': '446px',
        '454': '454px',
        '534': '534px',
      },
      height: {
        '76': '76px',
        '124': '124px',
        // '176': '176px',
        '492': '492px',
        '540': '540px',
        '724': '724px',
      },
      inset: {
        '43': '43px',
        '1124': '1124px'
      },
      letterSpacing: {
        '3%': '-0.03em'
      }
      },
      backgroundImage: {
        // eslint-disable-next-line quotes
        'mvx-white': "url('../multiversx-white.svg')"
      },
    },
    plugins: []
  };
  