/**
 * @typedef {import('../types.js').CssValue} CssValue
 * @typedef {import('../types.js').CssVariables} CssVariables
 * @typedef {import('../types.js').StyleObject} StyleObject
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').ThemeProperty} ThemeProperty
 * @typedef {import('../types.js').ThemeSpec} ThemeSpec
 * @typedef {import('../types.js')._FelaPlugin} _FelaPlugin
 */

import {isPlainObject, props} from 'uinix-fp';

import {createCssVariable} from './create-css-variable.js';

/**
 * Customized Fela theme value plugin.
 * @param {Object} params
 * @param {CssVariables} [params.cssVariables]
 * @param {string} [params.namespace]
 * @param {ThemeSpec} params.themeSpec
 * @returns {_FelaPlugin}
 */
export const themeValue =
  ({cssVariables, namespace, themeSpec}) =>
  (style, _type, _renderer, props) =>
    resolveThemeValues({
      cssVariables,
      namespace,
      // @ts-ignore TODO: tighten
      style,
      // @ts-ignore TODO: tighten
      theme: props.theme,
      themeSpec,
    });

/**
 * Recursively resolve theme value
 * @param {Object} params
 * @param {CssVariables} [params.cssVariables]
 * @param {string} [params.namespace='']
 * @param {StyleObject} params.style
 * @param {Theme} params.theme
 * @param {ThemeSpec} params.themeSpec
 * @returns {StyleObject}
 */
const resolveThemeValues = ({
  cssVariables = {},
  namespace,
  style,
  theme,
  themeSpec,
}) => {
  const NEGATIVE_REGEXP = /^\s*-/;
  const themeMapping = createThemeMapping(themeSpec);

  for (let [cssProperty, styleValue] of Object.entries(style)) {
    const {resolve, themeProperty} = themeMapping[cssProperty] || {};
    if (resolve) {
      const cssVariable = createCssVariable(`${themeProperty}.${styleValue}`, {
        namespace,
      });
      if (cssVariable in cssVariables) {
        style[cssProperty] = `var(${cssVariable})`;
      } else {
        // @ts-ignore TODO: tighten
        const isNegative = NEGATIVE_REGEXP.test(styleValue);
        if (isNegative) {
          styleValue = String(styleValue).split(NEGATIVE_REGEXP)[1].trim();
        }

        /** @type {CssValue} */
        const resolvedValue =
          props(String(styleValue))(theme ? resolve(theme) || {} : {}) ||
          styleValue;
        const isNumber = !Number.isNaN(Number(resolvedValue));
        style[cssProperty] = isNegative
          ? isNumber
            ? -resolvedValue
            : `-${resolvedValue}`
          : resolvedValue;
      }
    } else if (isPlainObject(styleValue)) {
      style[cssProperty] = resolveThemeValues({
        cssVariables,
        namespace,
        // @ts-ignore TODO: tighten
        style: style[cssProperty],
        theme,
        themeSpec,
      });
    }
  }

  return style;
};

/**
 * Creates a theme mapping of theme property resolvers from a theme spec.
 *
 * @typedef ThemePropertyResolver
 *    A map storing the themeProperty and resolve method.
 * @property {(theme: Theme) => CssValue} resolve
 *    Resolves CSS value given a theme.
 * @property {ThemeProperty} themeProperty
 *    A theme property.
 *
 * @typedef {Partial<Record<string, ThemePropertyResolver>>} ThemeMapping;
 *
 * @param {ThemeSpec} themeSpec
 * @returns {ThemeMapping}
 */
const createThemeMapping = (themeSpec) => {
  /** @type {ThemeMapping} */
  const themeMapping = {};
  return Object.entries(themeSpec).reduce(
    (acc, [themeProperty, cssProperties]) => {
      for (const cssProperty of cssProperties) {
        acc[cssProperty] = {
          resolve: props(themeProperty),
          themeProperty,
        };
      }

      return acc;
    },
    themeMapping,
  );
};
