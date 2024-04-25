---
title: Example
isShortcode: true
---
Inception alert! The example component is used in Kanga docs to show examples of components. It currently works with:

* Markdown `.md` files
* Nunjucks `.njk` files

The component will render the example in an iFrame at the specified height and extract the code into a `details`.

<example url='/kanga/example/components/example' height='350'>

## Shortcode arguments

Call the shortcode like so:

```
<example url="/url/of/example" height="300">
```

| Argument | Type | Description |
| - | - | - |
| `file` | string | Required. The file that contains the example code. Don't use the file extension; this will be auto-detected. Supports `.md` or `.njk` |
| `height` | string | The height of the iFrame. Defaults to 300. | 
