export {createTheme};

import {merge} from 'uinix-fp';

import {themeMapping} from './theme-mapping.js';

/**
 * @typedef {import('./theme-mapping').ThemeProperty} ThemeProperty
 *
 * @typedef {string | number} CssPropertyValue A valid CssProperty value (e.g. "center", "10px", 10).
 *
 * @typedef {object} KeyframeRule A valid CSS keyframe at-rule expressed as a JS object (e.g. {from: {...}, to: {...}}).
 *
 * @typedef {CssPropertyValue | CssPropertyValue[] | KeyframeRule} ThemePropertyValue The possible value types that a ThemeProperty can assume.
 *
 * @typedef {{
 *   [key: string]: ThemePropertyDefinition | ThemePropertyValue
 * }} ThemePropertyDefinition A recursively nested definition for a ThemeProperty that eventually resolves to a ThemePropertyValue.
 *
 * @typedef {{
 *   [key in ThemeProperty]: ThemePropertyDefinition
 * }} Theme
 */

/**
 * Creates a uinix Theme object.
 *
 * The theme is a mapping of ThemeProperty to ThemePropertyDefinition
 * (arbitarily nested), which eventually resolves to a valid ThemePropertyValue.
 *
 * Supports deep-merging and overriding with a partial theme.
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
