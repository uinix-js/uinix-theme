import assert from 'node:assert';
import test from 'node:test';

import {defaultThemeSpec} from '../index.js';
import {defaultThemeSpecSnapshot} from './snapshots.js';

test('defaultThemeSpec', (t) => {
  t.test('should match snapshot', () => {
    assert.deepEqual(defaultThemeSpec, defaultThemeSpecSnapshot);
  });
});
