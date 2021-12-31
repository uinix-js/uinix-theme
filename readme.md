# uinix-theme

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

With `uinix-theme`, you can configure your own theme and specs for building UIs.

Your theme your rules 🤘.

## Contents
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`createTheme(theme, themeSpec)`](#createthemetheme-themespec)
  - [`defaultThemeSpec`](#defaultthemespec)
- [Glossary](#glossary)
  - [Theme](#theme)
  - [Theme spec](#theme-spec)
  - [Theme provider](#theme-provider)
- [Project](#project)
  - [Goals](#goals)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Related](#related)
  - [License](#license)

## Install

This package is [ESM-only] and requires Node 12+.

```sh
npm install uinix-theme
```

## Use

Create a theme based on a theme spec by providing a partial theme.

```js
import {createTheme} from 'uinix-theme';

const theme = {
  colors: {
    brand: '#f00',
    background: {
      primary: '#fff',
      secondary: '#ddd',
    },
  },
  spacings: {
    s: 8,
    m: 16,
    l: 32,
  },
  invalidProperty: 'will be dropped',
};

const themeSpec = {
  colors: ['backgroundColor', 'color'],
  opacities: ['opacity'],
  shadows: ['boxShadow', 'textShadow'],
  spacings: ['margin', 'padding'],
};

createTheme(theme, themeSpec);
/**
 * {
 *   colors: {
 *     brand: '#f00',
 *     background: {
 *       primary: '#fff',
 *       secondary: '#ddd',
 *     },
 *   },
 *   opacities: {},
 *   shadows: {},
 *   spacings: {
 *     s: 8,
 *     m: 16,
 *     l: 32,
 *   },
 * };
 */
```

## API

This package has no default export and exports the following identifiers:
- `createTheme`
- `defaultThemeSpec`

APIs are explorable via [JSDoc]-based [Typescript] typings accompanying the source code.

### `createTheme([theme, themeSpec])`

###### Parameters
- `theme` (`Theme`, optional) — Object of theme property and (nested) theme property definitions resolving to CSS values.
- `themeSpec` (`ThemeSpec`, optional) — Object of theme property and CSS properties.

###### Returns
- `Theme` — Returns a theme based on the provided `theme` and `themeSpec`.  Invalid theme properties not specified on the `themeSpec` are dropped out.

### `defaultThemeSpec`

###### Value
- `ThemeSpec` — The default [uinix][uinix-js] theme spec.

## Glossary

### Theme

A theme is a JS object that relates theme properties with CSS values.  The following is an example of organizing CSS color values under the `colors` theme property.

```js
const theme = {
  colors: {
    brand: '#f00',
    background: { // can be arbitrarily nested
      primary: '#fff',
      secondary: '#ccc',
    },
  },
};
```

With a theme, we can access CSS values statically without hardcoding them (e.g. `theme.colors.background.primary` instead of `'#f00'`).

We can whitelist CSS properties to be *theme-aware* using a theme spec, as detailed in the next section.

### Theme spec

A theme spec is a JS object that relates theme properties in a theme with CSS properties.

```js
const themeSpec = {
  colors: [
    'backgroundColor',
    'borderColor',
    'color',
  ],
};
```

In the example above, the CSS properties `backgroundColor`, `borderColor`, `color` would be aware of the CSS values defined in `theme.colors`.  The theme spec uses a whitelist strategy and unspecified CSS properties are not be theme-aware.

### Theme provider

A theme provider resolves themed styles into CSS styles based on the provided theme and theme spec.

For example, given the following `theme` and `themeSpec`,

```js
const theme = {
  colors: {
    brand: '#f00',
    background: { // can be arbitrarily nested
      primary: '#fff',
      secondary: '#ccc',
    },
  },
};

const themeSpec = {
  colors: [
    'backgroundColor',
    'borderColor',
    'color',
  ],
};
```

A `themeProvider` may resolve the following themed style into a valid CSS style:

```js
const themedStyle = {
  backgroundColor: 'background.primary',
  borderColor: 'brand',
  color: 'brand',
};

themeProvider.resolve(themedStyle);
/**
 * {
 *   backgroundColor: '#fff',
 *   borderColor: undefined, // not registered in themeSpec
 *   color: '#f00',
 * }
 */
```

> **Note:** `uinix-theme` does not implement a theme provider.  You may refer to [`uinix-ui`][uinix-ui] for an implementation.

## Project

`uinix-theme` is inspired by [`theme-ui`][theme-ui] but approaches UI theming in a fundamentally different way as detailed in the next section.

### Goals

`uinix-theme` aims to
- be fully configurable.  Your theme your rules 🤘.
- be JS-first.  APIs are framework-agnostic.  Just plain old Javascript.
- be simple.  There's not much to `uinix-theme` and it intends to stay update-free.
- adhere to the [Unix philosophy].  `uinix-theme` programs do one thing and one thing well.  Non-theme infra and APIs (e.g. resolving themed styles and variants) are not part of the project's responsibility.

### Version
`uinix-theme` adheres to [semver] starting at 1.0.0.

### Contribute
Install dependencies with `npm i` and run tests with `npm test`.  You can also run other NPM scripts (e.g. `lint`) from the root of the repo.

### Related
- [`uinix-js`][uinix-js]
- [`uinix-ui`][uinix-ui]
- [`theme-ui`][theme-ui]

### License

[MIT][license] © [Chris Zhou][author]

<!-- project -->
[author]: https://github.com/chrisrzhou
[license]: https://github.com/uinix-js/uinix-theme/blob/main/license
[build]: https://github.com/uinix-js/uinix-theme/actions
[build-badge]: https://github.com/uinix-js/uinix-theme/workflows/main/badge.svg
[coverage]: https://codecov.io/github/uinix-js/uinix-theme
[coverage-badge]: https://img.shields.io/codecov/c/github/uinix-js/uinix-theme.svg
[downloads]: https://www.npmjs.com/package/uinix-theme
[downloads-badge]: https://img.shields.io/npm/dm/uinix-theme.svg
[bundle-size]: https://bundlephobia.com/result?p=uinix-theme
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-theme.svg
[uinix-js]: https://github.com/uinix-js/
[uinix-ui]: https://github.com/uinix-js/uinix-ui

<!-- defs -->
[ESM-only]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[jsdoc]: https://github.com/jsdoc/jsdoc
[semver]: https://semver.org/
[typescript]: https://github.com/microsoft/TypeScript
[theme-ui]: https://github.com/system-ui/theme-ui
[unix philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy
