---
title: Img
isShortcode: true
source: https://github.com/roobottom/roobottom-com/blob/main/lib/shortcodes/img.js
---
Standalone images should be called using the `Img` component and never hardcoded in HTML. `Img` does some behind-the-scenes stuff to transform pictures and adds a unique security identifier required to call images from ImageKit.

{% example '/kanga/example/components/img', '400' %}

## Shortcode arguments

Call the shortcode like so:

```
{% raw %}{% img {
  url: '/path/to/img.jpg', 
  attrs: {
    key: 'value',
    key: 'value'
  },
  transform: 'named transform',
  isLocal: false
} %}{% endraw %}
```

| Argument | Type | Description |
| :- | :- | :- |
| `url` | string | The url of the image. |
| `attributes` | object | A set of key: value pairs to pass into the `img` tag as attributes. |
| `transform` | string | A transform name from the set of available [image transformations](#transformations) |
| `isLocal` | bool | Set to `true` to disable remote image fetching via ImageKit. Defaults to `false`. |

## Transformations

| Name | Properties |
| :-- | :-- |
| default | width: 780 |
| wide | width: 1200 |
| card | width: 410, height: 275 |
| og | width: 1280, height: 680 |
| square_large | width: 600, height: 600 |
| square_small | width: 420, height: 420 |
| square_tiny | width: 220, height: 220 |
| rss | width: 500 |
