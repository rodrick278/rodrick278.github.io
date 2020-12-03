---
title: 偏函数(Partial)和柯里化(Currying)
date: 2020-12-03
categories:
 - 前端
tags:
- js
---

## 偏函数
我们知道 `bind(this,arg1,arg2...)` 可以绑定 `this` 且返回一个新的函数。<br />那么假设有如下的情况：
```javascript
function mul(a, b) {
  return a * b
}

let doubleNum = mul.bind(null,2)

alert(doubleNum(2)) //4
alert(doubleNum(3)) //6
alert(doubleNum(4)) //8
```
在我们本有一个用于乘法的函数 `mul(a,b)` 的情况下，希望在它基础上生成一个能把参数直接翻倍(*2)的函数 `doubleNum(x)` 返回值为 `x*2` ，那么用如上的方法实现，这样 `doubleNum` 就被称为一个偏函数。<br />
<br />[维基百科](https://en.wikipedia.org/wiki/Partial_application) 上对偏函数的定义：
> 翻译成中文：在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。（什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。）


<br />**我自己的理解是：我们可以隐藏一部分调用者不必关心的参数信息，使得新的函数在减少元的情况下，产生一个新的、基于原函数功能的、特定用途的函数。**<br />**
## 柯里化
[柯里化（Currying）](https://en.wikipedia.org/wiki/Currying)是一种关于函数的高阶技术。它不仅被用于 JavaScript，还被用于其他编程语言。<br />柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)。<br />柯里化不会调用函数。它只是对函数进行转换。<br />

### 实现柯里化
```javascript
function curry(fn) {
  return function subCurry(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return subCurry.apply(this, args.concat(args2))
      }
    }
  }
}
```
实现步骤：

1. 先返回一个函数 `subCurry` ，如果这次调用 `subCurry` 的参数 `...args` 的长度比原函数 `fn` 要求的参数要**多或者相等**，比如原函数 `fn(a,b)` ，然后这次调用 `curry(fn)(a,b,c)` ，那么就直接把参数给 `fn` 处理就好
1. 如果给的参数少于 `fn` 指定的参数个数，那么我们再返回一个函数，你可以继续传参调用，调用的时候，新传入的 `args2` 和刚才传入的 `args` 合并后一起重新回调 `subCurry` ，直到参数总数满足 1. 里面提到的要求，然后返回最终的 `fn.apply(this, 终极args)` 


<br />使用：
```javascript
function mul(a,b,c) {
  return a*b*c
}

let out = curry(mul)

alert(out(2,3,4))   // 24
alert(out(2)(3,4))	// 24
alert(out(2)(3)(4))	// 24
```
> **注意：**  柯里化要求函数具有固定数量的参数。
> 使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。

