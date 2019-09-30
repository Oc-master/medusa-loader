const { parseComponent } = require('vue-template-compiler');

module.exports = function(content) {
  /** 标志可缓存 */
  this.cacheable();
  /** 异步执行的回调函数 */
  const callback = this.async();
  /** 获取解析结果 */
  const { template, script, styles, customBlocks } = parseComponent(content);
  /** 执行render函数 */
  if (template) {
    renderTemplate.call(this, template);
  }
  if (script) {
    renderScript.call(this, script, callback);
  } else {
    callback(null, '');
  }
  if (styles && styles.length) {
    renderStyle.call(this, styles[0]);
  }
};
