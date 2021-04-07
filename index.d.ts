export { Theme, ThemeSpec, createTheme };

declare function createTheme(themeOverride: Optional<Theme>): Theme;

interface Theme {
  animations: ThemePropertyValue;
  borders: ThemePropertyValue;
  borderStyles: ThemePropertyValue;
  borderWidths: ThemePropertyValue;
  colors: ThemePropertyValue;
  fonts: ThemePropertyValue;
  fontSizes: ThemePropertyValue;
  fontWeights: ThemePropertyValue;
  keyframes: ThemePropertyValue;
  letterSpacings: ThemePropertyValue;
  lineHeights: ThemePropertyValue;
  opacities: ThemePropertyValue;
  radii: ThemePropertyValue;
  shadows: ThemePropertyValue;
  sizes: ThemePropertyValue;
  spacings: ThemePropertyValue;
  transitions: ThemePropertyValue;
  zIndices: ThemePropertyValue;
  breakpoints: ThemePropertyValue;
  styles: ThemePropertyValue;
}

interface ThemeSpec {
  animations: CssProperties;
  borders: CssProperties;
  borderStyles: CssProperties;
  borderWidths: CssProperties;
  colors: CssProperties;
  fonts: CssProperties;
  fontSizes: CssProperties;
  fontWeights: CssProperties;
  keyframes: CssProperties;
  letterSpacings: CssProperties;
  lineHeights: CssProperties;
  opacities: CssProperties;
  radii: CssProperties;
  shadows: CssProperties;
  sizes: CssProperties;
  spacings: CssProperties;
  transitions: CssProperties;
  zIndices: CssProperties;
}

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type CssProperties = string[];

type ThemePropertyValue = Record<
  string,
  ThemeValue | ThemeResponsiveValue | Record<string, unknown>
>; // TODO: figure how to recursively type this

type ThemeResponsiveValue = ThemeValue[];

type ThemeValue = string | number; // a valid CSS property value
