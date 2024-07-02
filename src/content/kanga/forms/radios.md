---
title: Radios
---
<example url='/kanga/example/forms/radios' height='300'>

## Radios in a card

<example url='/kanga/example/forms/radios-cards' height='300'>

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `title` | string | Required. The title of the question. |
| `id` | string | Required. A unique identifier, passed as the `name` parameter. |
| `styleAsCards` | bool | Set to `true` to style radios as cards. |
| `items.id` | string | Required. A unique identifier for the item.  |
| `items.title` | string | Required. The title for each item. |
| `items.hint` | string | An optional hint for each item. |
| `items.header` | html | Optional html used when `styleAsCards === true`. |