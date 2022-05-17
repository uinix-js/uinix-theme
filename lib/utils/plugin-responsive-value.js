import felaResponsiveValue from 'fela-plugin-responsive-value';

import {coerceEsm} from './coerce-esm.js';

export const responsiveValue = ({
  responsiveBreakpoints = [],
  responsiveCssProperties = [],
}) =>
  coerceEsm(felaResponsiveValue)(
    getMediaQueries(responsiveBreakpoints),
    getResponsiveProperties(responsiveCssProperties),
  );

const getMediaQueries = (breakpoints) => () =>
  breakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

const getResponsiveProperties = (responsiveCssProperties) => {
  const initialAcc = {};
  return responsiveCssProperties.reduce((acc, attribute) => {
    acc[attribute] = true;
    return acc;
  }, initialAcc);
};
