---
title: Generator与异步迭代
date: 2020-12-01
categories:
 - 前端
tags:
- js
- ES6
---
## 背景
`Generator`  是 ES6 引入的，具有反复多次返回值与可迭代特性，且可以配合 `Promise` 等异步操作使用 。可以按需一个接一个地返回（“yield”）多个值。它们可与 [iterable](https://zh.javascript.info/iterable) 完美配合使用，从而可以轻松地创建数据流。
## 同步用法
### 基本用法
```javascript
function* testGen(){
	yield 1
  yield 2
  return 3
}
```
上面我们通过 `function*` 的形式创建了一个 `Generator` 函数，通过每个 `yield` 相当于把这个函数进行了分段，接下来我们对他进行调用：
```javascript
let gen = testGen()
Object.getPrototypeOf(gen).toString() // "[object Generator]"

let one = gen.next() // first:{value: 1, done: false}
let two = gen.next() // two:{value: 2, done: false}
let three = gen.next() // three:{value: 3, done: true}
```

- 当 `testGen()` 的时候，并不会执行什么，而是返回一个 `[object Generator]` 对象
- `next()` 方法每次执行的时候，会返回一个对象 `{value: xx, done: bool}` ，其中 value 是下一个 `yield` 的值，done 代表是否执行完毕，遇到 return 的时候会返回 return 的值且 done 为 true，如果没有 return 且没有下一个 yield ，会返回 `{value: undefined, done: true}` <br />
### 可迭代的
`{value: xx, done: bool}`  的形式，和 `next()` 方法，很容易让我们想到[可迭代对象](https://zh.javascript.info/iterable)的概念，没错，Generator 是一个可迭代的对象：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1，然后是 2
}
```
注意，虽然使用 for 循环写起来比 next().value 看起来舒服很多，但是当 `done==true` 的时候，循环会直接结束，不显示这个内容。<br />
<br />因为 generator 是可迭代的，我们可以使用 iterator 的所有相关功能，例如：spread 语法 `...`：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```
同样，我们可以使用 `[Symbol.iterator]` 来实现迭代方法，就像我们在进行对象的迭代中一样：
```javascript
let numtest = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    return {
      valStart : this.start,
      valEnd : this.end,
      next() {
        if (this.valStart < this.valEnd) {
          return { value: this.valStart++, done: false }
        } else {
          return { value: this.valStart, done: true }
        }
      }
    }
  }
}

let aa = [...numtest] // [1,2,3,4,5]
```
现在我们把代码改成：
```javascript
let numtest = {
  start: 1,
  end: 5,
  *[Symbol.iterator]() {
    for (let val = this.start; val <= this.end; val++) {
      yield val
    }
  }
}

let aa = [...numtest] // [1,2,3,4,5]
```
结果完全一致，看上去也简单了很多！
### 组合起来使用
组合使用的方法，其实本质上没有变化，只是将两个 Generator 结合了一下：
```javascript
function* fn1(flag) {
  let str = ""
  if (flag == "big") {
    str = "ABCDE"
  } else {
    str = "abcde"
  }
  for (item of str) yield item
}

function* fn2() {
  for (typeChar of "small,big".split(",")) {
    yield* fn1(typeChar)
  }
}

[...fn2()] // ["a", "b", "c", "d", "e", "A", "B", "C", "D", "E"]
```
嵌套 Generator 的时候，需要使用 `yield* fn()` 这样的语法去调用嵌套内的 `generator` <br />

### 返回值与接收值
在上面我们都是调用 Generator ，但是我们每次 `next()` 的时候看起来就像是在进行一次调用函数一样，那么调用函数的时候，我们能给他"传参"么？<br />
<br />答案是可以的，只要使用 `next(xxx)` 就可以：
```javascript
function* fn() {
  let one = yield "tell me 1+1?"
  alert("u answer is " + one)

  let two = yield "tell me 2+2?"
  alert("u answer is " + two)
}
let test = fn()
let firstRet = test.next()
console.log(firstRet.value); // tell me 1+1?

let twiceRet = test.next(2)
// alert u answer is 2
console.log(twiceRet.value); // tell me 2+2?

let thrdRet = test.next(4)
// alert u answer is 4
console.log(thrdRet.value); // undefined
```
我们 `next(2)` 的时候，会把这个数字2传回方法，用 `one` 接收。<br />

## 异步用法
### 普通可迭代对象中的用法
当值是以异步的形式出现时，例如在 `setTimeout` 或者另一种延迟之后，就需要异步迭代。<br />最常见的场景是，对象需要发送一个网络请求以传递下一个值，稍后我们将看到一个它的真实示例。<br />要使对象异步迭代：

1. 使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
1. `next()`方法应该返回一个`promise`（带有下一个值，并且状态为`fulfilled`）。
   - 关键字 `async` 可以实现这一点，我们可以简单地使用 `async next()`。
3. 我们应该使用`for await (let item of iterable)`循环来迭代这样的对象。
   - 注意关键字 `await`。


<br />举个例子：
```javascript
let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,

      async next() { // (2)

        // 注意：我们可以在 async next 内部使用 "await"
        // await 会阻塞方法，等待 Promise 处理结束
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
```
### Generator中的用法
对于大多数的实际应用程序，当我们想创建一个异步生成一系列值的对象时，我们都可以使用异步 generator。<br />语法很简单：在 `function*` 前面加上 `async`。这即可使 generator 变为异步的。<br />然后使用 `for await (...)` 来遍历它，像这样：
```javascript
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // 哇，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }
}

(async () => {

  let generator = generateSequence(1, 5);
  // for 后面加 await
  for await (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 alert 之间有延迟）
  }
  // 如果不用循环，而是 next() 的话要记得每次 next 都要加 await
  // result = await generator.next();

})();
```
### Spread 语法 `...` 无法异步工作
异步中， `...` 是无法正常工作的，原因很简单，用 `...` 去进行 iterator 处理的时候， `...` 希望找到的是 `Symbol.iterator`，而不是 `Symbol.asyncIterator`。
