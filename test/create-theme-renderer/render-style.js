import test from 'tape';

import {resolveRenderStyle} from './util.js';

test('renderer[renderStyle] (fela behaviors)', (t) => {
  t.deepEqual(
    resolveRenderStyle({
      style: {
        fontSize: '12px',
      },
    }),
    [
      {
        declaration: 'font-size:12px',
        type: 'RULE',
      },
    ],
    'should render style object',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: ({isSmall}) => ({
        fontSize: isSmall ? '8px' : '12px',
      }),
      props: {isSmall: true},
    }),
    [
      {
        declaration: 'font-size:8px',
        type: 'RULE',
      },
    ],
    'should render style rule',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: '8px',
        paddingTop: '4px',
      },
    }),
    [
      {
        declaration: 'padding:8px;padding-top:4px',
        type: 'RULE',
      },
    ],
    'should respect style order',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        paddingTop: '4px',
        padding: '8px',
      },
    }),
    [
      {
        declaration: 'padding-top:4px;padding:8px',
        type: 'RULE',
      },
    ],
    'should respect style order',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'blue',
        padding: '12px',
      },
    }),
    [
      {
        declaration: 'color:blue;padding:12px',
        type: 'RULE',
      },
    ],
    'should render non-atomic CSS by default',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'blue',
        padding: '12px',
      },
      options: {
        enableAtomicCss: true,
      },
    }),
    [
      {
        declaration: 'color:blue',
        type: 'RULE',
      },
      {
        declaration: 'padding:12px',
        type: 'RULE',
      },
    ],
    'should render atomic CSS if configured',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'red',
        ':hover': {
          color: 'blue',
        },
        ':hover::after': {
          color: 'purple',
        },
      },
    }),
    [
      {
        declaration: 'color:blue',
        pseudo: ':hover',
        type: 'RULE',
      },
      {
        declaration: 'color:purple',
        pseudo: ':hover::after',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render pseudo CSS',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'red',
        '[checked="true"]': {
          color: 'yellow',
          '[target]': {
            color: 'purple',
          },
        },
      },
    }),
    [
      {
        declaration: 'color:purple',
        pseudo: '[checked="true"][target]',
        type: 'RULE',
      },
      {
        declaration: 'color:yellow',
        pseudo: '[checked="true"]',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render attribute selectors',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'red',
        '> h1': {
          color: 'blue',
          ':hover': {
            color: 'black',
          },
        },
        '> #hardcoded': {
          color: 'yellow',
          '> .third-party': {
            color: 'purple',
          },
        },
      },
    }),
    [
      {
        declaration: 'color:black',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'color:blue',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'color:purple',
        pseudo: '> #hardcoded> .third-party',
        type: 'RULE',
      },
      {
        declaration: 'color:yellow',
        pseudo: '> #hardcoded',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render child selectors',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'red',
        '& .sub-class': {
          color: 'blue',
          ':hover': {
            color: 'black',
          },
        },
      },
    }),
    [
      {
        declaration: 'color:black',
        pseudo: ' .sub-class:hover',
        type: 'RULE',
      },
      {
        declaration: 'color:blue',
        pseudo: ' .sub-class',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render nested selectors',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'red',
        '@media (min-height: 200px)': {
          color: 'yellow',
          '@media (max-width: 300px)': {
            color: 'purple',
          },
        },
      },
    }),
    [
      {
        declaration: 'color:purple',
        media: '(min-height: 200px) and (max-width: 300px)',
        type: 'RULE',
      },
      {
        declaration: 'color:yellow',
        media: '(min-height: 200px)',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render media queries',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        display: 'block',
        '@supports (display:flex)': {
          display: 'flex',
        },
      },
    }),
    [
      {
        declaration:
          'display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex',
        support: '(display:flex)',
        type: 'RULE',
      },
      {
        declaration: 'display:block',
        type: 'RULE',
      },
    ],
    'should render feature queries',
  );

  t.end();
});

test('renderer[renderStyle] (fela web-preset)', (t) => {
  t.deepEqual(
    resolveRenderStyle({
      style: {
        animationName: {
          '0%': {color: 'red '},
          '100%': {color: 'blue'},
        },
        fontFace: {
          fontFamily: 'Arial',
          src: ['../Arial.svg', '../Arial.ttf'],
        },
      },
    }),
    [
      {
        keyframe:
          '@-webkit-keyframes k1{0%{color:red }100%{color:blue}}@-moz-keyframes k1{0%{color:red }100%{color:blue}}@keyframes k1{0%{color:red }100%{color:blue}}',
        name: 'k1',
        type: 'KEYFRAME',
      },
      {
        fontFace: `@font-face{src:url('../Arial.svg') format('svg'),url('../Arial.ttf') format('truetype');font-family:"Arial"}`,
        fontFamily: '"Arial"',
        type: 'FONT',
      },
      {
        declaration: 'animation-name:k1;font-family:"Arial"',
        type: 'RULE',
      },
    ],
    'should support fela-plugin-embedded',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        display: 'flex',
        appearance: 'none',
      },
    }),
    [
      {
        declaration:
          'display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none',
        type: 'RULE',
      },
    ],
    'should support fela-plugin-prefixer',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['#ccc', '#fff'],
      },
    }),
    [
      {
        declaration: 'color:#ccc;color:#fff',
        type: 'RULE',
      },
    ],
    'should support fela-plugin-fallback-value',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        marginTop: 0,
        width: 25,
        lineHeight: 1.4,
        height: '53',
        fontSize: 15,
        margin: 10,
      },
    }),
    [
      {
        declaration:
          'margin-top:0;width:25px;line-height:1.4;height:53px;font-size:15px;margin:10px',
        type: 'RULE',
      },
    ],
    'should support fela-plugin-unit',
  );

  t.end();
});

test('renderer[renderStyle] (responsive behaviors)', (t) => {
  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['red', 'green', 'blue'],
      },
    }),
    [
      {
        declaration: 'color:red;color:green;color:blue',
        type: 'RULE',
      },
    ],
    'should render as fallback value if responsive CSS property is not provided',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['red', 'green', 'blue'],
      },
      options: {
        responsiveCssProperties: ['color'],
      },
    }),
    [
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render as first responsive value if CSS property is provided but no breakpoints is provided',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['red', 'green', 'blue'],
      },
      options: {
        responsiveCssProperties: ['color'],
        responsiveBreakpoints: ['100px', '800px'],
      },
    }),
    [
      {
        declaration: 'color:green',
        media: 'screen and (min-width: 100px)',
        type: 'RULE',
      },
      {
        declaration: 'color:blue',
        media: 'screen and (min-width: 800px)',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should render responsive values in appropriate media queries if CSS property and breakpoints are provided',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['red', 'green', 'blue'],
        '> h1': {
          color: ['white', 'gray', 'black'],
          ':hover': {
            color: ['black', 'gray', 'white'],
          },
        },
      },
      options: {
        responsiveCssProperties: ['color'],
        responsiveBreakpoints: ['100px', '800px'],
      },
    }),
    [
      {
        declaration: 'color:gray',
        media: 'screen and (min-width: 100px)',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'color:white',
        media: 'screen and (min-width: 800px)',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'color:black',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'color:gray',
        media: 'screen and (min-width: 100px)',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'color:black',
        media: 'screen and (min-width: 800px)',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'color:white',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'color:green',
        media: 'screen and (min-width: 100px)',
        type: 'RULE',
      },
      {
        declaration: 'color:blue',
        media: 'screen and (min-width: 800px)',
        type: 'RULE',
      },
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should support fela behaviors (unit, selectors)',
  );

  t.end();
});

test('renderer[renderStyle] (theme behaviors)', (t) => {
  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand',
      },
    }),
    [
      {
        declaration: 'color:brand',
        type: 'RULE',
      },
    ],
    'should pass value through if no theme spec is provided',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand',
      },
      options: {
        theme: null,
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:brand',
        type: 'RULE',
      },
    ],
    'should pass value through if no theme spec is provided',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand',
      },
      options: {
        theme: {
          colors: {
            brand: 'red',
          },
        },
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle theme value based on theme and themeSpec',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.secondary',
      },
      options: {
        theme: {
          colors: {
            brand: 'red',
          },
        },
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:brand.secondary',
        type: 'RULE',
      },
    ],
    'should pass value through if theme value cannot be resolved',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.primary',
      },
      options: {
        theme: {
          colors: {
            'brand.primary': 'red',
          },
        },
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle theme value based on any key (e.g. "dot-delimited" key',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.primary',
      },
      options: {
        theme: {
          colors: {
            brand: {
              primary: 'red',
            },
          },
        },
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:red',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle nested theme value via property path',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: 'm',
      },
      options: {
        theme: {
          spacings: {
            m: 8,
          },
        },
        themeSpec: {
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'padding:8px',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle (fela) units',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: '-m',
      },
      options: {
        theme: {
          spacings: {
            m: 8,
          },
        },
        themeSpec: {
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'padding:-8px',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle negative (fela) numeric units',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: '-m',
      },
      options: {
        theme: {
          spacings: {
            m: '8px',
          },
        },
        themeSpec: {
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'padding:-8px',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle negative (fela) pixel units',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: 'm',
        '> h1': {
          ':hover': {
            padding: '-s',
          },
        },
      },
      options: {
        theme: {
          spacings: {
            s: 4,
            m: 8,
          },
        },
        themeSpec: {
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'padding:-4px',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'padding:8px',
        type: 'RULE',
      },
    ],
    'should support fela behaviors (unit, selector)',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        padding: ['s', 'm', 'l'],
        '> h1': {
          padding: ['l', 'm', 's'],
          ':hover': {
            padding: ['-s', '-m', '-l'],
          },
        },
      },
      options: {
        responsiveBreakpoints: ['100px', '800px'],
        responsiveCssProperties: ['padding'],
        theme: {
          spacings: {
            s: 4,
            m: 8,
            l: 16,
          },
        },
        themeSpec: {
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'padding:-8px',
        media: 'screen and (min-width: 100px)',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'padding:-16px',
        media: 'screen and (min-width: 800px)',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'padding:-4px',
        pseudo: '> h1:hover',
        type: 'RULE',
      },
      {
        declaration: 'padding:8px',
        media: 'screen and (min-width: 100px)',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'padding:4px',
        media: 'screen and (min-width: 800px)',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'padding:16px',
        pseudo: '> h1',
        type: 'RULE',
      },
      {
        declaration: 'padding:8px',
        media: 'screen and (min-width: 100px)',
        type: 'RULE',
      },
      {
        declaration: 'padding:16px',
        media: 'screen and (min-width: 800px)',
        type: 'RULE',
      },
      {
        declaration: 'padding:4px',
        type: 'RULE',
      },
    ],
    'should support responsive behaviors',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.primary',
        background: 'blue',
        margin: '16px',
        padding: 'm',
      },
      options: {
        enableCssVariables: true,
        theme: {
          colors: {
            brand: {
              primary: 'red',
            },
          },
          spacings: {
            m: '8px',
          },
        },
        themeSpec: {
          colors: ['color'],
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration:
          'color:var(--colors-brand-primary);background:blue;margin:16px;padding:var(--spacings-m)',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle style to css variables if enabled',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.primary',
        background: 'blue',
        margin: '16px',
        padding: 'm',
      },
      options: {
        enableCssVariables: true,
        namespace: 'uinix',
        theme: {
          colors: {
            brand: {
              primary: 'red',
            },
          },
          spacings: {
            m: '8px',
          },
        },
        themeSpec: {
          colors: ['color'],
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration:
          'color:var(--uinix-colors-brand-primary);background:blue;margin:16px;padding:var(--uinix-spacings-m)',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle style to css variables prefixed with namespace if enabled',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: 'brand.primary',
        background: 'blue',
        margin: '16px',
        padding: 'm',
      },
      options: {
        enableAtomicCss: true,
        enableCssVariables: true,
        namespace: 'uinix',
        theme: {
          colors: {
            brand: {
              primary: 'red',
            },
          },
          spacings: {
            m: '8px',
          },
        },
        themeSpec: {
          colors: ['color'],
          spacings: ['padding'],
        },
      },
    }),
    [
      {
        declaration: 'color:var(--uinix-colors-brand-primary)',
        type: 'RULE',
      },
      {
        declaration: 'background:blue',
        type: 'RULE',
      },
      {
        declaration: 'margin:16px',
        type: 'RULE',
      },
      {
        declaration: 'padding:var(--uinix-spacings-m)',
        type: 'RULE',
      },
    ],
    'should resolveRenderStyle atomic css to css variables',
  );

  t.deepEqual(
    resolveRenderStyle({
      style: {
        color: ['brand.primary', 'brand.secondary', 'brand.tertiary'],
      },
      options: {
        enableCssVariables: true,
        namespace: 'uinix',
        responsiveCssProperties: ['color'],
        responsiveBreakpoints: ['100px', '800px'],
        theme: {
          colors: {
            brand: {
              primary: 'red',
              secondary: 'green',
              tertiary: 'blue',
            },
          },
        },
        themeSpec: {
          colors: ['color'],
        },
      },
    }),
    [
      {
        declaration: 'color:var(--uinix-colors-brand-secondary)',
        media: 'screen and (min-width: 100px)',
        type: 'RULE',
      },
      {
        declaration: 'color:var(--uinix-colors-brand-tertiary)',
        media: 'screen and (min-width: 800px)',
        type: 'RULE',
      },
      {
        declaration: 'color:var(--uinix-colors-brand-primary)',
        type: 'RULE',
      },
    ],
    'should render responsive theme values to css variables',
  );

  t.end();
});
