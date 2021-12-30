import test from 'tape';

import {createTheme} from '../index.js';

test('createTheme', (t) => {
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

  t.test('default theme spec', (t) => {
    t.deepEqual(
      createTheme(),
      {
        animations: {},
        backgrounds: {},
        borders: {},
        borderStyles: {},
        borderWidths: {},
        colors: {},
        filters: {},
        fontFamilies: {},
        fontSizes: {},
        fontWeights: {},
        keyframes: {},
        letterSpacings: {},
        lineHeights: {},
        opacities: {},
        radii: {},
        shadows: {},
        sizes: {},
        spacings: {},
        transforms: {},
        transitions: {},
        zIndices: {},
      },
      'should create default theme',
    );

    t.deepEqual(
      createTheme(theme),
      {
        animations: {},
        backgrounds: {},
        borders: {},
        borderStyles: {},
        borderWidths: {},
        colors: {
          brand: {
            primary: 'blue',
            active: 'purple',
          },
        },
        filters: {},
        fontFamilies: {},
        fontSizes: {},
        fontWeights: {},
        keyframes: {},
        letterSpacings: {},
        lineHeights: {},
        opacities: {},
        radii: {},
        shadows: {},
        sizes: {},
        spacings: {
          xs: 4,
          s: 8,
          m: 16,
          l: 32,
          xl: 64,
        },
        transforms: {},
        transitions: {},
        zIndices: {},
      },
      'should create theme based on theme spec and leaves out non-specified theme properties in provided theme.',
    );

    t.end();
  });

  t.test('custom theme spec', (t) => {
    const customThemeSpec = {
      animations: ['animation'],
      colors: ['backgroundColor', 'color'],
    };

    t.deepEqual(
      createTheme({}, customThemeSpec),
      {
        animations: {},
        colors: {},
      },
      'should create theme based on custom theme spec',
    );

    t.deepEqual(
      createTheme(theme, customThemeSpec),
      {
        animations: {},
        colors: {
          brand: {
            primary: 'blue',
            active: 'purple',
          },
        },
      },
      'should create theme based on theme spec and leaves out non-specified theme properties in provided theme.',
    );

    t.end();
  });

  t.end();
});
