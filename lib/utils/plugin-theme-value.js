import {isPlainObject, props} from 'uinix-fp';
import {createCssVariable} from './create-css-variable.js';

/**
 * @typedef {import('fela').TPlugin} FelaPlugin
 * @typedef {import('../types.js').StyleObject} StyleObject
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').ThemeSpec} ThemeSpec
 */

/**
 * Customized Fela theme value plugin.
 * @param {Object} params
 * @param {Object} [params.cssVariables]
 * @param {string} [params.namespace]
 * @param {ThemeSpec} params.themeSpec
 * @returns {FelaPlugin}
 */
export const themeValue =
  ({cssVariables, namespace, themeSpec}) =>
  (style, _type, _renderer, props) =>
    resolveThemeValues({
      cssVariables,
      namespace,
      style,
      // @ts-ignore
      theme: props.theme,
      themeSpec,
    });

/**
 * Recursively resolve theme value
 * @param {Object} params
 * @param {Object} [params.cssVariables]
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
        const isNegative = NEGATIVE_REGEXP.test(styleValue);
        if (isNegative) {
          styleValue = String(styleValue).split(NEGATIVE_REGEXP)[1].trim();
        }

        const resolvedValue =
          props(String(styleValue))(theme ? resolve(theme) : {}) || styleValue;
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
        style: style[cssProperty],
        theme,
        themeSpec,
      });
    }
  }

  return style;
};

/**
 * Creates a theme themeMapping from a theme spec
 *
 * @param {ThemeSpec} themeSpec
 * @returns {Object.<string, any>}
 */
const createThemeMapping = (themeSpec) => {
  /** @type {Object.<string, any>} */
  const initialAcc = {};
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
    initialAcc,
  );
};
