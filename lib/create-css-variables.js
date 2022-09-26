/**
 * @typedef {import('./types.js').Theme} Theme
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
 * @param {Object<string, any>} [options.themeSpec]
 * @returns {Object<string, any>}
 */
export const createCssVariables = (theme = {}, options = defaultOptions) => {
  return Object.fromEntries(
    Object.entries(flatten(theme)).map(([key, value]) => {
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
 * @param {Object.<string, any>} object
 * @param {string} path
 * @returns {Object}
 */
const flatten = (object, path = '') => {
  /** @type {Record<string, any>} */
  const result = {};
  return Object.keys(object).reduce((acc, k) => {
    const prepath = path.length > 0 ? path + '.' : '';
    if (isPlainObject(object[k])) {
      Object.assign(acc, flatten(object[k], prepath + k));
    } else {
      acc[prepath + k] = object[k];
    }

    return acc;
  }, result);
};

const defaultOptions = {namespace: ''};
