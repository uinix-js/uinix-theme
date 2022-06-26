import assert from 'node:assert';
import test from 'node:test';

import {createTheme} from '../index.js';

test('createTheme', async (t) => {
  const theme = {
    colors: {
      brand: {
        primary: 'blue',
        active: 'purple',
      },
    },
    spacings: {
      xs: 4,
      s: 8,
      m: 16,
      l: 32,
      xl: 64,
    },
    invalidProperty: {
      s: 8,
      m: 16,
      l: 32,
    },
  };

  await t.test('default theme spec', async (t) => {
    await t.test('should create empty theme without spec', () => {
      assert.deepEqual(createTheme(), {});
      assert.deepEqual(createTheme(theme), {});
    });
  });

  await t.test('custom theme spec', async (t) => {
    const customThemeSpec = {
      animations: ['animation'],
      colors: ['backgroundColor', 'color'],
    };

    await t.test('should create theme based on custom theme spec', () => {
      assert.deepEqual(createTheme({}, customThemeSpec), {
        animations: {},
        colors: {},
      });
    });

    await t.test(
      'should create theme based on theme spec and leaves out non-specified theme properties in provided theme.',
      () => {
        assert.deepEqual(createTheme(theme, customThemeSpec), {
          animations: {},
          colors: {
            brand: {
              primary: 'blue',
              active: 'purple',
            },
          },
        });
      },
    );
  });
});
