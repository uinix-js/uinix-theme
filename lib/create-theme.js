export { createTheme };

import { merge } from 'uinix-fp';

import { themeSpec } from './theme-spec.js';

const createTheme = (overrideTheme = {}) => {
  const themeKeys = ['breakpoints', ...Object.keys(themeSpec), 'htmlElements'];
  const defaultTheme = themeKeys.reduce((acc, themeKey) => {
    acc[themeKey] = {};
    return acc;
  }, {});

  return merge(defaultTheme, overrideTheme);
};
