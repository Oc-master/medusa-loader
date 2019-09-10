# 类vue解析生成微信小程序原生文件结构的小程序

## 关于

解析类vue语法文件 动态生成对应的wxml wxss js json等几个文件

基于wechat-mina-loader基础上做了些更改增加了对json标签的解析和输出配置文件，增加components判断，使用方式跟wechat-mina-loader完全一致。

## 安装
```
yarn add medusa-loader -D
```

## 使用方式 最简单的姿势
在webpack loader 引入ga的loader

```
  {
    test: /\.ga$/,
    loader: 'medusa-loader',
    options: {
      path: path.resolve('../'),
      dist: './dist'
    }
  }
```
引入之后会在根目录的 dist 文件夹下生成四份文件分别为


```
/pages/index/index.wxml
/pages/index/index.wxss
/pages/index/index.json
/pages/index/index.js
```

### 关于语法

模版用到了consolidate这一模板引擎来处理vue-template-compiler的parseComponent函数解出来的<template>标签中的内容，所以支持以下模版语法
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


比如你想用 pug，那么在 template 标签中加入 `lang="pug"` 即可

css可以使用一下几种css编译神器，前提你需要安装对应的loader
```
stylus
less
scss
sass
```

比如你想用 sass，那么在 style 标签中加入  `lang="sass"` 即可

script标签使用babel转换过的 script 标签中的内容

如果需要单独json配置可以在文件使用以下格式，不写则不会生成对应json文件
```
<json>
  {
    "navigationBarTitleText": "medusa-loader"
  }
</json>
```

### 高亮设置

将高亮设置为 vuecomponent 即可