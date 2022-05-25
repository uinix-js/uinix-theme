import {isPlainObject, props} from 'uinix-fp';

/**
 * @typedef {import('fela').TPlugin} FelaPlugin
 * @typedef {import('../types.js').StyleObject} StyleObject
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').ThemeSpec} ThemeSpec
 */

/**
 * Customized Fela theme value plugin.
 * @param {ThemeSpec} themeSpec
 * @returns {FelaPlugin}
 */
export const themeValue = (themeSpec) => (style, _type, _renderer, props) =>
  // @ts-ignore
  resolveThemeValues({style, theme: props.theme, themeSpec});

/**
 * Recursively resolve theme value
 * @param {Object} params
 * @param {StyleObject} params.style
 * @param {Theme} params.theme
 * @param {ThemeSpec} params.themeSpec
 * @returns {StyleObject}
 */
const resolveThemeValues = ({style, theme, themeSpec}) => {
  const NEGATIVE_REGEXP = /^\s*-/;
  const mapping = createThemeMapping(themeSpec);

  for (let [property, styleValue] of Object.entries(style)) {
    const resolveThemeValue = mapping[property];
    if (resolveThemeValue) {
      const isNegative = NEGATIVE_REGEXP.test(styleValue);
      if (isNegative) {
        styleValue = String(styleValue).split(NEGATIVE_REGEXP)[1].trim();
      }

      const resolvedValue =
        props(String(styleValue))(theme ? resolveThemeValue(theme) : {}) ||
        styleValue;
      const isNumber = !Number.isNaN(Number(resolvedValue));
      style[property] = isNegative
        ? isNumber
          ? -resolvedValue
          : `-${resolvedValue}`
        : resolvedValue;
    } else if (isPlainObject(styleValue)) {
      style[property] = resolveThemeValues({
        style: style[property],
        theme,
        themeSpec,
      });
    }
  }

  return style;
};

/**
 * Creates a theme mapping from a theme spec
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
        acc[cssProperty] = props(themeProperty);
      }

      return acc;
    },
    initialAcc,
  );
};
