import fs from 'fs';
import camelCaseCss from 'camelcase-css';
import knownCssProperties from 'known-css-properties';

import {themeMapping} from '../index.js';

/**
 * Reverse themeMapping into a flat map of CSS properties to theme properties.
 */
const cssPropertyToThemeProperty = Object.entries(themeMapping).reduce(
  (acc, entry) => {
    const [themeProperty, cssProperties] = entry;
    cssProperties.forEach((cssProperty) => {
      acc[cssProperty] = themeProperty;
    });
    return acc;
  },
  {},
);

/**
 * Curried compare function to compare by provided prop.
 *
 * Sorts null values last.
 *
 * @param {*} prop
 * @returns
 */
const compareByProp = (prop) => (a, b) => {
  return (
    (a[prop] === null) - (b[prop] === null) ||
    Number(a[prop] > b[prop]) ||
    -(a[prop] < b[prop])
  );
};

/**
 * Returns a summary of CSS properties supported by uinix-theme.
 *
 * @returns {void}
 */
const reportCssProperties = () => {
  const compareByThemeProperty = compareByProp('themeProperty');

  const data = knownCssProperties.all
    .map((property) => {
      const cssProperty = camelCaseCss(property);
      const themeProperty = cssPropertyToThemeProperty[cssProperty] || null;
      return {cssProperty, themeProperty};
    })
    .sort(compareByThemeProperty);

  const report =
    'css property,theme property\n' +
    data
      .map((d) => {
        const {cssProperty, themeProperty} = d;
        return `${cssProperty},${themeProperty || ''}`;
      })
      .join('\n');

  fs.writeFileSync('./report/css-properties.csv', report);
};

/**
 * Generate reports that will be saved in /report
 */
const report = () => {
  reportCssProperties();
};

report();
