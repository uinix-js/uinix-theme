import assert from 'node:assert';
import test from 'node:test';

import {createThemeRenderer} from '../index.js';
import {resolveRenderStaticStyles, resolveRenderStyle} from './util.js';

test('createThemeRenderer', async (t) => {
  await t.test('renderer.render', (t) => {
    /** Untested assertion rendering to DOM via fela-dom (v11) */
    t.test('should run the render method', () => {
      const renderer = createThemeRenderer();
      assert.throws(() => renderer.render());
    });
  });

  await t.test('renderer.renderStaticStyles', async (t) => {
    await t.test('should render static style', () => {
      assert.deepEqual(
        resolveRenderStaticStyles({
          html: {
            color: 'white',
          },
          body: {
            color: 'red',
          },
          'a:hover': {
            color: 'blue',
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
      );
    });

    await t.test('should render themed static style', () => {
      assert.deepEqual(
        resolveRenderStaticStyles(
          {
            'a:hover': {
              color: 'brand.primary',
            },
          },
          {
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
        ),
        [
          {
            css: 'color:red',
            selector: 'a:hover',
            type: 'STATIC',
          },
        ],
      );
    });

    // Inverted when https://github.com/robinweser/fela/issues/876 is resolved
    await t.test('should NOT render responsive static style', () => {
      assert.deepEqual(
        resolveRenderStaticStyles(
          {
            'a:hover': {
              color: ['red', 'green', 'blue'],
            },
          },
          {
            responsiveCssProperties: ['color'],
            responsiveBreakpoints: ['100px', '800px'],
          },
        ),
        [
          {
            css: 'color:red',
            selector: 'a:hover',
            type: 'STATIC',
          },
        ],
      );
    });
  });

  await t.test('renderer.renderStyle', async (t) => {
    /**
     * Test suite making informal high level assertions on Fela's (v11) API.
     * Fela tests are comprehensively tested at https://github.com/robinweser/fela
     */
    await t.test('fela behaviors', async (t) => {
      await t.test('should render style object', () => {
        assert.deepEqual(
          resolveRenderStyle({
            fontSize: '12px',
          }),
          [
            {
              declaration: 'font-size:12px',
              type: 'RULE',
            },
          ],
        );
      });

      await t.test('should render style rule', () => {
        const style = ({isSmall}) => ({
          fontSize: isSmall ? '8px' : '12px',
        });

        assert.deepEqual(resolveRenderStyle(style, {isSmall: true}), [
          {
            declaration: 'font-size:8px',
            type: 'RULE',
          },
        ]);

        assert.deepEqual(resolveRenderStyle(style, {isSmall: false}), [
          {
            declaration: 'font-size:12px',
            type: 'RULE',
          },
        ]);
      });

      await t.test('should respect style order', () => {
        assert.deepEqual(
          resolveRenderStyle({
            padding: '8px',
            paddingTop: '4px',
          }),
          [
            {
              declaration: 'padding:8px;padding-top:4px',
              type: 'RULE',
            },
          ],
        );

        assert.deepEqual(
          resolveRenderStyle({
            paddingTop: '4px',
            padding: '8px',
          }),
          [
            {
              declaration: 'padding-top:4px;padding:8px',
              type: 'RULE',
            },
          ],
        );
      });

      await t.test('should render atomic styles', () => {
        const style = {
          color: 'blue',
          padding: '12px',
        };

        assert.deepEqual(
          resolveRenderStyle(style, {}, {enableAtomicCss: false}),
          [
            {
              declaration: 'color:blue;padding:12px',
              type: 'RULE',
            },
          ],
        );

        assert.deepEqual(
          resolveRenderStyle(style, {}, {enableAtomicCss: true}),
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
        );
      });

      await t.test('should render pseudo CSS', () => {
        assert.deepEqual(
          resolveRenderStyle({
            color: 'red',
            ':hover': {
              color: 'blue',
            },
            ':hover::after': {
              color: 'purple',
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
        );
      });

      await t.test('should render attribute selectors', () => {
        assert.deepEqual(
          resolveRenderStyle({
            color: 'red',
            '[checked="true"]': {
              color: 'yellow',
              '[target]': {
                color: 'purple',
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
        );
      });

      await t.test('should render child selectors', () => {
        assert.deepEqual(
          resolveRenderStyle({
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
        );
      });

      await t.test('should render nested selectors', () => {
        assert.deepEqual(
          resolveRenderStyle({
            color: 'red',
            '& .sub-class': {
              color: 'blue',
              ':hover': {
                color: 'black',
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
        );
      });

      await t.test('should render media queries', () => {
        assert.deepEqual(
          resolveRenderStyle({
            color: 'red',
            '@media (min-height: 200px)': {
              color: 'yellow',
              '@media (max-width: 300px)': {
                color: 'purple',
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
        );
      });

      await t.test('should render feature queries', () => {
        assert.deepEqual(
          resolveRenderStyle({
            display: 'block',
            '@supports (display:flex)': {
              display: 'flex',
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
        );
      });

      // https://github.com/robinweser/fela/tree/master/packages/fela-preset-web
      await t.test('fela web-preset', async (t) => {
        await t.test('should support fela-plugin-embedded', () => {
          assert.deepEqual(
            resolveRenderStyle({
              animationName: {
                '0%': {color: 'red '},
                '100%': {color: 'blue'},
              },
              fontFace: {
                fontFamily: 'Arial',
                src: ['../Arial.svg', '../Arial.ttf'],
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
          );
        });

        await t.test('should support fela-plugin-prefixer', () => {
          assert.deepEqual(
            resolveRenderStyle({
              display: 'flex',
              appearance: 'none',
            }),
            [
              {
                declaration:
                  'display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none',
                type: 'RULE',
              },
            ],
          );
        });

        await t.test('should support fela-plugin-fallback-value', () => {
          assert.deepEqual(
            resolveRenderStyle({
              color: ['#ccc', '#fff'],
            }),
            [
              {
                declaration: 'color:#ccc;color:#fff',
                type: 'RULE',
              },
            ],
          );

          assert.deepEqual(
            resolveRenderStyle({
              color: ['#fff', '#ccc'],
            }),
            [
              {
                declaration: 'color:#fff;color:#ccc',
                type: 'RULE',
              },
            ],
          );
        });

        await t.test('should support fela-plugin-unit', () => {
          assert.deepEqual(
            resolveRenderStyle({
              marginTop: 0,
              width: 25,
              lineHeight: 1.4,
              height: '53',
              fontSize: 15,
              margin: 10,
            }),
            [
              {
                declaration:
                  'margin-top:0;width:25px;line-height:1.4;height:53px;font-size:15px;margin:10px',
                type: 'RULE',
              },
            ],
          );
        });
      });
    });

    /** Test suite making assertions on responsive APIs */
    await t.test('responsive', async (t) => {
      await t.test(
        'should render as fallback value if responsive CSS property is not provided',
        () => {
          assert.deepEqual(
            resolveRenderStyle({
              color: ['red', 'green', 'blue'],
            }),
            [
              {
                declaration: 'color:red;color:green;color:blue',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should render as first responsive value if CSS property is provided but no breakpoints provided',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: ['red', 'green', 'blue'],
              },
              {},
              {
                responsiveCssProperties: ['color'],
              },
            ),
            [
              {
                declaration: 'color:red',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should render responsive values in appropriate media queries if CSS property and breakpoints provided',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: ['red', 'green', 'blue'],
              },
              {},
              {
                responsiveCssProperties: ['color'],
                responsiveBreakpoints: ['100px', '800px'],
              },
            ),
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
          );
        },
      );

      await t.test('should support fela behaviors (unit, selectors)', () => {
        assert.deepEqual(
          resolveRenderStyle(
            {
              color: ['red', 'green', 'blue'],
              '> h1': {
                color: ['white', 'gray', 'black'],
                ':hover': {
                  color: ['black', 'gray', 'white'],
                },
              },
            },
            {},
            {
              responsiveCssProperties: ['color'],
              responsiveBreakpoints: ['100px', '800px'],
            },
          ),
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
        );
      });
    });

    /** Test suite making assertions on theme APIs */
    await t.test('theme', async (t) => {
      await t.test(
        'should pass value through if no theme spec is provided',
        () => {
          assert.deepEqual(
            resolveRenderStyle({
              color: 'brand',
            }),
            [
              {
                declaration: 'color:brand',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should pass value through if theme spec is provided without compliant theme (e.g. null/undefined)',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: 'brand',
              },
              {},
              {
                theme: null,
                themeSpec: {
                  colors: ['color'],
                },
              },
            ),
            [
              {
                declaration: 'color:brand',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should resolve theme value based on theme and themeSpec',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: 'brand',
              },
              {},
              {
                theme: {
                  colors: {
                    brand: 'red',
                  },
                },
                themeSpec: {
                  colors: ['color'],
                },
              },
            ),
            [
              {
                declaration: 'color:red',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should pass value through if theme value cannot be resolved',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: 'brand.secondary',
              },
              {},
              {
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
            ),
            [
              {
                declaration: 'color:brand.secondary',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should resolve theme value based on any key (e.g. "dot-delimited" key',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: 'brand.primary',
              },
              {},
              {
                theme: {
                  colors: {
                    'brand.primary': 'red',
                  },
                },
                themeSpec: {
                  colors: ['color'],
                },
              },
            ),
            [
              {
                declaration: 'color:red',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test(
        'should resolve nested theme value via property path',
        () => {
          assert.deepEqual(
            resolveRenderStyle(
              {
                color: 'brand.primary',
              },
              {},
              {
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
            ),
            [
              {
                declaration: 'color:red',
                type: 'RULE',
              },
            ],
          );
        },
      );

      await t.test('should resolve (fela) units', () => {
        assert.deepEqual(
          resolveRenderStyle(
            {
              padding: 'm',
            },
            {},
            {
              theme: {
                spacings: {
                  m: 8,
                },
              },
              themeSpec: {
                spacings: ['padding'],
              },
            },
          ),
          [
            {
              declaration: 'padding:8px',
              type: 'RULE',
            },
          ],
        );
      });

      await t.test('should resolve negative (fela) units', () => {
        assert.deepEqual(
          resolveRenderStyle(
            {
              padding: '-m',
            },
            {},
            {
              theme: {
                spacings: {
                  m: 8,
                },
              },
              themeSpec: {
                spacings: ['padding'],
              },
            },
          ),
          [
            {
              declaration: 'padding:-8px',
              type: 'RULE',
            },
          ],
        );

        assert.deepEqual(
          resolveRenderStyle(
            {
              padding: '-m',
            },
            {},
            {
              theme: {
                spacings: {
                  m: '8px',
                },
              },
              themeSpec: {
                spacings: ['padding'],
              },
            },
          ),
          [
            {
              declaration: 'padding:-8px',
              type: 'RULE',
            },
          ],
        );
      });

      await t.test('should support fela behaviors (unit, selectors)', () => {
        assert.deepEqual(
          resolveRenderStyle(
            {
              padding: 'm',
              '> h1': {
                ':hover': {
                  padding: '-s',
                },
              },
            },
            {},
            {
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
          ),
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
        );
      });
    });

    await t.test('should support responsive behaviors', () => {
      assert.deepEqual(
        resolveRenderStyle(
          {
            padding: ['s', 'm', 'l'],
            '> h1': {
              padding: ['l', 'm', 's'],
              ':hover': {
                padding: ['-s', '-m', '-l'],
              },
            },
          },
          {},
          {
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
        ),
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
      );
    });
  });
});
