---
title: Previous, Next
---
The Previous, Next component shows previous and next posts in a series. Useful for stepping through the diary.

{% example '/kanga/example/components/prevNext', '220' %}

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `classes` | string | Classes to add to the Previous, Next container.  |
| `label` | string | A label that helps screen reader users navigate; added to the `aria-label` of the Previous, Next container. |
| `prev` | object | The previous post object. |
| `next` | object | The next post object. |
| `[prev,next].title` | string | Required. The title of the previous or next group. |
| `[prev,next].url.link` | string | Required. The url of the previous or next item. |
| `[prev,next].url.title` | string | Required. The title of the previous or next item. |
| `[prev,next].date` | string | Required. The date of the previous or next item. |