/**
 * @typedef {import('fela').IRenderer} _FelaRenderer
 * @typedef {import('fela').TPlugin} _FelaPlugin
 * @typedef {import('csstype').Properties} _CssTypeProperties
 */

/**
 * This module exports nothing.  It contains JSDoc typedefs.
 */
export {};

// Vendor/private types
/**
 * @typedef {(renderer: _FelaRenderer) => _FelaRenderer} _FelaEnhancer
 */

// CSS types
/**
 * @typedef {string | number} CssValue
 *    A valid base CSS value e.g. "4px", 4, "red".
 */

/**
 * @typedef {keyof _CssTypeProperties} CssProperty
 *    A valid CSS property e.g. "backgroundColor", "paddingLeft".
 */

/**
 * @typedef {Record<string, CssValue>} CssVariables
 *    Map of CSS variables to CSS values.
 */

// Theme types
/**
 * @typedef {string} ThemeProperty
 *    A theme property.
 */

/**
 * @typedef {Record<ThemeProperty, Array<CssProperty>>} ThemeSpec
 *    A theme spec relates theme properties with CSS properties.
 */

/**
 * @typedef {{
 *   [key: string]: ThemeRecursive | CssValue
 * }} ThemeRecursive
 *    Recursive helper type.
 */

/**
 * @typedef {Record<ThemeProperty, ThemeRecursive>} Theme
 *    A theme relates theme properties with CSS values (recursive).
 */

// Style types
/**
 * @typedef {CssValue | Array<CssValue>} StyleValue
 *    Style values can be specified as either singleton or array of CSS values.
 */

/**
 * @typedef {_CssTypeProperties & Record<string, StyleValue>} StyleCssProperties
 *    Mapping of CSS properties to style values.
 */

/**
 * @typedef {{
 *    [key: string]: StyleRecursiveAny | StyleRecursivePseudo | StyleCssProperties | StyleValue;
 * }} StyleRecursiveAny;
 *    Recursive helper type.
 */

/**
 * @typedef {{
 *    [key: string]: StyleRecursivePseudo | StyleRecursiveAny | StyleCssProperties | StyleValue;
 * }} StyleRecursivePseudo;
 *    Recursive helper type.
 */

/**
 * @typedef {StyleCssProperties | StyleRecursivePseudo | StyleRecursiveAny} StyleObject
 *    A style object.
 */

/**
 * @template [P=unknown]
 * @callback StyleRule
 * @param {P} props
 * @returns {StyleObject}
 *    A style rule is a function returning a style object or null.
 */

/**
 * @typedef {StyleObject | StyleRule} Style
 *    A style can be either a style object or a style rule.
 */
