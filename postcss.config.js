// This file is used to configure PostCSS, a tool for transforming CSS with JavaScript.
// It is commonly used with Tailwind CSS to process stylesheets.
// In this configuration, we are using two plugins:
// 1. '@tailwindcss/postcss' - This plugin integrates Tailwind CSS with PostCSS.
// 2. 'autoprefixer' - This plugin automatically adds vendor prefixes to CSS rules.
// This is useful for ensuring compatibility with different browsers.
// The configuration exports an object with a `plugins` property, which is an object containing the plugins to be used.
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
