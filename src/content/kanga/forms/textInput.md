---
title: Text input
---
<example url="/kanga/example/forms/textInput" height='200'>

## A text input with an error
<example url="/kanga/example/forms/textInput-error" height='200'>

## Text area
<example url="/kanga/example/forms/textInput-textarea" height='300'>

## Nunjucks Macro parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `title` | string | Required. The title of the question. |
| `id` | string | Required. A unique identifier. |
| `hint` | string | A helpful hint to help the user answer the question. |
| `value` | string | A predefined value. |
| `error` | string | An error message. |
| `isTextarea` | bool | Render a textarea? |
| `inputmode` | string | Pass an [inputmode attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode). Doesn’t apply to a textarea. |