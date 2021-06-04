---
title: Webpack常用记录
date: 2021-06-04
categories:
 - 前端
tags:
 - Webpack
---

## 配置

### Entry

- entry 可以是字符串、数组、对象
- 如果是 array 类型，则搭配 output.library 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。
- entry 为对象且多个的时候，会生成多个 chunk，output 需要动态生成 name
- entry 也可以动态配置
```javascript
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
   entry: './index.js',
  // 同步函数
  // entry:()=>{
  //   return './index.js'
  // },
  // 异步函数
  // entry: () => {
  //   return new Promise(resolve => {
  //     resolve('./index.js')
  //   })
  // },
  // 数组、对象
  // entry: ['./index.js','./show.js'],
  // entry: { a: './index.js',b: './show.js'},
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
}
```
### Output
配置如何输出，是一个对象，常用配置项如下
#### filename

1. 静态
```javascript
filename: 'bundle.js'
```

2. 动态
| 变量名 | 含义 |
| --- | --- |
| id | Chunk 的唯一标识，从0开始 |
| name | Chunk 的名称 |
| hash | Chunk 的唯一标识的 Hash 值 |
| chunkhash | Chunk 内容的 Hash 值 |

```javascript
filename: '[name].[hash:8].js',
```
#### path
```javascript
const path = require('path');
path: path.resolve(__dirname, 'dist_[hash]')
```
#### publicPath


```javascript
filename:'[name]_[chunkhash:8].js'
publicPath: 'https://cdn.example.com/assets/'
```
使用时：
```html
<script src='https://cdn.example.com/assets/a_12345678.js'></script>
```
### Module

- test:：命中文件规则，例如 `test: /\.scss$/` 、`test:[/\.jsx?$/,/\.tsx?$/],` 
- use：使用的 Loader，顺序是从右往左，例如 `use: ['style-loader', 'css-loader', 'sass-loader']` 
- include 、 exclude：用来处理排除和包含，例如 `exclude: path.resolve(__dirname, 'node_modules')` 


<br />如果一个 Loader 需要传入很多个参数的时候，可以使用一个对象，例如
```javascript
use: [
  {
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce:'post'
  },
  // 省略其它 Loader
]
```

- noParse：可以用来**忽略一些没采用模块化的文件**的解析，比如一些大型库，jQuery 等
```javascript
// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
```

- parser：精确到语法层面**忽略哪些模块化语法**
```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES6 import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用 browserify
      requireJs: false, // 禁用 requirejs
      }
    },
  ]
}
```
#### CSS/LESS/SASS
```javascript
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 把js中的样式插入head新创建的style标签
          'style-loader',
          // 把commonjs模块加入js中
          'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          // 把js中的样式插入head新创建的style标签
          'style-loader',
          // 把commonjs模块加入js中
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
```
#### url-loader/html-loader
分别处理文件url引入和html内类似 `<img>` 标签的资源问题
```javascript
      {
        test: /\.(png|jpg|gif)$/,
        // 使用一个loader
        loader: 'url-loader',
        options: {
          // 图片小于8kb就用base64减少请求
          limit: 8 * 1024,
          // 定义hash长度和后缀，[ext] 代表原来的后缀名
          name: "[hash:8].[ext]",
        }
      },
      {
        test: /\.html$/,
        // 处理 html 的引入图片等问题
        loader: 'html-loader',
        options: {
          // 关闭html-loader的ES6模块化，否则图片会出现打包完是无效图片
          esModule: false
        }
      }
```
#### babel

1. 三个包
```
"babel-core": "^6.26.3",
"babel-loader": "^7.1.5",
"babel-preset-env": "^1.7.0",
```

2. webpack.config.js
```javascript
 {
   test: /\.js$/,
   exclude: '/node_modules/',
   use: ['babel-loader']
 },
```

3. 根目录下 `.babelrc` 

具体配置见官网说明， `env` 的包包含了新的所有标准。
```javascript
{
  "plugins": [],
  "presets": [
    ["env"]
  ]
}
```
### Plugins
插件使用前记得引入
#### html-webpack-plugin 打包html
```javascript
const HtmlWebpackPlugin =require("html-webpack-plugin")

plugins: [
  // 默认创建一个html自动引入打包输出的资源
  new HtmlWebpackPlugin({
    // 以这个为模板，自动引入
    template:'./src/index.html'
  })
],
```
#### mini-css-extract-plugin css提取
> 以前的 extract-text-webpack-plugin 在新版的 webpack 不支持了

**webpack.config.js**<br />[**Link**](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)
```json
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name].css`,
    }),
  ]
```
#### uglifyjs-webpack-plugin 压缩js
[Link](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/)
```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

plugins: [
  new UglifyJsPlugin({
    // 是否输出sourceMap
    sourceMap: false,
    // 文件缓存
    cache: false,
    // 多进程构筑
    parallel:true,
    uglifyOptions: {
      // Enable IE8 Support
      ie8:true,
      compress: {
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      },
      output: {
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
      }
    }
  }
                    )
],
```
### Resolve
用来配置 webpack 寻找文件的方法
#### alias
映射一套路径到新的路径下
```javascript
resolve:{
  alias:{
    components: './src/components/'
  }
}
```
这样导入 `import main from "./src/components/index.js"`  就可以写成 `import main from "components/index.js"` 
### DevServer
```json
// 热更新 + source map
"dev": "webpack-dev-server --hot --devtool source-map"
```
webpack5 使用会报错，网上查看是因为兼容问题，这里是降级的
```json
"devDependencies": {
  "webpack": "^4.43.0",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.2"
}
```
**webpack5中使用** <br />注意层级是和entry一层
```javascript
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // JavaScript 执行入口文件
  entry: './src/index.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  // mode:"production"
  // devServer只会在内存中编译打包，不会输出
  // 运行命令：npx webpack serve
  devServer: {
    // 构建后目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 启动gzip
    compress: true,
    // 端口
    port: 3000,
    // 自动打开浏览器
    open:true,
  }
}
```
### watch
```javascript
// watch 可以监听文件变化进行重新打包，通过watchOptions控制打包变化监听
  watch: false, // 是否开始
  watchOptions: { // 监听模式选项
    // 不监听的文件或文件夹，支持正则匹配。默认为空
    ignored: /(node_modules|index.js)/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms 
    aggregateTimeout: 5000,
    // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
    poll: 1000
  },
```
### source-map
```javascript
/**
   * eval：用 eval 语句包裹需要安装的模块；
   * source-map：生成独立的 Source Map 文件；
   * hidden：不在 JavaScript 文件中指出 Source Map 文件所在，这样浏览器就不会自动加载 Source Map；
   * inline：把生成的 Source Map 转换成 base64 格式内嵌在 JavaScript 文件中；
   * cheap：生成的 Source Map 中不会包含列信息，这样计算量更小，输出的 Source Map 文件更小；同时 Loader 输出的 Source Map 不会被采用；
   * module：来自 Loader 的 Source Map 被简单处理成每行一个模块；
   */
  devtool: 'source-map'
```

