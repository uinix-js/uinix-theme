// Imports
/**
 * @typedef {import('fela').IStyle} IStyle
 * @typedef {import('fela').TRule} TRule
 */

// Aliases
/**
 * @typedef {string} CssProperty
 *    A valid CSS property e.g. "backgroundColor", "paddingLeft"
 *
 * @typedef {string | number} CssValue
 *    A valid CSS value e.g. "4px", 4, "red".
 *
 * @typedef {string} ThemeProperty
 *    A string key in the Theme object.
 */

// Theme
/**
 * @typedef {Record<ThemeProperty, CssProperty[]>} ThemeSpec
 *    A theme spec relates theme properties with CSS properties.
 *
 * @typedef {{
 *   [key: string]: ThemePropertyDefinition | CssValue
 * }} ThemePropertyDefinition
 *    A theme property definition is an arbitrarily nested interface that
 *    organizes resolved CSS values.
 *
 * @typedef {Record<ThemeProperty, ThemePropertyDefinition>} Theme
 *    A theme relates theme properties with theme property definitions.
 */

// Style
/**
 * @typedef {Record<string, any>} StyleObject
 *    A style object
 *
 * @typedef {TRule} StyleRule
 *    A style rule (function)
 *
 * @typedef {StyleObject | StyleRule} Style
 *    Either a style object or rule
 *
 * @typedef {Object} StyleProps
 *    Generic object for style props
 */

/**
 * This module exports nothing.  It contains JSDoc typedefs.
 */
export {};
