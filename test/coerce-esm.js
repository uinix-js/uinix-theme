import test from 'tape';

import {coerceEsm} from '../lib/utils/coerce-esm.js';

test('coerceEsm', (t) => {
  const providedModule = {a: 42};

  t.equal(
    coerceEsm(providedModule),
    providedModule,
    'should return given module (ESM)',
  );

  t.equal(
    coerceEsm({default: providedModule}),
    providedModule,
    'should return given module (CJS)',
  );

  t.end();
});
