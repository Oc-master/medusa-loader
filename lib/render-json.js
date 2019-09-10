const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve } = require('path')

module.exports = async function (jsonConfig) {
  this.cacheable()
  jsonContent = jsonConfig['content'].trim();
  const options = loaderUtils.getOptions(this)
  const filename = loaderUtils.interpolateName(this, `[name].json`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)
  const dirname = loaderUtils.interpolateName(this, `[path]`, options)
  const dist = options.dist || 'dist'

  const outPutFolder = dirname.substr(dirname.lastIndexOf('src') + 3)

  fs.outputFileSync(resolve(process.cwd(), `${dist}${outPutFolder}${filename}`), jsonContent)

  return ``
}