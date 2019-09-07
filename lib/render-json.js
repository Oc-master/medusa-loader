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

  const type = dirname.indexOf('pages') !== -1 ? 'pages' : 'components'

  fs.outputFileSync(resolve(process.cwd(), `${dist}/${type}/${folder}/${filename}`), jsonContent)

  return ``
}