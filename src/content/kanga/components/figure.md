---
title: Figure
isShortcode: true
---
Images with captions should be called with the Figure component. This component is designed for use within articles and diary posts. If you want to render a standalone image or need more fine-grain control, use the [Img component](/kanga/components/img/).

{% example '/kanga/example/components/figure', '500' %}

## Shortcode arguments

Call the shortcode like so:

```
{% raw %}{% figure { 
  url: '/path/to/image.jpg', 
  caption: 'The image caption', 
  classes: 'classname', 
  link: 'https://roobottom.com',
  transform: 'wide',
  isLocal: false
} %}{% endraw %}
```

| Argument | Type | Description |
| :- | :- | :- |
| `url` | string | Required. The URL of the image. |
| `caption` | string | Required. The caption for the image. |
| `classes` | string | Classes to apply to the figure container. |
| `link` | string | A link for the image, if required.  |
| `transform` | string | A transform name from the set of available [image transformations](/kanga/components/img/#transformations) |
| `isLocal` | bool | Set to `true` to disable remote image fetching via ImageKit. Defaults to `false`. |