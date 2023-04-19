/** @type {import('tailwindcss').Config} */
const size = {
	pageHeader: '64px',
	pageInner: '960px',
};

module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: {
				...size,
			},
			height: {
				pageHeader: size.pageHeader,
			},
			width: {
				pageInner: size.pageInner,
			},
			backgroundImage: {},
		},
	},
	plugins: [],
};
