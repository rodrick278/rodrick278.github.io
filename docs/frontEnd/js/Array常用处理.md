---
title: Array常用处理
date: 2020-10-27
categories:
 - 前端
tags:
- js
---

##  Array.every / Array.some

-  [Array.every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) 

> arr.every(callback(element[, index[, array]])[, thisArg])

数组中每一个对象是否 **都** 满足条件

```
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```

- [Array.some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 

> arr.some(callback(element[, index[, array]])[, thisArg])

是否**至少有一个元素**满足条件

```
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough);
// passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough);
// passed is true
```

## filter / map / reduce

- [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 

> var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

```
const nums = [10, 20, 300, 600, 400, 70, 2]
let nums1 = nums.filter(n => n < 100) // num1:[10,20,70,2]
```

- [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

> var new_array = arr.map(function callback(currentValue[, index[, array]]) {
>
>  // Return element for new_array 
>
> }[, thisArg])



`callback`生成新数组元素的函数，使用三个参数：

- `currentValue``callback` 数组中正在处理的当前元素。
- `index`可选`callback` 数组中正在处理的当前元素的索引。
- `array`可选`map` 方法调用的数组。

`thisArg`可选执行 `callback` 函数时值被用作`this`。

```
let nums2 = nums1.map(n => n * 2) //nums2:[20,40,140,4]
```

- [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

`callback`执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：

- **`accumulator`**累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。
- `currentValue`数组中正在处理的元素。
- `index` 可选数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。
- `array`可选调用`reduce()`的数组

`initialValue`可选作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

```
let num3 = nums2.reduce((preValue, curValue) => {
     return preValue + curValue
    }, 5)//num3: 5+20+40+140+4 = 209
```

## 元素增删 push / pop / unshift / shift / slice

- push

`**push()**` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

- pop

`**pop()**`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

- unshift

**`unshift()`** 方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组**)**。

- shift

`**shift()**` 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

- slice

`**slice()**` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

const before = ['ant', 'bison', 'camel', 'duck', 'elephant'];
const after = before.slice(3)
console.log(before,after) 
// expected output: Array ["ant", "bison", "camel", "duck", "elephant"] Array ["duck", "elephant"]
```

- splice

**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

