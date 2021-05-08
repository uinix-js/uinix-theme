<h1>
  <span style="color:#0366d6;">ui</span><span style="color:#616d7b;">nix</span><span style="color:#98a1aa;">-theme</span>
</h1>

[`uinix`][uinix] theme spec and utilties.

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

This document defines the [`uinix`][uinix] theme [specification](#spec) and provides guidance for [theme providers](#theme-providers) building programs interoperating with the spec.

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Infra](#infra)
  - [CSS property](#css-property)
  - [CSS property value](#css-property-value)
  - [CSS keyframe at-rule](#css-keyframe-at-rule)
  - [Theme property](#theme-property)
  - [Theme property value](#theme-property-value)
- [Spec](#spec)
  - [Theme mapping](#theme-mapping)
  - [Theme property definition](#theme-property-definition)
  - [Theme](#theme)
- [Theme providers](#theme-providers)
- [`theme-ui`](#theme-ui)
  - [Goals](#goals)
  - [Features](#features)
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

`uinix-theme` exports a single utility `createTheme` to create a spec-compliant [theme](#theme) object.

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

Creates a spec-compliant [theme](#theme) object by deepmerging the provided theme with an empty default theme.  Does not mutate the provided theme.

## Infra

This section defines the fundamental concepts upon which this document is built.

### CSS property

### CSS property value

### CSS keyframe at-rule

### Theme property

### Theme property value

## Spec

### Theme mapping

### Theme property definition

### Theme

## Theme providers

## Differences with `theme-ui`

### Goals

### Features

## Contribute

## Related

- [`uinix-ui`][uinix-ui] - minimal primitives to build and compose rich UIs.
- [`fela`][fela] - plugin-centric library to build style systems.
- [`theme-ui`][theme-ui] - the first notable UI system to formally define interoperable system components against a [theme spec][theme-ui-theme-spec].

## Acknowledgements

The development of `uinix-theme` has been largely inspired and influenced by [`theme-ui`][theme-ui] and [`fela`][fela].

I (**[@chrisrzhou][]**) want to thank:
- **[jxnblk][]** for his inspirational work over the years iterating on UI system libraries and toolings, from [`rebass`][rebass] to [`theme-ui`][theme-ui], providing ideas and the initial infra from which `uinix-theme` borrows heavily from.
- **[robinweser][]** for his beautiful work on [`fela`][fela], which enables `uinix-theme` to be more specifically defined, since [`fela`][fela] and its ecosystem provided definitive proof that `uinix-theme`'s theme spec can be easily implemented by providers.

## License

[MIT][license] © [Chris Zhou][author]


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
[author]: https://github.com/chrisrzhou
[esm]: https://nodejs.org/api/esm.html
[css-reference]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
[fela]: https://github.com/robinweser/fela
[issue]: https://github.com/uinix-js/uinix-theme/issues
[license]: license
[pull-request]: https://github.com/uinix-js/uinix-theme/pulls
[rebass]: https://github.com/rebassjs/rebass
[theme-ui]: https://github.com/system-ui/theme-ui
[theme-ui-theme-spec]: https://theme-ui.com/theme-spec
[theme-ui-responsive-styles]: https://theme-ui.com/getting-started/#responsive-styles
[uinix]: https://github.com/uinix-js
[uinix-ui]: https://github.com/uinix-js/uinix-ui
