import {combineRules} from 'fela';
import {isPlainObject, k} from 'uinix-fp';

/**
 * Combines a singleton or array of style objects/rules to a single style rule.
 * @template {any} X
 * @param {X|X[]} x
 * @returns {X}
 */
export const combineStyles = (xs) =>
  Array.isArray(xs) ? combineRules(...xs.map(toRule)) : toRule(xs);

const toRule = (x) => (isPlainObject(x) ? k(x) : x);
