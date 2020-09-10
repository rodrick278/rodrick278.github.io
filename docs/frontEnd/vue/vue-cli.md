---
title: vue-cli使用说明
date: 2020-09-06
categories:
 - 前端
tags:
- vue
---

## vue-cli

### 一、vue-cli 2

#### 1. 安装

* cnpm安装 `npm install -g cnpm --registry=https://registry.npm.taobao.org`
* 安装最新的脚手架 `npm install -g @vue/cli`
* [拉取2.x模板](https://cli.vuejs.org/zh/guide/creating-a-project.html#拉取-2-x-模板-旧版本)  `npm install -g @vue/cli-init`
* Vue CLI2初始化项目 `vue init webpack my-project`
* 接下来会有各种选项

![微信截图_20200825202901](https://gitee.com/rodrick278/img/raw/master/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200825202901.png)

* 项目目录结构

![vuecli2目录结构](https://gitee.com/rodrick278/img/raw/master/img/vuecli2%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)



#### 2. Runtime-Compiler和Runtime-only的区别

template解析为ast编译成render函数产生虚拟dom转化为真实dom

而Runtime-only中直接从render函数开始执行

这样编译出代码量更少 性能更好

![image-20200826214036974](https://gitee.com/rodrick278/img/raw/master/img/image-20200826214036974.png)

```js
new Vue({
  el: '#app',
  // 传统写法：
  // components: { App },
  // template: '<App/>'
  // 使用render：
  render: (createElement) => {
    // 1.createElement[一般缩写为h] 普通使用 h('标签',{相关数据对象},['内容数组'])
    // return createElement('h2', {class: 'box'}, ['aaa',
    //   createElement('button', ['按钮'])
    // ])

    // 2 传入组件方式，所以说App也是个组件 也可以传入
    // return createElement(cpn)
    return createElement(App)

    // 而我们的.vue 文件中的template 会自动编译为一个render函数
    // 是由vue-template-compiler 这个组件做了这个事[看package.json] 这样的话 我们在runtime-only模式下就不会因为有template而报错了
  }
})
```

#### 3. 执行不同运行命令时的流程

1. npm run build

![image-20200826220925189](https://gitee.com/rodrick278/img/raw/master/img/image-20200826220925189.png)

2. npm run dev

![image-20200826220945036](https://gitee.com/rodrick278/img/raw/master/img/image-20200826220945036.png)



### 二、vue-cli 3

#### 0. cli3(4)和cli2区别

nvue-cli 3 与 2 版本有很大区别

* vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3

* vue-cli 3 的设计原则是“0配置”，移除的配置文件根目录下的，build和config等目录

* vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化

* 移除了static文件夹，新增了public文件夹，并且index.html移动到public中

#### 1. 安装运行

* 安装最新的脚手架 `npm install -g @vue/cli`
* 初始化项目 `vue create yourapp`
* 运行项目 `npm run serve`

#### 2.  目录结构

![image-20200826224514873](https://gitee.com/rodrick278/img/raw/master/img/image-20200826224514873.png)



#### 3. 配置方式

	1. 运行 `vue ui` 打开图形化界面修改
 	2. 项目根目录新建 *vue.config.js* 文件添加