export { createTheme };

import { merge } from 'uinix-fp';

import { themeSpec } from './theme-spec.js';

const createTheme = (overrideTheme = {}) => {
  const themeProperties = ['breakpoints', ...Object.keys(themeSpec)];
  const defaultTheme = themeProperties.reduce((acc, themeProperty) => {
    acc[themeProperty] = {};
    return acc;
  }, {});

  return merge(defaultTheme, overrideTheme);
};
