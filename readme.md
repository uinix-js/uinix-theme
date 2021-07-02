# uinix-theme

[uinix] theme spec and utilties.

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

This document describes the [uinix] theme [specification](#spec) and associated utilities that **uinix-theme** exports.

**uinix-theme** does *not* provide an implementation of a [theme provider](#theme-providers), but provides guidance for building such providers.  Readers may reference an example implementation of such a provider in [uinix-ui][uinix-ui].

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [`themeMapping`](#thememapping)
  - [`createtheme([theme])`](#createthemetheme)
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
- [Related](#related)
- [Project](#project)
  - [Differences with theme-ui](#differences-with-theme-ui)
  - [Types](#types)
  - [Test](#test)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Install

**uinix-theme** is an [ESM] module requiring Node 12+.

```sh
npm install uinix-theme
```

## Usage

Use [`createTheme`](#createthemetheme) to create a [spec](#spec)-compliant [theme](#theme) object.

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
        '0%': {
          opacity: 'invisible',
        },
        '100%': {
          opacity: 'visible',
        },
      },
      reappear: {
        '0%': {
          opacity: 'invisible',
        },
        '50%': {
          opacity: 'visible',
        },
        '100%': {
          opacity: 'invisible'
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

**uinix-theme** ships with [Typescript] declarations, compiled and emitted when installed.  The Javascript source code is documented in [JSDoc].  These supplement the documentation in this section with an exploratory API through code.


### `themeMapping`

The `themeMapping` is an object describing the relationship between [theme properties](#theme-property) (keys) and [CSS properties](#css-property) (values).  [Theme providers](#theme-providers) may use this mapping to implement [theme](#theme) infrastructure consistent with the [spec](#spec).

### `createTheme([theme])`

Creates a [spec](#spec)-compliant [theme](#theme) object by deep-merging the provided partial theme with an empty default theme.  Does not mutate the provided theme.

## Infra

This section defines the fundamental concepts upon which this document is built.

### CSS property

This refers to CSS property names expresssed in JS notation.  The MDN [CSS Properties Reference] provides a common list of such properties.

<details>
<summary>Example</summary>

- `'backgroundColor'`
- `'borderLeft'`

</details>

### CSS property value

A CSS property value refers to a valid value associated with a [CSS property](#css-property).

> Note: Depending on the CSS-in-JS implementor (e.g. [emotion]), various value formats maybe valid.  For example, `4px` and `4` are acceptable values for the `borderLeft` property.  For purposes of this documentation, we will only assume common CSS values.

<details>
<summary>Example</summary>

The following examples are valid CSS property values for their corresponding CSS properties:
- `'backgroundColor'`: `'red'`
- `'borderLeft'`: `'4px'`
- `'borderLeft'`: `4`

</details>

### CSS keyframes rule value

This value in JS notation should be an object reflecting the [`CSSKeyframesRule`][csskeyframesrule] defined in CSS.

<details>
<summary>Example</summary>

Given the following `CSSKeyframesRule` in CSS:
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

we can express it equivalently in JS notation as:
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

</details>

### Theme property

A theme property is associated to one or many relating [CSS properties](#css-property).  This association can be easily visualized in the [`themeMapping`](#thememapping). Theme properties form the keys of the [theme](#theme) object.


<details>
<summary>Example</summary>

The following theme properties are associated with their corresponding CSS properties:
- `'colors'`: `'backgroundColor'`, `'borderColor'`, `'caretColor'`, ...
- `'spacings'`: `'margin'`, `'padding'`, `'top'`, `'right'`, `'bottom'`, `'left'`, ...

</details>

### Theme property value

A theme property value can assume the form of either:
- a [CSS property value](#css-property-value)
- a [CSS keyframes rule value](#css-keyframes-rule-value)

<details>
<summary>Example</summary>

The following are valid theme property values:
- CSS property value: `'4px'`, `4`, `'#ff0000'`
- CSS keyframes rule value:
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

</details>

### Theme property definition

A theme property definition defines a collection of [theme property values](#theme-property-value) for a [theme property](#theme-property).  A theme property definition can be arbitrarily nested, for convenient organizating of theme values, but should always resolve to a [theme property value](#theme-property-value).

<details>
<summary>Example</summary>

```js
{
  spacings: { // theme property definition (unnested)
    s: '32px', // resolves to a theme value (CSS property value)
    l: '64px',
    scale: { // theme property definition (nested once)
      x0: 0, // eventually resolves to a theme value (CSS property value)
      x1: '4px',
      x2: '8px',
      x3: '12px',
      special: { // theme property definition (nested twice)
        half: '2px', // eventually resolves to a theme value (CSS property value)
        thin: '1px'
      }
    }
  }
}
```

</details>

### Theme property path

A theme property path is the object key path for resolving [theme property value](#theme-property-value) in [theme property definitions](#theme-property-definition).

<details>
<summary>Example</summary>

Given the following theme property definition,

```js
const definition = {
  scale: {
    x0: 0,
    x1: '4px',
    x2: '8px',
    x3: '12px',
    special: {
      half: '2px',
      thin: '1px',
    },
  },
};
```

and a [`props`][props] returning the value based on the property path of an object, we expect the following values to be returned:

```js
props('scale')(definition); // definition.scale
props('scale.x0')(definition); // 0
props('scale.x1')(definition); // '4px'
props('scale.scale.special')(definition); // definition.scale.special
props('scale.scale.special.half')(definition); // '2px'
props('invalid.property.path')(definition); // undefined
```

</details>

### Theme mapping

The theme mapping is a JSON-serializable JS object describing the mapping between [theme properties](#theme-property) and [CSS properties](#css-property).  It provides a static way for [theme providers](#theme-providers) to reference this relationship.

See also the exported [`themeMapping`](#thememapping) identifier in [§ API](#api).

## Spec

*Last updated on 2021-05-09.*

Definitions and concepts defined in [§ Infra](#infra) are referenced throughout this section.

This spec outlines the structure of a valid [theme](#theme) object, and provides guidance on the responsibilities for [theme-providers](#theme-providers).


### Theme

The theme acts as a central source of truth for organizing [theme property values](#theme-property-value) under [theme properties](#theme-property).

The theme is a JS object that must:
- be JSON-serializable.
- contain as keys, [theme properties](#theme-property) defined by the [theme mapping](#theme-mapping).
- contain as values, [theme property definitions](#theme-property-definition) that resolve eventually into [theme property values](#theme-property-value).  The following additional requirements must be observed:
  - The [theme-property-values](#theme-property-value) for the `keyframes` [theme-property](#theme-property) must take the form of a [CSS keyframes rule value](#css-keyframes-rule-value).
  - The [theme-property-values](#theme-property-value) for any other non-`keyframes` [theme-property](#theme-property) must *not* take the form of a [CSS keyframes rule value](#css-keyframes-rule-value), and can be any other forms that a [theme-property-value](#theme-property-value) can take.

An example of a spec-compliant theme object, with guiding comments, is provided below:

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

Providers should implement the requirements below so that programs can interface meaningfully with the theme object, as described in [§ Theme](#theme).

#### Resolving themed styles

Providers should resolve themed styles into actual CSS styles that can be applied by browsers.

Providers should use the [theme mapping](#theme-mapping) to look up the [theme property values](#theme-property-value) associated to the [CSS properties](#css-property) defined on the themed style.  Resolving themed styles via [theme property path](#theme-property-path) notation should be supported.

<details>
<summary>Example</summary>

Given the following themed style referencing the [theme](#theme) object defined in the earlier section:

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

providers should resolve this into:

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
};

const k1 = { // generated keyframes rule object
  '0%': { opacity: 'invisible' },
  '50%': { opacity: 'visible' },
  '100%': { opacity: 'invisible' },
};
```

</details>

#### Responsive values
A themed style may contain values specified in array form.  Providers should take this as an indication to apply responsive styles.  Providers should also expose a way for consumers to specify breakpoints, so that these values can match up accordingly with the breakpoints.

> **Note:** The spec is unopinionated about the definition or structure of `breakpoints`, and only requires that responsive styles be specified as an array of [CSS property values](#css-property-value) matching these `breakpoints`.

<details>
<summary>Example</summary>

Given a themed style referencing the [theme](#theme) object defined in the earlier section:

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

</details>

## Related

- [uinix-ui] - A minimal framework-agnostic UI system to build UI systems.
- [theme-ui] - the first UI system library formalizing building interoperable system components against a [theme spec][theme-ui-theme-spec].
- [fela] - plugin-based library to build style systems.

## Project

### Differences with [theme-ui]

The theme [spec](#spec) and ideas in **uinix-theme** are primarily inspired by [theme-ui], which pioneered and popularized theme-driven UI development.  While **uinix-theme**'s theme spec shares many ideas and features with [theme-ui]'s theme spec, there are some differences, which are outlined in the following sections.

#### Goals

The **uinix-theme** theme spec is more strict than the [theme-ui] spec, and only deals with the relationship between [theme properties](#theme-property) and [CSS properties](#css-property), with a consistent and strict enforcement on how [theme property values](#theme-property-value) are defined through [theme property definitions](#theme-property-definition).  The [theme-ui] spec includes more concepts and features, such as `variants`, `styles`, `colors`; in **uinix-theme**, these features are not part of the theme spec and are deferred to implementors.

#### Features

The following table summarizes feature differences between [theme-ui] and **uinix-theme**:

| Theme key | **uinix-theme** | theme-ui | Details
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

*Feature comparison last updated on 2021-05-09.*

### Types

**uinix-theme** ships with [Typescript][typescript] declarations, compiled and emitted when installed.  The source code is pure Javascript.

### Test

Tests are authored in [tape].  Build, format, test, and check test coverage with `npm test`.

### Version
**uinix-theme** will adhere to [semver] starting from 1.0.0.

### Contribute
There are currently no formal contribution guidelines.  [Issues] and [pull requests][pull-requests] are welcome!

**uinix-theme** does *not* cover all CSS properties in the theme [spec](#spec).  The [`css-properties-report.csv`][css-properties-report] summarizes [CSS properties](#css-property) currently supported by the spec. If you would like to suggest a new CSS property to be supported, please create an [issue][issues] and raise any relating discussions.

### Acknowledgements

The development of **uinix-theme** and the [uinix] theme [spec](#spec) is largely inspired by ideas and concepts explored [theme-ui] and [fela].

I want to thank:
- [@jxnblk] for his inspirational work over the years iterating on UI system libraries, from [rebass] to [theme-ui], providing ideas and features that **uinix-theme** borrows from.
- [@robinweser] for his beautiful work on [fela], which provided an easy way to implement the ideas and features in **uinix-theme**.

### License

[MIT][license] © [Chris Zhou][@chrisrzhou]


<!-- project -->
[build-badge]: https://github.com/uinix-js/uinix-theme/workflows/main/badge.svg
[build]: https://github.com/uinix-js/uinix-theme/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/uinix-js/uinix-theme.svg
[coverage]: https://codecov.io/github/uinix-js/uinix-theme
[downloads-badge]: https://img.shields.io/npm/dm/uinix-theme.svg
[downloads]: https://www.npmjs.com/package/uinix-theme
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-theme.svg
[bundle-size]: https://bundlephobia.com/acc?p=uinix-theme
[issues]: https://github.com/uinix-js/uinix-theme/issues
[license]: license
[pull-requests]: https://github.com/uinix-js/uinix-theme/pulls

<!-- defs -->
[@chrisrzhou]: https://github.com/chrisrzhou
[@jxnblk]: https://github.com/jxnblk
[@robinweser]: https://github.com/robinweser
[@wooorm]: https://github.com/wooorm
[author]: https://github.com/chrisrzhou
[css properties reference]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
[css-properties-report]: report/css-properties.csv
[csskeyframesrule]: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule
[emotion]: https://github.com/emotion-js/emotion
[esm]: https://nodejs.org/api/esm.html
[fela]: https://github.com/robinweser/fela
[jsdoc]: https://github.com/jsdoc/jsdoc
[props]: https://github.com/uinix-js/uinix-fp/blob/main/lib/props.js
[rebass]: https://github.com/rebassjs/rebass
[semver]: https://semver.org
[tape]: https://github.com/substack/tape
[theme-ui]: https://github.com/system-ui/theme-ui
[theme-ui-theme-spec]: https://theme-ui.com/theme-spec
[typescript]: https://www.typescriptlang.org/
[uinix]: https://github.com/uinix-js
[uinix-ui]: https://github.com/uinix-js/uinix-ui
[uinix-ui-system-api]: https://github.com/uinix-js/uinix-ui/blob/main/lib/system/api.js
