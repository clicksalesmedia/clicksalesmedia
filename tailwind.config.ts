import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
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
    plugins: [
      require('flowbite/plugin'),
    ],
  },
};






export default config;
