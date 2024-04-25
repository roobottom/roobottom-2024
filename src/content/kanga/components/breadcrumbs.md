---
title: Breadcrumbs
---
I use breadcrumbs when a section has multiple levels; they help visitors find their way.

Generally, breadcrumbs should navigate users back to the top of the section, not home.

<example url='/kanga/example/components/breadcrumbs' height='100'>

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `classes` | string | Classes to add to the breadcrumbs container. |
| `items` | array | Required. The items to be shown in the breadcrumbs list. |
| `items.url` | string | Required. The URL for each item. |
| `items.title` | string | Required. The display title for each item. |