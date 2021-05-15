export {themeMapping};

/**
 * @typedef {string} CssProperty A valid JS-named CSS property (e.g. `color`, `marginBottom`, `alignItems`).
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
 * )} ThemeProperty A supported theme spec property.
 *
 * @typedef ThemeMapping A mapping of `ThemeProperty` to one or more `CssProperty`.
 * @property {CssProperty[]} animations Maps to `animation`.
 * @property {CssProperty[]} borders Maps to `border`, `borderBottom`, `borderTop`, etc.
 * @property {CssProperty[]} borderStyles Maps to `borderStyle`, `borderBottomStyle`, `borderTopSTyle` etc.
 * @property {CssProperty[]} borderWidths Maps to `borderWidth`, `borderTopWidth`, `borderBottomWidth` etc.
 * @property {CssProperty[]} colors Maps to `color`, `backgroundColor`, borderColor` etc.
 * @property {CssProperty[]} fontFamilies Maps to `fontFamily`.
 * @property {CssProperty[]} fontSizes Maps to `fontSize`.
 * @property {CssProperty[]} fontWeights Maps to `fontWeight`.
 * @property {CssProperty[]} keyframes Maps to `animationName`.
 * @property {CssProperty[]} letterSpacings Maps to `letterSpacing`.
 * @property {CssProperty[]} lineHeights Maps to `lineHeight`.
 * @property {CssProperty[]} opacities Maps to `opacity`.
 * @property {CssProperty[]} radii Maps to `borderRadius`, `borderTopRightRadius`, `borderTopLeftRadius` etc.
 * @property {CssProperty[]} shadows Maps to `boxShadow`, `textShadow`.
 * @property {CssProperty[]} sizes Maps to `height`, `width`, `maxWidth` etc.
 * @property {CssProperty[]} spacings Maps to `padding`, `margin`, `marginBottom` etc.
 * @property {CssProperty[]} transforms Maps to `transform`.
 * @property {CssProperty[]} transitions Maps to `transition`.
 * @property {CssProperty[]} zIndices Maps to `zIndex`.
 */

/**
 * A mapping of `ThemeProperty` to one or more `CssProperty`.
 *
 * @type {ThemeMapping}
 */
const themeMapping = {
  animations: ['animation'],
  borders: [
    'border',
    'borderBlock',
    'borderBlockEnd',
    'borderBlockStart',
    'borderBottom',
    'borderInline',
    'borderInlineEnd',
    'borderInlineStart',
    'borderLeft',
    'borderRight',
    'borderTop',
  ],
  borderStyles: [
    'borderBlockEndStyle',
    'borderBlockStartStyle',
    'borderBlockStyle',
    'borderBottomStyle',
    'borderInlineEndStyle',
    'borderInlineStartStyle',
    'borderInlineStyle',
    'borderLeftStyle',
    'borderRightStyle',
    'borderStyle',
    'borderTopStyle',
  ],
  borderWidths: [
    'borderBlockEndWidth',
    'borderBlockStartWidth',
    'borderBlockWidth',
    'borderBottomWidth',
    'borderInlineEndWidth',
    'borderInlineStartWidth',
    'borderInlineWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderWidth',
  ],
  colors: [
    'backgroundColor',
    'borderBottomColor',
    'borderColor',
    'borderLeftColor',
    'borderRightColor',
    'borderTopColor',
    'caretColor',
    'color',
    'columnRuleColor',
    'fill',
    'outlineColor',
    'stroke',
  ],
  fontFamilies: ['fontFamily'],
  fontSizes: ['fontSize'],
  fontWeights: ['fontWeight'],
  keyframes: ['animationName'],
  letterSpacings: ['letterSpacing'],
  lineHeights: ['lineHeight'],
  opacities: ['opacity'],
  radii: [
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderEndEndRadius',
    'borderEndStartRadius',
    'borderRadius',
    'borderStartEndRadius',
    'borderStartStartRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
  ],
  shadows: ['boxShadow', 'textShadow'],
  sizes: [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'flexBasis',
    'blockSize',
    'inlineSize',
    'maxBlockSize',
    'maxInlineSize',
    'minBlockSize',
    'minInlineSize',
  ],
  spacings: [
    'bottom',
    'columnGap',
    'gap',
    'gridColumnGap',
    'gridGap',
    'gridRowGap',
    'inset',
    'insetBlock',
    'insetBlockEnd',
    'insetBlockStart',
    'insetInline',
    'insetInlineEnd',
    'insetInlineStart',
    'left',
    'margin',
    'marginBlock',
    'marginBlockEnd',
    'marginBlockStart',
    'marginBottom',
    'marginInline',
    'marginInlineEnd',
    'marginInlineStart',
    'marginLeft',
    'marginRight',
    'marginTop',
    'padding',
    'paddingBlock',
    'paddingBlockEnd',
    'paddingBlockStart',
    'paddingBottom',
    'paddingInline',
    'paddingInlineEnd',
    'paddingInlineStart',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'right',
    'rowGap',
    'scrollPadding',
    'scrollPaddingBottom',
    'scrollPaddingLeft',
    'scrollPaddingRight',
    'scrollPaddingTop',
    'top',
  ],
  transforms: ['transform'],
  transitions: ['transition'],
  zIndices: ['zIndex'],
};
