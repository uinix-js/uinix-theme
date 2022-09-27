import test from 'tape';

import {createThemeRenderer} from '../../index.js';

test('createThemeRenderer[options.namespace]', (t) => {
  t.throws(() => {
    createThemeRenderer({
      namespace: '0123 MUST MATCH: /^[a-z_][w-]*$/g',
    });
  }, 'it should throw if options.namespace has invalid regexp');

  t.deepEqual(
    createThemeRenderer({
      enableCssVariables: true,
      namespace: 'uinix',
    }).renderStyle({
      color: 'blue',
      padding: '12px',
    }),
    createThemeRenderer({
      enableCssVariables: false,
    })
      .renderStyle({
        color: 'blue',
        padding: '12px',
      })
      .split(' ')
      .map((x) => 'uinix-' + x)
      .join(' '),
    'should prepend the provided namespace before the rendered CSS classnames',
  );

  t.end();
});
