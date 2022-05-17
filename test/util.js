import {filterEntries} from 'uinix-fp';

import {createThemeRenderer} from '../index.js';

export const resolveRenderStyle = (style, styleProps = {}, options = {}) => {
  const renderer = createThemeRenderer(options);

  const actual = [];
  const listener = (update) => {
    const filterEntry = ([k, v]) => {
      return !['className', 'selector'].includes(k) && Boolean(v);
    };

    actual.push(filterEntries(filterEntry)(update));
  };

  const subscription = renderer.subscribe(listener);
  renderer.renderStyle(style, styleProps);
  subscription.unsubscribe();

  return actual;
};
