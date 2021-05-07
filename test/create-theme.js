import test from 'tape';

import {createTheme} from '../index.js';

test('createTheme', (t) => {
  const defaultTheme = {
    breakpoints: {},
    fontFaces: {},
    animations: {},
    borders: {},
    borderStyles: {},
    borderWidths: {},
    colors: {},
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
  };

  const overrideTheme = {
    breakpoints: {
      phone: '400px',
    },
    fontFaces: {
      Raleway: {
        files: ['./raleway.woff'],
        fontWeight: 'bold',
      },
    },
    colors: {
      palette: {
        red0: '##330000',
        red1: '##aa0000',
        red2: '##bb0000',
      },
      brand: {
        primary: 'blue',
        active: 'purple',
      },
    },
    fontFamilies: {
      body: 'arial',
      heading: 'impact',
    },
    fontSizes: {
      xs: 12,
      s: 16,
      m: 20,
      l: 32,
      xl: 40,
    },
    spacings: {
      xs: 4,
      s: 8,
      m: 16,
      l: 32,
      xl: 64,
    },
    sizes: {
      icon: {
        s: 16,
        m: 24,
        l: 32,
      },
    },
  };

  t.deepEqual(createTheme(), defaultTheme, 'should create default theme');

  t.deepEqual(
    createTheme(overrideTheme),
    {
      ...defaultTheme,
      ...overrideTheme,
    },
    'should override and merge theme',
  );

  t.end();
});
