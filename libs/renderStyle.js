const { outputFileSync } = require('fs-extra');
const { getOptions, interpolateName } = require('loader-utils');
const postcss = require('postcss');

/** 解析预编译语言 */
const con = {
  less: (file, data) => {
    return new Promise(resolve => {
      require('less').render(data, { filename: file }, (err, output) => {
        if (err) throw err;
        resolve(output.css);
      });
    });
  },
  scss: (file, data) => {
    return new Promise(resolve => {
      require('node-sass').render({ file, data }, (err, result) => {
        if (err) throw err;
        resolve(result.css);
      });
    });
  },
  sass: (file, data) => {
    return new Promise(resolve => {
      require('node-sass').render({ file, data, indentedSyntax: true }, (err, result) => {
        if (err) throw err;
        resolve(result.css);
      });
    });
  },
  stylus: (file, data) => {
    return new Promise(resolve => {
      require('stylus').render(data, { fileName: file }, (err, css) => {
        if (err) throw err;
        resolve(css);
      });
    })
  }
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
  const ext = platform === 'wx' ? 'wxss' : 'css';
  const fileName = interpolateName(this, `[name].${ext}`, options);
  /** 文件源目录 */
  const origin = options.origin || 'src';
  /** 文件输出目录 */
  const dist = options.dist || 'dist';
  /** 文件输出路径 */
  const outputPath = dirPath.replace(origin, dist) + fileName;

  /** stylelint 检测样式规范 */
  postcss([
    require('stylelint')({
      configFile: './.stylelintrc',
      ignorePath: './.stylelintignore',
    }),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ])
    .process(content, { from: fullPath })
    .then(async ({ css }) => {
      let stylesheet = css;
      /** 预编译语言处理 */
      if (lang) {
        const render = con[lang];
        stylesheet = await render(fullPath, css);
      }
      /** pxtorpx 处理 */
      const postcssOptions = {
        propList: ['*'],
        multiplier: options.css_unit_ratio,
      };
      stylesheet = await postcss([require('postcss-pxtorpx')(postcssOptions)]).process(stylesheet, { from: fullPath });
      outputFileSync(outputPath, stylesheet.css.trim());
    });

  return ''
};
