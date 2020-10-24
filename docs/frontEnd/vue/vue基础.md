---
title: vue基础
date: 2020-10-24
categories:
 - 前端
tags:
- vue
---

# vue基础

# Vue学习笔记
# **初识Vue(基本概念及原理)**
## 基本结构
```javascript
<body>
    <div id="app">{{message}}
        <h1>{{name}}</h1>
    </div>

    <script src="../js/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',  //挂载要管理的元素
            data: {//定义数据
                message: '你好！',
                name:'JCK哈哈哈哈'
            }
        })
    </script>
</body>
```
产生的画面如下
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982350-104a4b0a-0a23-4503-b0c8-6c2aa628ba7c.png#align=left&display=inline&height=121&margin=%5Bobject%20Object%5D&originHeight=227&originWidth=496&status=done&style=none&width=264)
当我们在console中填入 app.name='WOW' 画面自动变成
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982379-12a419f8-e9ce-4fec-afea-2844ac7127f1.png#align=left&display=inline&height=129&margin=%5Bobject%20Object%5D&originHeight=239&originWidth=805&status=done&style=none&width=436)
## v-for 列表展示


```javascript
    <div id="app">
        <ul>
            <li v-for="item in movies">{{item}}</li>
        </ul>
    </div>

    <script>
        const app = new Vue({
            el: "#app",
            data: {
                message: "hi  aa",
                movies: ['哈利波特', '恋恋笔记本', '复仇者联盟', '龙猫']
            }
        })
    </script>

```
### 计数器案例
```javascript
<div id="app">
        <h2>当前数字：{{counter}}</h2>
        <!-- 方法一 简单的实现直接写在里面 -->
        <!-- <button v-on:click="counter++">+</button>
        <button v-on:click="counter--">-</button> -->

        <!-- 方法二 -->
        <!--@click是语法糖-->
        <button @click="add">+</button>
        <button v-on:click="sub">-</button>
    </div>


    <script>
        const app = new Vue({
            el: "#app",
            data: {
                counter: 0
            },
            methods: {//用来存储方法
                add: () => {
                    console.log("数字被增加");
                    this.counter++// 等同于 app.counter++  这里this==app
                },
                sub: () => {
                    console.log("数字被减少");
                    this.counter--
                }
            }
        })
    </script>

```
## Vue的MVVM


**Model–view–viewmodel **[**维基百科**](https://zh.wikipedia.org/wiki/MVVM)
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982422-64ae8a28-4e62-404c-9491-2de197c29726.png#align=left&display=inline&height=282&margin=%5Bobject%20Object%5D&originHeight=521&originWidth=980&status=done&style=none&width=531)![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982482-4fd21739-2775-4c87-91df-f96da4503869.png#align=left&display=inline&height=419&margin=%5Bobject%20Object%5D&originHeight=806&originWidth=1007&status=done&style=none&width=524)
**计数器案例中的MVVM**
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982553-235e62d8-702e-45c1-8b4b-64252695fce6.png#align=left&display=inline&height=443&margin=%5Bobject%20Object%5D&originHeight=1032&originWidth=1264&status=done&style=none&width=542)
## 生命周期


vue内部调用callhook()执行钩子回调（？）
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982611-b6a09eb3-08d2-4ae3-b001-9a3e0f1ece56.png#align=left&display=inline&height=3039&margin=%5Bobject%20Object%5D&originHeight=3039&originWidth=1200&status=done&style=none&width=1200)


# 基础语法
## 00-vscode设置代码模板
****第一步：****
文件==>首选项==>用户代码片段    
****第二步：****
选择or新建代码片段文件 
****第三步：****
输入要自定义的快捷键 和 模板代码段【一个里面可以存多组模板】
```javascript
{
  "vh": {
    "prefix": "vue", // 触发的关键字 输入vue按下tab键
    "body": [
      "    <div id=\"app\"></div>",
      "    <script>",
      "        var vm=new Vue({",
      "           el:'#app',",
      "           data:{},",
      "           methods:{}",
      "        });",
      "    </script>"
        ],
    "description": "vh components"
  },
  "vh2": {
    "prefix": "vh", // 触发的关键字 输入vh按下tab键
    "body": [
      "    <div id=\"app\"></div>",
      "    <script src=\"../js/vue.js\"></script>",
      "    <script>",
      "        var vm=new Vue({",
      "           el:'#app',",
      "           data:{},",
      "           methods:{}",
      "        });",
      "    </script>"
        ],
    "description": "vh components"
  }
}

```


## [01-插值操作【内容content】](https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)
### Mustache
```javascript
<!-- {{这个就是Mustache,可以写简单的表达式}} -->
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{message}}, Anna</h2>
    <h2>{{str1 + " " + str2}}</h2>
    <h2>{{str1}} {{str2}}</h2>
    <h2>{{count * 2}}</h2>
  </div>
```
**v-once  **
**v-html  **
**v-text  **
**v-pre  **
**v-cloak**


```javascript
<body>
  <div id="app">
    <!-- v-once 渲染结束后再改值不会产生响应式改变的效果 -->
    <h2 v-once>{{message}}</h2>
    <!-- v-html 将data中的html文本进行解析 类似于 innnerHtml -->
    <h2 v-html="url"></h2>
    <!-- 一般不用 v-text 不灵活-->
    <h2 v-text="message"></h2>
    <!-- v-pre vue不解析 Mustache中的内容 -->
    <h2 v-pre>{{message}}</h2>
    <!-- v-cloak 等这个指令保持在元素上直到关联实例结束编译 可以打开下面的setTimeout代码查看效果 异步时可能会用到 -->
    <h2 v-cloak>{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: "aaa1",
        url: "<a href='http://www.baidu.com'>百度链接</a>"
      },
      methods: {}
    });
  </script>

</body>


```


## 02-绑定属性【标签属性】
### [v-bind](https://cn.vuejs.org/v2/api/?#v-bind)
基础用法【包含语法糖 :属性】
```javascript
  <div id="app">
    <img v-bind:src="imgurl"/>
    <a v-bind:href="linkurl">this is a link</a>
    <!-- 语法糖 -->
    <img :src="imgurl"/>
    <a :href="linkurl">this is a link</a>
  </div>
  <script src="../js/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        imgurl: "https://cn.vuejs.org/images/logo.png",
        linkurl:"https://www.bilibili.com/video/BV15741177Eh"
      },
      methods: {}
    });
  </script>

</body>
```


**注意绑class方法：**

1. 数组对象{类: bool,类:bool}  其中bool可作为data参数用来改变

1. 不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。

1. data中参数引用一定要用this.xxx




```html
<style>    .active {      color: red    }    .line {      color: blue    }    .bigfont{      font-size: 50px;    }  </style>

<body>
  <div id="app">
    <!-- 对象语法 -->
    <!-- <h2 :class="active">{{msg}}</h2> -->
    <!-- <h2 :class="{类1: true,类2: boolean}">{{msg}}</h2> -->
    <!-- 这里会和原本的class合并 -->
    <h2 class="bigfont" :class="{active: isActive,line: isLine}">{{msg}}</h2>
    <h2 :class="getClass()">{{msg}}</h2>
    <button v-on:click="btnClick">anniu</button>
    <br><br>

    <!-- 数组语法 -->
    <!-- 注意不带引号的会指向data中的变量参数 带印好的就是字符串 直接指向css -->
    <h2 :class="['bigfont',active,'line']">{{msg}}</h2>
    <h2 :class="getArrClass()">{{msg}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        msg: "hi",
        active: "active",
        isActive: true,
        isLine: false
      },
      methods: {
        // !注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
        btnClick: function () {
          this.isActive = !this.isActive
          this.isLine = !this.isLine
        },
        getClass:function(){
          return {active: this.isActive,line: this.isLine}
        },
        getArrClass:function(){
          return ['bigfont',this.active,'line']
        }
       
      }
    });
  </script>

</body>

```






作业1：v-for+v-bind+v-click
 需求：点击<li>元素 改变点击元素的css


重点：

1. 使用**curIndex**变量用来作为定位<li>和判断使用的ture||false

1. **v-for="(item,index) in xxx"的写法 获取index****  并且同标签内其他方法可以获取这个index并传参**




```html
<style>    .changefont {      color: red;      font-size: 50px    }  </style>

<body>
  <div id="app">
    <ul>
      <li @click="doclick(index)" :class="changeClass(index)" v-for="(item,index) in target">{{index}}-{{item}}</li>
    </ul>

  </div>
  <script src="../js/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        target: ["vue", "typescript", "linux", "react"],
        // ★重点！
        curIndex:0
      },
      methods: {
        doclick: function (index) {
          this.curIndex = index

        },
        changeClass: function (index) {
          return { changefont: index === this.curIndex }// === 类型和值都一致
        }
      }
    });
  </script>

</body>

```


绑定style对象或数组


**注意点：**

1. 请使用**驼峰写法**写明属性名

1. vue解析键值对的时候 **Value不加单引号会认定为变量**去data（可能还有别的？）中找

1. 熟练掌握把对象抽取成方法  记得加this.xxx ！




```html
<body>
  <div id="app">
    <!-- <h2 :style="{key(属性名):value(属性值)}">{{msg}}</h2> -->
    <!-- 注意这里的fontSize必须使用驼峰方法  冒号右边的值不加单引号 vue会把当成一个变量去data里找 -->
    <h2 :style="{fontSize:'50px'}">{{msg}}</h2>
    <h2 :style="{fontSize:finSize}">{{msg}}</h2>
    <h2 :style="{fontSize:finIntSize+'px',color:finColor}">{{msg}}</h2>
    <h2 :style="getStyle()">{{msg}}</h2>
    <!-- 数组写法 不说了 -->
    <h2 :style="[arrStyle,arrStyle1]">{{msg}}</h2>

  </div>
  <script src="../js/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        msg: "hi vue",
        finSize: '100px',
        finIntSize: 100,
        finColor:'red',
        arrStyle:{color:'yellow'},
        arrStyle1:{backgroundColor:'red'}

      },
      methods: {
        getStyle:function () {
          return {fontSize:this.finIntSize+'px',color:this.finColor}
        }
      }
    });
  </script>
</body>

```


## 03-计算属性
### 基本用法
```javascript
-- html
<-- 计算属性当成属性去用 不加括号 --> 
  <h2>{{fullName}}</h2>
  
  --js
  const app=new Vue({
             el:'#app',
             data:{
               name1:"kiee",
               name2:"rodrick"
             },
             // computed 计算属性
             computed:{
                fullName:function(){
                  return this.name1+' '+this.name2
                }
             }
          });
```


### get set方法
```javascript
      computed:{
        // fullname(){
        //   return this.name1+' '+this.name2
        // }
        // 计算属性一半不使用set方法 也就是只读
        fullName:{
          set:function(text){
            this.name1=text
          },
          get:function(){
            return this.name1+' '+this.name2
          }
        }
      },

```




## 04-事件监听v-on
### 1.语法糖：@


### 2.使用与传参
注意点：

- 传入触发事件用$event

- 不加括号但是方法有参则会默认第一个参为$event

- 加了括号不传参则参数为undifined




```javascript
html：
<div id="app">
    <button @click="btn1click">but1</button>
    <!-- 函数需要参数 但是没传参数且没加括号【如果加了括号 会传入undifined】 默认会传入event -->
    <button @click="btn2click">but2</button>
    <!-- 这里不仅需要event参数 还需要其他参数  【$event可以传入事件】 -->
    <button @click="btn3click(123,$ event)">but3</button>
  </div>

vue：

      methods: {
        btn1click() {
          console.log("btn1");
        },
        btn2click(abc) {
          console.log(abc);
        },
        btn3click(abc, event) {
          console.log(abc, '------', event);
        }
      }

```




### 3.常用修饰符


```html
  <div id="app">
    <!-- 1. .stop修饰符 防止事件冒泡 这里点击aaaa会触发divclick 点击按钮只会触发btnclick
 -->
    <div @click="divclick">
      aaaaa
      <button @click.stop="btnclick">按钮</button>
    </div>
    <br>

    <!-- 2. .prevent修饰符  阻止默认事件  这里不阻止就会默认触发submit像服务器请求 /post a标签也是个典型例子-->
    <form action="dopost">
      <a href="http://www.baidu.com" @click.prevent="subClick">baidugogogo</a>
      <input type="submit" value="提交" @click.prevent="subClick">
    </form>
    <br>

    <!--  3. 监听键盘键帽 -->
    <!-- <input type="text"  @keyup="keyup"> -->
    <!-- 回车触发 -->
    <input type="text" @keyup.enter="keyup">

    <!-- 4. .once 事件仅触发一次-->
    <button @click.once="btn2click">btn2</button>

  </div>
```




## 05-条件判断&循环遍历
### 1.v-if&v-show
###  基本用法
```html
        <h2 v-if="score>90">优秀</h2>
        <h2 v-else-if="score>=60">一般</h2>
        <h2 v-else>差劲</h2>
```
### 是否用key的
```html
  <div id="app">
    <span v-if="isUser">
      <label for="un">用户账户</label>
      <!-- 注意 如果不加key的话  这两个input切换的时候  input里面的值不会变化！ -->
      <input type="text" id="un" placeholder="用户账户" key="un">
    </span>
    <span v-else>
      <label for="ue">用户邮箱</label>
      <input type="text" id="ue" placeholder="用户邮箱" key='ue'>
    </span>
    <br>
    <!-- v-show是一定会渲染的 所以 切换很频繁的时候用v-show 不频繁的时候用v-if -->
    <span v-show="isUser">
      <label for="ushow">用户账户show</label>
      <!-- 注意 如果不加key的话  这两个input切换的时候  input里面的值不会变化！ -->
      <input type="text" id="ushow" placeholder="用户账户" key="un">
    </span>
    <br>
    <button @click="btnclick">切换登陆方式</button>
  </div>
```
### 2.v-for
### 基本使用【数组&对象&数组】
```html
  <div id="app">
    <!-- 数组遍历 -->
    <ul>
      <li v-for="item in arr">{{item}}</li>
    </ul>
    <ul>
      <li v-for="(item,ind) in arr">{{ind+1}}-{{item}}</li>
    </ul>
    <!-- 对象遍历 -->
    <ul>
      <li v-for="item in info">{{item}}</li>
    </ul>
    <ul>
      <li v-for="(item,key) in info">{{key}}-{{item}}</li>
    </ul>
    <ul>
      <li v-for="(item,key,index) in info">{{key}}-{{item}}-{{index}}</li>
    </ul>
    <ul>
      <li v-for="(item,index) in arrinfo">{{index}}-{{item.name}}</li>
    </ul>
  </div>
```


### v-for的key用法以及使用原理和性能问题
```html
<ul>          <li v-for="item in arr" :key="item">{{item}}</li>        </ul>
```


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982710-cab8f74d-5ea4-4aa1-91ef-181965209324.png#align=left&display=inline&height=908&margin=%5Bobject%20Object%5D&originHeight=908&originWidth=1630&status=done&style=none&width=1630)
### v-for中响应式可用方法
push pop[从后面删] shift[从开头删] unshift[数组开头添加元素] splice(位置,删几个元素,插入一个元素) sort reverse 响应
```javascript
// 通过index改变  非响应  但是数组值会变
// this.arr[0] = "bbbb"
//解决方法:
// this.arr.splice(0,1,"bbbb")
// set(修改对象,位置,值)
Vue.set(this.arr,0,"bbbb")
```
### 过滤器
```javascript
// 比较简单 没啥内容
<th>{{book.price | showPrice}}</th>

filters:(data){
	xxxx
	return xxx
}
```


## 06-v-model
### 基本形式
```html
<h3>双向绑定 修改框里值 后面的值也会变 修改app.msg input也会变</h3>        
<input type="text" v-model="msg">
```


### 原理
通过v-bind和v-on实现双向绑定
```html
<input type="text" :value="msg" @input="change">

<script>
  var app=new Vue({
    el:'#app',
    data:{
      msg:"qwer"
    },
    methods:{
      change(event){
        this.msg=event.target.value
      }
    }
  });
</script>

```


### 结合表单控件用法


- **radio**
```html
<label for="">
      <input type="radio" id="man" name="sex" value="nan" v-model="sex">男
      <input type="radio" id="female" name="sex" value="nv" v-model="sex">女
</label>
```


- **checkox&值绑定写法**

注意：复选框多选的时候用数组去接值


```html
    <label for="cbox">
      <input type="checkbox" id="cbox" v-model="isCheck">选择
    </label>
    <h3>是否选择：{{isCheck | cboxret}}</h3>
    <button :disabled="!isCheck">下一步</button>
    <br>

    <input type="checkbox" v-model="checks" value="1">选择1
    <input type="checkbox" v-model="checks" value="2">选择2
    <input type="checkbox" v-model="checks" value="3">选择3
    <input type="checkbox" v-model="checks" value="4">选择4
    <br>
    <!-- 值绑定写法 比较活用 -->
    <label :for="item" v-for="item in checkarr">
      <input type="checkbox" :value="item" :id="item" v-model="checks">{{item}}
    </label>

    <h3>选择的是{{checks}}</h3>
    <br>
```




- **select**



```html
<select name="shuiguo" id="shuiguo" v-model="shuiguo">
  <option value="香蕉">香蕉</option>
  <option value="苹果">苹果</option>
</select>
<h3>选择的水果是{{shuiguo}}</h3>

<select name="shuiguo" v-model="shuiguos" multiple>
  <option value="香蕉">香蕉</option>
  <option value="苹果">苹果</option>
</select>
<h3>选择的水果是{{shuiguos}}</h3>
```




### 修饰符用法
![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982782-687ff7b7-4abd-4d49-a795-379533749a23.png#align=left&display=inline&height=360&margin=%5Bobject%20Object%5D&originHeight=932&originWidth=1148&status=done&style=none&width=443)

- lazy&number&trim
```html
<!-- lazy 敲击回车 or 失去焦点 才进行绑定 -->
<input type="text" v-model.lazy="msg">
<!-- number 正常时候v-model赋值都是字符串 这里会改为数字 -->
<input type="number" v-model.number="age">
<!-- trim 没啥好说的  去空格 -->
<input type="text" v-model.trim="trimstr">
```


## 07-组件化开发


### 基本用法
```javascript
// 1.创建组建构造器对象
const cpn = Vue.extend({
template:`
<div>
  <h2>我是标题</h2>
  <p>这里是内容</p>
</div>`
})

// 2.注册组件
Vue.component('my-cpn', cpn)

<!-- 使用组件 -->    
<my-cpn></my-cpn>

```


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982826-7eed3b8b-35f2-44c8-a3fd-ac6efe167ace.png#align=left&display=inline&height=804&margin=%5Bobject%20Object%5D&originHeight=804&originWidth=2025&status=done&style=none&width=2025)
### 全局和局部组件
```javascript
// 2. 注册组件（全局组件，意味着可以在多个vue实例下使用）         
Vue.component('my-cpn',cpnC)

var app=new Vue({
             el:'#app',
             data:{},
             methods:{},
             // !!!注册局部组件
             components:{
               // cpn使用组件时候的标签名
               cpn:cpnC
             }
          });

```


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982865-9ed91097-de60-4445-bf75-278014bb5120.png#align=left&display=inline&height=409&margin=%5Bobject%20Object%5D&originHeight=929&originWidth=1693&status=done&style=none&width=746)


### 父子组件关系


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982918-ca544faf-49e6-47e7-8914-f121ce6d2ce9.png#align=left&display=inline&height=617&margin=%5Bobject%20Object%5D&originHeight=891&originWidth=923&status=done&style=none&width=639)


语法糖


```javascript
// 全局写法
Vue.component('my-cpn', {
  template: `
  <div>
    <h2>是我11</h2>
  </div>
  `
})


//局部写法
components: {
	cpn2: {
      template: `
      <div>
        <h2>是我22</h2>
      </div>
      `
	}
}

```


### 抽象分离写法


将模板html抽出到<template>标签内 或者使用script的 x-template 【推荐前者】
```html
<body>
  <div id="app">
    <my-cpn></my-cpn>

  </div>

  <template id="cpn1">
    <div>
      <h2>AA</h2>
      <p>ccc</p>
    </div>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    Vue.component('my-cpn',{
      template:'#cpn1'
    })

    var app = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
</body>
```


## 08-父子组件通讯


### 父传子props


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243982973-bcc907c7-dd21-4456-a611-483535b9e93b.png#align=left&display=inline&height=453&margin=%5Bobject%20Object%5D&originHeight=453&originWidth=1903&status=done&style=none&width=1903)![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983018-a69a81c7-c308-46ac-bec4-9c6955b02678.png#align=left&display=inline&height=1076&margin=%5Bobject%20Object%5D&originHeight=1076&originWidth=1472&status=done&style=none&width=1472)![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983073-2635917b-d397-4f8f-893e-d788a3b46495.png#align=left&display=inline&height=1119&margin=%5Bobject%20Object%5D&originHeight=1119&originWidth=2102&status=done&style=none&width=2102)


注意props定义不要使用驼峰写法 识别会有问题 推荐c-xxx这种短横链接方式


### 子传父$emit


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983135-9184bc81-26f6-4caa-ba4a-ee6c278719d7.png#align=left&display=inline&height=923&margin=%5Bobject%20Object%5D&originHeight=923&originWidth=1869&status=done&style=none&width=1869)


### 父访问子与子访问父


- this.children


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983178-d5846ca0-fab1-48c6-9a01-649c4ebf3d75.png#align=left&display=inline&height=483&margin=%5Bobject%20Object%5D&originHeight=483&originWidth=746&status=done&style=none&width=746)


- **this.$refs[这个常用]**


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983226-e8e8b537-52c5-4c86-abd1-01c48849d647.png#align=left&display=inline&height=944&margin=%5Bobject%20Object%5D&originHeight=944&originWidth=1891&status=done&style=none&width=1891)


- this.$parent


![](https://cdn.nlark.com/yuque/0/2020/png/2735301/1603243983266-10029c75-bbb5-4740-ba2e-336e47a84265.png#align=left&display=inline&height=883&margin=%5Bobject%20Object%5D&originHeight=883&originWidth=2003&status=done&style=none&width=2003)


## 09-插槽slot


### 默认插槽 v-slot:default


```html
  <div id="app">
    <cpn>
      <template v-slot:default>
        <span>span</span>
      </template>
    </cpn>
  </div>

  <!-- 插槽本身可以有默认值 不传内容的时候使用默认值  传内容的时候把内容全部显示 -->
  <template id='childcpn'>
    <div>
      <h2>我是不变的</h2>
      <slot><input type="text" placeholder="我是插槽的默认值"></slot>
    </div>
  </template>

```


### 具名插槽 v-slot:[name]
1.slot需要给name
2.用v-slot:[name]确定使用的插槽


```html
  <div id="app">
    <cpn>
      <template v-slot:mid>
        <button>AA</button>
      </template>
    </cpn>
  </div>

  <template id='childcpn'>
    <div>
      <h2>我是不变的</h2>
      <slot name="left"><span>left</span></slot>
      <slot name="mid"><span>mid</span></slot>
      <slot name="right"><span>right</span></slot>
    </div>
  </template>

```


### 作用域插槽 v-slot:[name]="[作用域自定义名]"
```html
  <div id="app">
    <cpn>
      <!-- 注意写法 1.统一用template包裹住使用插槽的内容 
        2. 格式 统一 v-slot:[插槽名 没有就用default]="[作用域名xx 名字随便取 使用时用xx.插槽传出的值]"
        3. 语法糖 #插槽名="作用域名"
        4. ="作用域名" 没有作用域插槽可以不写 作用域插槽配套于<slot :xx="ooo"> -->
      <!-- <template v-slot:slotnm="slotAA"> -->
        <template #slotnm="slotAA">
      <!-- <template v-slot:default="slotAA"> -->
        <span>{{slotAA.dt}}</span>
      </template>
    </cpn>
  </div>

  <template id='childcpn'>
    <div>
      <h2>我是不变的</h2>
	  <!-- 这里把dt[名字随便取 只是为了作用域插槽能用] 打出去给外面作用域用 -->
      <slot name="slotnm" :dt="plg"></slot>
    </div>
  </template>
```


