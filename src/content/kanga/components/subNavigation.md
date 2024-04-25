---
title: Sub Navigation
---
The SubNavigation component displays a list of categories and navigation items. It will also neatly wrap itself up on smaller screens.

{% example '/kanga/example/components/subNavigation' %}

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `id` | string | Required. A unique identifier for the menu  |
| `title` | string | Required. A title that helps users identify the links in the menu. |
| `items` | object | Required. The navigation items object |
| `items.title` | string | Required. The section title |
| `items.items` | 11ty collection | Required. Pass a collection, all the items will be linked-to in this section.  |