/**
 * @typedef {import('../types.js')._FelaPlugin} _FelaPlugin
 */

import felaResponsiveValue from 'fela-plugin-responsive-value';

import {coerceEsm} from './coerce-esm.js';

/**
 * Customized Fela responsive value plugin.
 *
 * @param {Object} params
 * @param {Array<string>} [params.responsiveBreakpoints=[]]
 *    An array of responsive breakpoints (e.g. ['400px', '800px'])
 * @param {Array<string>} [params.responsiveCssProperties=[]]
 *    An array of whitelisted responsive CSS properties (e.g. ['border', 'color', 'padding', 'paddingLeft'])
 * @returns {_FelaPlugin}
 */
export const responsiveValue = ({
  responsiveBreakpoints = [],
  responsiveCssProperties = [],
}) =>
  coerceEsm(felaResponsiveValue)(
    getMediaQueries(responsiveBreakpoints),
    getResponsiveProperties(responsiveCssProperties),
  );

/**
 * Returns a callback returning media queries given breakpoints
 *
 * @param {Array<string>} breakpoints
 *    An array of responsive breakpoints
 * @returns {() => Array<string>}
 *    Callback returning an array of media queries
 */
const getMediaQueries = (breakpoints) => () =>
  breakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

/**
 * Returns a boolean map of responsive CSS properties.
 *
 * @param {Array<string>} responsiveCssProperties
 *    An array of whitelisted responsive CSS properties
 * @returns {Record<string, boolean>}
 */
const getResponsiveProperties = (responsiveCssProperties) => {
  /** @type {Record<string, boolean>} */
  const responsiveProperties = {};
  return responsiveCssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = true;
    return acc;
  }, responsiveProperties);
};
