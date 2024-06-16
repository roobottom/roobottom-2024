---
title: Links
---
## Styling links
Apply the class `link` to add the default link styling to any link element, for example:


``` {.language-html}
<a href="#" class="link">Example link</a>
```


## Less mixin
For more finegrain control over links, use the Less mixin.

``` {.language-less}
#type.style.link(@color, @focus, @hover, @underline)
```

| Variable | Description |
| :- | :- |
| `@color` | The colour of the link text and underline. The default is `var(--c-link)`. |
| `@focus` | The focus colour of the link text and outline colour. The default is `var(--c--link-focus)`. |
| `@hover` | The hover colour of the link text and underline. The default is `var(--c-link-hover)`. |
| `@underline` | Should the default state of this link have an underline? Either `underline` or `none`. The deafult is `underline`. |