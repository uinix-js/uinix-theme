import {defaultThemeSpec} from './default-theme-spec.js';

export {createTheme};

/**
 * @typedef {import('./types.js').Theme} Theme
 * @typedef {import('./types.js').ThemeSpec} ThemeSpec
 */

/**
 * Creates a theme based on the provided theme spec and override theme.
 * Theme properties not specified in the theme spec are not included in the
 * resolved theme.
 *
 * @template {Theme} T
 * @template {ThemeSpec} S
 * @param {T} [theme]
 * @param {S} [themeSpec]
 * @returns {T & Record<keyof S, {}>}
 */
const createTheme = (theme, themeSpec) =>
  // @ts-ignore (insufficient TS-inference)
  Object.fromEntries(
    Object.keys(themeSpec || defaultThemeSpec).map((themeProperty) => [
      themeProperty,
      theme?.[themeProperty] || {},
    ]),
  );
