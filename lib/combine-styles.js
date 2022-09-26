/**
 * @typedef {import('./types.js').Style} Style
 * @typedef {import('./types.js').StyleRule} StyleRule
 */

import {combineRules} from 'fela';

import {toStyleRule} from './utils/to-style-rule.js';

/**
 * Combines a singleton or array of styles (either objects or rules) to a single style rule.
 * @param {Style|Array<Style>} styles
 * @returns {StyleRule}
 */
export const combineStyles = (styles) =>
  Array.isArray(styles)
    ? combineRules(...styles.map(toStyleRule))
    : toStyleRule(styles);
