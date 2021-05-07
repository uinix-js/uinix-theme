export {createTheme};

import {merge} from 'uinix-fp';

import {themeMapping} from './theme-mapping.js';

/**
 * @typedef {string | number} CssPropertyValue - a valid CSS property value (e.g. "center", "10px", 10)
 * @typedef {CssPropertyValue | CssPropertyValue[]} ThemeValue - a theme value can be either a single or array of CSS property values.
 * @typedef {{
 *   [key: string]: ThemePropertyDefinitions | ThemeValue
 * }} ThemePropertyDefinitions
 * @typedef {{
 *   animations: ThemePropertyDefinitions,
 *   borders: ThemePropertyDefinitions,
 *   borderStyles: ThemePropertyDefinitions,
 *   borderWidths: ThemePropertyDefinitions,
 *   colors: ThemePropertyDefinitions,
 *   fontFamilies: ThemePropertyDefinitions,
 *   fontSizes: ThemePropertyDefinitions,
 *   fontWeights: ThemePropertyDefinitions,
 *   keyframes: ThemePropertyDefinitions,
 *   letterSpacings: ThemePropertyDefinitions,
 *   lineHeights: ThemePropertyDefinitions,
 *   opacities: ThemePropertyDefinitions,
 *   radii: ThemePropertyDefinitions,
 *   shadows: ThemePropertyDefinitions,
 *   sizes: ThemePropertyDefinitions,
 *   spacings: ThemePropertyDefinitions,
 *   transforms: ThemePropertyDefinitions,
 *   transitions: ThemePropertyDefinitions,
 *   zIndices: ThemePropertyDefinitions,
 * }} Theme
 */

/**
 * Creates a uinix `Theme` object.
 *
 * The theme is a mapping of theme properties to theme property
 * definitions (arbitarily nested), eventually resolving to
 * valid singleton or array of CSS property values.
 *
 * Supports deepmerging and overriding with a partial theme.
 *
 * @param {Partial<Theme>} overrideTheme
 * @returns {Theme}
 */
const createTheme = (overrideTheme = {}) => {
  const themeProperties = Object.keys(themeMapping);
  const defaultTheme = themeProperties.reduce((acc, themeProperty) => {
    acc[themeProperty] = {};
    return acc;
  }, {});

  return merge(defaultTheme)(overrideTheme);
};
