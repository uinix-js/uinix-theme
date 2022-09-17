# uinix-theme

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

Fully configurable framework-agnostic theme system (spec, theme, renderer, themed styles/keyframes/CSS variables) for building UIs.

Your theme your rules 🤘.

## Intro

uinix-theme provides a small set of APIs to build and maintain theme systems.  Key feature highlights:
- Framework-agnostic (works with any view library)
- Build-free (works directly in browsers)
- Fully configurable (anything is themable based on your spec)
- Themed styles (all CSS properties including `filters`, `animations`)
- Themed CSS keyframes
- Themed CSS variables
- Modern CSS-in-JS features
- Responsive styles
- Atomic CSS

To further explore uinix-theme, visit the [Theme Playground] for interactive demos, or read the [guides] at the official documentation website.

## Contents

- [Install](#install)
- [Use](#use)
  - [Create a theme spec](#create-a-theme-spec)
  - [Create a theme](#create-a-theme)
  - [Create a theme renderer](#create-a-theme-renderer)
  - [Render themed styles](#render-themed-styles)
  - [Render themed static styles](#render-themed-static-styles)
  - [Render themed CSS keyframes](#render-themed-css-keyframes)
  - [Configure and render themed atomic CSS](#configure-and-render-themed-atomic-css)
  - [Configure and render themed CSS variables](#configure-and-render-themed-css-variables)
  - [Configure and render themed responsive styles](#configure-and-render-themed-responsive-styles)
- [API](#api)
  - [`combineStyles(styles) => styleRule`](#combinestylesstyles--stylerule)
  - [`createCssVariables(theme?, options?) => cssVariables`](#createcssvariablestheme-options--cssvariables)
  - [`createTheme(theme?, themeSpec?) => theme`](#createthemetheme-themespec--theme)
  - [`createThemeRenderer(options?) => renderer`](#createthemerendereroptions--renderer)
- [Theme specs](#theme-specs)
- [Glossary](#glossary)
- [Project](#project)
  - [Origin](#origin)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Related](#related)
  - [License](#license)

## Install

This package is [ESM-only].

Install in Node 12+ with [npm]:

```sh
npm install uinix-theme
```

Install in [Deno] with [esm.sh]:
```js
import {...} from 'https://esm.sh/uinix-theme';
```

Install in browsers with [esm.sh]:
```html
<script type="module">
  import {...} from 'https://esm.sh/uinix-theme';
</script>
```

## Use

For a concise and interactive exploration of uinix-theme, please visit the [Theme Playground] or read the [guides] at the official documentation website.

The following sections provide a comprehensive overview of using uinix-theme.  Please refer to the [§ Glossary](#glossary) for definitions of *italicized terms* referenced throughout this document.

### Create a theme spec

A *theme spec* is an object relating *theme properties* (keys) and *CSS properties* (values).  It is used as a specification together with a *theme* to inform how *themed styles* should be resolved and rendered to CSS.

Import supported theme specs in the uinix ecosystem with:

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
    'margin',
    'marginBlock',
    'marginBlockEnd',
    'marginBottom',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    ...
  ],
  ...
}
```

You can create your own theme spec by specifying the relationships of theme properties and CSS properties.  This allows you to fully configure and manage your theme spec for your theme system.

```js
const themeSpec = {
  colors: [
    'backgroundColor',
    'borderColor',
    'color',
  ],
  // for example, you may want to split "spacings" into two explicit groups instead
  margins: [
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
  ],
  paddings: [
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
  ],
  ...
};
```

### Create a theme

A *theme* is an object relating *theme properties* with *CSS values* (can be arbitrarily nested). It provides a way to define and reference CSS values via *theme values*.

Create a theme using a *theme spec* with `createTheme`:

```js
import {createTheme} from 'uinix-theme';

const theme = createTheme({
  colors: {
    brand: { // can be arbitrarily nested for organization.
      primary: 'red',
      link: 'blue',
    },
  },
  paddings: {
    s: 4,
    m: 8,
    l: 16,
  },
  unsupportedThemeProperty: {}
}, themeSpec);

console.log(theme);
```

Yields a compliant theme based on the provided theme spec:

```js
const theme = {
  colors: {
    brand: {
      primary: 'red',
      link: 'blue',
    },
  },
  margins: {}, // every theme property in the theme spec is materialized if not specified.
  paddings: {
    s: 4,
    m: 8,
    l: 16,
  },
  // unsupported theme properties not whitelisted in the theme spec are dropped.
};
```

### Create a theme renderer

A *theme renderer* provides ways to resolve *themed styles* based on the provided *theme* and *theme spec*, and renders the resolved CSS to the DOM.

Create and configure a theme renderer based on the provided theme and theme spec with `createThemeRenderer`:

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  theme,
  themeSpec,
});
```

Initialize the theme renderer in a single entry point in your code to render CSS to the DOM.

```js
renderer.render();
```

### Render themed styles

Render a *themed style* object with `renderer.renderStyle`:

```js
const style = {
  color: 'brand.primary', // theme values are authored in JSONPath syntax based on their definitions in the theme.
  fill: 'rgba(0, 0, 0, 0.5)', // CSS values are also valid
  padding: 'm',
  ':hover': {
    '> a': {
      color: 'brand.link',
      padding: 's',
    }
  },
};

renderer.renderStyle(style);
```

Yields the following rendered CSS:

```css
.x {
  color: red;
  fill: rgba(0, 0, 0, 0.5);
  padding: 8px;
}
.x:hover > a {
  color: blue;
  padding: 4px
}
```

To express styles as a simple function of state and props, simply pass a *style rule* (function) to `renderer.renderStyle`:

```js
const styleRule = (props) => ({
  color: props.isPrimary ? 'brand.primary' : 'black',
  padding: 'm',
});

renderer.renderStyle(
  styleRule,
  {isPrimary: true}, // props for the provided style rule
);
```

Yields the following rendered CSS:

```css
.x {
  color: red;
  padding: 8px;
}
```

> **Note:** Please refer to the examples of *style* and *themed style* in the [§ Glossary](#glossary) for details on authoring CSS-in-JS styles and how the themed styles are resolved by the *theme renderer* using the provided *theme* and *theme spec*.

### Render themed static styles

You can render themed *static styles* to the global CSS styles with `renderer.renderStaticStyles`:

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

Yields the following global CSS styles:

```css
body {
  color: red;
  padding: 8px;
}
* {
  box-sizing: border-box;
}
a:hover {
  color: blue;
  padding: 4px;
}
```

### Render themed CSS keyframes

To render themed *CSS keyframes*, first ensure that the `themeSpec` is configured to register the `animationName` *CSS property* (we recommend using `keyframes` as the canonical theme property).

```js
const themeSpec = {
  ... // same keys/values in earlier examples.
  keyframes: ['animationName'],
};
```

Attach the *CSS keyframes* in JS object notation under the registered *theme property* (`keyframes`):

```js
const theme = {
  keyframes: {
    flicker: {
      '0%': {opacity: '0'},
      '50%': {opacity: '1'},
      '100%': {opacity: '0'},
    },
    spin: {
      circle: { // can be arbitrarily nested
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
};
```

We can now render and resolve themed CSS keyframes using appropriate CSS `animation` short-hand techniques:

```js
const style = {
  animation: '1s linear infinite', // CSS "animation" shorthand
  animationName: 'spin.circle', // overwrite the "animationName" CSS property with a theme value
};

renderer.renderStyle(style);
```

Yields the following CSS:

```css
.x {
  animation: 1s linear infinite;
  animation-name: k1; /* generated CSS keyframe based on the what is specified in theme.keyframes */
}
```

### Configure and render themed atomic CSS

If you would like the renderer to render themed styles as *atomic CSS*, configure this in `createThemeRenderer`:

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  enableAtomicCss: true,
  theme,
  themeSpec,
});

renderer.render();

const style1 = {
  color: 'brand.primary';
  padding: 'm',
};

const style2 = {
  color: 'brand.primary';
  padding: 'l',
};

renderer.renderStyle(style1);
renderer.renderStyle(style2);
```

Yields the following rendered atomic CSS classes:

```css
/* Every CSS property/value pair is generated as a unique CSS class. */
.x {
  color: red;
}

.y {
  padding: 8px;
}

.z {
  padding: 16px;
}
```

> **Note**: We recommend enabling atomic CSS in production as a scalable solution to share and reuse CSS class definitions across HTML elements. Disabling atomic styles in development is recommended to improve debugging experience.

### Configure and render themed CSS variables

If you prefer to work with *CSS variables* and would like to integrate CSS workstreams with uinix-theme, you can configure rendering the entire *theme* as CSS variables in the global style sheet.

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  enableCssVariables: true,
  theme,
  themeSpec,
});

renderer.render();

const staticStyles = {...}; // your other global styles

renderer.renderStaticStyles(staticStyles);
```

Yields the following rendered global CSS:

```css
:root {
  --colors-brand-primary: red;
  --colors-brand-link: blue;
  --paddings-s: 4px;
  --paddings-m: 8px;
  --paddings-l: 16px;
};
/* your other global styles */
```

In addition, this feature also attempts to resolve *themed styles* to use CSS variables whenever possible.

```js
const style = {
  backgroundColor: 'purple',
  color: 'brand.primary',
  margin: 'not.a.valid.theme.value',
  padding: 'm',
}

renderer.renderStyle(style);
```

Yields the following CSS:

```css
.x {
  background-color: purple; /* just a CSS value */
  color: var(--colors-brand-primary); /** resolves to a themed CSS variable */
  padding: var(--paddings-m); /** resolves to a themed CSS variable *./
  /* margin is not rendered as it cannot be resolved */
}
```

### Configure and render themed responsive styles

*Responsive styles* are easily supported by configuring the theme renderer appropriately to specify responsive breakpoints and whitelist CSS properties to be responsive-aware:

```js
import {createThemeRenderer} from 'uinix-theme';

const renderer = createThemeRenderer({
  responsiveBreakpoints: ['400px', '800px'], // min-width-based
  responsiveCssProperties: ['padding', 'margin'],
  theme,
  themeSpec,
});
```

Specify responsive styles for the provided breakpoints:

```js
const responsiveStyle = {
  color: ['black', 'brand.primary', 'brand.link'],
  padding: ['s', 'm', 'l'],
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

> **Note**: While `color` was specified in `responsiveStyle`, it is not resolved because it was not explicitly whitelisted in `options.responsiveCssProperties`.

## API

`uinix-theme` exports the following identifiers:
- `combineStyles`
- `createCssVariables`
- `createTheme`
- `createThemeRenderer`

There are no default exports.

Please refer to the [§ Glossary](#glossary) for definitions of *italicized terms* referenced throughout this document.

### `combineStyles(styles) => styleRule`

Combines an array of *style objects* or *style rules* and returns a single composed *style rule*.

##### Parameters

###### `styles` (`Array<StyleObject | StyleRule>`)

An array of `StyleObject` or `StyleRule`.

##### Returns

###### `styleRule` (`StyleRule`)
A single composed *style rule*.

<details>
<summary>Example</summary>

```js
import {combineRules} from 'uinix-theme';

const styleRule1 = props => ({
  fontSize: props.fontSize,
  color: 'red',
});

const styleRule2 = props => ({
  color: 'blue',
});

const combinedRule = combineRules([styleRule1, styleRule2]);
```

Effectively behaves as

```js
const combinedStyleRule = props => ({
  fontSize: props.fontSize,
  color: 'blue',
});
```
</details>

### `createCssVariables(theme?, options?) => cssVariables`

Creates an object of *CSS variables* using the provided *theme*.  CSS variables are named based on the *theme values* defined in the provided theme.

##### Parameters

###### `theme` (`Theme`, optional, default: `{}`)

See *theme* defined in [§ Glossary](#glossary).

###### `options.namespace` (`string`, optional, default: `''`)

Prepends a namespace prefix to every rendered CSS variable. Namespaces can only consist of `a-z0-9-_` (lowercase alphanumerals) and must begin with `a-z_`.

###### `options.themeSpec` (`ThemeSpec`, optional, default: `{}`)

See *theme spec* defined in [§ Glossary](#glossary).

By default, one does not typically need to provide a theme spec to create themed CSS variables.  However without a theme spec, `createCssVariables` will not have enough information to determine a few CSS property assumptions.  For example, `'px'`-based CSS properties assigned numeric values may not correctly be resolved to actual `px` values.  Supply a theme spec in such situations.

##### Returns

###### `cssVariables` (`Object`)
An object containing resolved *CSS variables*.

<details>
<summary>Example</summary>

Given the following `theme` and optional `namespace`,

```js
import {createCssVariables} from 'uinix-theme';

const theme = {
  colors: {
    brand: {
      primary: 'blue',
    },
  },
  spacings: {
    s: 4,
    m: 8,
    l: 16,
  },
};

const themeSpec = {
  colors: ['color'],
  spacings: ['margin', 'padding'],
};

const cssVariables = createCssVariables(theme, {namespace: 'uinix', themeSpec});
```

Yields the following CSS variables.

```js
const cssVariables = {
  '--uinix-colors-brand-primary': 'blue',
  // resolved to px values because a theme-spec is provided
  '--uinix-spacings-s': '4px',
  '--uinix-spacings-m': '8px',
  '--uinix-spacings-l': '16px',
};
```

</details>

### `createTheme(theme?, themeSpec?) => theme`

Creates a validated theme object based on the provided *theme* and *theme spec*.  *Theme properties* not specified on the theme spec are considered invalid and are not included in the returned object.

##### Parameters

###### `theme` (`Theme`, optional, default: `{}`)

See *theme* defined in [§ Glossary](#glossary).

###### `themeSpec` (`ThemeSpec`, optional, default: `{}`)

See *theme spec* defined in [§ Glossary](#glossary).

##### Returns

###### `theme` (`Theme`)
A validated theme object based on the provided theme spec.

<details>
<summary>Example</summary>

```js
import {createTheme} from 'uinix-theme';

const themeSpec = {
  colors: [
    'backgroundColor',
    'color'
  ],
  fontFamilies: [
    'fontFamily',
  ],
  fontSizes: [
    'fontSize',
  ],
  spacings: [
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
  ],
};

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
  unsupportedThemeProperty: {}
}, themeSpec);

console.log(theme);
```

Yields the following validated theme:

```js
const theme = {
  colors: {
    brand: {
      primary: 'red',
      link: 'blue',
    },
  },
  fontFamilies: {}, // materialized from themeSpec
  fontSizes: {}, // materialized from themeSpec
  spacings: {
    s: 4,
    m: 8,
    l: 16,
  },
  // unsupported theme properties are dropped
}
```
</details>

### `createThemeRenderer(options?) => renderer`

Creates a theme renderer to resolve *themed styles* based on the provided *theme* and *theme spec*, and render the resolved styles to the DOM.

##### Parameters
###### `options.enableAtomicCss` (`boolean`, optional, default: `false`)

Enables rendering styles as *atomic CSS*.

###### `options.enableCssVariables` (`boolean`, optional, default: `false`)

When enabled, will support *CSS variables* features in the `renderer` methods:
- `renderer.renderStaticStyles` will now render the `theme` as *CSS variables* under the `:root` pseudo class.
- `renderer.renderStyle` will now resolve *themed styles* into its corresponding *CSS variables*.

###### `options.namespace` (`string`, optional, default: `''`)

Prepends a namespace prefix to every rendered CSS classname, keyframe, and variable. Namespaces can only consist of `a-z0-9-_` (lowercase alphanumerals) and must begin with `a-z_`.

###### `options.responsiveBreakpoints` (`Array<string>`, optional, default: `[]`)

Configure this to support *responsive styles* based on the provided breakpoints.  Breakpoints are `min-width`-based media queries.

###### `options.responsiveCssProperties` (`Array<string>`, optional, default: `[]`)

Whitelist the corresponding responsive *CSS properties* to be responsive-aware.

###### `options.themeSpec` (`ThemeSpec`, optional, default: `{}`)

See *theme* defined in [§ Glossary](#glossary).

###### `options.theme` (`Theme`, optional, default: `createTheme()`)

See *theme spec* defined in [§ Glossary](#glossary).

##### Returns

###### `renderer` (`ThemeRenderer`)

Returns a *theme renderer* with methods to resolve and render *themed styles* to the DOM.

- `renderer.clear()`: Clears and removes all rendered CSS.
- `renderer.render()`: Initializes the renderer.
- `renderer.renderStyle(style, props?)`: Resolves and renders the provided *style object* or *style rule*).  Accepts optional *style props*.
- `renderer.renderStaticStyles(style)`: Resolves and renders the provided *static style* object.

<details>
<summary>Example</summary>

Create and configure a *theme renderer* with:

```js
import {createThemeRenderer} from 'uinix-theme';

const theme = {...};

const themeSpec = {...};

const renderer = createThemeRenderer({
  enableAtomicCss: true,
  enableCssVariables: true,
  namespace: 'uinix',
  responsiveBreakpoints: ['400px', '800px'],
  responsiveCssProperties: ['padding', 'margin'],
  theme,
  themeSpec,
});
```

Initialize the renderer in a single entry point in your code with:

```js
renderer.render();
```

Render *static styles* to the global CSS with:

```js
const staticStyles = {
  'body': {...}
  '*': {...},
  '.vendor-classname': {...}
};

renderer.renderStaticStyles(staticStyles);
```

Render either *style objects* or *style rules* with:

```js
const styleObject = {
  color: 'brand.primary',
  ':hover': {
    color: 'brand.link',
  },
};

const styleRule = (props) => ({
  color: 'brand.primary',
  padding: props.isPadded ? 'm' : 0,
});

renderer.renderStyle(styleObject);
renderer.renderStyle(styleRule, {isPadded: true});
```

Clear all rendered styles with:

```js
renderer.clear();
```
</details>

## Theme Specs

The following are *theme-specs* usable by uinix-theme.
- [`uinix-theme-spec`][uinix-theme-spec] — the default uinix-theme spec.
- [`uinix-theme-spec-theme-ui`][uinix-theme-spec-theme-ui] — the [theme-ui] spec usable by uinix-theme.

<details>
<summary>Example</summary>

```js
import {createThemeRenderer} from 'uinix-theme';
import themeSpec from 'uinix-theme-spec';

const renderer = createThemeRenderer({
  theme: {
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
  },
  themeSpec,
});

renderer.render();
```

</details>

## Glossary

The following terms used throughout this documentation are defined below.  We will reference the following example objects throughout this section.

```js
const theme = {
  colors: {
    brand: {
      primary: 'blue',
      secondary: 'yellow',
    },
  },
  spacings: {
    s: 4,
    m: 8,
    l: 16,
  },
};

const themeSpec = {
  colors: [
    'backgroundColor',
    'color',
  ],
  spacings: [
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
  ],
};
```

### Theme

- ***Theme***: An object relating *theme properties* with *CSS values* (can be arbitrarily nested).  Provides a way to define and reference CSS values via *theme values*.
  <details>
  <summary>Example</summary>

  `theme` defined above is an example of a theme.
  </details>
- ***Theme property***: The keys of a *theme* that relates to their corresponding *CSS property* as defined in the *theme spec*.
  <details>
  <summary>Example</summary>

  The `colors` and `spacings` are theme properties based on `theme`.
  </details>
- ***Theme value***: [JSONPath]-like syntax to refer to *CSS values* in a *theme*.
  <details>
  <summary>Example</summary>

  The `'colors.brand.primary'` and `'spacings.m'` theme values would refer to the CSS values `'blue'` and `8` respectively based on how they are defined in `theme`.
  </details>
- ***Theme spec***: An object relating *theme properties* with *CSS properties*.  It is used as a specification together with a *theme* to inform how *themed styles* should be resolved and rendered to CSS.
  <details>
    <summary>Example</summary>

    Referring to the `theme` and `themeSpec` above, we note that
    - the `colors` *theme property* relates to the `backgroundColor`, `color` *CSS properties*.
    - the `spacings` *theme property* relates to the `margin`, `marginBottom`, `marginLeft`, `marginRight`, `marginTop` *CSS properties*.
  </details>
- ***Themed style***: A *style* that is specified with *theme values* instead of *CSS values* (CSS values can still be specified).  A themed style is only meaningful in relation to a *theme* and *theme spec*, as the following example demonstrates.
  <details>
    <summary>Example</summary>

    Given the following themed style,

    ```js
    const themedStyle = {
      color: 'brand.primary',
      margin: 'm',
      fill: 'red',
      top: 64,
      backgroundColor: 'not.a.valid.theme.path',
      padding: 'm',
    };
    ```

    It will resolve to the following CSS based on the `theme` and `themeSpec`.

    ```css
    .x {
      color: blue;
      fill: red;
      margin: 8px;
      top: 64,
    }
    ```

    - `color` is resolved to the *CSS value* `'blue'` by checking that the `color` *CSS property* is registered in `themeSpec` (under the `colors` *theme property*) and that the `'brand.primary'` *theme value* is resolvable under `theme.colors`.
    - `margin` is resolved to the *CSS value* `'8px'` by checking that the `margin` *CSS property* is registered in `themeSpec` (under the `spacings` *theme property*) and that the `'m'` *theme value* is resolvable under `theme.spacings`.
    - `fill` and `top` simply use their specified *CSS values* as fallback values since they cannot be resolved based on the `theme` and `themeSpec`.
    - `backgroundColor` is unresolved because while it is a *CSS property* registered in `themeSpec`, the `'not.a.valid.path'` *theme value* is not resolvable under `theme.colors`.
    - `padding` is unresolved because it is not a *CSS property* registered in `themeSpec` despite having a valid *theme value*.

  </details>
- ***Theme renderer***: A program that resolves *themed styles* based on the provided *theme* and *theme spec*, and renders the CSS to DOM.
- ***Theme system***: A system of programs that supports specifying the *theme spec*, creating and validating the relating *theme*, resolving and rendering *themed styles* to CSS.

### Styles

- ***Style***: A declaration for styling HTML elements via CSS.  Authored in JS as *style objects* or *style rules*.
The CSS-in-JS syntax is fairly ubiquitous across CSS frameworks and we provide an example to highlight notable syntax and features.
  <details>
  <summary>Example</summary>

  ```js
  const style = {
    color: 'red',
    fontSize: 14, // CSS properties are camel-cased, and may accept unitless values
    ':hover': { // CSS pseudo class
      color: 'yellow',
      ':active': { // can be further nested (equivalent to ':hover:active')
        color: 'blue',
      },
    },
    '::before': { // CSS pseudo element
      content: '" "', // nested quotes to set string content
    },
    '[checked="true"]': { // CSS attribute selector
      color: 'yellow',
      '[target]': { // can be further nested (equivalent to '[checked="true"][target]')
        color: 'blue',
      },
    },
    '> .some-class': { // CSS child selector
      color: 'yellow',
      '> #some-id': { // can be further nested (equivalent to '> .some-class > #some-id')
        color: 'blue',
      },
    },
    '& .some-class': { // CSS "self" selector
      color: 'yellow',
      ':hover': { // can be further nested (equivalent to '& .some-class:hover')
        color: 'blue',
      },
    },
  };
  ```
  </details>

- ***Style object***: A *style* represented as a JS object.
  <details>
    <summary>Example</summary>

    ```js
    const style = {
      color: 'red',
      padding: 8,
      ':hover': {
        color: 'yellow',
      },
    };
    ```
  </details>
- ***Style rule***: A *style* represented as a JS function that returns a *style object*.  This is useful to represent style as a function of state.
  <details>
    <summary>Example</summary>

    ```js
    const rule = (props) => ({
      color: props.isActive ? 'blue' : 'yellow',
      padding: props.isPadded ? 8 : 0,
    });

    console.log(rule({isActive: true})); // {color: 'blue', padding: 0}
    console.log(rule({isPadded: true})); // {color: 'yellow', padding: 8}
    ```
  </details>
- ***Style props***: an object used as an argument for a *style rule*.
- ***Static style***: refers to static *style objects* that are usually defined once and rendered to the global style sheet.
  <details>
    <summary>Example</summary>

    ```js
    const staticStyles = {
      '*': {
        boxSizing: 'border-box',
      },
      'body': {
        margin: 0,
        padding: 0,
      },
      'a': {
        color: 'blue',
      },
      'a:hover': {
        color: 'yellow',
      },
      '.vendor-classname': {...}
    }
    ```
  </details>
- ***Responsive style***: when an array of breakpoints are provided, responsive styles can be expressed in convenient array notation to render media queries.
  <details>
    <summary>Example</summary>

    Given the following responsive breakpoints (`min-width`-based):

    ```js
    const breakpoints = ['400px', '800px'];
    ```

    And a responsive style:
    ```js
    const responsiveStyle = {
      color: ['black', 'blue', 'yellow'],
      margin: [4, 8, 16],
    };
    ```

    Yields the following rendered CSS:
    ```css
    .x {
      color: black;
      margin: 4px;
    }

    @media (min-width: 400px) {
      .x {
        color: blue;
        margin: 8px;
      }
    }

    @media (min-width: 800px) {
      .x {
        color: yellow;
        margin: 16px;
      }
    }
    ```
  </details>

### CSS

- ***Atomic CSS***:  Every *CSS property/value* pair is generated as a unique *CSS class*.  This allows HTML elements to reuse and share class definitions, which is a useful strategy to limit and reuse rendered CSS.
  <details>
  <summary>Example</summary>
  Given the following HTML and (non-atomic) CSS,

  ```html
  <div class="x" />
  <div class="y" />
  ```

  ```css
  .x {
    color: red;
    padding: 8px;
  }
  .y {
    color: red;
    padding: 4px;
  }
  ```

  The following HTML would be equivalent using atomic CSS.

  ```html
  <div class="a b" />
  <div class="a c" />
  ```

  ```css
  .a {
    color: red;
  }
  .b {
    padding: 8px;
  }
  .c {
    padding: 4px;
  }
  ```
  </details>
- ***CSS class***: See [CSS (MDN)].
- ***CSS variable***: See [CSS variable (MDN)].
- ***CSS keyframe***: See [CSS keyframe (MDN)].
- ***CSS property***: See [CSS property (MDN)].
- ***CSS selector***: See [CSS selector (MDN)].
- ***CSS value***: See [CSS value (MDN)].

## Project

### Origin

uinix-theme is originally inspired by the ideas in [theme-ui], and evolves these ideas into framework-agnostic and fully configurable APIs, implemented via [fela].

uinix-theme approaches theme systems with the following principles:
- Fully-configurable: Enable consumers to own their own spec instead of providing an opinionated one.
- Framework-agnostic: Solve the domain problem in JS and not in specific frameworks.
- Build-free: APIs are usable without the need for a build system (e.g. directly usable in browsers as plain JS).
- Update-free: APIs are intended to be stable, imparting confidence for both maintainers and consumers of the project.

### Version

uinix-theme adheres to [semver] starting at 1.0.0.

### Contribute

Node 18+ is required for development.

Install dependencies with `npm i` and run tests with `npm test`.  You can also run other NPM scripts (e.g. `lint`) from the root of the monorepo.

### Related

- [uinix-js]
- [uinix-ui]
- [fela]
- [theme-ui]

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
[guides]: https://uinix.dev/packages/uinix-theme
[theme playground]: https://uinix.dev/demos/theme-playground

<!-- defs -->
[atomic css]: https://css-tricks.com/lets-define-exactly-atomic-css/
[CSS (MDN)]: https://developer.mozilla.org/en-US/docs/Web/CSS
[CSS keyframe (MDN)]: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
[CSS property (MDN)]: https://developer.mozilla.org/en-US/docs/Glossary/property/CSS
[CSS selector (MDN)]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#selectors
[CSS value (MDN)]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
[CSS variable (MDN)]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[deno]: https://deno.land/
[esm.sh]: https://esm.sh/
[ESM-only]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[fela]: https://github.com/robinweser/fela
[JSONPath]: https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html
[jsdoc]: https://github.com/jsdoc/jsdoc
[npm]: https://docs.npmjs.com/cli/v8/commands/npm-install
[semver]: https://semver.org/
[theme-ui]: https://github.com/system-ui/theme-ui
