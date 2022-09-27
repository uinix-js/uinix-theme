import test from 'tape';

import {createThemeRenderer} from '../../index.js';

test('renderer[unload]', (t) => {
  const renderer = createThemeRenderer();

  t.equal(typeof renderer.unload, 'function', 'should be a function');

  t.equal(renderer.unload(), undefined, 'should return void');

  t.end();
});
