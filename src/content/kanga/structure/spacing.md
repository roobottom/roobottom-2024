---
title: Spacing
---
Spacing is calculated from minimum, `17`, and maximum, `21`, font sizes times a modifier. The spacing responds by a scale of `1.2` between viewport widths of `320` and `1100`.

| Size | Modifier | Min size @320 | Max size @1100 |
| :- | -: | -: | -: |
| xxs | 0.25 | 4.25 | 5.25 |
| xs | 0.50 | 8.50 | 10.50 |
| s | 1.00 | 17.00 | 21.00 |
| m | 2.00 | 34.00 | 42.00 |
| l | 3.00 | 51.00 | 63.00 |
| xl | 4.00 | 68.00 | 84.00 |
| xxl | 5.00 | 85.00 | 105.00 |

## Spacing classes

Spacing classes are available for all sizes and directions for padding and margin, in the following pattern:

```
.space--[type]-[direction]-[size]
```

For example, if you wanted to add `m` margin-top to an element, use the class:

```
.space--margin-top-m
```

There's also a special `all` direction, which adds margin or padding to the whole element. For example,

```
.space--padding-all-s
```

The following example gives a visual representation of the scale, using padding. 

{% example '/kanga/example/structure/spacing', '300' %}

## Spacing variables

Spacing variables are availabe for all sizes.

| Size | Variable |
| :- | :- |
| xxs | `var(--space-xxs)` |
| xs | `var(--space-xs)` |
| s | `var(--space-s)` |
| m | `var(--space-m)` |
| l | `var(--space-l)` |
| xl | `var(--space-xl)` |
| xxl | `var(--space-xxl)` |