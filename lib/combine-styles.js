import {combineRules} from 'fela';
import {isPlainObject, k} from 'uinix-fp';

/**
 * @typedef {import('./types.js').Style} Style
 * @typedef {import('./types.js').StyleRule} StyleRule
 */

/**
 * Combines a singleton or array of styles (either objects or rules) to a single style rule.
 * @param {Style|Style[]} styles
 * @returns {StyleRule}
 */
export const combineStyles = (styles) =>
  Array.isArray(styles) ? combineRules(...styles.map(toRule)) : toRule(styles);

/**
 * Coerces a style (object or rule) to a rule
 * @param {Style} style
 * @returns {*} (untyped) StyleRule
 */
const toRule = (style) => (isPlainObject(style) ? k(style) : style);
