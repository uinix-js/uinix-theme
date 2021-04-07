import test from 'tape';

import { createTheme } from '../index.js';

test('createTheme', (t) => {
  const defaultTheme = {
    breakpoints: {},
    animations: {},
    borders: {},
    borderStyles: {},
    borderWidths: {},
    colors: {},
    fonts: {},
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
    transitions: {},
    zIndices: {},
    styles: {},
  };

  const overrideTheme = {
    breakpoints: {
      phone: '@media (min-width: 400px)',
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
    fonts: {
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
    styles: {
      h1: {
        fontFamily: 'heading',
        fontSize: 'xl',
      },
      a: {
        color: 'brand.primary',
        ':hover': {
          color: 'brand.active',
        },
      },
      '.resizer': {
        color: 'brand.primary',
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
