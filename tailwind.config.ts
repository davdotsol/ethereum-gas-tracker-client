import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'navy-blue': '#142850',
        'dark-blue': '#27496D',
        'teal-blue': '#0C7B93',
        'sky-blue': '#00A8CC',
        'light-gray-blue': '#C1DADF',
      },
    },
  },
  plugins: [],
};
export default config;
