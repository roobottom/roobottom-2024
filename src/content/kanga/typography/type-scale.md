---
title: Type scale
---
The type on this site is based on a fluid scale between two set points: a minimum viewport width of `320` and a maximum width of `1100`. Between these widths, the type responds in proportion to the scale of `1.2`. 

## Type scale classes
There are type scale classes that can be used to override text elements.

| Step | Class | Min size @320 | Max size @1100 |
|:--|:--|--:|--:|
| -2 | `.type-scale--2` | 11.81 | 14.58 |
| -1 | `.type-scale--1` | 14.17 | 17.50 |
| 0 | `.type-scale-0` | 17.00 | 21.00 |
| 1 | `.type-scale-1` | 20.40 | 25.20 |
| 2 | `.type-scale-2` | 24.48 | 30.24 |
| 3 | `.type-scale-3` | 29.38 | 36.29 |
| 4 | `.type-scale-4` | 35.25 | 43.55 |
| 5 | `.type-scale-5` | 42.30 | 52.25 |
| 6 | `.type-scale-6` | 50.76 | 62.71 |
| 7 | `.type-scale-7` | 60.91 | 75.25 |
| 8 | `.type-scale-8` | 73.10 | 90.30 |
| 9 | `.type-scale-9` | 87.72 | 108.36 |
| 10 | `.type-scale-10` | 105.26 | 130.03 |

{% example '/kanga/example/typography/type-scale', '400' %}

## Type scale CSS variables
Each step in the scale also had a CSS variable.

| Step | CSS variable |
|:--|--:|
| -2 | `var(--step--2)` | 
| -1 | `var(--step--1)` |
| 0 | `var(--step-0)` |
| 1 | `var(--step-1)` |
| 2 | `var(--step-2)` |
| 3 | `var(--step-3)` |
| 4 | `var(--step-4)` |
| 5 | `var(--step-5)` |
| 6 | `var(--step-6)` |
| 7 | `var(--step-7)` |
| 8 | `var(--step-8)` |
| 9 | `var(--step-9)` |
| 10 | `var(--step-10)` |

## Type ranges Less mixin

If there isn't a size in the scale that suits, there's also a type range mixin that allows mixing of steps:

``` {.language-less}
#type.steps(@minstep, @maxstep);
```

| Variable | Description |
|:- | :- |
| `@minstep` | A step on the scale -2 to 10. The text will be rendered at this size at the minimum viewport width of 320. |
| `@maxstep` | A step on the scale -2 to 10. The text will be rendered at this size at the maximum viewport width of 1100. |