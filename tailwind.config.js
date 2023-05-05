/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{html,svelte,js,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		  },
		colors: {
		gray: colors.coolGray,
		blue: colors.lightBlue,
		red: colors.rose,
		pink: colors.fuchsia,
		},
		fontFamily: {
		sans: ['Source Sans Pro', 'sans-serif'],
		serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				'128': '32rem',
				'144': '36rem',
			  },
			borderRadius: {
			'4xl': '2rem',
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
// tailwind.config.js


module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    }
  }
}

