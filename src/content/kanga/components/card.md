---
title: Card
---
Cards are used to show preview content for things like articles or diary posts.

<example url='/kanga/example/components/card' height='440'>

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `classes` | string | Classes to add to the card container. |
| `cover` | object | Provide a cover object to show a background image. |
| `cover.url` | string | The URL for the cover image. |
| `cover.isCollage` | bool | Set to `true` if the cover appears in `collages.json`. |
| `title` | string | Required. The title of the entry. |
| `caption` | string | A caption for the title. |
| `summary` | string | A summary of the entry. |
| `url` | string | Required. The url of the entry. |
| `badge` | string | A decorative badge. Usually used to show the number of images in a dairy post. |
| `meta` | object | Provide metadate about the entry. |
| `meta.key` | title | The meta item title. |
| `meta.value` | title | The meta item value. |