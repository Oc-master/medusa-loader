const { resolve } = require('path');
const { outputFileSync } = require('fs-extra');
const { getOptions, interpolateName } = require('loader-utils');
/** 解析模板语言工具包 */
const cons = require('consolidate');

const render = (lang, html, options) => {
  new Promise(resolve => {
    cons[lang].render(html, options, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });
};

module.exports = async function({ lang, content }) {
  this.cacheable();

  const options = getOptions(this);
  /** 解析文件的绝对路径 */
  const fullPath = interpolateName(this, '[path][name].[ext]', options);
  /** 解析文件所在文件夹绝对路径 */
  const dirPath = interpolateName(this, '[path]', options);
  /** 改写文件名称 */
  const platform = options.platform || 'wx';
  const ext = platform === 'wx' ? 'wxml' : 'swan';
  const fileName = interpolateName(this, `[name].${ext}`, options);
  /** 文件源目录 */
  const origin = options.origin || 'src';
  /** 文件输出目录 */
  const dist = options.dist || 'dist';
  /** 文件输出路径 */
  const outputPath = dirPath.replace(origin, dist) + fileName;

  let html = content.trim();

  if (lang) {
    const opt = {
      raw: true,
      engine: lang,
      fileName: fullPath
    };
    html = await render(lang, html, opt);
  }

  outputFileSync(outputPath, html, 'utf-8');

  return ''
};
