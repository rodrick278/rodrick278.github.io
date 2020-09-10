---
title: vue-router
date: 2020-09-01
categories:
 - 前端
tags:
- vue
---

## vue-router

### 一、什么是路由

* **路由（routing）**就是通过互联的网络把信息从源地址传输到目的地址的活动
* 路由器提供了两种机制: **路由和转送.**
  * 路由是决定数据包从来源到目的地的路径.
  * 转送将输入端的数据转移到合适的输出端.
* 路由中有一个非常重要的概念叫**路由表**.
  * 路由表本质上就是一个映射表, 决定了数据包的指向



### 二、前后端渲染

1. 后端渲染（服务端渲染） jsp技术 后端路由，后端处理URL和页面映射关系，例如springmvc中的@requestMapping注解配置的URL地址，映射前端页面
2. 前后端分离（ajax请求数据） 后端只负责提供数据 输入王之后从静态资源服务器拿资源（html+css+js）到浏览器  然后ajax发送网络请求后端服务器，服务器回传数据 js代码渲染dom
3. 单页面富应用（SPA[simple page web application]页面） 前后端分离加上前端路由，前端路由的url映射表不会向服务器请求，是单独url的的页面自己的ajax请求后端，后端只提供api负责响应数据请求。改变url，页面不进行整体的刷新。 整个网站只有一个html页面。

### 三、url的hash和HTML5的history模式

 * hash

    * URL的hash也就是锚点(#), 本质上是改变window.location的href属性.
    * 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新

   <img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200827224034402.png" alt="image-20200827224034402" style="zoom: 67%;" />

   测试发现url的地址栏改变了变成了http://localhost:8080/#/foo ，通过查看network发现只有favicon.ico资源重新请求了，这个是工程的logo图标，其他资源都未请求。可以通过改变hash改变url，此时页面是未刷新的。

   vue-router其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如`/user`代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走ajax。

   

* history模式

  history接口是HTML5新增的, 它有五种模式改变URL而不刷新页面

  >  [pushState&back](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)

  同样的使用HTML5的history模式也是不会刷新页面的,history对象栈结构，先进后出，pushState类似压入栈中，back是回退。

  ```js
  hristory.pushState({}, '', '/foo')
  history.back()
  ```

  ![img](https://gitee.com/rodrick278/img/raw/master/img/17-3.png)

  >  [replaceState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)

  replaceState模式与pushState模式区别在于replaceState模式浏览器没有返回只是替换，不是压入栈中。

  replaceState后会发现无法back 

  ```js
  history.replaceState({}, '', 'home')
  ```

  > [go](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go)

  由于go会操作前进后退，所以只能在pushState后使用

  ```
  history.go(-1)//回退一个页面 -2就是两个
  history.go(1)//前进一个页面 2也是两个
  history.forward()//等价于go(1)
  history.back()//等价于go(-1)
  ```

### 四、vue-router 的安装配置

#### 1. 安装

* `npm install vue-router --save`

#### 2.配置

* 在src下创建一个router文件夹（一般安装vue-router时候会自动创建）

* 在模块化工程中使用它(因为是一个插件, 所以可以通过Vue.use()来安装路由功能)

  * 第一步：导入路由对象，并且调用 Vue.use(VueRouter)
  * 第二步：创建路由实例，并且传入路由映射配置
  * 第三步：在Vue实例中挂载创建的路由实例

  > router文件夹中的index.js

  ```js
  // 配置路由
  import VueRouter from 'vue-router'
  import Vue from 'vue'
  
  // 1.使用插件Vue.use
  Vue.use(VueRouter)
  
  // 2.创建路由
  //数组来存放对应关系
  const routes=[]
  
  const router=new VueRouter({
    routes  
  })
  
  // 3.导出路由
  export default router
  ```

  > main.js中挂载router对象

  ```js
  import Vue from 'vue'
  import App from './App'
  import router from './router';//如果只写到文件夹的话，会默认去找文件夹下的index.js
  
  
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
  
  ```



#### 3.基本使用

 1. 创建路由组件

    在components文件夹下创对应的组件

    ![image-20200828205627823](https://gitee.com/rodrick278/img/raw/master/img/image-20200828205627823.png)

	2. 在 `router/index.js` 中添加引用和对应关系[顺带提一下懒加载]

    ```js
    // 配置路由
    import VueRouter from 'vue-router'
    import Vue from 'vue'
    import Home from '../components/home'
    import About from '../components/about'
    
    // 1.使用插件Vue.use
    Vue.use(VueRouter)
    
    // 2.创建路由
    //数组来存放对应关系
    const routes = [
      {
        // 默认值 代表当链接为空时 重定向到 /home
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/about',
        //component: About
        component: () => import('@/components/About')//懒加载方式
      }
    ]
    
    const router = new VueRouter({
      routes,
      // 选择模式 hash or history or abstract
      mode:'history'
    })
    
    // 3.导出路由
    export default router
    
    ```

	3. 使用路由 App.vue

    ```vue
    <template>
      <div id="app">
    		<!-- router-link是vue本身封装的一个组件
    					router-view是点击router-link后显示的内容的位置可以占位用相当于-->    
        <router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-view></router-view>
      </div>
    </template>
    
    <script>
    export default {
      name: 'App' 
    }
    </script>
    
    <style>
    </style>
    
    ```

	4. \<router-link>的其他属性

    * tag：tag可以指定\<router-link>之后渲染成什么组件, 比如上面的代码会被渲染成一个\<li>元素, 而不是\<a>

      ```
      <router-link to="/home" tag="button">首页</router-link>
      ```

    * replace:replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中

      也就是把默认的history.pushState改为history.replaceState

      ```
      <router-link to="/home" tag="button" replace>首页</router-link>
      ```

    * linkActiveClass:当\<router-link>对应的路由匹配成功时, 会自动给当前元素设置一个router-link-active的class, 设置linkActiveClass可以修改默认的名称

      * 未设置时

        ![image-20200828214655322](https://gitee.com/rodrick278/img/raw/master/img/image-20200828214655322.png)

      * 设置后 [在router对象里设置 一般不设置个人觉得好理解]

        ```js
        const router = new VueRouter({
          routes,
          mode:'history',
          // 把默认的router-link-active这个class改名为active
          linkActiveClass:'active'
        })
        ```

        ![image-20200828214837303](https://gitee.com/rodrick278/img/raw/master/img/image-20200828214837303.png)

    

#### 4.路由代码跳转

事件里绑定 `this.$router.push` 或者 `this.$router.replace`

```vue
<template>
  <div id="app">
    
    <!-- <router-link to="/home" replace>首页</router-link>
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about">关于</router-link> -->
    <button @click="syclick">首页</button>
    <button @click="abclick">about</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App' ,
  methods: {
    syclick() {
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    abclick(){
      this.$router.push('/about')
    }
  },
}
</script>

<style>
.active{
  color:red;
}
</style>

```

#### 5.动态路由

1. 配置路由组件 user.vue

   ```vue
   <template>
     <div>
       <h2>我是用户页面</h2>
       <!-- <span>当前用户是：{{username}}</span> -->
       <span>当前用户是：{{$route.params.userid}}</span>
   
     </div>
   </template>
   
   <script>
   export default {
     computed: {
       username() {
         // $route 指向的是当前活跃的路由 注意不是$router 别弄混 $router是整个router的对象
         return this.$route.params.userid;
       }
     },
   };
   </script>
   
   <style scoped>
   </style>
   
   ```

2. index.js中添加动态路由

   ```
   const routes = [
     {
       // 默认值 代表当链接为空时 重定向到 /home
       path:'/',
       redirect:'/home'
     },
     {
       path: '/home',
       component: Home
     },
     {
       path: '/about',
       // component: About
       component: () => import('@/components/About')
     },
     {
     // 这里:userid用来接受动态id
       path: '/user/:userid',
       component: User
     }
   
   ]
   ```

3. App.vue中导入然后使用

   ```vue
   <template>
     <div id="app">
       <!-- 这里用v-bind动态解析to的路径 /use/ 是字符串所以用单引号括起来 -->
       <router-link :to="'/user/'+uid">用户</router-link>
   
       <router-view></router-view>
     </div>
   </template>
   
   <script>
   export default {
     name: 'App' ,
     data() {
       return {
         uid: 'zhangsan'
       }
     },
   }
   </script>
   
   <style>
   .active{
     color:red;
   }
   </style>
   
   ```

#### 6.vue-router的打包文件解析

<img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200830162724116.png" alt="image-20200830162724116" style="zoom:50%;" />

* css文件会单独抽出
* app.xxx.js是所有的业务逻辑的代码
* mainfest.xx.js是为了打包的代码做底层支持的，一般是webpack帮我们做一些事情
* vendor.xxx.js是我们第三方的一些内容，包括插件框架等等
* 这个0.1xxx.js[文件名可能是其他类似的]是我们代码里懒加载的组件，会被单独拿出

#### 7.路由懒加载

 1. 为什么需要懒加载

    * 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。

    * 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

	2. 写法 在路由配置index.js中

    ```js
    //组件的加载如下使用
    //  写法1：推荐懒加载的组件放在这里统一管理
    //  注意一下这里的@的含义 在 build/webpack.base.conf.js里有这个配置 也就是@=src目录[默认]
    // alias: {
    //       '@': resolve('src'),
    //     }
    const About = () => import('@/components/about.vue')
    const routes = [
      {
        // 默认值 代表当链接为空时 重定向到 /home
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/about',
        component: About
        // 写法2：直接在这里导入
        // component: () => import('@/components/About')
      },
      {
        path: '/user/:userid',
        component: User
      }
    
    ]
    
    ```

	3. 效果

    打包的时候会多一个js文件

    这里的0.1xxx.js就是

    <img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200830162724116.png" alt="image-20200830162724116" style="zoom:50%;" />

#### 8.嵌套路由

步骤：

1. 创建对应的子组件, 并且在路由映射中配置对应的子路由

   HomeNews.vue

   ```vue
   <template>
     <div>
       <ul>
         <li>消息1</li>
         <li>消息2</li>
         <li>消息3</li>
         <li>消息4</li>
       </ul>
     </div>
   </template>
   
   <script>
     export default {
        name:'HomeMessage'
     }
   </script>
   
   <style scoped>
   
   </style>
   ```

   HomeMessage.vue

   ```vue
   <template>
     <div>
       <ul>
         <li>消息1</li>
         <li>消息2</li>
         <li>消息3</li>
         <li>消息4</li>
       </ul>
     </div>
   </template>
   
   <script>
     export default {
        name:'HomeMessage'
     }
   </script>
   
   <style scoped>
   
   </style>
   ```

   router/index.js

   ```js
   const HomeNews = () => import('@/components/HomeNews.vue')
   const HomeMessage = () => import('@/components/HomeMessage.vue')
   
   const routes = [
     {
       path: '/home',
       component: Home,
       // 路由嵌套子路由
       children: [
         {
           // 默认路径
           path: '',
           redirect:'news'
         },
         {
           //这里不要带/开头 而上面一级是要/的
           path: 'news',
           component: HomeNews
         },
         {
           path: 'message',
           component: HomeMessage
         }
       ]
     },
   ]
   ```

2. 在组件内部使用\<router-view>标签.

   Home.vue

   ```vue
   <template>
     <div>
       <h2>我是首页home</h2>
       <!-- 这里要写全路径 有/开头  -->
       <router-link to="/home/news">新闻1</router-link>
       <router-link to="/home/message">消息1</router-link>
       <router-view/>
     </div>
   </template>
   
   <script>
   export default {
   }
   </script>
   <style scoped>
   </style>
   ```

3. 效果

   ![image-20200830175615899](https://gitee.com/rodrick278/img/raw/master/img/image-20200830175615899.png)



#### 9.参数传递

* 传递参数主要有两种类型: params和query

  * **params**的类型

    > 配置路由格式: /router/:id
    > 传递的方式: 在path后面跟上对应的值
    > 传递后形成的路径: /router/123, /router/abc

  * **query**的类型

    > 配置路由格式: /router, 也就是普通配置
    > 传递的方式: 对象中使用query的key作为传递方式
    > 传递后形成的路径: /router?id=123, /router?id=abc

* 使用

  1. 写在router-link里

     ```vue
     <router-link :to="'/user/'+uid">用户</router-link>
     <router-link :to="{path:'/profile',query:{name:'jck',sex:'man'}}">档案</router-link>
     ```

  2. js写法

     ```js
     <button @click="userClick">用户</button>
     <button @click="profileClick">档案</button>
     
      methods: {
         userClick() {
           this.$router.push("/user/" + this.uid);
         },
         profileClick() {
           this.$router.push({
             path: "/profile",
             query: {
               name: "jck",
               sex: "man"
             },
           });
         },
       },
     ```

  3. 接收参数

     > 两种方式的接收分别是 $route.params 和$route.query

     User.vue

     ```vue
     <template>
       <div>
         <h2>我是用户页面</h2>
         <!-- <span>当前用户是：{{username}}</span> -->
         <span>当前用户是：{{$route.params.userid}}</span>
     
       </div>
     </template>
     
     <script>
     export default {
       computed: {
         username() {
           // $route 指向的是当前活跃的路由 注意不是$router 别弄混 $router是整个router的对象
           return this.$route.params.userid;
         }
       },
     };
     </script>
     
     <style scoped>
     </style>
     
     ```

     

     Profile.vue

     ```vue
     <template>
       <div>
         <h2>我是用户档案</h2>
         <ul>
           <li v-for="(item,key) in $route.query" :key="item">{{key}}-{{item}}</li>
         </ul>
       </div>
     </template>
     
     <script>
       export default {  
       }
     </script>
     
     <style scoped>
     
     </style>
     ```

#### 10.$router和$route

vue全局对象`this.$router`与main.js导入的router对象是一个对象，也就是我们`router/index.js`导出的对象router。

```
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
//4.导出router实例
export default router
```

`this.$route`对象是当前处于活跃的路由，有params和query属性可以用来传递参数。

查看`vue-router`源码,在我们项目中的`router/index.js`中，vue 对于插件必须要使用`Vue.use(Router)`，来安装插件，也就是执行vue-router的`install.js`。

在[vue-router的github](https://github.com/vuejs/vue-router/tree/dev/src)源码中查看src结构如下：

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-15.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-15.png)

其中index.js是入口文件，入口js文件就是导入并执行了install.js文件。

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-16.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-16.png)

> 发现

install.js中有注册2个全局组件`RouterView`和`RouterLink`，所以我们能使用`<router-view>`和`<router-link>`组件。

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-17.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-17.png)

> $router和$route是继承自vue的原型

怎么理解原型？学过Java 的都知道有父类和子类，子类也可以有自己的子类，但是他们都有一个处于最顶层的类Object(所有类的父类)。在Vue中就有那一个`Vue`类似Object，在java中在Object中定义的方法，所有的类都可以使用可以重写，类似的`Vue.prototype`（Vue的原型）定义的属性方法，他的原型链上的对象都可以使用，而`$router`和`$route`都在Vue的原型链上。

在main.js入口文件中在vue的原型上定义一个方法test，然后在User组件中尝试调用。

```
import Vue from 'vue'
import App from './App'
import router from './router'

//在vue的原型上添加test方法
Vue.prototype.test = function () {
  console.log("test")
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  },
  methods: {
    btnClick() {
      //所有组件都继承自vue的原型
      console.log(this.$router)
      console.log(this.$route)
      //调用vue原型的test
      this.test()
    }
  }
}
</script>

<style scoped>
</style>
```

启动项目点击User页面上的按钮，打开浏览器控制台查看日志发现test方法被执行了，而User组件中并未定义test方法，却可以调用。

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-18.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-18.png)

继续来读install.js，install.js中一开始就将`Vue`这个类当参数传入了install方法中，并把`Vue`赋值给`_Vue`。

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-19.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-19.png)

继续读install.js发现以下代码

```
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
//Object.defineProperty用来定义属性
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
```

`Object.defineProperty`用来定义属性，以上代码就是给`Vue.prototype`(Vue原型)添加`$router`和`$route`属性并给属性赋值，等价于

```
Vue.prototype.$router = {
    get () { return this._routerRoot._router }
}
Vue.prototype.$router = {
  get () { return this._routerRoot._router }
}
```

也就是在Vue的原型上添加`$router`和`$route`属性,再查看get()返回值`this._routerRoot._router`

[![img](https://gitee.com/rodrick278/img/raw/master/img/17-20.png)](https://github.com/zhangtianyi0110/VueLearnNotes/blob/master/17-vue-router/images/17-20.png)

这里的`this.$options.router`就是我们main.js入口文件传入的参数`router`，也就是router/index.js导出的`router`对象。

```
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
```



#### [11.导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

##### 11.1 什么是导航守卫

正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

##### 11.2 全局守卫

`index.js`

```js
/**
 * 全局导航守卫 源码部分
 * 
 * 前置守卫(guard)beforeEach(guard: NavigationGuard): Function
 * 后置钩子(hook) afterEach
 * 
 * export type NavigationGuard<V extends Vue = Vue> = (
  to: Route,
  from: Route,
  next: NavigationGuardNext<V>
) => any
 */

router.beforeEach((to, from, next) => {
  // next表示执行路由跳转 from从哪来 next到哪去
  console.log(from,to,'beforeEach');
  // document.title=to.meta.title //由于home有嵌套路由的原因 这样直接拿会拿不到title
  document.title=to.matched[0].meta.title
  next();
});

router.afterEach((to, from) => {
  console.log(from,to,'afterEach');
});
```

##### 11.3 路由独享守卫

```js
const routes=[
	{
    name:'about',
    path: '/about',
    component: About,
    meta:{
      title:'关于'
    },
    beforeEnter(to, from, next) {
      next();
      console.log('关于页面的路由独享的守卫');
    },
    // component: () => import('@/components/About')
  }
]
```

##### 11.4 组件内守卫

`About.vue`

```vue
<template>
  <div>
    <h2>我是关于页面</h2>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    next((vm) => {
      // 通过 `vm` 访问组件实例
      console.log("beforeRouteEnter", vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log("beforeRouteUpdate");
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log("beforeRouteLeave");
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>
<style scoped>
</style>
```

##### 11.5 完整的导航解析流程

> 1. 导航被触发。
> 2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
> 3. 调用全局的 `beforeEach` 守卫。
> 4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
> 5. 在路由配置里调用 `beforeEnter`。
> 6. 解析异步路由组件。
> 7. 在被激活的组件里调用 `beforeRouteEnter`。
> 8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
> 9. 导航被确认。
> 10. 调用全局的 `afterEach` 钩子。
> 11. 触发 DOM 更新。
> 12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

##### 11.6 总结

路由的这些守卫 主要是根据不同的场景去选择使用  要的是理解哪些场景能够使用 学会去[官网](https://router.vuejs.org/zh/)查找为主

#### 12.keep-alive

##### 12.1 概念

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染

##### 12.2 实现

需求：正常的使用中 每次来回点击都会重新创建组件，重新执行生命周期，现在希望能保持上次的组件，类似效果如下

![img](https://gitee.com/rodrick278/img/raw/master/img/17-23.gif)

实现:

 1. 在home组件中添加created和destroyed然后正常操作可以发现组件被反复的创建销毁

    ```js
    created() {
        console.log("home created");
      },
     destroyed() {
        console.log("home destroyed");
      },
    ```

	2. 添加 `keep-alive`

    ```vue
    <keep-alive>
           <router-view/>
    </keep-alive>
    ```

	3. 删除`router/index.js`中配置的home路由的默认重定向路径，因为不去掉的话，会导致每次点回来的时候还是会先执行重定向到news界面

    ```js
    {
        path: '/home',
        name:'home',
        component: Home,
        // meta:元数据[描述数据的数据] 类似于描述这个组件本身的一些内容
        meta:{
          title:'首页'
        },
        // 路由嵌套子路由
        children: [
          // {
          //   // 默认路径
          //   path: '',
          //   redirect:'news'
          // },
          {
            //这里不要带/开头 而上面一级是要/的
            path: 'news',
            component: HomeNews
          },
          {
            path: 'message',
            component: HomeMessage
          }
        ]
      },
    ```

	4. 在`Home.vue`中添加`activated`钩子和`beforeRouteLeave`组件内路由守卫

    > 在这里面，首先定义一个变量path用来存放每次打开home时需要跳转的子路由
    >
    > 然后activated方法会在每次home组件激活的时候被触发，里面实现让他跳转到path的功能
    >
    > beforeRouteLeave会在每次离开组件前触发，里面实现在离开前把path的值改为this.$route.path，也就是如果我们是从/home/message跳转到其他画面的话，跳转前this.path就会变为'/home/message'
    >
    > 由于我们是keep-alive的，path的值会得到保留，下次再打开home时执行activated方法，使用的path就是'/home/message'了

    ```vue
    <template>
      <div>
        <h2>我是首页home</h2>
        <!-- 这里要写全路径 有/开头  -->
        <router-link to="/home/news">新闻1</router-link>
        <router-link to="/home/message">消息1</router-link>
        <router-view />
      </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          path: '/home/news'
        }
      },
      created() {
        console.log("home created");
      },
      destroyed() {
        console.log("home destroyed");
      },
      // activated和deactivated只在keep-alive的时候生效 且 这俩钩子在服务器端渲染期间不被调用。
      // 被 keep-alive 缓存的组件激活时调用
      activated(){
        this.$router.replace(this.path)
      },
      //被 keep-alive 缓存的组件停用时调用。
      deactivated(){
        
      },
      beforeRouteLeave(to, from, next) {
        console.log(this.$route.path);
        this.path=this.$route.path
        next()
      },
    };
    </script>
    <style scoped>
    </style>
    ```

##### 12.3 属性

1. **Props**

* `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。

* `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
* `max` - 数字。最多可以缓存多少组件实例。

2.**使用**

> 使用`include` or `exclude` 时 必须保证组件的**name**属性是有的！！

```vue
<!-- 逗号分隔字符串，注意不要在名字前后随便加空格！ -->
<keep-alive include="a,b">
  <router-view/>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <router-view/>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <router-view/>
</keep-alive>

<!-- 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。 -->
<keep-alive :max="10">
  <router-view/>
</keep-alive>
```

