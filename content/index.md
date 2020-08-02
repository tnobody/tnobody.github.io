---
layout: base
---

<ul>
{%- for post in collections.posts -%}
    <li>
        {{ post.data.title }}
    </li>
{%- endfor -%}
</ul>