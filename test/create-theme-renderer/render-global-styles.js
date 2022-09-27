import test from 'tape';

import {resolveRenderGlobalStyles} from './util.js';

test('renderer[renderGlobalStyles]', (t) => {
  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {
        html: {
          color: 'white',
        },
        body: {
          color: 'red',
        },
        'a:hover': {
          color: 'blue',
        },
      },
    }),
    [
      {
        css: 'color:white',
        selector: 'html',
        type: 'STATIC',
      },
      {
        css: 'color:red',
        selector: 'body',
        type: 'STATIC',
      },
      {
        css: 'color:blue',
        selector: 'a:hover',
        type: 'STATIC',
      },
    ],
    'should render global styles',
  );

  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {
        'a:hover': {
          color: 'brand.primary',
        },
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
        css: 'color:red',
        selector: 'a:hover',
        type: 'STATIC',
      },
    ],
    'should render themed global styles',
  );

  // TODO: test behavior will be inverted when https://github.com/robinweser/fela/issues/876 is resolved
  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {
        'a:hover': {
          color: ['red', 'green', 'blue'],
        },
      },
      options: {
        responsiveCssProperties: ['color'],
        responsiveBreakpoints: ['100px', '800px'],
      },
    }),
    [
      {
        css: 'color:red',
        selector: 'a:hover',
        type: 'STATIC',
      },
    ],
    'should not render responsive global styles',
  );

  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {},
      options: {
        enableCssVariables: true,
        theme: {
          colors: {
            brand: {
              primary: 'red',
              secondary: 'rgba(0, 0, 0, 0.2)',
            },
          },
          lineHeights: {
            m: 2,
          },
          spacings: {
            s: 4,
            m: 8,
            l: 16,
          },
          zIndices: {
            forward: 1,
          },
        },
        themeSpec: {
          colors: ['color'],
          lineHeights: ['lineHeight'],
          spacings: ['padding'],
          zIndices: ['zIndex'],
        },
      },
    }),
    [
      {
        css: '--colors-brand-primary:red;--colors-brand-secondary:rgba(0, 0, 0, 0.2);--lineheights-m:2;--spacings-s:4px;--spacings-m:8px;--spacings-l:16px;--zindices-forward:1',
        selector: ':root',
        type: 'STATIC',
      },
    ],
    'should render theme as css variables under `:root`',
  );

  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {},
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
            m: 8,
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
        css: '--uinix-colors-brand-primary:red;--uinix-spacings-m:8px',
        selector: ':root',
        type: 'STATIC',
      },
    ],
    'should render theme as css variables under `:root` prefixed with provided namespace',
  );

  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {
        a: {
          color: 'brand.primary',
          padding: 'm',
        },
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
            m: 8,
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
        css: '--uinix-colors-brand-primary:red;--uinix-spacings-m:8px',
        selector: ':root',
        type: 'STATIC',
      },
      {
        css: 'color:var(--uinix-colors-brand-primary);padding:var(--uinix-spacings-m)',
        selector: 'a',
        type: 'STATIC',
      },
    ],
    'should evaluate global styles as css variables if enabled',
  );

  t.deepEqual(
    resolveRenderGlobalStyles({
      globalStyles: {
        ':root': {
          '--custom-css-var': '8px',
          '--uinix-colors-brand-primary': 'should-be-overwritten',
        },
        a: {
          color: 'red',
        },
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
            m: 8,
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
        css: '--uinix-colors-brand-primary:should-be-overwritten;--uinix-spacings-m:8px;--custom-css-var:8px',
        selector: ':root',
        type: 'STATIC',
      },
      {
        css: 'color:red',
        selector: 'a',
        type: 'STATIC',
      },
    ],
    'should merge css variables under :root with other global styles',
  );

  t.end();
});
