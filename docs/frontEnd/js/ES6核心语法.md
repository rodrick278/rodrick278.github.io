---
title: ES6核心语法
date: 2020-08-01
categories:
 - 前端
tags:
 - ES6
 - js
author: 徐小夕
---



> 本文为转载
>
> 作者：徐小夕
> 链接：https://juejin.im/post/6844903957853126663
> 来源：掘金



### 1. let和const

#### let

> 用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效，即let声明的是一个块作用域内的变量。

特点：

- 不存在变量提升
- 暂时性死区——只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
- 不允许重复声明
- 块级作用域——被{}包裹的，外部不能访问内部

应用案例与分析：

```
// 使用var
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  });
}   // => 5 5 5 5 5

// 使用let
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  });
}   // => 0 1 2 3 4
复制代码
```

上面使用let的代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算所以最后能正常输出i的值。

注意：

1. for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域，所以我们可以在循环体内部访问到i的值。
2. let和var全局声明时，var可以通过window的属性访问而let不能。

#### const

> const声明一个只读的常量。一旦声明，常量的值就不能改变。const实际上保证的是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

因此，我们使用const时，不能只声明而不初始化值，否则会报错：

```
const a;
// SyntaxError: Missing initializer in const declaration
复制代码
```

const的其他特性和let很像，一般推荐用它来声明常量，并且常量名大写。

### 2. 数值的扩展

ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

#### Number.isFinite()

> Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。 注意，如果参数类型不是数值，Number.isFinite一律返回false。

```
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite('hello');  // false
Number.isFinite(true);  // false
复制代码
```

#### Number.isNaN()

> 用来检查一个值是否为NaN,如果参数类型不是NaN，Number.isNaN一律返回false

Number.isFinite和Number.isNaN与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

```
isFinite(11) // true
isFinite("11") // true
Number.isFinite(11) // true
Number.isFinite("11") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(10) // false
复制代码
```

#### Number.parseInt(), Number.parseFloat()

> ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变,这样做的目的，是逐步减少全局性方法，使得语言逐步模块化

#### Number.isInteger()

> Number.isInteger()用来判断一个数值是否为整数；JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值；如果参数不是数值，Number.isInteger返回false；由于 JavaScript 数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位，如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

```
Number.isInteger(15) // true
Number.isInteger(15.1) // false
Number.isInteger(15.0) // true
Number.isInteger('10') // false
Number.isInteger(true) // false
// 超出精度范围会误判
Number.isInteger(5.0000000000000002) // true
复制代码
```

#### Math.trunc()

> Math.trunc方法用于去除一个数的小数部分，返回整数部分;对于非数值，Math.trunc内部使用Number方法将其先转为数值;对于空值和无法截取整数的值，返回NaN

```
Math.trunc(2.1) // 2
Math.trunc(-2.9) // -2
Math.trunc(-0.1254) // -0
Math.trunc('125.456') // 125
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
Math.trunc(NaN);      // NaN
Math.trunc('bar');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
复制代码
```

#### Math.cbrt()

> Math.cbrt方法用于计算一个数的立方根;对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值

```
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(8)  // 2
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
复制代码
```

#### Math.hypot()

> Math.hypot方法返回所有参数的平方和的平方根

```
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3); 
复制代码
```

有了这个api，我们算一个n维勾股定理是不是很方便了呢？

#### 指数运算符

> ES2016 新增了一个指数运算符（**）。这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。

```
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2  // 512
// => Math.pow(2, Math.pow(3,2))
复制代码
```

es6+还扩展了更多的数值api，感兴趣的可以自己去学习研究。

### 3. 数组的扩展

#### 扩展运算符

> 扩展运算符（spread）是三个点（...），将一个数组转为用逗号分隔的参数序列

应用：

1. 复制数组

```
const a1 = [1, 2];
const a2 = [...a1];
复制代码
```

1. 合并数组

```
const arr1 = ['1', '2'];
const arr2 = ['c', {a:1} ];

// ES6 的合并数组
[...arr1, ...arr2]
复制代码
```

注：这两种方法都是浅拷贝，使用的时候需要注意。

1. 将字符串转化为数组

使用扩展运算符能够正确识别四个字节的 Unicode 字符。凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

```
[...'xuxi']
// [ "x", "u", "x", "i" ]
复制代码
```

1. 实现了 Iterator 接口的对象

```
let nodeList = document.querySelectorAll('div');
let arr = [...nodeList];
复制代码
```

上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。

#### Array.from()

> Array.from方法用于将类对象转为真正的数组：类似数组的对象和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map）。

实际应用中我们更多的是将Array.from用于DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。

```
// NodeList对象
let nodeList = document.querySelectorAll('p')
let arr = Array.from(nodeList)

// arguments对象
function say() {
  let args = Array.from(arguments);
}
复制代码
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```
Array.from([1, 2, 4], (x) => x + 1)
// [2, 3, 5]
复制代码
```

#### Array.of()

> Array.of方法用于将一组值，转换为数组。Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

```
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(2) // [2]
Array.of(21, 2) // [21, 2]
复制代码
```

#### 数组实例的 copyWithin()

> 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

它接受三个参数:

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```
[11, 21, 31, 41, 51].copyWithin(0, 3)  // => [41, 51, 31, 41, 51]
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
复制代码
```

#### 数组实例的 find() 和 findIndex()

> 数组实例的find方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

```
// find
[1, 5, 8, 12].find(function(value, index, arr) {
  return value > 9;
}) // 12

// findIndex
[1, 5, 5, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 3

// 第二个参数
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
复制代码
```

#### 数组实例的 fill()

> fill方法使用给定值，填充一个数组。fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```
new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

// 填充引用类型
let arr = new Array(2).fill({name: "xuxi"});
arr[0].name = "xu";
arr
// [{name: "xu"}, {name: "xu"}]

let arr = new Array(2).fill([]);
arr[0].push(1);
arr
// [[1], [1]]
复制代码
```

#### 数组实例的 includes()

> Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值。该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```
[1, 4, 3].includes(3)     // true
[1, 2, 4].includes(3)     // false
[1, 5, NaN, 6].includes(NaN) // true
复制代码
```

#### 数组实例的 flat()，flatMap()

> flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。flatMap()方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。flatMap()只能展开一层数组。flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。

```
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

// 如果原数组有空位，flat()方法会跳过空位
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

// flatMap
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
复制代码
```

### 4. 函数的扩展

#### 函数参数的默认值

```
function say(name = 'xuxi') {
    alert(name)
}
复制代码
```

注意点：

- 参数变量是默认声明的，所以不能用let或const再次声明
- 使用参数默认值时，函数不能有同名参数
- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
- 参数如果传入undefined，将触发该参数等于默认值，null则没有这个效果。 关键点

#### 函数的 length 属性

> 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真；如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
// 参数不是尾参数
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
复制代码
```

#### 作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束，这个作用域就会消失。在不设置参数默认值时，是不会出现的。

#### 箭头函数

由于箭头函数的用法比较简单，我们来看看注意点：

- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

不适合场景：

```
// 定义对象的方法，且该方法内部包括this,
// 因为对象不构成单独的作用域，导致say箭头函数定义时的作用域就是全局作用域
const person = {
  year: 9,
  say: () => {
    this.year--
  }
}

// 需要动态this的时候，也不应使用箭头函数
// 代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this是全局对象
var btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  this.classList.add('on');
});
复制代码
```

### 5. 对象的扩展

#### 对象的扩展运算符

> 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中;等同于使用Object.assign()方法

```
let a = {w: 'xu', y: 'xi'}
let b = {name: '12'}
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
复制代码
```

#### Object.is()

> 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致;不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
复制代码
```

#### Object.assign()

> 用于对象的合并，将源对象的所有可枚举属性，复制到目标对象; 如果只有一个参数，Object.assign会直接返回该参数; 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错; 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```
// 合并对象
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 非对象和字符串的类型将忽略
const a1 = '123';
const a2 = true;
const a3 = 10;

const obj = Object.assign({}, a1, a2, a3);
console.log(obj); // { "0": "1", "1": "2", "2": "3" }
复制代码
```

注意点：

- Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
- 对于嵌套的对象，遇到同名属性，Object.assign的处理方法是替换，而不是添加
- Object.assign可以用来处理数组，但是会把数组视为对象

```
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
复制代码
```

- Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制

```
const a = {
  get num() { return 1 }
};
const target = {};

Object.assign(target, a)
// { num: 1 }
复制代码
```

应用场景：

- 为对象添加属性和方法
- 克隆/合并对象
- 为属性指定默认值

#### Object.keys()

> 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键名

#### Object.values()

> 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。注意：返回数组的成员顺序：如果属性名为数值的属性，是按照数值大小，从小到大遍历的

```
const obj = { 100: '1', 2: '2', 7: '3' };
Object.values(obj)
// ["2", "3", "1"]
复制代码
```

#### Object.entries()

> 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组;如果原对象的属性名是一个 Symbol 值，该属性会被忽略

```
const obj = { a: '1', b: 1, [Symbol()]: 123 };
Object.entries(obj)
// [ ["a", "1"], ["b", 1] ]
复制代码
```

#### Object.fromEntries()

> Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象

```
Object.fromEntries([
  ['a', '1'],
  ['b', 2]
])
// { a: "1", b: 2 }
复制代码
```

应用场景：

- 将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象
- 配合URLSearchParams对象，将查询字符串转为对象

```
Object.fromEntries(new URLSearchParams('name=xuxi&year=24'))
// { name: "xuxi", year: "24" }
复制代码
```

### 6. symbol

> ES6 引入了一种新的原始数据类型Symbol，表示唯一的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。Symbol 值通过Symbol函数生成。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

注意点：

- Symbol函数前不能使用new命令，否则会报错
- 由于 Symbol 值不是对象，所以不能添加属性。本质上，它是一种类似于字符串的数据类型
- Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，方便区分
- Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的
- Symbol 值不能与其他类型的值进行运算，会报错
- Symbol 值作为对象属性名时，不能用点运算符
- 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
- Symbol 值作为属性名时，该属性还是公开属性，不是私有属性
- Symbol 作为属性名时属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，使用Object.getOwnPropertySymbols方法可以获取指定对象的所有 Symbol 属性名。

#### Symbol.for()，Symbol.keyFor()

> Symbol.for()接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key

```
let a1 = Symbol.for('123');
let a2 = Symbol.for('123');

a1 === a2 // true

// Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
// 它们的区别是，前者会被登记在全局环境中供搜索，后者不会
Symbol.keyFor(a1) // "123"
let c2 = Symbol("f");
Symbol.keyFor(c2) // undefined
复制代码
```

### 7. set和map数据结构

#### set

> ES6提供了新的数据结构Set,类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成Set数据结构。

实例属性和方法：

- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

```
s.add(1).add(3).add(3);
// 注意3被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // false

s.delete(3);
s.has(3) // false
复制代码
```

遍历操作：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

Set的遍历顺序就是插入顺序，这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。

应用场景：

```
// 数组去重
let arr = [1，2，2，3];
let unique = [...new Set(arr)];
// or
function dedupe(array) {
  return Array.from(new Set(array));
}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
复制代码
```

#### map

> 类似于对象，也是键值对的集合，各种类型的值（包括对象）都可以当作键。Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。

实例属性和方法:

- size属性: 返回Map结构的成员总数
- set(key, value): set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键,set方法返回的是Map本身，因此可以采用链式写法
- get(key) : get方法读取key对应的键值，如果找不到key，返回undefined
- has(key) : has方法返回一个布尔值，表示某个键是否在Map数据结构中
- delete(key) : delete方法删除某个键，返回true。如果删除失败，返回false
- clear() : clear方法清除所有成员，没有返回值

遍历方法和set类似，Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）：

```
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
复制代码
```

数组转map：

```
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}
复制代码
```

Map转为对象:

```
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
复制代码
```

对象转为Map

```
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// [ [ 'yes', true ], [ 'no', false ] ]
复制代码
```

### 8. Proxy 和 Reflect

关于Proxy 和 Reflect的介绍，我会单独写个完整的模块来介绍及其应用。

### 9. promise对象

> Promise是异步编程的一种解决方案，简单说就是一个容器，里面保存着某个未来才会结束的事件的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

特点：

- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。整个过程不可逆。

使用：

- 基本用法

```
// 实现异步加载图片
function loadImageAsync(url) {
 return new Promise(function(resolve, reject) {
   var image = new Image();

   image.onload = function() {
     resolve(image);
   };

   image.onerror = function() {
     reject(new Error('图片加载失败'));
   };

   image.src = url;
 });
}
// 使用
loadImageAsync('http://xxxx/api').then((data) => {
   // some code
}).catch(err => console.log(err))
复制代码
```

resolve函数将Promise对象的状态从“未完成”变为“成功”，即Pending => Resolved，并将异步操作的结果作为参数传递出去；reject函数将Promise对象的状态从“未完成”变为“失败”，即Pending => Rejected，并将异步操作报出的错误作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

- Promise.all()

> Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。只有Promise.all内的所有promise状态都变成fulfilled，它的状态才会变成fulfilled，此时内部promise的返回值组成一个数组，传递给Promise.all的回调函数。只要Promise.all内部有一个promise被rejected，Promise.all的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

- Promise.race()

> Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。只要Promise.race中有一个实例率先改变状态，Promise.race的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给Promise.race的回调函数。

实现请求超时处理：

```
const ajaxWithTime = (url, ms) => Promise.race([
  fetch(url),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), ms)
  })
])
ajaxWithTime('http://xxx', 5000).then(response => console.log(response))
.catch(error => console.log(error))
复制代码
```

- Promise.resolve()

> 将现有对象转为Promise对象。如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例；如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved；需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

```
setTimeout(function () {
  console.log('3');
}, 0);

Promise.resolve().then(function () {
  console.log('2');
});

console.log('1');

// 1
// 2
// 3
复制代码
```

- finally()

> finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行

### 10. async函数

> async函数就是Generator函数的语法糖,async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。async函数的返回值是Promise对象，你可以用then方法指定下一步的操作。进一步说，async函数完全可以看作多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖。

应用案例：

1.指定时间后返回数据

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('xu xi', 5000);
复制代码
```

注意事项：

- await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
- 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发

```
let [a, b] = await Promise.all([a(), b()]);
复制代码
```

- await命令只能用在async函数之中，如果用在普通函数，就会报错

应用场景：

1. 按顺序完成异步操作

```
async function fetchInOrder(urls) {
  // 并发读取远程请求
  const promises = urls.map(async url => {
    const res = await fetch(url);
    return res.text();
  });

  // 按次序输出
  for (const promise of promises) {
    console.log(await promise);
  }
}
复制代码
```

### 11. class

> 通过class关键字，可以定义类。ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。类的数据类型就是function，类本身就指向构造函数。构造函数的prototype属性，在ES6的“类”上面继续存在。类的所有方法都定义在类的prototype属性上面。另外，类的内部所有定义的方法，都是不可枚举的.

```
class Person {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }
}

// 等同于

Person.prototype = {
  toString(){},
  toValue(){}
};

// 不可枚举
Object.keys(Person.prototype)
// []
Object.getOwnPropertyNames(Person.prototype)
// ["constructor","toString"]
// 注：ES5的写法，toString方法是可枚举的
复制代码
```

#### constructor方法

> 方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。constructor方法默认返回实例对象（this），可以指定返回另外一个对象

注：类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

#### 不存在变量提升

#### this的指向

> 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错

```
// 解决this指向问题
class Say {
  constructor() {
    // 在构造方法中绑定this或者使用箭头函数
    this.sayName = this.sayName.bind(this);
  }
}
复制代码
```

#### Class的继承

> Class之间可以通过extends关键字实现继承，子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，如果不调用super方法，子类就得不到this对象。

```
class Color extends Point {
  constructor(x, y, name) {
    super(x, y); // 调用父类的constructor(x, y)
    this.name = name;
  }

  toString() {
    return this.name + ' ' + super.toString(); // 调用父类的toString()
  }
}
复制代码
```

#### Class的取值函数（getter）和存值函数（setter）

> 与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```
class MyHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    console.log('success', value)
    this.element.innerHTML = value;
  }
}

const el = new MyHTMLElement(el);
el.html('1111')  // success 1111
复制代码
```

#### Class的静态方法

> 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```
class Hi {
  static say() {
    return 'hello';
  }
}

Hi.say() // 'hello'

let hi = new Hi();
hi.say()
// TypeError: foo.classMethod is not a function
复制代码
```

### 12. 修饰器Decorator

#### 类的修饰

> 修饰器是一个用来修改类的行为的函数。其对类的行为的改变，是代码编译时发生的，而不是在运行时。

```
function get(target) {
  target.get = 'GET';
}

@get
class MyHttpClass {}

console.log(MyHttpClass.get) // GET

// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数
function get(type) {
  return function(target) {
    target.type = type;
    // 添加实例属性
    target.prototype.isDev = true;
  }
}

@get('json')
class MyHttpClass {}
MyHttpClass.type // 'json'

let http = new MyHttpClass();
http.isDev // true
复制代码
```

#### 方法的修饰

> 修饰器不仅可以修饰类，还可以修饰类的属性,修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

修饰类的属性时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

```
// 下面的@log修饰器，可以起到输出日志的作用
class Kinds {
  list = []
  @log
  add(name) {
    return this.list.push(name)
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;
  console.log('old', oldValue);
  // ...
  return descriptor;
}

const dog = new Kinds();

dog.add('dog');

// 多个装饰器的洋葱式执行顺序
function printN(id){
    console.log('print-0', id);
    return (target, property, descriptor) => console.log('print-1', id);
}

class A {
    @printN(1)
    @printN(2)
    say(){}
}
// print-0 1
// print-0 2
// print-1 2
// print-1 1
复制代码
```

### 13. module

> 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

#### export

如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量

```
// lib.js
// 直接导出
export var name = 'xu xi';

// 优先考虑下面这种写法,更清晰优雅
var year = 1958;
export {year};

//导出函数
export function multiply(x, y) {
  return x * y;
};

// 使用as关键字重命名
export {
  year as y
};

// 注意：export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
var a = 1;
// 报错，因为通过变量a，直接输出的是1，1只是一个值，不是接口
export a;
// 同理，下面的也会报错
function f() {}
export f;

// 另外，export语句输出的接口，与其对应的值是动态绑定关系，
// 即通过该接口，可以取到模块内部实时的值
export var a = 1;
setTimeout(() => a = 2, 1000);  // 1s之后a变为2
复制代码
```

export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。

#### import

> 使用export命令定义了模块的对外接口后，其他 JS 文件就可以通过import命令加载这个模块。import命令具有提升效果，会提升到整个模块的头部，首先执行。是因为import命令是编译阶段执行的，在代码运行之前。如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次

```
// main.js
import {other, year} from './lib';
// 将输入的变量重命名
import { year as y } from './lib';

// 提升
say()
import { say } from './lib';

// 整体加载模块
import * as lib from './lib';
console.log(lib.year, lib.say())
复制代码
```

#### export default 命令

> 为模块指定默认输出

```
// a.js
export default function () {
  console.log('xu xi');
}

// b.js
import a from './a'
```


