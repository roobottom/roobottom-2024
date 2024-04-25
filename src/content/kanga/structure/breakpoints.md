---
title: Breakpoints
---
For the most part, this site uses standard breakpoints that respond to the viewport width:

| Breakpoint name | Sizes |
| :- | -: |
| upto-min | <320 |
| min | >320 |
| mid | >520 |
| max | >980 |
| beyond-max | >1100 |

There are also special breakpoints if I need to restrict CSS to a certain viewport width: 

| Breakpoint name | Sizes |
| :- | -: |
| min-only | >320 <520 |
| mid-only | >520 <980 |
| max-only | >980 <1100 |

### Using the breakpoints in Less
Calling the breakpoints in Less can be done either nested, or wrapped, for example:

``` {.language-less}
//nested
.elemnet {
  text-size: var(--step-0);
  @media @bp[mid] {
    text-size: var(--step-1);
  }
}

//wrapped
@media @bp[mid] {
  .element {
    text-size: var(--step-1);
  }
}
```