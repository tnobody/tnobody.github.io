const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const postCss = require('postcss');
const CleanCSS = require('clean-css');
const tailwind = require('tailwindcss');
const readingTime = require('eleventy-plugin-reading-time');
const rollup = require('rollup')
const esbuild = require('esbuild')

module.exports = function (eleventyConfig) {

  // Content configuration

  eleventyConfig.addLayoutAlias('default', 'layouts/index.njk');
  eleventyConfig.addLayoutAlias('html', 'layouts/html.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('slides', 'layouts/slides.11ty.js');
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addFilter('format', date => {
    const d = date instanceof Date ? date : new Date(date);
    return Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(d)
  })
  eleventyConfig.addFilter('markdown', function (value) {
    let markdown = require('markdown-it')({
      html: true
    });
    return markdown.render(value);
  });

  eleventyConfig
    .addCollection("posts",
      collectionApi => collectionApi.getFilteredByGlob("content/blog/**/*.md")
    )

  eleventyConfig.addCollection("slides",
    collectionApi => collectionApi.getFilteredByTags("slide"))

  eleventyConfig.addPlugin(syntaxHighlight, {})

  // Asset configuration

  eleventyConfig.addWatchTarget("styles/**/*.css");
  eleventyConfig.addNunjucksAsyncFilter('esbuild', (jsFile, done) => {

    esbuild.build({
      entryPoints: [jsFile],
      bundle: true,
      write: false,
    }).then(result => {
      const reduced = result.outputFiles.reduce((combined, r) => combined + r.text, "")
      done(null,reduced)
    }, e => done(e, null))

  })
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    const cleanCss = new CleanCSS({})
    postCss([
        tailwind({
          purge: {
            enabled: true,
            content: [
              './content/**/*.njk',
              './content/**/*.md',
            ],
          },
          plugins: [
            require('@tailwindcss/typography')
          ],
          variants: {
            typography: [],
          },
        }),

      ]).process(cssCode)
      .then(r => {
        const result = cleanCss.minify(r.css)
        if (result.errors.length) {
          done(result.errors, null)
        } else {
          done(null, result.styles)
        }
      })
  })


};
