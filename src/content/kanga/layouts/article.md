---
title: Article
---
The article layout is used on article pages and diary posts. 

{% example '/kanga/example/layouts/article', '600' %}

## Simplified layout

Shown below is a simplied version of the example above.

``` {.language-html}
{% raw %}
<article class="article"> <!-- can be applied to the main tag, too -->
  
  <header class="article-header">
    Header items, like title, breadcrumbs, or summary text.
  </header>

  <footer class="article-footer">
    Tangentially connected information, like meta.
  </footer>

  <div class="article-content prose prose--flow">
    The article body.
  </div>

  <nav class="article-related">
    Related articles.
  </nav>

</article>
{% endraw %}
```