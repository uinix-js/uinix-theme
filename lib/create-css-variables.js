/**
 * @typedef {import('./types.js').CssVariables} CssVariables
 * @typedef {import('./types.js').Theme} Theme
 * @typedef {import('./types.js').ThemeSpec} ThemeSpec
 */

import {isUnitlessProperty} from 'css-in-js-utils';

import {createCssVariable} from './utils/create-css-variable.js';
import {flattenTheme} from './utils/flatten-theme.js';

/**
 * Transforms the provided recursive theme into a flat object of CSS variables
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

const defaultOptions = {namespace: ''};
