export {themeMapping};

/**
 * @typedef {string} CssProperty A valid JS-named CSS property (e.g. "color", "marginBottom", "alignItems").
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
 */

/**
 * A mapping of ThemeProperty to one or more CssProperty.
 *
 * @type {{
 *   animations: CssProperty[];
 *   borders: CssProperty[];
 *   borderStyles: CssProperty[];
 *   borderWidths: CssProperty[];
 *   colors: CssProperty[];
 *   fontFamilies: CssProperty[];
 *   fontSizes: CssProperty[];
 *   fontWeights: CssProperty[];
 *   keyframes: CssProperty[];
 *   letterSpacings: CssProperty[];
 *   lineHeights: CssProperty[];
 *   opacities: CssProperty[];
 *   radii: CssProperty[];
 *   shadows: CssProperty[];
 *   sizes: CssProperty[];
 *   spacings: CssProperty[];
 *   transforms: CssProperty[];
 *   transitions: CssProperty[];
 *   zIndices: CssProperty[];
 * }}
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
