import {isPlainObject} from 'uinix-fp';

import {createCssVariable} from './utils/create-css-variable.js';

/**
 * @typedef {import('./types.js').Theme} Theme
 */

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

/**
 * Transforms the provided nested theme into a flat object of CSS variables
 * @param {Theme} [theme={}]
 * @param {object} [options={}]
 * @param {string} [options.namespace]
 *    Prepends a namespace prefix to every rendered CSS classname and keyframe. Namespaces can only consist of `a-zA-Z0-9-_` and start with `a-zA-Z_`.
 * @returns {Object<string, any>}
 */
export const createCssVariables = (theme = {}, {namespace = ''} = {}) => {
  return Object.fromEntries(
    Object.entries(flatten(theme)).map(([key, value]) => [
      createCssVariable(key, {namespace}),
      value,
    ]),
  );
};
