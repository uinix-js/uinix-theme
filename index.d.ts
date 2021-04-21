export { Theme, ThemeSpec, createTheme };

declare function createTheme(themeOverride: Optional<Theme>): Theme;

interface Theme {
  animations: ThemeValue;
  borders: ThemeValue;
  borderStyles: ThemeValue;
  borderWidths: ThemeValue;
  colors: ThemeValue;
  fontFamilies: ThemeValue;
  fontSizes: ThemeValue;
  fontWeights: ThemeValue;
  keyframes: ThemeValue;
  letterSpacings: ThemeValue;
  lineHeights: ThemeValue;
  opacities: ThemeValue;
  radii: ThemeValue;
  shadows: ThemeValue;
  sizes: ThemeValue;
  spacings: ThemeValue;
  transitions: ThemeValue;
  zIndices: ThemeValue;
  breakpoints: ThemeValue;
  fontFaces: ThemeValue;
}

interface ThemeSpec {
  animations: CssProperty[];
  borders: CssProperty[];
  borderStyles: CssProperty[];
  borderWidths: CssProperty[];
  colors: CssProperty[];
  fontFamilies: CssProperty[];
  fontSizes: CssProperty[];
  fontWeights: CssProperty[];
  keyframes: CssProperty[];
  letterSpacings: CssProperty[];
  lineHeights: CssProperty[];
  opacities: CssProperty[];
  radii: CssProperty[];
  shadows: CssProperty[];
  sizes: CssProperty[];
  spacings: CssProperty[];
  transitions: CssProperty[];
  zIndices: CssProperty[];
}

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type CssProperty = string;

// TODO: figure how to recursively type this
type ThemeValue = Record<
  string,
  CssValue | ResponsiveThemeValue | Record<string, unknown>
>;

type ResponsiveThemeValue = CssValue[];

type CssValue = string | number; // a valid CSS property value
