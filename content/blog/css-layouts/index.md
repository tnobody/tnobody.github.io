---
title: An intro to CSS Layouts for JS-Developers
layout: post
paperCSS: true
---

# {{ title }}

In last couple of years the need for frontend development - especially webdevelopment - emerges. Professional tooling, academical patters and cool new frameworks lured many developers from other fields to the world of webdevelopment. But there remains this on little big technology on the webstack which seems to never fit the mental model of "non-webdevelopers": CSS. While the most frameworks offers a variety of more or less complete UI-Components which encapsulates the complexity around styling, developers still facing the challenge of composing there components - or in other words layouting. In this article I'll give a brief overview of modern layouting techniques like Flexbox and Gridlayouts with an focus on the essential parts which I used often.

## Where it all starts

To understand why new technology emerges it's often a good take to look at the past and problems that "we" back in the days (you can skip this paragraph if know the relation of frames, tables and floats to layouts). I started with webdevelopment with framesets to layout a web page (damn time flies). Framesets are [deprecated](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frameset) for a while now so I'll not gonna say more about them. Also tables - next "big thing" after frames - are just worth a short mention. It was very simple to create more complex layouts with tables. The biggest issue with this approach is: Tables are elements to represent data not layouts. It was kinda ok when the web was only accessible via a single browser on desktop but then web 2.0 rises and also the semantic relations between webpages gain more attention. So people where going to (miss- ) use floats the place elements side-by-side. Since floats are meant to describe the floating of elements within a text rather than placing layout blocks. So webdevelopers always worked against the downsides of floats: Clearfixes, same heights and not to forget the lacking of good integration for responsive layouts. With all the experience made during the years the CSS Standard introduces Flexbox which was - as far as I know - the first layout focused CSS module.

## Flexbox

If you worked with tools like presentation tools (like PowerPoint) you might know the "arrange horizontal" or "arrange vertical" buttons which are a good mind model to understand the capabilities of flexbox. In CSS the display property `flex` (`display: flex`) defines the element as a _flexbox_ container. Within a _flexbox_ it's all about the relation between the actual flex element (container) and the arrangement / distribution of its _direct_ children (items). One of the first decisions for a flexbox container is wether it should arrange its items along the vertical or horizontal axis.

### Defining the item direction

This can be defined with the `flex-direction`, which defines wether the items are aligned along the vertical (`column`) or horizontal (`row`, which is the default value):

<div class="flex flex-col sm:flex-row sm:space-x-4">
<figure role="group " class="flex-1 flex flex-col justify-between">
  <div class="flex flex-row elevated">
    <div class="elevated-xl m-2 w-8 h-8"></div>
    <div class="elevated-xl m-2 w-8 h-8"></div>
    <div class="elevated-xl m-2 w-8 h-8"></div>
  </div>
  <figcaption>
    <code>{ flex-direction: row }</code>
  </figcaption>
</figure>
<figure role="group " class="flex-1 flex flex-col justify-between">
  <div class="flex flex-col elevated">
    <div class="elevated-xl m-2 w-8 h-8"></div>
    <div class="elevated-xl m-2 w-8 h-8"></div>
    <div class="elevated-xl m-2 w-8 h-8"></div>
  </div>
  <figcaption>
    <code>{ flex-direction: column }</code>
  </figcaption>
</figure>
</div>

In some other "Designsystems" this is referred as vertical/horizontal stacked layouts.

### Justifying and positioning the items


