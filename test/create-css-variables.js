import test from 'tape';

import {createCssVariables} from '../index.js';

test('createCssVariables', (t) => {
  t.deepEqual(createCssVariables({}), {}, 'should return an empty object');

  t.deepEqual(
    createCssVariables({
      a: {
        b: {
          c: '1px',
          'flat.key': 2,
        },
        'xyzXYZ-_ .,0123789': 42,
      },
    }),
    {
      '--a-b-c': '1px',
      '--a-b-flat-key': 2,
      '--a-xyzxyz-_---0123789': 42,
    },
    'should transform theme into an object of css variables (i.e. conforming the regexp: /^--[a-z0-9-_]+/)',
  );

  t.deepEqual(
    createCssVariables(
      {
        a: {
          b: {
            c: '1px',
            'flat.key': 2,
          },
          'xyzXYZ-_ .,0123789': 42,
        },
      },
      {namespace: 'uinix'},
    ),
    {
      '--uinix-a-b-c': '1px',
      '--uinix-a-b-flat-key': 2,
      '--uinix-a-xyzxyz-_---0123789': 42,
    },
    'should transform theme into an object of css variables with provided namespace prefix (i.e. conforming the regexp: /^--[a-z0-9-_]+/)',
  );

  t.throws(() => {
    createCssVariables(
      {
        a: {
          b: {
            c: '1px',
            'flat.key': 2,
          },
          'xyzXYZ-_ .,0123789': 42,
        },
      },
      {namespace: '0123 MUST MATCH: /^[a-z_][w-]*$/g'},
    );
  }, 'should throw if namespace does not match regexp');

  t.deepEqual(
    createCssVariables(
      {
        colors: {
          brand: {
            primary: 'red',
          },
        },
        lineHeights: {
          m: 2,
        },
        spacings: {
          m: 8,
        },
        zIndices: {
          m: 1,
        },
      },
      {
        themeSpec: {
          colors: ['colors'],
          lineHeights: ['lineHeight'],
          spacings: ['margin', 'padding'],
          zIndices: ['zIndex'],
        },
      },
    ),
    {
      '--colors-brand-primary': 'red',
      '--lineheights-m': 2,
      '--spacings-m': '8px',
      '--zindices-m': 1,
    },
    'should transform theme into an object of css variables and resolve CSS units based on the provided themeSpec',
  );

  t.end();
});
