/**
 * @typedef {import('../types.js').CssValue} CssValue
 * @typedef {import('../types.js').Theme} Theme
 */

import {isPlainObject} from 'uinix-fp';

/**
 * Returns a flattened object with property path as keys
 * @typedef {Record<string, CssValue>} FlattenedTheme
 * @param {Theme} theme
 * @param {string} [path]
 * @returns {FlattenedTheme}
 */
export const flattenTheme = (theme, path = '') => {
  /** @type {FlattenedTheme} */
  const flattenedTheme = {};
  return Object.keys(theme).reduce((acc, k) => {
    const prepath = path.length > 0 ? path + '.' : '';
    if (isPlainObject(theme[k])) {
      Object.assign(
        acc,
        flattenTheme(
          // @ts-ignore TODO:tighten
          theme[k],
          prepath + k,
        ),
      );
    } else {
      // @ts-ignore TODO:tighten
      acc[prepath + k] = theme[k];
    }

    return acc;
  }, flattenedTheme);
};
