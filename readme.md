# uinix-theme

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

Fully configurable framework-agnostic theme system (theme spec, theme, theme renderer) for building UIs.

Your theme your rules 🤘.

Visit the [Theme Playground] for interactive demos.

## Features

- Fully configurable theme system (theme spec, theme, theme renderer)
- Framework-agnostic
- Modern CSS-in-JS features
- Themable styles (including animations, images, filters)
- Responsive styles

## Contents

- [Install](#install)
- [Use](#use)
  - [Create a theme spec](#create-a-theme-spec)
  - [Create a theme](#create-a-theme)
  - [Create a theme renderer](#create-a-theme-renderer)
  - [Render style objects](#render-style-objects)
  - [Render style rules](#render-style-rules)
  - [Render responsive styles](#render-responsive-styles)
  - [Render atomic styles](#render-atomic-styles)
  - [Render static styles](#render-static-styles)
- [API](#api)
  - [`combineStyles(styles) => style`](#combinestylesstyles--style)
  - [`createTheme(theme?, themeSpec?) => theme`](#createthemetheme-themespec--theme)
  - [`createThemeRenderer(options?) => renderer`](#createthemerendereroptions--renderer)
- [Theme specs](#theme-specs)
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

This section provides basic examples on using `uinix-theme`.  Please refer to the [§ API](#api) section for comprehensive documentation.  You may visit the [Theme Playground] if you prefer an interactive exploration.

### Create a theme spec

A theme spec is an object relating theme properties (keys) and CSS properties (values).

You can import supported [theme specs](#theme-specs).

```js
import themeSpec from 'uinix-theme-spec';

console.log(themeSpec);
```

Yields:

```js
const themeSpec = {
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

Or, you can create your own theme spec by specifying the relationships of theme properties and CSS properties.

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

Yields an empty theme using the custom theme spec we created earlier.

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
  colors: {
    brand: {
      primary: 'red',
      link: 'blue',
    },
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

Initialize the theme renderer in a single entry point in your code.

```js
renderer.render();
```

### Render style objects

Render a themed style object with:

```js
// supports modern CSS-in-JS features (e.g. PostCSS selectors)
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

### Render style rules

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

> **Note:** This allows us to express styles as a simple functions of state, providing strategies for composition and testing.

### Render responsive styles

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

### Render atomic styles

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

Yields the following rendered atomic CSS classes

```css
.x {
  color: red;
}

.y {
  padding: 8px;
}
```

> **Note:** We recommend enabling atomic styles in production apps as a scalable solution to share CSS.  Disabling atomic styles in development is recommended to improve debugging experience.

### Render static styles

You can render static styles to the as global CSS styles with:

```js
const style = {
  body: {
    color: 'brand.primary',
    padding: 'm',
  },
  '*': {
    boxSizing: 'border-box',
  },
  'a:hover': {
    color: 'brand.link',
    padding: 's',
  },
};

renderer.renderStaticStyles(style);
```

> **Note:** `renderer.renderStaticStyles` currently does not support nested PostCSS selectors and this will be supported in the near future.  It still supports themed styles.

## API

`uinix-theme` has no default export, and exports the following identifiers:

- `combineStyles`
- `createTheme`
- `createThemeRenderer`

APIs are explorable via [JSDoc]-based [Typescript] typings accompanying the source code.

### `combineStyles(styles) => style`

Combines an array of style objects or rules and returns a single composed style rule.

##### Parameters

###### `styles` (`Array<StyleObject | StyleRule>`)

An array of `StyleObject` or `StyleRule`.

##### Returns

###### `style` (`StyleRule`)
A single composed style rule.

<details>
<summary>Example</summary>

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
</details>

### `createTheme(theme?, themeSpec?) => theme`

Creates a validated theme object based on the provided theme and theme spec.  Theme properties not specified on the theme spec are considered invalid and are not included in the returned theme.

##### Parameters

###### `theme` (`Theme`, optional, default: `{}`)

An object relating theme properties (keys) and theme property definitions (values).

###### `themeSpec` (`ThemeSpec`, optional, default: `{}`)

An object relating theme properties (keys) and CSS properties (values).

##### Returns

###### `theme` (`Theme`)
A validated theme object based on the provided theme spec.

### `createThemeRenderer(options?) => renderer`

Creates a theme renderer to resolve themed styles based on the provided theme and theme spec, and render the resolved styles to the DOM.

##### Parameters

###### `options.enableAtomicCss` (`boolean`, optional, default: `false`)

Enables rendering styles as [atomic CSS].

###### `options.responsiveBreakpoints` (`Array<string>`, optional, default: `[]`)

Configure this to support responsive styling based on the provided breakpoints.  Breakpoints are `min-width`-based media queries.

###### `options.responsiveCssProperties` (`Array<string>`, optional, default: `[]`)

Responsive styling requires explicitly whitelisting the corresponding responsive CSS properties.

###### `options.themeSpec` (`ThemeSpec`, optional, default: `{}`)

Provide a custom theme spec.

###### `options.theme` (`Theme`, optional, default: `createTheme()`)

Provide a custom theme.

##### Returns

###### `renderer` (`ThemeRenderer`)

Returns a theme renderer with methods to resolve and render themed/responsive styles to the DOM.

- `renderer.clear()`: Clears and removes all rendered CSS.
- `renderer.render()`: Initializes the renderer.
- `renderer.renderStyles(style, props?)`: Resolves and renders the provided style (object or rule).  Accepts optional props.
- `renderer.renderStaticStyles(style)`: Resolves and renders the provided static style object.

## Theme Specs

The following are theme-specs usable by `uinix-theme`.
- [`uinix-theme-spec`][uinix-theme-spec]: the default `uinix-theme` spec.
- [`uinix-theme-spec-theme-ui`][uinix-theme-spec-theme-ui]: the [`theme-ui`][theme-ui] spec usable in `uinix-theme`.

<details>
<summary>Example</summary>

```js
import {createTheme} from 'uinix-theme';
import themeSpec from 'uinix-theme-spec';

const theme = createTheme({
  colors: {
    brand: {
      primary: 'red',
      link: 'blue',
    },
  },
  spacings: {
    s: 4,
    m: 8,
    l: 16,
  },
}, themeSpec);

console.log(theme);
```

</details>

## Project

### Origins

`uinix-theme` is inspired by [`theme-ui`][theme-ui], and borrows many ideas and principles from [`fela`][fela].

### Goals

`uinix-theme`:
- adheres to the [uinix philosophy].
- aims to provide a functional, minimal, and configurable theming solution for framework-agnostic UI development.

### Version

`uinix-theme` adheres to [semver] starting at 1.0.0.

### Contribute

Node 18+ is required for development.

Install dependencies with `npm i` and run tests with `npm test`.  You can also run other NPM scripts (e.g. `lint`) from the root of the monorepo.

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
[uinix-theme-spec]: https://github.com/uinix-js/uinix-theme-spec
[uinix-theme-spec-theme-ui]: https://github.com/uinix-js/uinix-theme-spec-theme-ui
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
