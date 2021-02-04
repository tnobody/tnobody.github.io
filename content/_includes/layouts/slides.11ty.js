class Slides {
  data() {
    return {
      layout: 'html',
      "scripts": ["/app.js"],
      styles: ['/reveal-css/reveal.css', '/reveal-css/theme/black.css']
    }
  }

  render({
    collections,
    page,
    ...props
  }) {
    const slides = collections.slides
      .filter(({
        url: slideUrl
      }) => {
        console.log(slideUrl, page.url)
        return slideUrl.startsWith(page.url) && slideUrl !== page.url
      })


    return `
      <div class="reveal">
        <div class="slides">
          ${slides.map((p) => (`
            <section>${p.data.content}</section>
          `)).join("")}
        </div>
      </div>
    `

  }
}

module.exports = Slides
