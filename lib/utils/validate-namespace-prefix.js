/**
 * Asserts namespace against provided regexp.  Throws if invalid.  Returns `${namespace}-` prefixed string.
 * @param {string} namespace ;
 * @returns {string}
 */
export const validateNamespacePrefix = (namespace) => {
  if (!namespace) {
    return '';
  }

  const regexp = /^[a-z_][\w-]*$/g;

  if (!regexp.test(namespace)) {
    throw new Error(`Namespace must be of pattern: ${regexp}`);
  }

  return `${namespace}-`;
};
