# uinix-theme

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

Fully configurable theme specs for building UIs.

Your theme your rules 🤘.

## Contents
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`createTheme(theme, themeSpec)`](#createthemetheme-themespec)
  - [`defaultThemeSpec`](#defaultthemespec)
- [Infrastructure](#infrastructure)
  - [Theme](#theme)
  - [Theme spec](#theme-spec)
  - [Theme provider](#theme-provider)
- [Project](#project)
  - [Origins](#origins)
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

See [§ Infrastructure](#infrastructure) for definitions, concepts, and components referenced throughout this section.

### `createTheme([theme, themeSpec])`

###### Parameters
- `theme` (`Theme`, optional) — Object of theme properties and (nested) theme property definitions resolving to CSS values.
- `themeSpec` (`ThemeSpec`, optional) — Object of theme properties and CSS properties.

###### Returns
- `Theme` — Returns a theme based on the provided `theme` and `themeSpec`.  Invalid theme properties not specified on the `themeSpec` are dropped out.

### `defaultThemeSpec`

###### Value
- `ThemeSpec` — The default [uinix][uinix-js] theme spec.

## Infrastructure

This section describes the definitions, concepts, and components used throughout the documentation.

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

### Origins

`uinix-theme` is originally inspired by [`theme-ui`][theme-ui], but its API is built to be simple, agnostic, and fully configurable. `uinix-theme` borrows many ideas and principles from [`fela`][fela].

### Goals

`uinix-theme` aims to
- be fully configurable.  Your theme your rules 🤘.
- be JS-first and framework-agnostic.  Just plain old Javascript.
- adhere to the [Unix philosophy].  Programs are modular and composable; do one thing; and do them well.
- be simple, clear and update-free.  No one enjoys keeping up with dependencies, and the project's ultimate goal is to arrive to a stable API.

### Version
`uinix-theme` adheres to [semver] starting at 1.0.0.

### Contribute
Install dependencies with `npm i` and run tests with `npm test` (Node 18 required).  You can also run other NPM scripts (e.g. `lint`) from the root of the repo.

### Related
- [`uinix-js`][uinix-js]
- [`uinix-ui`][uinix-ui]
- [`fela`][fela]
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
[fela]: https://github.com/robinweser/fela
[jsdoc]: https://github.com/jsdoc/jsdoc
[semver]: https://semver.org/
[typescript]: https://github.com/microsoft/TypeScript
[theme-ui]: https://github.com/system-ui/theme-ui
[unix philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy
