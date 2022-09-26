/**
 * TODO: This util coerces CJS/ESM modules and will be removed once dependencies are ESM-only.
 *
 * @template Module
 * @template {{default: Module}} CommonJs
 * @param {Module & CommonJs} module
 * @returns {Module}
 */
export const coerceEsm = (module) => module?.default || module;
