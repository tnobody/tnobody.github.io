const typographyPlugin = require('@tailwindcss/typography')

module.exports = {
  purge: {
    enabled: true,
    content: [
      './content/**/*.njk',
      './content/**/*.md',
      './content/**/*.html',
    ],
    options: {
      safelist: ["bg-yellow-200", "bg-green-200", "bg-blue-200", "bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-yellow-400", "bg-green-400", "bg-blue-400", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-yellow-600", "bg-green-600", "bg-blue-600", "bg-yellow-700", "bg-green-700", "bg-blue-700", "bg-yellow-800", "bg-green-800", "bg-blue-800", "bg-yellow-900", "bg-green-900", "bg-blue-900"]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    typography: [],
    extend: {},
  },
  plugins: [
    typographyPlugin
  ],
}
