import {merge} from 'uinix-fp';

import {themeMapping} from './theme-mapping.js';

export {createTheme};

/**
 * @typedef {import('./types.js').Theme} Theme
 */

/**
 * Creates a uinix `Theme` object.
 *
 * The theme is a mapping of `ThemeProperty` to `ThemePropertyDefinition` (arbitarily nested), which eventually resolves to valid `ThemePropertyValue`s.
 *
 * Supports deep-merging and overriding with a partial theme.
 *
 * @param {Partial<Theme>} theme
 * @returns {Theme}
 */
const createTheme = (theme = {}) => {
  const defaultTheme = Object.keys(themeMapping).reduce(
    (acc, themeProperty) => {
      // @ts-ignore: this is fine
      acc[themeProperty] = {};
      return acc;
    },
    {},
  );

  return merge(defaultTheme)(theme);
};
