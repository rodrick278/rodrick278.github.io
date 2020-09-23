---
title: Promise&async
date: 2020-09-06
categories:
 - 前端
tags:
- ES6
---

## Promise

### 1.基本用法

> Promise本身是一个对象，需要传一个函数作为参数，这个函数本身有两个参数resolve, reject，
>
> 在方法体本身我们做一些类似发送请求的操作，当我们得到返回的data时，
>
> 如果是成功返回状态，调用resolve(data)，如果是失败返回状态，调用reject(data)
>
> 接下来有两个链式调用函数
>
> 1.  .then(data=>{})  or .then(data=>{},(reason,data)=>{})
>
> ​	.then方法可以传一个或者两个参数，data就是我们resolve(data)里的data值，reason是reject(data)里的data值
>
> 2.  .catch((reason)=>{})  这个就相当于1方法里里对第二个参数的处理，但是是作为单独拿出来的处理，逻辑更清晰
>
> 

```js
// 第一种写法
new Promise((resolve, reject) => {
  setTimeout(() => {
    const successData = 'hello abc!'
    const errorData = 'u have a err!'
    // 成功的时候 调用resolve 失败的时候 调用reject
    // resolve(successData)
    reject(errorData)
  }, 1000)
}).then((data) => {
  console.log(data);
}).catch((reason) => {
  console.log(reason);
})

// 第二种写法
new Promise((resolve, reject) => {
  setTimeout(() => {
    const successData = 'hello abc!'
    const errorData = 'u have a err!'
    // 成功的时候 调用resolve 失败的时候 调用reject
    // resolve(retData)
    reject(errorData)
  }, 1000)
}).then((data) => {
  console.log(data);
},(reason)=>{
  console.log(reason);
})
```



### 2.Promise三种状态

* pending：等待状态，比如正在进行网络请求，或者定时器没有到时间。
* fulfill：满足状态，当我们主动回调了resolve时，就处于该状态，并且会回调.then()
* reject：拒绝状态，当我们主动回调了reject时，就处于该状态，并且会回调.catch()

![image-20200901210814057](https://gitee.com/rodrick278/img/raw/master/img/image-20200901210814057.png)

### 3.Promise的链式调用

基本写法有三种

* *return new Promise xxx*
* *return Promise.resolve(xxx)*
* *return xxx*

> 注意 Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写
>
> 如果不是单纯的resolve(x) 这么简单的操作的话[比如有个延迟操作之类的],那么还是老老实实new Promise去写

详细写法

```js
// 基本链式调用一
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('HI!')
      }, 1000);
    }).then(data => {
      console.log(data);
      // 下面这两种写法是一样的
      // return new Promise(resolve => {
      //   resolve(data + '111')
      // })
      return Promise.resolve(data + '111')
    })
      .then(data => {
        console.log(data);
        // return Promise.resolve(data + '222')
        // 这里reject会直接进catch
        return Promise.reject('err!!')
      })
      .then(data => {
        console.log(data);
        return Promise.resolve(data + '333')
      })
      .then(data => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
```

```js
// 基本链式调用二
new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('HI!')
      }, 1000);
    }).then(data => {
      console.log(data);
      return data + '111'
    })
      .then(data => {
        console.log(data);
        // return data + '222'
        // 这样直接throw 可以进catch
        throw 'err !!!'
      })
      .then(data => {
        console.log(data);
        return data + '333'
      })
      .then(data => {
        console.log(data);
      }).catch(err=>{
        console.log(err);
      })
```

### 4.all方法

在多个异步方法全部结束之后再去执行.then的方法

```js
 Promise.all([
      // new Promise((resolve,reject)=>{
      //   $ajax({
      //     url:'url1',
      //     success:function (data1) {
      //       resolve(data1)
      //     }
      //   })
      // }),
      // new Promise((resolve,reject)=>{
      //   $ajax({
      //     url:'url2',
      //     success:function (data2) {
      //       resolve(data2)
      //     }
      //   })
      // })
      
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('data1')
        }, 2000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('data2')
        }, 1000);
      })
    ]).then(results => {
      // results[0]==data1 // true
      // results[1]==data2 // true
      console.log(results[0], results[1]);
    })
```

### 5.手写Promise.all

> Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

```js
// 手写Promise.all()
Promise.property.all = function (iterators) {
    const promises = Array.from(iterators);
    const len = promises.length;
    let count = 0;
    let resultList = [];
    return new Promise((resolve,reject)=>{
        promises.forEach((p,index) =>{
            Promise.resolve(p)
                .then((result)=>{
                count++;
                resultList[index] = result;
                if(count === len){
                    resolve(resultList);
                }
            })
                .catch(e=>{
                reject(e);
            })
        })
    })
}
```



## async & await

### 1.async 和 await 在干什么

> async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
>
> 另外还有一个很有意思的语法规定，await 只能出现在 async 函数中。

##### 1.1 async 起什么作用

1. `async` 声明一个函数是异步函数。异步函数会自动（由解释器）使用 Promise 封装返回值，同时，其内部可以使用 `await` 关键字。最终由 async/await/Promise 配合由解释器将类似同步方式编写的代码以正确的异步逻辑来调用

    这里注意，**声明**不等于就是异步函数，它的形式也是异步，但实际执行并没有异步。直接执行`async`声明的函数，也只是一个普通函数。“声明”是接口层面的。

 2. `async`返回的是一个Promise对象

##### 1.2 await是干嘛的，它在等什么

根据[MDN的说法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)，await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，**其回调的resolve函数的参数作为 await 表达式的值[可以理解为await将Promise对象解包的感觉]**，继续执行 `async function` `await `等的是一个 `Promise` 对象或者任何要等待的值。

* 当 `await` 接的函数的返回值是一个非 `Promise` 对象时，他什么也不做，正常执行

* 当 `await` 接的函数的返回值是一个 `Promise` 对象时，他会等待 `Promise` 执行结束，然后拿到其回调的`resolve`函数参数，这段时间他就阻塞了后续代码

  > 注意 这里指的 *阻塞* 是 `await`  所在的 `async` 方法里的阻塞

 ```js
function getSomething() {
return "something";
}

async function testAsync() {
return Promise.resolve("hello async");
}

async function test() {
const v1 = await getSomething();
const v2 = await testAsync();
console.log(v1, v2);
}

test(); //something hello async
 ```



### 2.async/await 的优势在于处理 then 链

1. 简单then链对比

   ```js
   /**
       * 传入参数 n，表示这个函数执行的时间（毫秒）
       * 执行的结果是 n + 200，这个值将用于下一步骤
       */
       function takeLongTime(n) {
         return new Promise(resolve => {
           setTimeout(() => resolve(n + 200), n);
         });
       }
   
       function step1(n) {
         console.log(`step1 with ${n}`);
         return takeLongTime(n);
       }
   
       function step2(n) {
         console.log(`step2 with ${n}`);
         return takeLongTime(n);
       }
   
       function step3(n) {
         console.log(`step3 with ${n}`);
         return takeLongTime(n);
       }
   ```

   *Promise方式*

   ```js
   function doIt() {
         console.time("doIt");
         const time1 = 300;
         step1(time1)
           .then(time2 => step2(time2))
           .then(time3 => step3(time3))
           .then(result => {
             console.log(`result is ${result}`);
             console.timeEnd("doIt");
           });
       }
   
       doIt();
   ```

   *async/await*

   ```js
    async function doIt() {
         console.time("doIt");
         const time1 = 300;
         const time2 = await step1(time1);
         const time3 = await step2(time2);
         const result = await step3(time3);
         console.log(`result is ${result}`);
         console.timeEnd("doIt");
       }
   
       doIt();
   ```

2. 复杂then链

   现在改一下需求,**假如我执行step2方法的时候我需要同时传入time1&time2，然后step3的时候同时传入time1&time2&time3**

   ```js
   function step1(n) {
   console.log(`step1 with ${n}`);
   return takeLongTime(n);
   }
   
   function step2(m, n) {
   console.log(`step2 with ${m} and ${n}`);
   return takeLongTime(m + n);
   }
   
   function step3(k, m, n) {
   console.log(`step3 with ${k}, ${m} and ${n}`);
   return takeLongTime(k + m + n);
   }
   ```

   Promise的短板在于，每次then链的参数，不会被保留，下次想复用就没有了，必须先提前定义好三个time，每次借用param给他们分别赋值

   ```js
   function doIt(){
         let time1 = 300,time2,time3
         step1(time1)
         .then((param)=>step2(time1,time2=param))
         .then((param)=>step3(time1,time2,time3=param))
         .then((result)=>{
           console.log(`result is ${result}`)
         })
       }
   
       doIt()
   ```

   如果用 `async` ,过程中就已经把time2&time3赋值，不需要借助中间值param

   ```
   async function doIt() {
         let time1 = 300
         time2=await step1(time1)
         time3=await step2(time1,time2)
         result=await step3(time1,time2,time3)
         console.log(`result is ${result}`)
       }
       
       doIt()
   ```

   

