const loaderUtils = require('loader-utils')
const renderWxml = require('./lib/render-wxml')
const renderWxss = require('./lib/render-wxss')
const renderScript = require('./lib/render-script')
const renderJson = require('./lib/render-json')
const { parseComponent } = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()

  var cb = this.async()

  const parts = parseComponent(content)

  if (parts.template) {
    renderWxml.call(this, parts.template)
  }
  if (parts.styles && parts.styles.length) {
    renderWxss.call(this, parts.styles[0])
  }
  if (parts.customBlocks){
    jsonConfig = parts.customBlocks.filter((currentValue, index, arr) => {
      return currentValue['type'] == 'json';
    })[0];
    if(jsonConfig){
      renderJson.call(this, jsonConfig);
    }
  }
  if (parts.script) {
    renderScript.call(this, parts.script, cb)
  } else {
    cb(null, '')
  }
}

