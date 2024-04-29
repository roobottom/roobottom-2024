---
title: Prose
css: |
  .red { color: red; }
  .example-div { padding: var(--space-s); border: 1px solid var(--c-border); }
---
::: {.prose .prose--flow}
# An example Markdown file
This site uses [Markdown-it](https://github.com/markdown-it/markdown-it) to transform `.md` files into `.html` files.

Any text contained in an element with the class `prose` will inherit these styles. Adding `prose--flow` will set the horizontal spacing and sizing, ensuring the content's readability.

## Unordered lists

* Lists are supported using `+`, `*`, or `-`
  - nested lists are also supported
    + up to three levels deep
  - But, alas
* We must return to the top-level

## Ordered lists

1. Ordered lists are also supported
2. You can use numbers
1. Or keep using `1.`
1. Over and over again 

## Typographic replacements

Markdown-it will auto replace: 

* (c) copyright
* (r) registered
* (tm) trademark 
* (p) section marks
* +- plus/minus symbols

It will also fix sloppy typography:

* Adding an ellipsis from three dots...
* "Double quote" from straight quotes
* 'Single quotes' from straight single quotes

## Emphasis

* **bold**
* _italic_
* ~~strikethrough~~

## Blockquotes
> Quotes are styled to draw the reader's attention.

## Code
Inline `code` and blocks of code are supported, with highlighting via Prsim-js.

``` {.language-js}
const example = (items) => {
  content.map(item => console.log(item));
}
```

## Tables

| Name | Type | Weight (kg) |
| :- | :-: | -: |
| Flibble McGibb | Bantom | 1.76 |
| Rose Dough | Philbuster | 2.09 |
| General Henry | Pigmalion | 0.98 |

## Plugins

In addition to the standard Markdown-it transformation, this site also supports several plugins.

### Abbreviations
Using abbreviations can be confusing for the reader; these can be wrapped in `abbr` tags like CSS or GDS.

Uses [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr)

### Attributes
Sometimes, I need to add classes or other attributes to Markdown elements.

`this code is red`{.red}

Uses [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)

### Divs
Sometimes, I need to wrap Markdown elements in a div

::: {.example-div}
This paragraph is wrapped in a div
:::

Uses [markdown-it-div](https://github.com/kickscondor/markdown-it-div)

### Title anchors
Titles are automatically given an `id` so they can be linked to from elsewhere. For example, you can jump to [Title anchors](#title-anchors).

Uses [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 

:::

*[CSS]: Cascading Style Sheets
*[GDS]: Government Digital Service