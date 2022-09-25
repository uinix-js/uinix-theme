import {isUnitlessProperty} from 'css-in-js-utils';
import {createRenderer} from 'fela';
import {render as renderToDom} from 'fela-dom';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import {createWebPreset} from 'fela-preset-web';
import {isPlainObject, merge} from 'uinix-fp';

import {createCssVariables} from './create-css-variables.js';
import {coerceEsm} from './utils/coerce-esm.js';
import {responsiveValue} from './utils/plugin-responsive-value.js';
import {themeValue} from './utils/plugin-theme-value.js';
import {validateNamespacePrefix} from './utils/validate-namespace-prefix.js';

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
 * @param {Object} [options={}]
 * @param {boolean} [options.enableAtomicCss=false]
 *    Enables rendering styles as atomic CSS
 * @param {boolean} [options.enableCssVariables=false]
 *    Enables creating and resolving styles into CSS variables.
 * @param {string} [options.namespace='']
 *    Prepends a namespace prefix to every rendered CSS classname and keyframe. Namespaces can only consist of `a-z0-9-_` and start with `a-z_`.
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
    enableCssVariables = false,
    namespace = '',
    responsiveBreakpoints = [],
    responsiveCssProperties = [],
    themeSpec = {},
    theme = {},
  } = options;

  const enhancers = [coerceEsm(enforceLonghands)()];
  if (!enableAtomicCss) {
    enhancers.push(coerceEsm(monolithic)());
  }

  const cssVariables = enableCssVariables
    ? createCssVariables(theme, {namespace, themeSpec})
    : undefined;

  const plugins = [
    responsiveValue({responsiveBreakpoints, responsiveCssProperties}),
    themeValue({cssVariables, namespace, themeSpec}),
    ...createWebPreset({
      // Tighten fela-plugin-unit check by only supporting 'px' units and excluding CSS variables
      unit: [
        'px',
        {},
        (property) => {
          return property.startsWith('--') || isUnitlessProperty(property);
        },
      ],
    }),
  ];

  const renderer = createRenderer({
    enhancers,
    plugins,
    selectorPrefix: validateNamespacePrefix(namespace),
  });

  const load = () => renderToDom(renderer);

  /**
   * Renders global styles
   *
   * Simplified when https://github.com/robinweser/fela/issues/876 is resolved
   * @param {StyleObject} initialGlobalStyles
   * @returns {void}
   */
  const renderGlobalStyles = (initialGlobalStyles) => {
    const globalStyles = enableCssVariables
      ? merge({':root': cssVariables})(initialGlobalStyles)
      : initialGlobalStyles;
    for (const [selector, style] of Object.entries(globalStyles)) {
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
    load,
    renderGlobalStyles,
    renderStyle,
    unload: renderer.clear,
    _subscribe: renderer.subscribe,
  };
};
