# uinix-theme

[`uinix`][uinix] theme spec and utilties.

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

This document describes the [`uinix`][uinix] theme [specification](#spec) and associated utilities that `uinix-theme` exports.

`uinix-theme` does *not* provide an implementation of a [theme provider](#theme-providers), but provides guidance and requirements for building such providers.  Readers may reference an example implementation of such a provider in [`uinix-ui`][uinix-ui].

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
  - [Theme property path](#theme-property-path)
  - [Theme mapping](#theme-mapping)
- [Spec](#spec)
  - [Theme](#theme)
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
  animations: {
    infinite: '2s ease-in-out infinite',
  },
  colors: {
    palette: { // Arbitrarily nestable theme definition
      red0: '#330000', // CSS property value
      red1: '#aa0000',
      red2: '#bb0000',
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
      appear: { // CSS keyframes rule value
        '0%': { opacity: 'invisible' },
        '100%': { opacity: 'visible' },
      },
      reappear: {
        '0%': { opacity: 'invisible' },
        '50%': { opacity: 'visible' },
        '100%': { opacity: 'invisible' },
      },
    },
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
      container: '768px',
    },
  },
};

console.log(createTheme(overrideTheme));
```

Yields

```json
{
  "animations": {
    "infinite": "2s ease-in-out infinite"
  },
  "borders": {},
  "borderStyles": {},
  "borderWidths": {},
  "colors": {
    "palette": {
      "red0": "#330000",
      "red1": "#aa0000",
      "red2": "#bb0000"
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
      "container": "768px"
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

The `themeMapping` is a mapping informing how [theme properties](#theme-property) relate to their associated [CSS properties](#css-property).  [Theme providers](#theme-providers) may use this mapping to implement [theme](#theme) infrastructure consistent with the [spec](#spec).

### `createTheme([theme])`

Creates a [spec](#spec)-compliant [theme](#theme) object by deep-merging the provided theme with an empty default theme.  Does not mutate the provided theme.

## Infra

This section defines the fundamental concepts upon which this document is built.

### CSS property

This refers to CSS property names expresssed in JS notation.  The MDN [CSS Properties Reference][css-properties-reference] provides a common list of such properties.

#### Example
- `'backgroundColor'`
- `'borderLeft'`

### CSS property value

The CSS property value refers to the valid value associated with a [CSS property](#css-property).

> Note: Depending on the CSS-in-JS implementation (e.g. [`emotion`][emotion]) for CSS property values, other value formats maybe acceptable as well.  For example, `4px` and `4` are acceptable values for the `borderLeft` property.  For purposes of this documentation, we will only cover the minimal requirements of the spec, and remind that this value should reflect a meaningful CSS property value.

#### Example

The following examples are valid CSS property values for their corresponding CSS properties:
- `'backgroundColor'`: `'red'`
- `'borderLeft'`: `'4px'`
- `'borderLeft'`: `4`

### CSS keyframes rule value

This value in JS notation should be an object reflecting the [`CSSKeyframesRule`][csskeyframesrule] defined in CSS.

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

The theme property is a string variable that relates to one or many [CSS properties](#css-property).  They form the keys of the [theme](#theme). Any [CSS property value](#css-property-value) specified for a theme property is consequently applied to these associated CSS properties.

#### Example

The following theme properties are associated with their corresponding CSS properties:
- `'colors'`: `'backgroundColor'`, `'borderColor'`, `'caretColor'`, ...
- `'spacings'`: `'margin'`, `'padding'`, `'top'`, `'right'`, `'bottom'`, `'left'`, ...

### Theme property value

A theme property value can assume the form of either:
- a [CSS property value](#css-property-value)
- a [CSS keyframes rule value](#css-keyframes-rule-value)

These values form the values of the [theme](#theme), and will be detailed in a later section.

#### Example

The following are valid theme property values:
- a CSS property value: `'4px'`, `4`, `'#ff0000'`
- a CSS keyframes rule value:
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

### Theme property definition

A theme property definition forms the values of the [theme](#theme), and is assigned to a [theme property](#theme-property).

A theme property definition can be arbitrarily nested, but should always resolve to a [theme property value](#theme-property-value).

#### Example

```js
{
  spacings: { // theme property definition (unnested)
    s: '32px', // resolves to a theme value (singleton css property value)
    l: '64px',
    scale: { // theme property definition (nested once)
      x0: 0, // eventually resolves to a theme value
      x1: '4px',
      x2: '8px',
      x3: '12px',
      special: { // theme property definition (nested twice)
        half: '2px', // eventually resolves to a theme value
        thin: '1px'
      }
    }
  }
}
```

### Theme property path

A theme property path is a representation of the object key path for [theme property definitions](#theme-property-definition).

#### Example

Given the following theme property definition,

```js
const definition = {
  scale: {
    x0: 0,
    x1: '4px',
    x2: '8px',
    x3: '12px'
    special: {
      half: '2px',
      thin: '1px'
    }
  }
}
```

And an example method [`props`][props] which returns the value based on the property path of an object, we expect the following:

```js
props('scale')(definition); // definition.scale
props('scale.x0')(definition); // 0
props('scale.x1')(definition); // '4px'
props('scale.scale.special')(definition); // definition.scale.special
props('scale.scale.special.half')(definition); // '2px'
props('scale.invalid.property.path')(definition); // undefined
```

### Theme mapping

The theme mapping is a JSON-serializable JS object describing the mapping between [theme properties](#theme-property) and [CSS properties](#css-property).  It provides a static way for [theme providers](#theme-providers) to reference this relationship.

The formal `themeMapping` exported by `uinix-theme` and can be referenced with this [link](lib/theme-mapping.js).

## Spec

*Last updated on 2021-05-09.*

Definitions and concepts defined in the [Infra](#infra) section are referenced throughout this section.

This spec outlines the structure of a valid [theme](#theme) object, and provides guidance on the responsibilities of [theme-providers](#theme-providers).


### Theme

The theme acts as a central source of truth for organizing [theme property values](#theme-property-value) under [theme properties](#theme-property).

#### Structure

The theme is a JS object that must:
- be JSON-serializable.
- contain [theme properties](#theme-property) defined by the [theme mapping](#theme-mapping) as the object keys.
- contain [theme property definitions](#theme-property-definition) that resolve into [theme property values](#theme-property-value) as the object values.  The following additional restrictions must be applied as well:
  - The [theme-property-values](#theme-property-value) for the `keyframes` [theme-property](#theme-property) must take the form of a [CSS keyframes rule value](#css-keyframes-rule-value).
  - The [theme-property-values](#theme-property-value) for any other non-`keyframes` [theme-property](#theme-property) must *not* take the form of a [CSS keyframes rule value](#css-keyframes-rule-value), and can be any other forms that a [theme-property-value](#theme-property-value) can take.

An example of a spec-compliant theme object, with comments, is provided below:

```js
const theme = { // must contain all theme properties defined in themeMapping
  animations: { // unnested theme property definition
    infinite: '2s ease-in-out infinite', // resolved theme property value (a valid CSS property value)
  },
  borders: {}, // empty theme property definition
  borderStyles: {},
  borderWidths: {},
  colors: {
    palette: { // nested theme property definition
      red0: "#330000", // resolved theme property value (a valid CSS property value)
      red1: "#aa0000",
      red2: "#bb0000",
    },
    brand: {
      primary: "blue",
      active: "purple",
    },
  },
  fontFamilies: {},
  fontSizes: {
    xs: 12,
    s: 16,
    m: 20,
    l: 32,
    xl: 40,
  },
  fontWeights: {},
  keyframes: {
    opacities: { // nested theme property definition
      appear: { // resolved theme property value (a valid CSS keyframes rule value)
        "0%": {
          opacity: "invisible",
        },
        "100%": {
          opacity: "visible",
        },
      },
      reappear: { // resolved theme property value (a valid CSS keyframes rule value)
        "0%": {
          opacity: "invisible",
        },
        "50%": {
          opacity: "visible",
        },
        "100%": {
          opacity: "invisible",
        },
      },
    },
  },
  opacities: {
    invisible: 0,
    disabled: 0.3,
    interactive: 0.7,
    visible: 1,
  },
  letterSpacings: {},
  lineHeights: {},
  opacities: {},
  radii: {},
  shadows: {},
  sizes: {
    icon: {
      s: 16,
      m: 24,
      l: 32,
    },
    widths: { // nested theme property definition
      container: "768px"
    },
  },
  spacings: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
  transforms: {},
  transitions: {},
  zIndices: {},
};
```

### Theme providers

Providers must implement the requirements below so that programs can interact with the [theme](#theme) object defined in the earlier section.

#### Resolving themed styles

Providers must be able to resolve themed styles provided by consumers, into actual CSS styles that can be applied by browsers.

Providers should use the [theme mapping](#theme-mapping) to look up how [theme property values](#theme-property-value) are associated to the [CSS property](#css-property) specified by consumers.  Resolving themed styles provided through [theme property path](#theme-property-path) notation must be supported.

For example, given the following themed style referencing the [theme](#theme) object defined in the earlier section:

```js
const themedStyle = {
  animation: 'infinite',
  animationName: 'opacities.reappear',
  backgroundColor: 'palette.red1',
  fontSize: 'xl',
  padding: 's',
  ':hover': {
    color: 'brand.primary',
  },
}
```

Providers should resolve this into:

```js
const resolvedStyle = {
  animation: '2s ease-in-out infinite', // via "animations" theme property
  animationName: 'k1', // via "keyframes" theme property, and applying a generated keyframe name
  backgroundColor: '#aa0000', // via "colors" theme property
  fontSize: '40px', // via "fontSizes" theme property
  padding: '8px', // via "spacings" theme property
  ':hover': {
    color: 'blue', // via "colors" theme property
  },
}

const k1 = { // generated keyframes rule object
  '0%': { opacity: 'invisible' },
  '50%': { opacity: 'visible' },
  '100%': { opacity: 'invisible' },
}
```

#### Responsive values
A themed style provided by consumers may be specified in array form.  Providers should take this as an indication to apply responsive styles.  Providers should also expose a way for consumers to specify breakpoints, so that these values can match up accordingly with the breakpoints.

For example, given a themed style referencing the [theme](#theme) object defined in the earlier section:

```js
const themedStyle = {
  color: ['palette.red1', 'palette.red2', 'brand.primary'],
  width: ['100%', '100%', 'widths.container']
}
```

and breakpoints,

```js
const breakpoints = ['480px', '768px'];
```

Providers should resolve this into:
```js
const resolvedStyle = {
  color: '#aa0000',
  width: '100%',
  "@media (min-width: 480px)": {
    color: '#bb0000',
    width: '100%'
  },
  "@media (min-width: 768px)": {
    color: 'blue',
    width: '768px',
  },
};
```

> Note: The spec is unopinionated about the definition or structure of `breakpoints`, and only requires that responsive styles be specified as an array of [CSS property values](#css-property-value) matching these `breakpoints`.

#### Example

Please reference the [`uinix-ui`][uinix-ui] [system API][uinix-ui-system-api] for an example.

We also recommend checking out the [`fela`][fela] library on implementing style systems and providers.

## Differences with `theme-ui`

`uinix-theme`'s development and spec is largely inspired by [`theme-ui`][theme-ui], which formally pioneered the idea of constrained UI development against a theme spec.  `theme-ui`'s theme spec can be referenced with this [link][theme-ui-theme-spec].

While `uinix-theme` shares many ideas and features with `theme-ui`
s theme spec, there are some differences, which are outlined in the following sections.

### Goals

The `uinix-theme` spec is more strict than the [`theme-ui`][theme-ui] spec, and deals only with the relationship between [theme properties](#theme-property) and [CSS properties](#css-property), with a consistent and strict enforcement on how [theme property values](#theme-property-value) are defined through [theme property definitions](#theme-property-definition).  The [`theme-ui`][theme-ui] spec includes more concepts and features, such as `variants`, `styles`, `colors`.

The [`theme-ui`][theme-ui] spec is more comprehensive and convenient, while the `uinix-theme` spec is more strict and focused.  Concepts unrelated to [theme properties](#theme-property), [theme property values](#theme-property-value) and [theme property definitions](#theme-property-definition) are not included in the spec, and are deferred to implementors.

### Features

The following table summarizes spec feature differences between [`theme-ui`][theme-ui] and `uinix-theme`:

| Theme key | `uinix-theme` | `theme-ui` | Details
| --- | --- | --- | ---
| `animations` | yes | no |
| `fontFamilies` | yes | no | renamed (see `fonts`)
| `keyframes` | yes | no |
| `spacings` | yes | no | renamed (see `space`)
| `transforms` | yes | no |
| `breakpoints` | no | yes |
| `fonts` | no | yes | renamed (see `fontFamilies`)
| `space` | no | yes | renamed (see `spacings`)
| `styles` | no | yes |
| `variants` | no | yes |
| `colors.modes` | no | yes |

*Last updated on 2021-05-09.*

## Typings

`uinix-theme` ships with [Typescript][typescript] declarations, compiled and emitted when installed.  The source code is pure Javascript.

## Contribute

`uinix-theme` does *not* cover all CSS properties in the theme spec.  The [`css-properties-report.csv`][css-properties-report] file summarizes [CSS properties](#css-property) currently supported by the theme [spec](#spec).

In general, not all CSS properties are immediately useful, and are not included in the current theme [spec](#spec).  If you would like to suggest a new CSS property to be supported, please create an [issue][issue] and raise a discussion around the addition.

Other than that, any [pull requests][pull-request] are welcome!


## Related

- [`uinix-ui`][uinix-ui] - a minimal UI system to build UI systems.
- [`theme-ui`][theme-ui] - the first UI system library to formalizing building interoperable system components against a [theme spec][theme-ui-theme-spec].
- [`fela`][fela] - plugin-centric library to build style systems.

## Acknowledgements

The development of the `uinix` theme [spec](#spec) has been largely inspired and influenced by [`theme-ui`][theme-ui] and [`fela`][fela].

I (**[@chrisrzhou][]**) want to thank:
- **[@jxnblk][]** for his inspirational work over the years iterating on UI system libraries, from [`rebass`][rebass] to [`theme-ui`][theme-ui], providing ideas and approaches from which `uinix-theme` borrows heavily from.
- **[@robinweser][]** for his beautiful work on [`fela`][fela], which allows `uinix-theme` to be more narrowly implemented, since [`fela`][fela] and its ecosystem provided definitive proof that `uinix-theme`'s theme [spec](#spec) can be easily implemented by providers (e.g. in [`uinix-ui`][uinix-ui]).
- **[@wooorm][]** for his extensive work and writings in open-source, and being an endless source of inspiration on my journey of learning and self-improvement.

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
[props]: https://github.com/uinix-js/uinix-fp/blob/main/lib/props.js
[pull-request]: https://github.com/uinix-js/uinix-theme/pulls
[rebass]: https://github.com/rebassjs/rebass
[theme-ui]: https://github.com/system-ui/theme-ui
[theme-ui-theme-spec]: https://theme-ui.com/theme-spec
[typescript]: https://www.typescriptlang.org/
[uinix]: https://github.com/uinix-js
[uinix-ui]: https://github.com/uinix-js/uinix-ui
[uinix-ui-system-api]: https://github.com/uinix-js/uinix-ui/blob/main/lib/system/api.js
