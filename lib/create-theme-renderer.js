import {createRenderer} from 'fela';
import {render as renderToDom} from 'fela-dom';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import {isPlainObject} from 'uinix-fp';

import {responsiveValue} from './utils/plugin-responsive-value.js';
import {themeValue} from './utils/plugin-theme-value.js';
import {coerceEsm} from './utils/coerce-esm.js';

export const createThemeRenderer = (options = {}) => {
  const {
    enableAtomicCss = false,
    responsiveBreakpoints = [],
    responsiveCssProperties = [],
    theme = {},
    themeSpec = {},
  } = options;

  const enhancers = [coerceEsm(enforceLonghands)()];
  if (!enableAtomicCss) {
    enhancers.push(coerceEsm(monolithic)());
  }

  const plugins = [
    responsiveValue({responsiveBreakpoints, responsiveCssProperties}),
    themeValue(themeSpec),
    ...coerceEsm(webPreset),
  ];

  const renderer = createRenderer({
    enhancers,
    plugins,
  });

  const render = () => renderToDom(renderer);

  const renderStyle = (style, styleProps) => {
    const styleRule = isPlainObject(style) ? () => style : style;
    return renderer.renderRule(styleRule, {...styleProps, theme});
  };

  return {
    render,
    renderStyle,
    subscribe: renderer.subscribe,
  };
};
