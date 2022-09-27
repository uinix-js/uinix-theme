import test from 'tape';

import {createThemeRenderer} from '../../index.js';

test('renderer[load]', (t) => {
  const renderer = createThemeRenderer();

  t.equal(typeof renderer.load, 'function', 'should be a function');

  t.throws(() => {
    renderer.load();
  }, 'should throw in Node since this is a DOM-based API');

  t.end();
});
