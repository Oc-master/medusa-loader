# medusa-loader

medusa-loader 提供了以类 Vue 文件形式编写微信小程序代码的能力，在赋予单文件编写能力的同时还提供了各类模板语言与样式预编译语言的功能。

## Installation

```shell
$ npm install medusa-loader --save
```

## Usage

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.mc$/
        loader: 'medusa-loader',
        options: {
          path: path.resolve(process.cwd(), './'),
        },
      },
    ],
  },
}
```

## 关于语法

### 模板

模板解析利用了 consolidate 这一模板引擎对 template 中的内容进行处理，所以能够支持以下的语言：

```
atpl
bracket
doT.js (website)
dust (unmaintained) (website)
dustjs-linkedin (maintained fork of dust) (website)
eco
ect (website)
ejs (website)
haml
haml-coffee
hamlet
handlebars (website)
hogan (website)
htmling
jade (website)
jazz
jqtpl
JUST
liquor
lodash (website)
marko (website)
mote (website)
mustache
nunjucks (website)
plates
pug (formerly jade) (website)
QEJS
ractive
react
slm
swig (unmaintained)
swig (maintained fork)
teacup
templayed
twig
liquid (website)
toffee
underscore (website)
vash
walrus (website)
whiskers
```

### 样式

样式支持less、sass、scss、stylus预编译语言，当你想使用 sass 时，只需添加 `lang="sass"` 属性。请注意为了使用预编译的能力请安装相应的 npm 包工具（使用sass、scss时请安装node-sass工具）。

## License

[MIT](https://github.com/Oc-master/medusa-loader/blob/master/LICENSE)
