import {isPlainObject, props} from 'uinix-fp';

export const themeValue = (themeSpec) => (style, _type, _renderer, props) =>
  resolveThemeValues({style, theme: props.theme, themeSpec});

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

const createThemeMapping = (themeMapping) => {
  const initialAcc = {};
  return Object.entries(themeMapping).reduce(
    (acc, [themeProperty, cssProperties]) => {
      for (const cssProperty of cssProperties) {
        acc[cssProperty] = props(themeProperty);
      }

      return acc;
    },
    initialAcc,
  );
};
