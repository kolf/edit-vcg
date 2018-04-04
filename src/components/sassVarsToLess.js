/**
  Webpack loader that converts antThemeVariables.scss into less
*/
module.exports = function sassVarsToLess(source) {
  return source.replace(/\$/gi, '@');
};
