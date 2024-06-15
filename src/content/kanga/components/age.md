---
title: Kid’s Age
---
In my diary, I show how old my kids were at the time of each post.

By passing a date of birth, post date, kid's name and an emoji, this component will display:

* How old the child is at the time of this post,
* or, how long it will be before they're born,
* or, that they were recently born (within the last month), and show a little emoji that depicts our family.

<example url='/kanga/example/components/age' height='160'>

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `dob` | string | Required. The kid's date of birth in ISO 8601 format. |
| `date` | string | Required. The post date in ISO 8601 format. |
| `name` | string | Required. The kid's name. |
| `emoji` | string | An emoji to show if the kid was recently born. |