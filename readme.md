# uinix-theme

Theme spec and utilities for building UIs with [uinix][uinix].

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

> This project is a work in progress and documentation is subject to change.

This library exports a `createTheme` utility to create a [spec-compliant](#theme-specification) [`Theme`](#theme) object.  The [`Theme`](#theme) object centralizes and provides a foundation for building and composing UI components and programs in the [`uinix`][uinix] ecosystem.

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [`createTheme([overrideTheme])`](#createthemeoverridetheme)
  - [`themeSpec`](#themespec)
- [Theme Specification](#theme-specification)
  - [How it works](#how-it-works)
  - [Differences with `theme-ui`](#differences-with-theme-ui)
- [Theme](#theme)
  - [Theme values](#theme-values)
  - [Breakpoints](#breakpoints)
  - [Font faces](#font-faces)
  - [Example](#example)
- [Theme Providers](#theme-providers)
- [Related](#related)

## Install

`uinix-theme` is an [ESM][] module requiring Node 12+.

```sh
npm install github:uinix-js/uninix-theme
```

> `uinix-theme` is in active development.  A formal NPM package will be released in the near future.  Please install from the Github repo for now.

## Usage

Use `createTheme` with an optional `overrideTheme` parameter to create a compliant [`Theme`](#theme).  The following example shows how to configure some theme properties (e.g. `breakpoints`, `colors`, `spacings`, `sizes`, `transitions`).

```js
import { createTheme } from 'uinix-theme';

const overrideTheme = {
  breakpoints: {
    phone: '320px',
    laptops: '1200px',
  },
  borders: {
    s: 2,
    m: 4,
    round: '100%',
    pill: '100vh',
  },
  colors: {
    palette: {
      red1: '#330000',
      red2: '#ff0000',
      // ...
    },
    brand: {
      primary: 'pink',
      active: 'purple',
      disabled: '#aaaaaa',
      // ...
    },
  },
  fontFamilies: {
    body: 'system-ui',
    heading: 'impact',
  },
  fontWeights: {
    light: 100,
    bold: 400,
    bolder: 700,
  },
  opacities: {
    disabled: 0.3,
    hover: 0.8,
  },
  shadows: {
    light: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  sizes: {
    icon: {
      s: 16,
      m: 20,
      l: 24,
    },
    containerWidth: 768
  },
  spacings: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
  transitions: {
    all: 'all 0.3s ease-in-out',
    allSlow: 'all 2s ease-in-out',
    opacity: 'opacity 2s ease-in-out',
  },
  zIndices: {
    modal: 10,
    tooltip: 11,
    max: 9999,
  },
};

createTheme(overrideTheme); // creates a compliant theme object
```

## API

Please refer to the [type definitions](./index.d.ts) for more details on interfaces.

### `createTheme([overrideTheme])`

Creates a [spec-compliant](#theme-specification) [`Theme`](#theme) object by merging with an optional `overrideTheme` object.

### `themeSpec`

An object codifying the [Theme Specification](#theme-specification).

## Theme Specification

> This spec borrows closely from [`theme-ui`'s theme specification][theme-ui-theme-spec] with some differences that are highlighted in a later subsection.

The `ThemeSpec` interface is best represented by the `themeSpec` object, which codifies the mapping of *theme properties* with *CSS properties*.

```js
const themeSpec = {
  animations: ['animation'],
  borders: [
    'border',
    'borderTop',
    'borderRight',
    'borderBottom',
    'borderLeft',
    'borderBlock',
    'borderBlockEnd',
    'borderBlockStart',
    'borderInline',
    'borderInlineEnd',
    'borderInlineStart',
  ],
  borderStyles: [
    'borderStyle',
    'borderTopStyle',
    'borderBottomStyle',
    'borderLeftStyle',
    'borderRightStyle',
    'borderBlockEndStyle',
    'borderBlockStartStyle',
    'borderBlockStyle',
    'borderInlineEndStyle',
    'borderInlineStartStyle',
    'borderInlineStyle',
  ],
  borderWidths: [
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderBlockEndWidth',
    'borderBlockStartWidth',
    'borderBlockWidth',
    'borderInlineEndWidth',
    'borderInlineStartWidth',
    'borderInlineWidth',
  ],
  colors: [
    'color',
    'backgroundColor',
    'borderColor',
    'caretColor',
    'columnRuleColor',
    'borderTopColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderRightColor',
    'outlineColor',
    'fill',
    'stroke',
  ],
  fontFamilies: ['fontFamily'],
  fontSizes: ['fontSize'],
  fontWeights: ['fontWeight'],
  keyframes: ['animationName'],
  letterSpacings: ['letterSpacing'],
  lineHeights: ['lineHeight'],
  opacities: ['opacity'],
  radii: [
    'borderRadius',
    'borderTopRightRadius',
    'borderTopLeftRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
    'borderEndEndRadius',
    'borderEndStartRadius',
    'borderStartEndRadius',
    'borderStartStartRadius',
  ],
  shadows: ['boxShadow', 'textShadow'],
  sizes: [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'flexBasis',
    'blockSize',
    'inlineSize',
    'maxBlockSize',
    'maxInlineSize',
    'minBlockSize',
    'minInlineSize',
  ],
  spacings: [
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginBlock',
    'marginBlockEnd',
    'marginBlockStart',
    'marginInline',
    'marginInlineEnd',
    'marginInlineStart',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingBlock',
    'paddingBlockEnd',
    'paddingBlockStart',
    'paddingInline',
    'paddingInlineEnd',
    'paddingInlineStart',
    'scrollPadding',
    'scrollPaddingTop',
    'scrollPaddingRight',
    'scrollPaddingBottom',
    'scrollPaddingLeft',
    'inset',
    'insetBlock',
    'insetBlockEnd',
    'insetBlockStart',
    'insetInline',
    'insetInlineEnd',
    'insetInlineStart',
    'top',
    'right',
    'bottom',
    'left',
    'gridGap',
    'gridColumnGap',
    'gridRowGap',
    'gap',
    'columnGap',
    'rowGap',
  ],
  transforms: ['transform'],
  transitions: ['transition'],
  zIndices: ['zIndex'],
};
```

### How it works

If an upstream theme provider specifies CSS properties with theme values, these properties can be evaluated against a [`Theme`](#theme) object, as demonstrated in the following example:

```js
const theme = {
  colors: {
    palette: {
      red0: '#330000',
      // ...
    },
  },
  opacities: {
    'hidden': 0,
    'visible': 1,
  },
  spacings: {
    xs: 4,
  },
  transitions: {
    opacity: 'opacity 0.3s ease-in-out',
  },
  // ...
};

const themedStyle = {
  backgroundColor: 'palette.red0',
  opacity: 'hidden',
  paddingLeft: 'xs',
  transition: 'opacity',
  ':hover': {
    opacity: 'visible',
  }
};

const evaluatedStyle = {
  backgroundColor: '#330000', // property registered to themeSpec.colors
  opacity: 0, // property registered to themeSpec.opacities
  paddingLeft: '4px', // property registered to themeSpec.spacings
  transition: 'opacity 0.3s ease-in-out', // property registered to themeSpec.transitions
  ':hover': {
    opacity: 1,
  },
};
```

### Differences with `theme-ui`
[`theme-ui`][theme-ui] pioneered and formalized the notion of theme-driven UI development.  The following highlights small differences between the two specs as of the time of this writing (April 2021):

| Theme key | `uinix-theme` | `theme-ui` |
| --- | --- | --- |
| `animations` | yes | no |
| `fontFamilies` | yes | no (see `fonts`) |
| `keyframes` | yes | no |
| `spacings` | yes | no (see `space`) |
| `fonts` | no | yes (see `fontFamilies`) |
| `space` | no (see `spacings`) | yes |
| `styles` | no* | yes |
| `variants` | no* | yes |
| `colors.modes` | no* | yes |

> *The `uinix-theme` theme spec is more strict, and only deals with mappings between theme properties and CSS properties.  These features are therefore implemented in upstream providers (e.g. [`uinix-ui`][uinix-ui]).

## Theme

The `Theme` object provides relevant data for a theme provider implementor to resolve theme values based on the mappings specified in the [Theme Specification](#theme-specification).

The `Theme` object has three main structural parts:
- [Theme values](#theme-values)
- [Breakpoints](#breakpoints)
- [Font faces](#font-faces)

The following keys need to exist on the `Theme` object for it to be well-formed.

```js
const defaultTheme = {
  // theme values
  animations: {},
  borders: {},
  borderStyles: {},
  borderWidths: {},
  colors: {},
  fontFamilies: {},
  fontSizes: {},
  fontWeights: {},
  keyframes: {},
  letterSpacings: {},
  lineHeights: {},
  opacities: {},
  radii: {},
  shadows: {},
  sizes: {},
  spacings: {},
  transforms: {},
  transitions: {},
  zIndices: {},
  // special
  breakpoints: {},
  fontFaces: {},
};
```

### Theme values

`Theme` values are assigned as nested objects and are termianted with CSS values:

```js
const theme = {
  colors: {
    palette: {
      red0: '#330000',
      red1: '#ff0000',
    },
    brand: {
      primary: 'blue',
      active: 'purple',
    },
  },
  sizes: {
    container: 768,
    icon: {
      s: 16,
      m: 20,
      l: 24,
    },
  },
  transitions: {
    all: 'all 0.3s ease-in-out',
    allSlow: 'all 2s ease-in-out',
  },
  // all other required keys
};
```

A CSS value is valid if it is compliant to the mapped CSS property defined in [`themeSpec`](#themespec).  The example above is compliant, while the following is not:

```js
const theme = {
  colors: {
    palette: {
      red0: '100px', // WRONG: this value is invalid for CSS properties in themeSpec.colors
    },
    brand: {
      primary: 'blue',
      active: 'purple',
    },
  },
  sizes: {
    container: 'purple', // WRONG: this value is invalid for CSS properties in themeSpec.sizes
    icon: {
      s: 16,
      m: 20,
      l: 24,
    },
  },
  transitions: {
    all: 'invalid-transition 0.3s ease-in-out', // WRONG: this value is invalid for CSS properties in themeSpec.transitions
    allSlow: 'all 2s ease-in-out',
  },
  // all other required keys
};
```

Theme values can be consumed in providers implementing the `uinix-theme` theme spec.  For example, a provider should evaluate the following themed style appropriately:

```js
const themedStyle = {
  color: 'brand.primary',
  transition: 'all',
  ':hover': {
    color: 'brand.active',
  },
};

const evaluatedStyle = {
  color: 'blue',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    color: 'purple',
  },
};
```

### Breakpoints

The `breakpoints` structure is an object that defines `min-width`-based media query breakpoints.  These values have to be defined as valid CSS width values and must be of type `'string'`.  Defining `breakpoints` enables defining responsive [Theme values](#theme-values) as an array, a pattern pioneered and popularized by [theme-ui][theme-ui-responsive-styles].

```js
const theme = {
  breakpoints: {
    phone: '320px',
    laptops: '1200px',
  },
  sizes: {
    container: ['100%', 768],
    icon: {
      s: [12, 12, 16],
      m: [16, 16, 20],
      l: [20, 20, 24]
    },
  },
  // all other required keys
};
```

### Font faces

> TODO: update

### Example

The following provides an example of styling a responsive `Card` component using a custom `Theme`.  We will skip details on the implementation of the `css` utility that resolves themed styles into CSS values, but we recommend checking out the [`uinix-ui`][uinix-ui] project for an example implementation of a theme `Provider`.

```jsx
const theme = {
  breakpoints: {
    phone: '320px',
    laptops: '1200px',
  },
  colors: {
    palette: {
      gray0: '#111',
      gray1: '#999',
      gray2: '#eee',
    },
  },
  fontFamilies: {
    body: 'system-ui',
    heading: 'impact',
  },
  fontSizes: {
    xl: 48
  },
  sizes: {
    icon: {
      s: [12, 12, 16],
      m: [16, 16, 20],
      l: [20, 20, 24],
    },
  },
  spacings: {
    s: 8,
    m: 16,
    l: 32,
  },
  // other required keys
};

// pseudocode demonstrating registering a theme to a provider,
// and having a utility to transform themed styles into evaluated styles
import { css, provider } from 'custom-theme-provider';
provider.register(theme);

const Card = ({ contents, title }) => {
  return (
    <div>
      <div
        className={css({ // styled via theme.spacings
          paddingBottom: 's',
          paddingLeft: 'l',
          paddingRight: 'l',
          paddingTop: 's',
        })}>
        <h2>{title}</h2>
        <div
          className={css({ // styled via theme.sizes and theme.colors
            color: 'palette.gray3',
            height: 'icon.m', // responsively styled via theme.sizes.icon
            width: 'icon.m',
          })}>
          <svg height="100%" width="100%">...</svg>
        </div>
      </div>
      <div
        className={css({ // responsively styled via theme.breakpoints and theme.spacings
          paddingBottom: ['s', 's', 'm'],
          paddingLeft: ['m', 'm', 'l'],
          paddingRight: ['m', 'm', 'l'],
          paddingTop: ['s', 's', 'm'],
        })}>
        {contents}
      </div>
    </div>
  );
};
```

## Theme Providers

Theme providers implement evaluating CSS properties based on the `ThemeSpec` and `Theme` constructs.  The `uinix` ecosystem implements a native `Provider`, made available in the [`uinix-ui`][uinix-ui] package.

## Related

- [`uinix-ui`][uinix-ui]
- [`theme-ui`][theme-ui]

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
[esm]: https://nodejs.org/api/esm.html
[theme-ui]: https://github.com/system-ui/theme-ui
[theme-ui-theme-spec]: https://theme-ui.com/theme-spec
[theme-ui-responsive-styles]: https://theme-ui.com/getting-started/#responsive-styles
[uinix]: https://github.com/uinix-js
[uinix-ui]: https://github.com/uinix-js/uinix-ui
