const { transform } = require('@babel/core');

module.exports = function({ content }, callback) {
  this.cacheable();

  const { code } = transform(content, { presets: ['@babel/preset-env'] });

  callback(null, code);
};
