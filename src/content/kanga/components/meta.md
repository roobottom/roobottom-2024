---
title: Meta
---
Display a list of meta-like data. Useful in article and diary posts.

<example url='/kanga/example/components/meta' height='200'>

**Note**: You should use the `subjects` component (as show in the example) to render a list of subjects.

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `items` | array | An array of items to add to the meta component. |
| `item.key` | string | The name or "key" of the item. |
| `cover.value` | HTML | The value of the item. |