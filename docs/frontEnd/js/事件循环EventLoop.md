---
title: 事件循环EventLoop
date: 2020-12-09
categories:
 - 前端
tags:
- js
---

## JavaScript 是单线程的
JavaScript 的设计就是为了处理浏览器网页的交互（DOM操作的处理、UI动画等），决定了它是一门单线程语言。JavaScript 是单线程的，那么处理任务是一件接着一件处理，从上往下顺序执行，如果一个任务的处理耗时（或者是等待）很久的话，如：网络请求、定时器、等待鼠标点击等，后面的任务也就会被阻塞，也就是说会阻塞所有的用户交互（按钮、滚动条等），会带来极不友好的体验。
## 谁先执行
这里我们看一段代码
```javascript
setTimeout(() => console.log("timeout"), 0)
Promise.resolve()
  .then(() => console.log("promise"))
console.log("log")

// 结果：
log
promise
timeout
```
为什么会造成这个结果？
## 事件循环Event Loop
**事件循环** 的概念很好理解：它是一个在 JavaScript 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。 引擎的一般算法： 当有任务时：从最先进入的任务开始执行。 休眠直到出现任务，然后转到第 1 步。 

![image.png](https://gitee.com/rodrick278/img/raw/master/img/1607526245471-54ef987f-f685-45b3-8e26-a4871df52606.png)
所有的任务会按照顺序一个一个地进入我们的 **宏任务队列** 中，然后依次执行任务A、任务B、任务C
**请注意** ，在引擎执行任务的时候， **浏览器不会进行渲染（render）** ，假如这个任务中有很多改变 DOM 元素的操作，对不起，画面上只会显示最后结束任务时渲染的结果：

```html
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```
在这段代码执行中，虽然对 `progress.innerHTML` 进行了很多次的更改，但是画面上只会感觉卡了一会之后显示出一个 `999999` ，因为过程中并没有进行渲染。
## 宏任务
那如何改变成画面会显示的情况呢，我们就需要使用 `setTimeout` 来给我们的任务留下停歇的“空气”来执行渲染：
```html
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // 做繁重的任务的一部分 (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```
这时候我们会发现画面上的数字每增加 1000 会跳动一次，因为我们每 `i++` 1000 次就会设置一个 `setTimeout` ，这时候的浏览器是这样运作的：

1. 从 0 开始 `i++` 到1000，走进 `if` 里，通过 `setTimeout` 会给队列里增加一个 **任务A**，然后当前的任务结束
1. 结束了一个任务就要渲染 DOM ，这时候画面上出现了1000
1. 引擎休眠
1. 休眠了 4ms 之后（因为**多个嵌套的 setTimeout 调用在浏览器中的最小延迟为 4ms**），开始执行 **任务A**  
1. 开始执行 **步骤1** ，这样一个 **循环** 就产生了……
## 微任务
Promise 的处理程序（handlers）**.then、.catch 和 .finally** 都是异步的。他们都是微任务。
还有一个特殊的函数 **queueMicrotask(func)**，它对 func 进行排队，以在微任务队列中执行。


微任务和宏任务的执行关系是这样的：

- 先执行**宏任务A**
- 执行宏任务A中如果**碰到微任务B、C、D**，那么把B、C、D依次放入**微任务队列**
- **宏任务A执行结束**，**立即执行微任务队列**中的任务A、B、C
- 然后再执行其他的**宏任务或渲染**


所以我们一开始的题目中，是这样执行的

1. 开始宏任务，打印 `log` 
1. 碰到了 `promise.then` ，是微任务，放入微任务队列
1. 碰到了 `setTimeout` ，放入宏任务队列
1. 当前宏任务结束，立即执行微任务队列，打印 `promise` 
1. 休眠
1. 执行宏任务队列中的 `setTimeout` ，并打印 `timeout` 



更详细的事件循环图示如下（顺序是从上到下，即：首先是脚本，然后是微任务，渲染等）： 
<img src="https://gitee.com/rodrick278/img/raw/master/img/1607527690190-3ecb8765-ee5e-4ebb-94a5-dc3083a1050c.png" alt="image.png" style="zoom:50%;" />


如果我们想要异步执行（在当前代码之后）一个函数，但是要在 **更改被渲染或新事件被处理之前** 执行，那么我们可以使用 `queueMicrotask`  来对其进行安排（schedule）.
```javascript
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // 做繁重的任务的一部分 (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      queueMicrotask(count);
    }

  }

  count();
</script>
```
执行上面这个，你会发现画面也只会最后显示出 `1000000` ，因为 `queueMicrotask` 任务一定在渲染前执行。
