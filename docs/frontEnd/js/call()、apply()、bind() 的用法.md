---
title: call、apply、bind 的用法
date: 2020-10-10
categories:
 - 前端
tags:
- js
---
## 基本用法

先看明白下面：

**例 1**

![img](https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8618-20170316165541854-1574871496.png)

```
obj.objAge;  // 17
obj.myFun()  // 小张年龄 undefined
```

**例 2**

![img](https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8327-20170316170324541-406227186.png)

```
shows()  // 盲僧　
```

比较一下这两者 this 的差别，第一个打印里面的 this 指向 obj，第二个全局声明的 shows() 函数 this 是 window ；

**1，call()、apply()、bind() 都是用来重定义 this 这个对象的！**

如：

![img](https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8172-20170316172537651-1643313633.png)

```
obj.myFun.call(db)；　　　　// 德玛年龄 99
obj.myFun.apply(db);　　　 // 德玛年龄 99
obj.myFun.bind(db)();　　　// 德玛年龄 99
```

以上出了 bind 方法后面多了个 () 外 ，结果返回都一致！

由此得出结论，bind 返回的是一个新的函数，你必须调用它才会被执行。

**2，对比call 、bind 、 apply 传参情况下**

![img](https://www.runoob.com/wp-content/uploads/2018/08/1535346409-7922-20170316173631526-1279562612.png)

　

```
obj.myFun.call(db,'成都','上海')；　　　　 // 德玛 年龄 99  来自 成都去往上海
obj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海  
obj.myFun.bind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.bind(db,['成都','上海'])();　　 // 德玛 年龄 99  来自 成都, 上海去往 undefined
```

　　

微妙的差距！

从上面四个结果不难看出:

call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：

call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 **obj.myFun.call(db,'成都', ... ,'string' )**。

apply 的所有参数都必须放在一个数组里面传进去 **obj.myFun.apply(db,['成都', ..., 'string' ])**。

bind 除了返回是函数以外，它 的参数和 call 一样。

当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！

## 关于 this 丢失

加入我们有如下情况：

```javascript
let user = {
  myname: "John",
  say(){
  	console.log(`hi,${this.myname}`)
  }
}

setTimeout(user.say,1000)
```

一秒后会打印： `hi,undefined` ，为什么会这样呢，其实是因为 `user.say` 作为回调传入 `setTimeout` 的时候，上下文就不是 `user` 了，相当于是：

```javascript
let user = {
  myname: "John",
  say(){
  	console.log(`hi,${this.myname}`)
  }
}
let f = user,say
setTimeout(f,1000)
```

 所以我们才需要用包装器包装：

```javascript
let user = {
  myname: "John",
  say(){
  	console.log(`hi,${this.myname}`)
  }
}

setTimeout(() => user.say(),1000)
```

