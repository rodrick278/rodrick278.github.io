---
title: Promise&异步函数async
date: 2020-09-06
categories:
 - 前端
tags:
- js
- ES6
---

## Promise


### 1.基本用法


> Promise本身是一个对象，需要传一个函数作为参数，这个函数本身有两个参数resolve, reject，
> 在方法体本身我们做一些类似发送请求的操作，当我们得到返回的data时，
> 如果是成功返回状态，调用resolve(data)，如果是失败返回状态，调用reject(data)
> 接下来有两个链式调用函数
>
> 1. .then(data=>{})  or .then(data=>{},(reason,data)=>{})
>
> .then方法可以传一个或者两个参数，data就是我们resolve(data)里的data值，reason是reject(data)里的data值
>
> 2. .catch((reason)=>{})  这个就相当于1方法里里对第二个参数的处理，但是是作为单独拿出来的处理，逻辑更清晰



```javascript
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


- pending：等待状态，比如正在进行网络请求，或者定时器没有到时间。
- fulfill：满足状态，当我们主动回调了resolve时，就处于该状态，并且会回调.then()
- reject：拒绝状态，当我们主动回调了reject时，就处于该状态，并且会回调.catch()

<br />![](https://gitee.com/rodrick278/img/raw/master/img/image-20200901210814057.png)<br />

### 3.Promise的链式调用

<br />基本写法有三种<br />

- _return new Promise xxx_
- _return Promise.resolve(xxx)_
- _return xxx_



> 注意 Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写
> 如果不是单纯的resolve(x) 这么简单的操作的话[比如有个延迟操作之类的],那么还是老老实实new Promise去写


<br />详细写法<br />

```javascript
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


```javascript
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


### 4.api

1. Promise.all

- 并行执行多个 promise，并等待所有 promise 都准备就绪。
- 返回的 Promise 在 resolve 后会呈现为一个数组
- **如果任意一个 promise 被 reject，由 `Promise.all` 返回的 promise 就会立即 reject**

```javascript
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 所有响应都被成功 resolved
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }

    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

2. Promise.allSettled

- 使用方式和 Promise.all 一致
- 返回的是如下格式数组 Promise，**不论所有的 Promise 中是否有 `rejected` ，都会等所有的 Promise 执行结束，并且返回状态会用 `status` 表示**

```javascript
[
	{status:"fulfilled", value:result},
	{status:"fulfilled", value:result},
  {status:"rejected", reason:error} 
]
```

3. Promise.race

- 用法和 Promise.all 相同
- 只等待第一个 settled 的 promise 并获取其结果（不论是否有 error）。

```javascript
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

4. [Promise.any](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) **[❗实验性的]**

- 用法同上☝
- **返回第一个成功的 Promise**
- **如果全部 Promise 都失败会进入 catch**
- ❗ `Promise.any()` 方法依然是实验性的，尚未被所有的浏览器完全支持。它当前处于 [TC39 第四阶段草案（Stage 4）](https://github.com/tc39/proposal-promise-any)



**总结：**

- **all**：有 rejected 会直接返回，否则等全部返回
- **allSettled**：全部执行完再返回，返回值里有 `status` [ `"fulfilled"` 或 `"rejected"` ]
- **race**：返回第一个执行完的，不论是否 `rejected` 
- **any**：返回第一个成功的，如果全部失败会进 catch

<br />

### 5.手写Promise.all


> Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。



```javascript
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


### 6. 错误会被触发么？

```javascript
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

```javascript
new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject("Whoops!");
  }, 1000);
}).catch(alert);
```

第一段代码中， `throw` 的错误并不会被触发，而第二段代码会<br />这是因为函数代码周围有个“隐式的 `try..catch`”。所以，所有同步错误都会得到处理。<br />但是这里的错误并不是在 executor 运行时生成的，而是在稍后生成的。因此，promise 无法处理它。<br />而 `reject` 的结果，一定是会被 `.catch` 执行的。
## 

## async & await


### 1.async 和 await 在干什么


> async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
> 另外还有一个很有意思的语法规定，await 只能出现在 async 函数中。



##### 1.1 async 起什么作用


1. `async` 声明一个函数是异步函数。异步函数会自动（由解释器）使用 Promise 封装返回值，同时，其内部可以使用 `await` 关键字。最终由 async/await/Promise 配合由解释器将类似同步方式编写的代码以正确的异步逻辑来调用<br />这里注意，**声明**不等于就是异步函数，它的形式也是异步，但实际执行并没有异步。直接执行`async`声明的函数，也只是一个普通函数。“声明”是接口层面的。
2. `async`返回的是一个Promise对象



##### 1.2 await是干嘛的，它在等什么

<br />根据[MDN的说法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)，await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，**其回调的resolve函数的参数作为 await 表达式的值[可以理解为await将Promise对象解包的感觉]**，继续执行 `async function` `await`等的是一个 `Promise` 对象或者任何要等待的值。<br />

- 当 `await` 接的函数的返回值是一个非 `Promise` 对象时，他什么也不做，正常执行

- 当 `await` 接的函数的返回值是一个 `Promise` 对象时，他会等待 `Promise` 执行结束，然后拿到其回调的`resolve`函数参数，这段时间他就阻塞了后续代码

  > 注意 这里指的 _阻塞_ 是 `await`  所在的 `async` 方法里的阻塞

```javascript
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

```javascript
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

- Promise方式

```javascript
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

- async/await

```javascript
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

2. 复杂then链<br />现在改一下需求,**假如我执行step2方法的时候我需要同时传入time1&time2，然后step3的时候同时传入time1&time2&time3**

 ```javascript
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

```javascript
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

```javascript
async function doIt() {
      let time1 = 300
      time2=await step1(time1)
      time3=await step2(time1,time2)
      result=await step3(time1,time2,time3)
      console.log(`result is ${result}`)
    }
    
    doIt()
```

### 3. 在非 async 函数中调用 async 函数

```javascript
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // 1 秒后显示 10
  wait().then(result => alert(result));
}

f();
```

只需要把 `async` 调用当作 promise 对待，并在它的后面加上 `.then` 即可

## 微任务（Microtask）

看下面这段代码：

```javascript
let promise = Promise.resolve();

promise.then(() => console.log("promise done!"));

setTimeout(()=>{console.log("timeout done")})

console.log("code finished"); // 这个 alert 先显示
```

他们的显示结果是：

```
code finished
promise done!
timeout done
```

异步任务需要适当的管理。为此，ECMA 标准规定了一个内部队列 `PromiseJobs`，通常被称为“微任务队列（microtask queue）”（ES8 术语）。<br />如 [规范](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues) 中所述：

- 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
- 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。

<br />或者，简单地说，当一个 promise 准备就绪时，它的 `.then/catch/finally` 处理程序（handler）就会被放入队列中：但是它们不会立即被执行。当 JavaScript 引擎执行完当前的代码，它会从队列中获取任务并执行它。<br />这就是为什么在上面那个示例中 “code finished” 会先显示。