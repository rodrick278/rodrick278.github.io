---
title: vuecli 配合 svg-sprite-loader 使用svg
date: 2020-11-16
categories:
 - 前端
tags:
- vue
- Webpack
---

## 前言
[**svg-sprite-loader**](https://github.com/kisenka/svg-sprite-loader) 的插件，用来根据导入的 svg 文件自动生成 `symbol` 标签并插入 html，接下来就可以在模版中方便地使用 svg-sprite 技术了。

## 安装插件
```bash
npm install svg-sprite-loader -D
```
## webpack 配置
在 `vue.config.js` 中加入如下配置：
```javascript
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    // svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule.include.add(resolve('src/assets/img/icons')) 
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/img/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    // config.module
    //   .rule('svg-sprite-loader')
    //   .test(/\.svg$/)
    //   .include
    //   .add(resolve('src/assets/img/icons')) //处理svg目录
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
  }
}
```
关于 webpack 的配置是重点，这里上下两种只是两种不同的写法，本质一样<br />
<br />参考：[官网说明](https://cli.vuejs.org/zh/guide/webpack.html#%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-loader) <br />这里配置主要做了这些事：

- 清除 [默认 Loader](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/base.js) 
- 将我们指定的存放 svg 的 icon 文件夹 include 进，并进行配置
- 给默认的 image loader 添加 svg 处理，默认的配置是没有 svg 的，相关源码：
```javascript
    // static assets -----------------------------------------------------------

    webpackConfig.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options(genUrlLoaderOptions('img'))

    // do not base64-inline SVGs.
    // https://github.com/facebookincubator/create-react-app/pull/1180
    webpackConfig.module
      .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
          .loader(require.resolve('file-loader'))
          .options({
            name: genAssetSubPath('img'),
            esModule: supportsEsModuleAsset
          })
```

- images loader 中排除我们指定的 svg icon 文件夹
## 创建 SvgIcon 组件
`SvgIcon.vue` 
```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```
简单来说这个组件的作用是：

- 给 svg 添加指定的 className
- 根据传入的 iconClass 生成 iconName 去寻找对应的 svg icon
## 创建 icons 存放目录

<br />icon 存放路径根据情况选择，这个路径就是我们刚才 webpack 配置的路径，icons 文件夹内结构保持如图不变：<br /><img src="https://gitee.com/rodrick278/img/raw/master/img/1605490486596-9a06b432-45a9-412a-9eaa-068020ecf820.png" alt="image.png" style="zoom: 80%;" /><br />svg 文件夹用来存放 svg icon，index.js 内容如下：

```javascript
import Vue from 'vue'
import SvgIcon from '@/components/common/svgicon/SvgIcon' // svg组件

// 注册到全局
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
```
注意点：

- SvgIcon 组件路径保持正确
- 这里是注册到了全局中，如果有需要单独引入也可以
## 在 main.js 中引入
```javascript
import 'assets/img/icons/index'
```
## 使用
在需要使用的时候，加入需要引入 svg 文件夹下的 `head.svg` 直接使用如下：<br />`className` 传入 class 名， `iconClass` 传入 svg 文件名
```vue
<template>
  <div id="user-info">
    <svg-icon iconClass="head" className="privateImage-svg"></svg-icon>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
</style>
```
