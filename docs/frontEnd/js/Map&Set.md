---
title: Map&Set
date: 2020-11-21
categories:
 - 前端
tags:
- js
- ES6
---


## Map
### 基础
[Map](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Map) 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键，**包括对象** （key）。<br />它的方法和属性如下：

- `new Map()` —— 创建 map。
   - `new Map()` 是返回一个空 map
   - `new Map([['a',10],['b',20],['c',30]])` 这样是创建时填入数据 
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map。
- `map.size` —— 返回当前元素个数。
> 注意，虽然你可以使用 `map[key]` 这种类似对象的使用方式来获取 value，但是这其中会有限制，比如 key 不能是 **对象键** ，所以一般 map 取值建议使用 `map.get(key)` 

### 链式调用
由于 `map.set()` 每次会返回 map 本身，所以可以进行链式调用：
```javascript
map.set('1','str')
		.set(1,'num')
		.set(true,'bool')
```
### 迭代
迭代循环上 map 提供了三个方式：

- `map.keys()` —— 遍历并返回所有的键（returns an iterable for keys），
- `map.values()` —— 遍历并返回所有的值（returns an iterable for values），
- `map.entries()` —— 遍历并返回所有的实体（returns an iterable for entries）`[key, value]`，`for..of` 在默认情况下使用的就是这个。



可以使用 `let ... of ...` 来调用上面的三种情况，注意 `let item of map` 和 `let item of map.entries()` 是一样的<br />
<br />还可以使用 `map.forEach( (value,key,map) => { /* do sth */})` 进行迭代
### 对象转 Map (Object.entries)
```javascript
let obj = {
	name:'rodrick',
  age:24,
}

let map = new Map(Object.entries(obj))

console.info(map) // Map(2) {"name" => "rodrick", "age" => 24}

```
这里，`Object.entries` 返回键/值对数组：`[ ["name","rodrick"], ["age", 24] ]`。这就是 `Map` 所需要的格式。<br />

### Map 转对象 (Object.fromEntries)
首先看一下 `Object.fromEntries` 是做什么的
```javascript
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// 现在 prices = { banana: 1, orange: 2, meat: 4 }
```
`Object.fromEntries` 是将一个 `entries` 转换为对象并返回，那么我们就可以通过他将 Map 转为对象：
```javascript
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries())

console.log(obj) // {banana: 1, orange: 2, meat: 4}

```
其实直接使用 `let obj = Object.fromEntries(map)` 也是可以的，因为 `Object.fromEntries` 期望得到一个可迭代对象作为参数，而不一定是数组。并且 `map` 的标准迭代会返回跟 `map.entries()` 一样的键/值对。因此，我们可以获得一个普通对象（plain object），其键/值对与 `map` 相同。
## Set
### 基础
`Set` 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。<br />它的主要方法如下：

- `new Set(iterable)` —— 创建一个 `set`，如果提供了一个 `iterable` 对象（ **通常是数组** ），将会从数组里面复制值到 `set` 中。
- `set.add(value)` —— 添加一个值，返回 set 本身
- `set.delete(value)` —— 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` —— 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` —— 清空 set。
- `set.size` —— 返回元素个数。


<br />它的主要特点是，重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。这就是 `Set` 里面的每一个值只出现一次的原因。这在我们处理 **数组去重** 时非常常用(不用遍历数组再挨个 find -> push 了)：
```javascript
let arr = ['aa','aa','bb','bb']
let arrRet = [...new Set(arr)] // 解构赋值 
// ES5: Array.from 可以接受一个可迭代或类数组的值,效果相同
// let arrRet = Array.from(new Set(arr)) 

consolo.info(arrRet) // ["aa", "bb"]
```

<br />在不需要重复值的情况下，如果使用数组，每次 push 的时候都需要使用 find 方法取判断一次，性能很差 。
### 迭代
我们可以使用 `for..of` 或 `forEach` 来遍历 Set：
```javascript
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 与 forEach 相同：
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```
这里注意， `valueAgain` 其实和 `value` 是一样的值，这里会存在是因为为了与 `Map` 兼容。当然，这看起来确实有些奇怪。但是这对在特定情况下轻松地用 `Set` 代替 `Map` 很有帮助，反之亦然。<br />
<br />`Map` 中用于迭代的方法在 `Set` 中也同样支持：

- `set.keys()` —— 遍历并返回所有的值（returns an iterable object for values），
- `set.values()` —— 与 `set.keys()` 作用相同，这是为了兼容 `Map`，
- `set.entries()` —— 遍历并返回所有的实体（returns an iterable object for entries）`[value, value]`，它的存在也是为了兼容 `Map`。


<br />不要想当然的觉得 `set.keys()` 可能会返回 `0,1,2` 这样的索引，实际上并不会，只会返回实际的值
## WeakMap
`WeakMap` 和 `Map` 的第一个不同点就是，`WeakMap` 的键必须是**对象**，不能是原始值
```javascript
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
```
如果我们在 weakMap 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和map）中自动清除。
```javascript
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```
与上面常规的 `Map` 的例子相比，现在如果 `john` 仅仅是作为 `WeakMap` 的键而存在 —— 它将会被从 map（和内存）中自动删除。<br />
<br />`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。<br />`WeakMap` 只有以下的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`
## WeakSet
`WeakSet` 的表现类似：

- 与 `Set` 类似，但是我们只能向 `WeakSet` 添加对象（而不能是原始值）。
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中。
- 跟 `Set` 一样，`WeakSet` 支持 `add`，`has` 和 `delete` 方法，但不支持 `size` 和 `keys()`，并且不可迭代。
## WeakMap 和 WeakSet 的使用场景

- 使用**对象**作为 key 或者 Set 的值
- 在这个对象**消失或不需要的时候**，对应的 Map 和 Set 里也不需要存在它
- 不需要进行**迭代**

**<br />例如：缓存一些对象、DOM 节点作为键名、等
## Object.keys，values，entries
前面使用了 `map.keys()`，`map.values()` 和 `map.entries()` 方法<br />类似的，普通对象也有对应的方法，对于普通对象，下列这些方法是可用的：

- [Object.keys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) —— 返回一个包含该对象所有的键的数组。
- [Object.values(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/values) —— 返回一个包含该对象所有的值的数组。
- [Object.entries(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) —— 返回一个包含该对象所有 [key, value] 键值对的数组。


<br />但是注意，Map 中使用是 `map.keys()` 这种形式，但是这里我们是 `Object.keys(obj)` ,对象的这种使用方式更加灵活<br />
<br />并且， `Object.*` 这种方法返回的是一个真正的数组，而非仅仅是可迭代对象<br />

> **Object.keys/values/entries 会忽略 symbol 属性**
> 就像 `for..in` 循环一样，这些方法会忽略使用 `Symbol(...)` 作为键的属性。
> 通常这很方便。但是，如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 [Object.getOwnPropertySymbols](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)，它会返回一个只包含 Symbol 类型的键的数组。另外，还有一种方法 [Reflect.ownKeys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)，它会返回 **所有** 键。


<br />例如，我们有一个带有价格的对象，并想将它们加倍：
```javascript
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 转换为数组，之后使用 map 方法，然后通过 fromEntries 再转回到对象
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```
可以很方便的做一些转换链的事情
## 总结
`Map` —— 是一个带键的数据项的集合。<br />方法和属性如下：

- `new Map([iterable])` —— 创建 map，可选择带有 `[key,value]` 对的 `iterable`（例如数组）来进行初始化。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map 。
- `map.size` —— 返回当前元素个数。

与普通对象 `Object` 的不同点：

- 任何键、对象都可以作为键。
- 有其他的便捷方法，如 `size` 属性。

`Set` —— 是一组唯一值的集合。<br />方法和属性：

- `new Set([iterable])` —— 创建 set，可选择带有 `iterable`（例如数组）来进行初始化。
- `set.add(value)` —— 添加一个值（如果 `value` 存在则不做任何修改），返回 set 本身。
- `set.delete(value)` —— 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` —— 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` —— 清空 set。
- `set.size` —— 元素的个数。

在 `Map` 和 `Set` 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。
