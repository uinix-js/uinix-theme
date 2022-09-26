/**
 * @typedef {import('../types.js').Style} Style
 */

import {isPlainObject, k} from 'uinix-fp';

/**
 * Coerces a style (object or rule) to a rule
 * @param {Style} style
 * @returns {*} StyleRule
 */
export const toStyleRule = (style) => (isPlainObject(style) ? k(style) : style);
