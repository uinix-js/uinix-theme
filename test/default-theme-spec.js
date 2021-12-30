import test from 'tape';

import {defaultThemeSpec} from '../index.js';
import {defaultThemeSpecSnapshot} from './snapshots.js';

test('defaultThemeSpec', (t) => {
  t.deepEqual(
    defaultThemeSpec,
    defaultThemeSpecSnapshot,
    'should match snapshot',
  );

  t.end();
});
