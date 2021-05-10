# uinix-theme

[`uinix`][uinix] theme spec and utilties.

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

This document describes the [`uinix`][uinix] theme [specification](#spec).

`uinix-theme` does *not* provide an implementation of a [theme provider](#theme-providers), but provides guidance and requirements for building theme providers.  Readers may reference an example implementation of such a provider in the [`uinix-ui`][uinix-ui] project.

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Infra](#infra)
  - [CSS property](#css-property)
  - [CSS property value](#css-property-value)
  - [CSS keyframes rule value](#css-keyframes-rule-value)
  - [Theme property](#theme-property)
  - [Theme property value](#theme-property-value)
  - [Theme property definition](#theme-property-definition)
- [Spec](#spec)
  - [Theme](#theme)
  - [Theme mapping](#theme-mapping)
  - [Theme providers](#theme-providers)
- [Differences with `theme-ui`](#differences-with-theme-ui)
  - [Goals](#goals)
  - [Features](#features)
- [Typings](#typings)
- [Contribute](#contribute)
- [Related](#related)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Install

`uinix-theme` is an [ESM][] module requiring Node 12+.

```sh
npm install uinix-theme
```

## Usage

`uinix-theme` exports a single utility `createTheme` to create a [spec](#spec)-compliant [theme](#theme) object.

```js
import {createTheme} from 'uinix-theme';

const overrideTheme = {
  colors: {
    palette: { // Arbitrarily nestable theme definition
      red0: '##330000', // CSS theme value
      red1: '##aa0000',
      red2: '##bb0000',
    },
    brand: {
      primary: 'blue',
      active: 'purple',
    },
  },
  fontSizes: {
    xs: 12,
    s: 16,
    m: 20,
    l: 32,
    xl: 40,
  },
  keyframes: {
    opacities: {
      appear: { // Keyframe rule theme value
        '0%': { opacity: 'invisible' },
        '100%': { opacity: 'visible' },
      },
      reappear: {
        '0%': { opacity: 'invisible' },
        '50%': { opacity: 'visible' },
        '100%': { opacity: 'invisible' },
      },
    }
  },
  opacities: {
    invisible: 0,
    disabled: 0.3,
    interactive: 0.7,
    visible: 1,
  },
  spacings: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
  sizes: {
    icon: {
      s: 16,
      m: 24,
      l: 32,
    },
    widths: {
      container: ['100%', '100%', '768px'], // responsive values
    }
  },
};

console.log(createTheme(overrideTheme));
```

Yields

```json
{
  "animations": {},
  "borders": {},
  "borderStyles": {},
  "borderWidths": {},
  "colors": {
    "palette": {
      "red0": "##330000",
      "red1": "##aa0000",
      "red2": "##bb0000"
    },
    "brand": {
      "primary": "blue",
      "active": "purple"
    }
  },
  "fontFamilies": {},
  "fontSizes": {
    "xs": 12,
    "s": 16,
    "m": 20,
    "l": 32,
    "xl": 40
  },
  "fontWeights": {},
  "keyframes": {
    "opacities": {
      "appear": {
        "0%": {
          "opacity": "invisible"
        },
        "100%": {
          "opacity": "visible"
        }
      },
      "reappear": {
        "0%": {
          "opacity": "invisible"
        },
        "50%": {
          "opacity": "visible"
        },
        "100%": {
          "opacity": "invisible"
        }
      }
    }
  },
  "opacities": {
    "invisible": 0,
    "disabled": 0.3,
    "interactive": 0.7,
    "visible": 1,
  },
  "letterSpacings": {},
  "lineHeights": {},
  "opacities": {},
  "radii": {},
  "shadows": {},
  "sizes": {
    "icon": {
      "s": 16,
      "m": 24,
      "l": 32
    },
    "widths": {
      "container": ["100%", "100%", "768px"]
    }
  },
  "spacings": {
    "xs": 4,
    "s": 8,
    "m": 16,
    "l": 32,
    "xl": 64
  },
  "transforms": {},
  "transitions": {},
  "zIndices": {}
}
```

## API

### `themeMapping`

The `themeMapping` is a mapping informing how [theme properties](#theme-property) relate to their associated [CSS properties](#css-property).  [Theme providers](#theme-providers) may use this mapping to implement theme infrastructure consistent with the [spec](#spec).

### `createTheme([theme])`

Creates a [spec](#spec)-compliant [theme](#theme) object by deepmerging the provided theme with an empty default theme.  Does not mutate the provided theme.

## Infra

This section defines the fundamental concepts upon which this document is built.

### CSS property

This refers to CSS property names expresssed in JS notation.  The MDN [CSS Properties Reference][css-properties-reference] provides a common list of such properties.

#### Example
- `'backgroundColor'`
- `'borderLeft'`

### CSS property value

The CSS property value refers to the valid value associated with a [CSS property](#css-property).

Note that depending on the CSS-in-JS (e.g. [`emotion`][emotion]) implementation for CSS property values, other value formats maybe acceptable as well.  For example, `4px` and `4` are acceptable values for the `borderLeft` property.

For purposes of this documentation, we will only cover the minimal requirements of the spec, and remind that this value should reflect a meaningful CSS property value.

#### Example

The following examples are valid CSS property values to their corresponding [CSS property](#css-property).
- `'backgroundColor'`: `'red'`
- `'borderLeft'`: `'4px'`
- `'borderLeft'`: `4`

### CSS keyframes rule value

This value in JS notation should be an object reflecting the [`CSSKeyframesRule`][csskeyframesrule] used in CSS.

#### Example

In CSS,
```css
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

In JS notation,
```js
const slidein = {
  from: {
    transform: 'translateX(0%)'
  },
  to: {
    transform: 'translateX(100%)'
  },
}
```

### Theme property

The theme property is a variable associated with one or many [CSS properties](#css-property).  They form the keys of the [theme](#theme). Any value specified to a theme property may be applied to these associated CSS properties.

A theme property must be of `'string'` type.

#### Example

The following theme properties are associated with their corresponding CSS properties:
- `'colors'`: `'backgroundColor'`, `'borderColor'`, `'caretColor'`, ...
- `'spacings'`: `'margin'`, `'padding'`, `'top'`, `'right'`, `'bottom'`, `'left'`, ...

### Theme property value

A theme property value can assume the form of either:
- a singleton or array of [CSS property values](#css-property-value)
- a [CSS keyframes rule value](#css-keyframes-rule-value)

These values form the values of the [theme](#theme), and will be detailed in later section.

#### Example

The following are valid theme property values:
- `'4px'`, `4`, `'#ff0000'` (singletone CSS property value)
- `[4, 8, 12]` (array of CSS property values)
-
  ```js
  const slidein = {
    from: {
      transform: 'translateX(0%)'
    },
    to: {
      transform: 'translateX(100%)'
    },
  }
  ```
  (CSS keyframes rule value)


### Theme property definition

A theme property definition forms the values of the [theme](#theme), and is assigned to a [theme property](#theme-property).

A theme property definition can be arbitrarily nested, but should always resolve to a [theme value](#theme-value).

#### Example

```js
{
  spacings: { // theme property definition (unnested)
    s: '32px', // resolves to a theme value (singleton css property value)
    l: ['100%', '64px'], // resolves to a theme value (array of css property value)
    scale: { // theme property definition (nested)
      x0: 0, // eventually resolves to a theme value
      x1: 1,
      x2: 2,
      x3: 3,
    }
  }
}
```

## Spec

This spec is last updated on 2021-05-09.

This section outlines the specification for what constitutes a valid [theme](#theme) object, and provides guidance on the responsibilities of [theme-providers](#theme-providers)

### Theme

### Theme mapping

The theme mapping is a simple JSON-serializable JS object describing the mapping between [theme properties](#theme-property) and [CSS properties](#css-properties).  It provides a static way for [theme providers](#theme-providers) to reference this mapping.

The formal `themeMapping` can be referenced with this [link](lib/theme-mapping.js).

### Theme providers

## Differences with `theme-ui`

`uinix-theme`'s development and spec is largely inspired by [`theme-ui`][theme-ui], who first pioneered the formal notion of building constrained UI development against a theme spec.  For reference, `theme-ui`'s theme spec can be referenced with this [link][theme-ui-theme-spec].

While `uinix-theme` shares ideas and features with `theme-ui`, there are some differences, which are outlined below.

### Goals

The `uinix-theme` spec is a stricter spec than `theme-ui`'s, and deals only with the relationship between [theme properties](#theme-property) and [CSS properties](#css-property), with a consistent and strict enforcement on how [theme property values](#theme-property-value) are defined through [theme property definitions](#theme-property-definition).  `theme-ui`'s [spec][theme-ui-theme-spec] includes more concepts and features, such as `variants`, `styles`, `colors.modes`.

In summary, `theme-ui`'s spec is more comprehensive and convenient, while `uinix-theme`'s spec is more narrow and strict, and defers concepts unrelated to the [theme](#theme) spec to implementors.

### Features

The following table provides a summary of feature comparisons between `theme-ui` and `uinix-theme`'s theme spec:

| Theme key | `uinix-theme` | `theme-ui` | Comments
| --- | --- | --- | ---
| `animations` | yes | no |
| `fontFamilies` | yes | no | renamed, see `fonts`
| `keyframes` | yes | no |
| `spacings` | yes | no | renamed, see `space`
| `transforms` | yes | no |
| `breakpoints` | no | yes |
| `fonts` | no | yes | renamed, see `fontFamilies`
| `space` | no | yes | renamed, see `spacing`
| `styles` | no | yes |
| `variants` | no | yes |
| `colors.modes` | no | yes |

## Typings

`uinix-theme` ships with [Typescript][typescript] declarations, compiled and emitted when installed.

## Contribute

`uinix-theme` does *not* provide a *complete* theme spec.  The [CSS properties report][css-properties-report] provides a CSV report of [CSS properties](#css-property) supported by the theme [spec](#spec).

In general, not all CSS properties are immediately useful and are not included in the current theme [spec](#spec).  If you would like to suggest a new CSS property to be supported, please create an [issue][issue] and raise a discussion around the addition.

Other than that, any [pull requests][pull-request] are welcome!


## Related

- [`uinix-ui`][uinix-ui] - minimal primitives to build and compose rich UIs.
- [`fela`][fela] - plugin-centric library to build style systems.
- [`theme-ui`][theme-ui] - the first notable UI system to formally define interoperable system components against a [theme spec][theme-ui-theme-spec].

## Acknowledgements

The development of `uinix-theme` has been largely inspired and influenced by [`theme-ui`][theme-ui] and [`fela`][fela].

I (**[@chrisrzhou][]**) want to thank:
- **[@jxnblk][]** for his inspirational work over the years iterating on UI system libraries and toolings, from [`rebass`][rebass] to [`theme-ui`][theme-ui], providing ideas and the initial infra from which `uinix-theme` borrows heavily from.
- **[@robinweser][]** for his beautiful work on [`fela`][fela], which enables `uinix-theme` to be more specifically defined, since [`fela`][fela] and its ecosystem provided definitive proof that `uinix-theme`'s theme [spec](#spec) can be easily implemented by providers.
- **[@wooorm][]** for his extensive work and writings in open-source, from which I am endlessly and passively learning from.

## License

[MIT][license] © [Chris Zhou][@chrisrzhou]


<!-- badges -->
[build-badge]: https://github.com/uinix-js/uinix-theme/workflows/main/badge.svg
[build]: https://github.com/uinix-js/uinix-theme/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/uinix-js/uinix-theme.svg
[coverage]: https://codecov.io/github/uinix-js/uinix-theme
[downloads-badge]: https://img.shields.io/npm/dm/uinix-theme.svg
[downloads]: https://www.npmjs.com/package/uinix-theme
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-theme.svg
[bundle-size]: https://bundlephobia.com/acc?p=uinix-theme

<!-- defs -->
[@chrisrzhou]: https://github.com/chrisrzhou
[@jxnblk]: https://github.com/jxnblk
[@robinweser]: https://github.com/robinweser
[@wooorm]: https://github.com/wooorm
[author]: https://github.com/chrisrzhou
[css-properties-reference]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
[css-properties-report]: report/css-properties.csv
[csskeyframesrule]: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule
[emotion]: https://github.com/emotion-js/emotion
[esm]: https://nodejs.org/api/esm.html
[fela]: https://github.com/robinweser/fela
[issue]: https://github.com/uinix-js/uinix-theme/issues
[license]: license
[pull-request]: https://github.com/uinix-js/uinix-theme/pulls
[rebass]: https://github.com/rebassjs/rebass
[theme-ui]: https://github.com/system-ui/theme-ui
[theme-ui-theme-spec]: https://theme-ui.com/theme-spec
[theme-ui-responsive-styles]: https://theme-ui.com/getting-started/#responsive-styles
[typescript]: https://www.typescriptlang.org/
[uinix]: https://github.com/uinix-js
[uinix-ui]: https://github.com/uinix-js/uinix-ui
