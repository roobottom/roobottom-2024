---
title: Figure
isShortcode: true
---
Images with captions should be called with the Figure component. This component is designed for use within articles and diary posts. If you want to render a standalone image or need more fine-grain control, use the [Img component](/kanga/components/img/).

<example url='/kanga/example/components/figure' height='500'>

## Shortcode arguments

Call the shortcode like so:

```
<figure url="path/to/img.jpg" caption="The image caption" classes="classname classname" link="https://roobottom.com" transform="wide">
```

| Argument | Type | Description |
| :- | :- | :- |
| `url` | string | Required. The URL of the image. |
| `caption` | string | Required. The caption for the image. |
| `classes` | string | Classes to apply to the figure container. |
| `link` | string | A link for the image, if required.  |
| `transform` | string | A transform name from the set of available [image transformations](#image-transformations). Don't supply any transforms to render the original image.

## Special figure classes

There are special classes available for the figure component.

| Class name | Description | 
| :- | :- |
| `wide` | Images appear wider within a `prose` container. |
| `right` | Floats the image right. Applies a max-width of 50%. |
| `shadow` | A drop shadow is applied to the image. |
| `browser` | A browser frame is applied to the image. |

## Image transformations

This site uses a [middleware that utilises Sharp](https://github.com/roobottom/roobottom-2024/blob/master/lib/middleware/images.js) to resize images. You can pass the following keys into the `transform` option to call images with the associated arguments:

| Key | Argument | Notes |
| :- | :- | :- |
| `default` | resize=780, quality=90 | Passed as default to all images. Quality is only used for `jpg` or `webp`.  |
| `none` | | No adjustments are made. |
| `wide` | resize=1200, quality=90 | |
| `card` | resize=410,275 | For card components. |
| `og` | resize=1280,680 | For Open Graph images. |
| `square_large` | resize=600,600 | |
| `square_small` | resize=420,420 | |
| `square_tiny` | resize=220,220 | |
| `rss` | resize=500 | For RSS images. |