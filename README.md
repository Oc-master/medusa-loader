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

## License

[MIT](https://github.com/Oc-master/medusa-loader/blob/master/LICENSE)
