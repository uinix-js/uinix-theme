/**
 * @typedef {import('./types.js').CssValue} CssValue
 * @typedef {import('./types.js').CssVariables} CssVariables
 * @typedef {import('./types.js').Theme} Theme
 * @typedef {import('./types.js').ThemeRecursive} ThemeRecursive
 * @typedef {import('./types.js').ThemeSpec} ThemeSpec
 */

import {isUnitlessProperty} from 'css-in-js-utils';
import {isPlainObject} from 'uinix-fp';

import {createCssVariable} from './utils/create-css-variable.js';

/**
 * Transforms the provided nested theme into a flat object of CSS variables
 * @param {Theme} [theme={}]
 * @param {Object} [options={}]
 * @param {string} [options.namespace]
 *    Prepends a namespace prefix to every rendered CSS classname and keyframe. Namespaces can only consist of `a-z0-9-_` and start with `a-z_`.
 * @param {ThemeSpec} [options.themeSpec]
 * @returns {CssVariables}
 */
export const createCssVariables = (theme = {}, options = defaultOptions) => {
  return Object.fromEntries(
    Object.entries(flattenTheme(theme)).map(([key, value]) => {
      const {namespace, themeSpec = {}} = options;
      const themeProperty = key.split('.')[0];
      const cssProperties = themeSpec[themeProperty] || [];
      const valueWithUnits = // This determination is not robust (i.e. px-only) but it is closest with the source code and fela-plugin-unit assumptions
        typeof value !== 'number' || cssProperties.every(isUnitlessProperty)
          ? value
          : `${value}px`;
      return [createCssVariable(key, {namespace}), valueWithUnits];
    }),
  );
};

/**
 * Returns a flattened object with property path as keys
 * @typedef {Record<string, CssValue>} FlattenedTheme
 * @param {Theme} theme
 * @param {string} [path]
 * @returns {FlattenedTheme}
 */
const flattenTheme = (theme, path = '') => {
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

const defaultOptions = {namespace: ''};
