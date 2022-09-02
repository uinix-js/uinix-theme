import {createRenderer} from 'fela';
import {render as renderToDom} from 'fela-dom';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import {isPlainObject} from 'uinix-fp';

import {createTheme} from './create-theme.js';
import {responsiveValue} from './utils/plugin-responsive-value.js';
import {themeValue} from './utils/plugin-theme-value.js';
import {coerceEsm} from './utils/coerce-esm.js';

/**
 * @typedef {import('./types.js').StyleObject} StyleObject
 * @typedef {import('./types.js').StyleProps} StyleProps
 * @typedef {import('./types.js').StyleRule} StyleRule
 * @typedef {import('./types.js').Theme} Theme
 * @typedef {import('./types.js').ThemeSpec} ThemeSpec
 */

/**
 * Returns a theme renderer supporting themable and responsive style rendering.
 *
 * @param {object} [options={}]
 * @param {boolean} [options.enableAtomicCss=false]
 *    Enables rendering styles as atomic CSS
 * @param {string} [options.namespace='']
 *    Prepends a namespace prefix to every rendered CSS classname and keyframe. Namespaces can only consist of `a-zA-Z0-9-_` and start with `a-zA-Z_`.
 * @param {Array<string>} [options.responsiveBreakpoints=[]]
 *    Enables responsive styling (array of values corresponding to breakpoints.
 *    Breakpoints must be provided as string values (e.g. '800px')
 * @param {Array<string>} [options.responsiveCssProperties=[]]
 *    Responsive CSS properties must be explicitly whitelisted here.
 * @param {ThemeSpec} [options.themeSpec={}]
 * @param {Theme} [options.theme={}]
 * @returns
 */
export const createThemeRenderer = (options = {}) => {
  const {
    enableAtomicCss = false,
    namespace = '',
    responsiveBreakpoints = [],
    responsiveCssProperties = [],
    themeSpec = {},
    theme = createTheme({}, themeSpec),
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
    selectorPrefix: namespace,
  });

  const render = () => renderToDom(renderer);

  /**
   * Renders static styles (e.g. global CSS)
   *
   * Simplified when https://github.com/robinweser/fela/issues/876 is resolved
   * @param {StyleObject} staticStyles
   * @returns {void}
   */
  const renderStaticStyles = (staticStyles) => {
    for (const [selector, style] of Object.entries(staticStyles)) {
      /** @type {StyleObject} */
      const processedStyle = plugins.reduce(
        (_acc, plugin) => plugin(style, 'STATIC', renderer, {theme}),
        style,
      );
      renderer.renderStatic(processedStyle, selector);
    }
  };

  /**
   * Renders style (themed or responsive).
   *
   * @param {StyleObject} style
   * @param {StyleProps} styleProps
   * @returns {string} Rendered CSS classname
   */
  const renderStyle = (style, styleProps) => {
    const styleRule = /** @type {StyleRule} */ (
      isPlainObject(style) ? () => style : style
    );
    return renderer.renderRule(styleRule, {...styleProps, theme});
  };

  return {
    clear: renderer.clear,
    render,
    renderStaticStyles,
    renderStyle,
    _subscribe: renderer.subscribe,
  };
};
