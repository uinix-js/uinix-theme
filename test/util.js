import {filterEntries} from 'uinix-fp';

import {createThemeRenderer} from '../index.js';

export const resolveRenderStaticStyles = (staticStyles, options = {}) => {
  const renderer = createThemeRenderer(options);

  const actual = [];
  const listener = (update) => {
    const filterEntry = ([k, v]) => {
      return !['className'].includes(k) && Boolean(v);
    };

    actual.push(filterEntries(filterEntry)(update));
  };

  const subscription = renderer._subscribe(listener);
  renderer.renderStaticStyles(staticStyles);
  subscription.unsubscribe();

  return actual;
};

export const resolveRenderStyle = (style, styleProps = {}, options = {}) => {
  const renderer = createThemeRenderer(options);

  const actual = [];
  const listener = (update) => {
    const filterEntry = ([k, v]) => {
      return !['className', 'selector'].includes(k) && Boolean(v);
    };

    actual.push(filterEntries(filterEntry)(update));
  };

  const subscription = renderer._subscribe(listener);
  renderer.renderStyle(style, styleProps);
  subscription.unsubscribe();

  return actual;
};
