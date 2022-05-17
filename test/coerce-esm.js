import assert from 'node:assert';
import test from 'node:test';

import {coerceEsm} from '../lib/utils/coerce-esm.js';

/**
 * This test will be removed once dependencies are ESM-only.
 */
test('coerceEsm', async (t) => {
  await t.test('should return x if x has no ".default" attribute', () => {
    const x = {
      a: 42,
    };
    assert.strictEqual(coerceEsm(x), x);
  });

  await t.test(
    'should return x.default if x has a ".default" attribute',
    () => {
      const x = {
        default: {
          a: 42,
        },
      };
      assert.strictEqual(coerceEsm(x), x.default);
    },
  );
});
