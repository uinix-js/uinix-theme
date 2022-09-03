/**
 * Creates a valid CSS variable (i.e. /^--[a-z0-9-_]+/)
 * @param {string} key
 * @param {object} [options={}]
 * @param {string} [options.namespace='']
 * @returns {string}
 */
export const createCssVariable = (key, {namespace = ''}) =>
  `--${namespace}${key}`.replace(/[^a-z\d-_]/gi, '-').toLowerCase();
