const { transform } = require('@babel/core');

module.exports = function({ content }, callback) {
  this.cacheable();

  const { code } = transform(content);

  callback(null, code);
};
