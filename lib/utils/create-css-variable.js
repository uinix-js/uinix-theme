import {validateNamespacePrefix} from './validate-namespace-prefix.js';

/**
 * Creates a valid CSS variable (i.e. /^--[a-z0-9-_]+/)
 * @param {string} key
 * @param {Object} [options={}]
 * @param {string} [options.namespace='']
 * @returns {string}
 */
export const createCssVariable = (key, options = defaultOptions) => {
  const {namespace = ''} = options;
  return `--${validateNamespacePrefix(namespace)}${key}`
    .replace(/[^a-z\d-_]/gi, '-')
    .toLowerCase();
};

const defaultOptions = {namespace: ''};
