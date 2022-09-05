import assert from 'node:assert';
import test from 'node:test';

import {createCssVariables} from '../index.js';

test('create-css-variables', async (t) => {
  await t.test('should return an empty object', () => {
    assert.deepEqual(createCssVariables({}), {});
  });

  await t.test(
    'should transform theme into an object of css variables (i.e. /^--[a-z0-9-_]+/)',
    () => {
      assert.deepEqual(
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
      );
    },
  );

  await t.test(
    'should attach and transform with namespace prefix into css variables (i.e. /^--[a-z0-9-_]+/)',
    () => {
      assert.deepEqual(
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
      );
    },
  );

  await t.test('should throw if namespace does not match regexp)', () => {
    assert.throws(() => {
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
    }, Error);
  });
});
