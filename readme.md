# uinix-theme

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

Fully configurable theme system (theme spec, theme renderer, utilities) for building UIs.

Your theme your rules 🤘.

## Features

- Modern CSS-in-JS features
- Themable styles
- Responsive styles
- Fully configurable
- Framework-agnostic (JS-first)
- Update-free

## Contents

- [Install](#install)
- [Use](#use)
  - [Create a theme spec](#create-a-theme-spec)
  - [Create a theme](#create-a-theme)
  - [Create a theme renderer](#create-a-theme-renderer)
  - [Rendering style objects](#rendering-style-objects)
  - [Rendering style rules](#rendering-style-rules)
  - [Rendering responsive styles](#rendering-responsive-styles)
  - [Rendering atomic styles](#rendering-atomic-styles)
  - [Playground](#playground)
- [API](#api)
  - [`combineStyles(styles)`](#combinestylesstyles)
  - [`createTheme([theme][, themeSpec])`](#createthemetheme-themespec)
  - [`createThemeRenderer([options])`](#createthemerendereroptions)
  - [`defaultThemeSpec`](#defaultthemespec)
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

This section provides basic examples on using `uinix-theme`.  Please refer to the [§ API](#api) section for technical documentation.

### Create a theme spec

A theme spec is an object relating theme properties (keys) and CSS properties (values).

Import the default `uinix` theme spec with:

```js
import {defaultThemeSpec} from 'uinix-theme';

console.log(defaultThemeSpec)
```

Yields:

```js
const defaultThemeSpec = {
  'animations': ['animation'],
  'backgrounds': ['background'],
  ...
  'spacings': [
    ...
    'margin',
    'marginBlock',
    'marginBlockEnd',
    'marginBottom',
    ...
  ],
  ...
}
```

You can also create your theme specs and customize specific theme properties and CSS properties.

```js
const themeSpec = {
  colors: [
    'backgroundColor',
    'borderColor',
    'color',
  ],
  space: [
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
  ],
  ...
}
```

### Create a theme

A theme is an object relating theme properties (defined in a theme spec) to theme property definitions.  Theme property definitions can be arbitrarily nested to organize theme values.

Create a theme using a theme spec with:

```js
import {createTheme} from 'uinix-theme';

const theme = createTheme({}, themeSpec);

console.log(theme);
```

Yields an empty theme:

```js
const theme = {
  colors: {},
  space: {},
}
```

Or provide an initial theme to `createTheme` to create a compliant theme based on the provided theme spec:

```js
const theme = createTheme({
  colors: {
    brand: { // can be arbitrarily nested for organization.
      primary: 'red',
      link: 'blue',
    },
  },
  spaces: {
    s: 4,
    m: 8,
    l: 16,
  },
  unsupportedThemeProperty: {}
}, themeSpec);

console.log(theme);
```

Yields:

```js
const theme = {
  brand: {
    primary: 'red',
    link: 'blue',
  },
  space: {
    s: 4,
    m: 8,
    l: 16,
  },
  // unsupported theme properties not whitelisted in the theme spec are dropped.
};
```

### Create a theme renderer

A theme renderer provides ways to resolve themed styles based on the provided theme and theme spec, and render the resolved styles to the DOM.

Create and configure a theme renderer based on the provided theme and theme spec:

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  theme,
  themeSpec,
});
```

Initialize the theme renderer anywhere in your code with:

```js
renderer.render();
```

### Rendering style objects

Render a themed style object (modern CSS-in-JS features supported) with:

```js
const style = {
  color: 'brand.primary',
  padding: 'm',
  ':hover > a': {
    color: 'brand.link',
    padding: 's',
  },
};

renderer.renderStyle(style);
```

Yields the following rendered CSS

```css
.x {
  color: red;
  padding: 8px;
}
.x:hover > a {
  color: blue;
  padding: 4px
}
```

> **Note**: Themed styles are resolved by checking the theme values (e.g. `brand.primary`) against its assigned CSS properties (e.g. `color`).  The resolved style value is looked up in the provided `theme` (e.g. via `theme.colors`) and confirmed that the CSS property (e.g. `color`) is registered in the provided `themeSpec`.

### Rendering style rules

Render a themed style rule (function) with:

```js
const styleRule = (props) => ({
  color: props.isPrimary ? 'brand.primary' : 'black',
  padding: 'm',
});

renderer.renderStyle(styleRule, {isPrimary: true});
```

Yields the following rendered CSS

```css
.x {
  color: red;
  padding: 8px;
}
```

> **Note:** Style rules encourages modeling styles as a function of state, and improves composition and testing strategies.

### Rendering responsive styles

Responsive styles are easily supported by configuring the theme renderer appropriately.

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  responsiveBreakpoints: ['400px', '800px'],
  responsiveCssProperties: ['padding', 'margin'],
  theme,
  themeSpec,
});
```

Specify responsive styles for the provided breakpoints:

```js
const responsiveStyle = {
  color: ['black', 'brand.primary', 'brand.link'],
  margin: ['s', 'm', 'l'],
};
```

Yields the following rendered CSS

```css
.x {
  color: black;
  padding: 4px;
}

@media (min-width: 400px) {
  .x {
    padding: 8px;
  }
}

@media (min-width: 800px) {
  .x {
    padding: 16px;
  }
}
```

> **Note:** While `color` was specified in `responsiveStyle`, it is not resolved because it was not explicitly whitelisted in `options.responsiveCssProperties`.

### Rendering atomic styles

If you would like the renderer to render styles as [atomic CSS], configure this appropriately with:

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  enableAtomicCss: true,
  theme,
  themeSpec,
});

const style = {
  color: 'brand.primary';
  padding: 'm',
};
```

Yields the following rendered CSS

```css
.x {
  color: red;
}

.y {
  padding: 8px;
}
```

### Playground

Please visit the [Theme Playground] to play with `uinix-theme`!

## API

`uinix-theme` has no default export, and exports the following identifiers:

- `combineStyles`
- `createTheme`
- `createThemeRenderer`
- `defaultThemeSpec`

APIs are explorable via [JSDoc]-based [Typescript] typings accompanying the source code.

### `combineStyles(styles)`

Combines an array of style objects or rules and returns a single composed style rule.

##### Parameters

###### `styles` (`Array<StyleObject | StyleRule>`)

An array of `StyleObject` or `StyleRule`.

##### Returns

###### `StyleRule`
A single composed style rule.

##### Example

```js
const rule1 = props => ({
  fontSize: props.fontSize,
  color: 'red',
});

const rule2 = props => ({
  color: 'blue',
});

const combinedRule = combineRules([rule1, rule2]);
```

Effectively behaves as

```js
const combinedRule = props => ({
  fontSize: props.fontSize,
  color: 'blue',
});
```

### `createTheme([theme, themeSpec])`

Creates a validated theme object based on the provided theme and theme spec.  Theme properties not specified on the theme spec are considered invalid and are not included in the return value.

##### Parameters

###### `theme` (`Theme`, optional, default: `{}`)

An object relating theme properties (keys) and theme property definitions (values).

###### `themeSpec` (`ThemeSpec`, optional, default: `defaultThemeSpec`)

An object relating theme properties (keys) and CSS properties (values).

##### Returns

###### `Theme`
A validated theme object based on the provided theme spec.

### `createThemeRenderer([options])`

Creates a theme renderer to resolve themed styles based on the provided theme and theme spec, and render the resolved styles to the DOM.

##### Parameters

###### `options.enableAtomicCss` (`boolean`, optional, default: `false`)

Enables rendering styles as [atomic CSS].

###### `options.responsiveBreakpoints` (`Array<string>`, optional, default: `[]`)

Configure this to support responsive styling based on the provided breakpoints.  Breakpoints are min-width-based media queries.

###### `options.responsiveCssProperties` (`Array<string>`, optional, default: `[]`)

Responsive styling requires explicitly whitelisting CSS properties that should be *responsive-aware*.

###### `options.themeSpec` (`ThemeSpec`, optional, default: `defaultThemeSpec`)

Provide a custom theme spec.

###### `options.theme` (`Theme`, optional, default: `createTheme({}, defaultThemeSpec)`)

Provide a custom theme.

##### Returns

###### `ThemeRenderer`

Returns a renderer with methods to resolve and render themed/responsive styles to the DOM.

- `renderer.render()`: Initializes and renders the renderer to the DOM.
- `renderer.renderStyles(style[, props])`: Resolves and renders the provided style (object or rule).  Accepts optional props.
- `renderer.renderStaticStyles(style)`: Resolves and renders the provided static style object.

### `defaultThemeSpec`

The default `uinix` theme spec.

##### Value

###### `ThemeSpec`

## Project

### Origins

`uinix-theme` is inspired by [`theme-ui`][theme-ui], and borrows many ideas and principles from [`fela`][fela].

### Goals

`uinix-theme` aims to
- provide a functional, minimal, and configurable theming solution for framework-agnostic development.  Your theme your rules 🤘.
- adhere to the [uinix philosophy].

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
[uinix philosophy]: https://github.com/uinix-js#the-uinix-philosophy
[uinix-ui]: https://github.com/uinix-js/uinix-ui

<!-- defs -->
[atomic css]: https://css-tricks.com/lets-define-exactly-atomic-css/
[ESM-only]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[fela]: https://github.com/robinweser/fela
[jsdoc]: https://github.com/jsdoc/jsdoc
[semver]: https://semver.org/
[theme-ui]: https://github.com/system-ui/theme-ui
[theme playground]: https://uinix.dev/demos/theme-playground
[typescript]: https://github.com/microsoft/TypeScript
