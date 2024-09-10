/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
      fontFamily: {
          sans: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        '14-14': ['14px', '14px'],
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
          'Swap-gray': '#212121',
          'Swap-bg-gray': '#2E2E2E'
          },
      },
      inset: {
        '43': '43px',
        '1124': '1124px'
      },
      letterSpacing: {
        '3%': '-0.03em',
        '1%': '-0.01em'
      }
      },
      backgroundImage: {
        // eslint-disable-next-line quotes
        'mvx-white': "url('../multiversx-white.svg')"
      },
    },
    plugins: []
  };
  