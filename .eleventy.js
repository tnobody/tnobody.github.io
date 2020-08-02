const postCss = require('postcss');
const tailwind = require('tailwindcss');

module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("styles/**/*.css");

  eleventyConfig.addLayoutAlias('default', 'layouts/index.njk');
  eleventyConfig.addNunjucksAsyncFilter('cssmin', (cssCode, done) => {
    postCss([
        tailwind({
          plugins: [
            require('@tailwindcss/typography')
          ]
        })
      ]).process(cssCode)
      .then(r => done(null, r.css), e => done(e, null))
  })
  
  eleventyConfig
    .addCollection("posts", 
      collectionApi => collectionApi.getFilteredByGlob("blog/**/*.md")
    )
};
