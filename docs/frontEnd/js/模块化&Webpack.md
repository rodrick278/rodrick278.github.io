---
title: 模块化&Webpack
date: 2020-09-06
categories:
 - 前端
tags:
- Webpack
- ES6
---

### 一、ES6的模块导出导入

#### 0.vscode配置

下载 **Live Server**插件 保证server环境 否则会跑不起来

#### 1.html引用js

`<script src="aaa.js" type="module"></script>`

使用`type="module"`来表明这个是模块化 文件

#### 2.导出 export

1. 导出对象或者单独变量

   ```javascript
   const name = '小米'
   const flag = true
   
   function sum(...nums) {
     return nums.reduce((preval, nowval) => {
       return preval + nowval
     }, 0)
   }
   
   export {
     name,
     flag,
     sum
   }
   
   export let str1 = 'qwer'
   ```

2. 导出函数和类

   ```javascript
   export function mul(n1, n2) {
     return n1 * n2
   }
   
   
   export class Person {
     constructor(sex) {
       this.sex = sex
     }
   
     run() {
       console.log('run!');
     }
   }
   ```

3. **export defalut** 一个模块里只能有一个defalut

   ```javascript
   const address='shanghai'
   const address1='beijing'
   export default {address,address1}
   
   // 导出的default是函数时 不用写函数name 因为没有意义
   export default function(){
     console.log('aaa');
   }
   ```

#### 3.导入 import

1. 导入指定模块 

   *需要用{ }包裹 并且名字是导出的名字 不可变*

   ```javascript
   import { name, flag, sum, str1, mul, Person } from './index.js'
   
   console.log(name,flag,sum(1, 2, 3))
   ```

2. 导入所有

   *导入所有的值 不用加{} 并且**要用**AS 起一个别名*

   ```javascript
   import  * as all  from "./index.js";
   
   console.log(all.name);
   ```

3. 导入default

   *import defalut的时候 不用加{}并且可以自己命名*

   ```javascript
   //index.js:export default {address,address1}
   
   import myadd from "./index.js";
   
   console.log(myadd);//这里的myadd==={address,address1}
   ```

### 二、webpack

#### 1. webpack起步

 1. vscode的配置

     * cd到根目录   `PS D:\MyCode\vueLearn\12-前端模块化> cd .\02-webpack起步\`

     * 执行 `webpack ./src/main.js ./dist/bundle.js`

       **注意此时会出现报错情况 处理方式有两种**

          **一、执行 `npx webpack ./src/main.js ./dist/bundle.js` npx可以正常执行**

          **二、更新执行策略**

       1. **打开vscode，然后在文件根目录右键点击 Open in Terminal;**

         2. **输入 get-ExecutionPolicy　，然后回车，如果返回 Restricted，则状态是禁止的；**

         3. **然后输入 set-ExecutionPolicy RemoteSigned；**

         4. **最后按上键直到看见get-ExecutionPolicy命令后回车，此时就显示RemoteSigned*，就开启了**

            > 下面是4种常用的执行策略：
            >
            > **Restricted**： 
            >
            > 禁止运行任何脚本和配置文件。
            >
            > **AllSigned** ：
            >
            > 可以运行脚本，但要求所有脚本和配置文件由可信发布者签名，包括在本地计算机上编写的脚本。
            >
            > **RemoteSigned** ：
            >
            > 可以运行脚本，但要求从网络上下载的脚本和配置文件由可信发布者签名；    不要求对已经运行和已在本地计算机编写的脚本进行数字签名。
            >
            > **Unrestricted** ：
            >
            > 可以运行未签名脚本。（危险！）    

 2. 配置完成

     此时dist文件夹下会有webpack打包好的bundle.js  这样在index.html里引用bundle.js就可以了

     > 一般项目里src文件夹放置源码 dist里放置打包文件



#### 2. webpack配置

 1. 根目录创建 `webpack.config.js` 文件 用来配置出入口

    ```javascript
    const path=require('path')
    
    module.exports={
      // 入口可以是字符串 数组 对象 
      entry:'./src/main.js',
      // 出口通常是一个对象  path必须是绝对路径 这里我们依赖node的path包获取项目绝对路径
      output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
      }
    }
    ```

    > 此时 cd 根目录下 执行webpack就可以自动打包了 ***但是这里用的webpack是全局安装的webpack，项目里通常应当装本地的webpack 防止版本问题 具体方式见后续***

 2. cd到当前项目根目录 执行`npm init -y`  **-y**代表一路yes默认创建  此时会创建一个 *package.json* 文件

 3. 局部安装webpack 根目录下 执行

    ```
    npm install webpack@3.6.0 --save-dev
    ```

    此时会创建在项目下有一个webpack 同时 *package.json*文件中会增加

    ```json
     "devDependencies": {
        "webpack": "^3.6.0"
      }
    ```

    这个代表项目依赖的是这个版本的webpack

	4. 配置 快捷脚本命令 npm run xxx

    在*package.json*中的*scripts*属性中添加`"build": "webpack"` 现在结构如下

    ```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack"
      },
    ```

	5. 此时我们执行 `npm run build` 就会自动执行我们项目里的webpack的webpack命令

    > 注：npackage.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置。
    >
    > ​		首先，会寻找本地的node_modules/.bin路径中对应的命令。
    >
    > ​		如果没有找到，会去全局的环境变量中寻找。
    >
    > ​		*而我们此时的 `npm run build` 相当于走了第一步

    

#### 3. loader的使用

##### 3.0 loader基本使用

	1. 需要在 *webpack.config.js* 里的 *module* 中配置
 	2. 可以在 [webpack官方文档](https://www.webpackjs.com/) 的 [LOADER](https://www.webpackjs.com/loaders/) 中查看基本配置

##### 3.1 css-loader

 1. 在 *main.js* 中直接*依赖css文件

    ```javascript
    require('./css/normal.css') 
    ```

	2. npm安装*css-loader*和*style-loader*

    ```bash
    npm install --save-dev css-loader
    npm install style-loader --save-dev
    ```

	3. *webpack.config.js*配置

    ```javascript
    {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              // css-loader只负责加载  style-loader 负责将模块的导出作为样式添加到 DOM 中
            	// 使用多个loader时 加载顺序是先右后左  所以css-loader放在右边 先加载
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          }
        ]
      }
    }
    ```



##### 3.2 less-loader

1. 在 *main.js* 中直接*依赖less文件

   ```javascript
   // 依赖less文件
   require('./css/special.less')
   ```

2. npm安装*less-loader* **  [前提是安装过了css-loader&style-loader]**

   ```bash
   npm install --save-dev less-loader less
   ```

3. *webpack.config.js*配置

   ```javascript
   {
     module: {
       rules: [
         {
           test: /\.less$/,
           use: [{
             loader: "style-loader" // creates style nodes from JS strings
           }, {
             loader: "css-loader" // translates CSS into CommonJS
           }, {
             loader: "less-loader" // compiles Less to CSS
           }]
         }
       ]
     }
   }
   ```

   

##### 3.3 图片的loader

 1. 引用图片

    ```css
    body {
      /* 一般会用url形式引用 */
      background:url("../img/BIGIMG.jpg")
    }
    ```

	2. npm安装 *url-loader* & *file-loader*

    步骤略

	3. *webpack.config.js*配置

    > 这里因为文件也会被打包进dist文件夹  默认的命名是用hash64随机命名 并且默认不会去dist文件夹里读
    >
    > 所以我们这里用name属性对打包规则【读取路径+文件名】进行控制

    ```javascript
    {
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // 当图片小于这个大小【kb*1024】 直接加载为base64  大于的时候 需要file-loader
                  limit: 129808,
                  //img表示文件父目录，[name]表示文件名,[hash:8]表示将hash截取8位[ext]表示后缀
                  name:'img/[name].[hash:8].[ext]'
                },
               
              }
            ]
          }
        ]
      }
    }
    ```

##### 3.4 babel

 1. npm

    这里没按照官网的来 和第二步配置有关

    ```bash
    npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
    ```

2. module配置

   ```javascript
         {
           test: /\.js$/,
           // 排除node模块的js和bower的js
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               //如果要使用@babel/preset-env这里需要在根目录新建一个babelrc的文件 然后去这里面找配置
               // presets: ['@babel/preset-env']
               // 这里直接指定就行
               presets: ['es2015']
             }
           }
         }
   ```



#### 4. webpack配置vue

##### 4.1 基本使用

 1. ```bash
    npm install vue --save #这里没有-dev  因为发布后也需要依赖这个vue模块
    ```

 2. 在 *main.js* 中引用 vue ：`import Vue from "vue";`

 3. 此时如果运行程序会报错

    > [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    >
    > 这里补充一个知识点
    >
    > vue编译有两种模式：
    >
    > 	1. runtime-only -> 代码中，不可以有任何的template，而我们的#app就是一个template
    >
    >  	2. runntime-compiler -> 代码中可以有template，因为有compiler 可以用于编译

4. 在 *webpack.config.js* 中加上配置

   ```javascript
     // resolve与module是同层级的
     resolve:{
       // alias 别名
       alias:{
         'vue$':'vue/dist/vue.esm.js'
       }
     }
   ```

5. 此时再打包运行就OK了，注意index.html里 *bundle.js* 的引用要在html内容后面

   ```html
     <div id="app">
       {{msg}}
     </div>
     <script src="./dist/bundle.js"></script>
   ```


##### 4.2 配置 .vue文件

 1. 文件结构参考代码

 2. npm安装

    ```bash
    npm install --save-dev vue-loader@15.4.2 vue-template-compiler@2.5.21
    ```

	3. 报错分析

    此时可能会报两种错：

    **第一种**：

    > vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.

    查阅文档发现v15版的vue-loader配置需要加个VueLoaderPlugin

    解决方案1：把vue-loader回到v14版本

    ```bash
    npm uninstall vue-loader
    npm install vue-leader@14.2.2
    ```

    解决方案2：修改webpack.config.js

    *新增如下代码*

    ```javascript
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    
    // plugins和module同层级
    plugins: [
        new VueLoaderPlugin()
    ]
    ```

    **第二种**：

    > Module build failed: Error: [vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.

    查看 *package.json* 中vue的版本和vue-template-compiler版本是否一致 将vue-template-compiler的版本改为vue的版本

    直接修改*package.json*

    ```
    "vue-template-compiler": "^2.6.12" [vue版本号]
    
    npm install # 会根据你的package.json自动配置
    ```

##### 4.3vue文件引入组件

 1. 直接在script中 `import Cpn from "./Cpn";`

 2. 这里是 ./Cpn 而不是 ./Cpn.vue 的原因是在 *webpack.config.js* 中的*resolve*中添加

    ```javascript
    resolve:{
        //导入模块简写省略指定后缀
        extensions: ['.js', '.css', '.vue']
      }
    ```



#### 5. webpack配置plugins

##### 5.1 横幅 多用于版权

*webpack.config.js*中配置

```javascript
const webpack=require('webpack')

 plugins: [
    new webpack.BannerPlugin('最终版权 反正不归我所属')
  ]
```

配置以后 打包的 *bundle.js* 开头就变成

```javascript
/*! 最终版权 反正不归我所属 */
/******/ (function(modules) {
xxxxx
```



##### 5.2 打包html的插件

用处：

	1. 把我们现在不在dist文件夹里的index.html也打包进dist中
 	2. 将打包的js文件 也就是main.js 自动通过\<script>标签插入到body中

使用:

 1. `npm install html-webpack-plugin@3.2.0 --save-dev`

 2. *webpack.config.js*中的配置

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    
    output: {
        // publicPath:'dist/' //之前如果有这个删除掉
      },
    plugins: [
        new HtmlWebpackPlugin({
          template:'index.html' //这里只会以index.html为模板生成
        })
      ]
    ```

    此时的index.html

    ```html
    <body>
      <div id="app">
      </div>
    </body>
    ```

	3. 这时候打包完dist目录中就会存在index.html了，并且会自动导入js文件

    ```html
    <body>
      <div id="app">
      </div>
    <script type="text/javascript" src="bundle.js"></script></body>
    ```



##### 5.3 压缩js

`npm install uglifyjs-webpack-plugin@1.1.1 --save-dev`

```
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')

plugins: [
    new UglifyjsWebpackPlugin()
  ]
```



##### 5.4 搭建本地服务器热更新

`npm install webpack-dev-server@2.9.3 --save-dev`

package.json

```
"scripts": {
    "dev":"webpack-dev-server --open" //--open 代表自动打开浏览器
  },
```

webpack.config.js

```
// devServer和module同层
devServer:{
    contentBase:'./dist', // 服务于哪个文件夹
    inline:true // 是否实时监听
  }
```



##### 5.5 配置文件分离

 * 根目录建一个build文件夹 里面三个文件 

   > base.config.js：生产开发都用的配置
   >
   > dev.config.js：开发专用配置
   >
   > prod.config.js：生产专用配置

* `npm install  webpack-merge@4.1.5 --save-dev `

* 具体使用看代码

* package.json 配置 指定不同命令用的文件

  ```javascript
  "scripts": {
      "build": "webpack --config ./build/prod.config.js",
      "dev": "webpack-dev-server --open --config ./build/dev.config.js"
    },
  ```

* base.config.js

  ```javascript
   output: {
      path: path.resolve(__dirname, '../dist') // 这里出口路径取上层文件夹 因为现在的配置文件在build文件夹里
    },
  ```

  



