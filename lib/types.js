/**
 * This module exports nothing.  It contains JSDoc typedefs.
 */

export {};

/**
 * @typedef {string} CssProperty
 *    A valid JS-named CSS property (e.g. color, marginBottom, alignItems).
 *
 * @typedef {string | number} CssPropertyValue
 *    A valid `CssProperty` value (e.g. "center", "10px", 10).
 *
 * @typedef {object} CssKeyframesRuleValue
 *    A valid CSS keyframes rule value expressed as a JS object.
 *    e.g. {from: {...}, to: {...}}
 *
 * @typedef {CssPropertyValue | CssKeyframesRuleValue} ThemePropertyValue
 *    The possible value types a theme property vale can assume.
 *
 * @typedef {{
 *   [key: string]: ThemePropertyValue | ThemePropertyDefinition
 * }} ThemePropertyDefinition
 *    A `ThemePropertyDefinition` can be recursively nested to organize
 *    evenutally-resolved `ThemePropertyValue`s.
 *    A recursively nested definition for a `ThemeProperty` that eventually
 *    resolves to a `ThemePropertyValue`.
 *
 * @typedef {(
 *   'animations'
 *   | 'borders'
 *   | 'borderStyles'
 *   | 'borderWidths'
 *   | 'colors'
 *   | 'fontFamilies'
 *   | 'fontSizes'
 *   | 'fontWeights'
 *   | 'keyframes'
 *   | 'letterSpacings'
 *   | 'lineHeights'
 *   | 'opacities'
 *   | 'radii'
 *   | 'shadows'
 *   | 'sizes'
 *   | 'spacings'
 *   | 'transforms'
 *   | 'transitions'
 *   | 'zIndices'
 * )} ThemeProperty
 *    Theme property values
 *
 * @typedef Theme
 *    A mapping of `ThemeProperty` to `ThemePropertyDefinition`.
 * @property {ThemePropertyDefinition} animations
 * @property {ThemePropertyDefinition} borders
 * @property {ThemePropertyDefinition} borderStyles
 * @property {ThemePropertyDefinition} borderWidths
 * @property {ThemePropertyDefinition} colors
 * @property {ThemePropertyDefinition} fontFamilies
 * @property {ThemePropertyDefinition} fontSizes
 * @property {ThemePropertyDefinition} fontWeights
 * @property {ThemePropertyDefinition} keyframes
 * @property {ThemePropertyDefinition} letterSpacings
 * @property {ThemePropertyDefinition} lineHeights
 * @property {ThemePropertyDefinition} opacities
 * @property {ThemePropertyDefinition} radii
 * @property {ThemePropertyDefinition} shadows
 * @property {ThemePropertyDefinition} sizes
 * @property {ThemePropertyDefinition} spacings
 * @property {ThemePropertyDefinition} transforms
 * @property {ThemePropertyDefinition} transitions
 * @property {ThemePropertyDefinition} zIndices
 *
 * @typedef ThemeMapping
 *    A mapping of `ThemeProperty` to one or more `CssProperty`.
 * @property {CssProperty[]} animations
 * @property {CssProperty[]} borders
 * @property {CssProperty[]} borderStyles
 * @property {CssProperty[]} borderWidths
 * @property {CssProperty[]} colors
 * @property {CssProperty[]} fontFamilies
 * @property {CssProperty[]} fontSizes
 * @property {CssProperty[]} fontWeights
 * @property {CssProperty[]} keyframes
 * @property {CssProperty[]} letterSpacings
 * @property {CssProperty[]} lineHeights
 * @property {CssProperty[]} opacities
 * @property {CssProperty[]} radii
 * @property {CssProperty[]} shadows
 * @property {CssProperty[]} sizes
 * @property {CssProperty[]} spacings
 * @property {CssProperty[]} transforms
 * @property {CssProperty[]} transitions
 * @property {CssProperty[]} zIndices
 */
