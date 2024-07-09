import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
const svgToDataUri = require('mini-svg-data-uri');
const colors = require('tailwindcss/colors');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-gray': '#e2e8f0',
        primaryColor: '#272727',
        secondaryColor: '#C3A177',
        thirdColor: '#686868',
        whiteColor: '#F7F7F7',
        footerBgColor: '#222222',
      },
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
    // other theme settings
  },
  plugins: [
    addVariablesForColors,
    require('flowbite/plugin'),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
  ],
};

export default config;


