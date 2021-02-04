---
sizes: [4,6,12]
---

{% for size in sizes %}
  <section data-auto-animate>
    <code data-id="utility">.w-{{size}}</code>
    <div data-id="effect" class="h-4 w-{{size}} bg-blue-500"></div>
  </section>
{% endfor %}
