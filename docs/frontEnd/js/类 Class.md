---
title: 类 Class
date: 2020-11-30
categories:
 - 前端
tags:
- js
- ES6
---

## 基本语法
```javascript
class MyClass {
  prop = value; // 属性

  constructor(...) { // 构造器
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}

let xx = new MyClass(...)
```
## 继承 extends
### 基本语法
```javascript
class Animal{
	constructor(name){
  	this.name=name
  }
}

class Rabbit extends Animal{
	say(){
		alert(`my name is ${this.name}`)
	}
}

let r1 = new Rabbit("r1")
r1.say() // my name is r1
```
### super 关键字
`super` 关键字可以做两件事：

- `super.method(...)` 可以调用父类的方法
```javascript
class Animal {
  constructor(name) {
    this.name = name
  }

  run() {
    alert(`${this.name} run!`)
  }
}

class Rabbit extends Animal {
  say() {
    alert(`my name is ${this.name}`)
  }

  laterRun() {
    // 调用父类的方法run(),箭头函数中可以正常调用super
    setTimeout(() => super.run(), 1000)
  }

}

let r1 = new Rabbit("r1")
r1.laterRun() // 1s后 "r1 run!"
```

- `super(...)` 可以调用父类的 constructor

刚才我们继承后的类，都没有自己的 `constructor` ，如果我们不写集成类自己的 `constructor` ，其实他自己会生成一个这样的空构造器：
```javascript
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}
```
 **注意：继承类的 constructor 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。**
```javascript
class Animal {
  constructor(name) {
    this.name = name
  }

  run() {
    alert(`${this.name} run!`)
  }
}

class Rabbit extends Animal {
  constructor(name,age){
  	super(name)
    this.age = age
  }
  	
  sayInfo(){
		alert(`${this.name}'s age is ${this.age}`)
	}

}

let r1 = new Rabbit("r1",18)
r1.sayInfo() // r1's age is 18
```
### 重写
```javascript
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
```
这里 Rabbit 直接在自己的类里定义了自己的 name，但是 `new Rabbit` 还是打印 `animal` ，显然不是我们想要的结果<br />再看看下面这个：
```javascript
class Animal {
  showName() {  // 而不是 this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // 而不是 alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
new Rabbit(); // rabbit
```
重写的 `showName` 方法却按照我们预想的结果正确执行了，这是为什么？<br />
<br />**实际上，原因在于字段初始化的顺序。类字段是这样初始化的：**

- 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
- 对于派生类，在 `super()` 后立刻初始化。


<br />接下来我标注一下两个情况下 `new Rabbit()` 的执行顺序：

- 字段重写
```javascript
class Animal {
  name = 'animal'; // {3} 对于基类（还未继承任何东西的那种），在构造函数调用前初始化

  constructor() {
    // {4} 对于派生类，在 super() 后立刻初始化。this 虽然是 Rabbit ，但是此时 Rabbit 的 name 还是从父类继承来的 "animal"
    alert(this.name); 
  }
}

class Rabbit extends Animal { // {2}
  name = 'rabbit'; // {5} 这个是会执行的
}

new Rabbit(); // animal  // {1}
```

- 方法重写
```javascript
class Animal {
  showName() {  // 方法不是字段，不会在 constructor 之前被初始化，在这个情况下更不会被执行
    alert('animal');
  }

  constructor() {
    this.showName(); // 而不是 alert(this.name); // {3}
  }
}

class Rabbit extends Animal { // {2}
  showName() {
    alert('rabbit'); // {4}
  }
}

new Rabbit(); // rabbit // {1}
```
### [[HomeObject]] 
为了提供解决方法，JavaScript 为函数添加了一个特殊的内部属性：`[[HomeObject]]`。<br />当一个函数被定义为类或者对象方法时，它的 `[[HomeObject]]` 属性就成为了该对象。<br />然后 `super` 使用它来解析（resolve）父原型及其方法。<br />

```javascript
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};
```
**将一个带有 `super` 的方法从一个对象复制到另一个对象是不安全的 而 `[[HomeObject]]` 是仅仅被作用于 `super` 对象的。**<br />**
```javascript
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit 继承自 animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi(); // [[HomeObject]] 是 rabbit
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree 继承自 plant
let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi // (*) 它的 [[HomeObject]] 是 rabbit，因为它是在 rabbit 中创建的。所以 super 找的对象还是 animal
};

tree.sayHi();  // I'm an animal 
```
### 继承于 Function 还是 Object？

- 我们一般声明 `class Rabbit` 的时候， `Rabbit.__proto__ === Function.prototype` 
- 但是声明 `class Rabbit extends Object` 的时候，首先我们需要在 `constructor` 里调用 `super()` 其次 `Rabbit.__proto__ === Object` 


<br />这个会影响到我们是否能使用一些 Function 的内在方法，了解就好
## 静态 static
### 概念
我们可以把一个方法赋值给类的函数本身，而不是赋给它的 `"prototype"`。这样的方法被称为 **静态的（static）**。<br />**设置为静态的属性或者方法是可被继承的，他们是类本身的，而不是给实例用的。**<br />

### 静态属性
```javascript
class Article {
  static publisher = "AA";
}

alert( Article.publisher ); // AA

// 相当于
Article.publisher = "AA";
```
### 静态方法
```javascript
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date());
  }
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```
我们经常使用的 `Object.xxx()` 也就是 `Object` 类里的静态方法
## 私有和受保护的属性和方法
### 约定上的受保护写法 "_xxx"
**受保护的属性通常以下划线 `_` 作为前缀。**<br />这不是在语言级别强制实施的，但是程序员之间有一个众所周知的约定，即不应该从外部访问此类型的属性和方法。<br />所以我们的属性将被命名为 `_waterAmount`：
```javascript
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加水
coffeeMachine.waterAmount = -10; // Error: Negative water
```
### 语法上的私有 "#xxx"
这儿有一个马上就会被加到规范中的已完成的 Javascript 提案（实际上chrome等一些浏览器已经可以识别），它为私有属性和方法提供语言级支持。<br />私有属性和方法应该以 `#` 开头。它们只在类的内部可被访问。
```javascript
class CoffeeMachine {
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }

}

let coffeeMachine = new CoffeeMachine();

// 不能从类的外部访问类的私有属性和方法
coffeeMachine.#checkWater(); // SyntaxError: Private field '#checkWater' must be declared in an enclosing class
coffeeMachine.#waterLimit = 1000; // SyntaxError: Private field '#waterLimit' must be declared in an enclosing class
```
但是注意， `#xxx` 的属性和方法，被继承的 `class` 并不能直接访问他们，想要访问的话，只能去访问 get 或者 set 方法。<br />所以规定下还是比较建议使用第一种写法。
## 类的检查[扩展类型判断]
### instanceof 用法
```javascript
obj instanceof Class
```
如果 `obj` 隶属于 `Class` 类（或 `Class` 类的衍生类），则返回 `true`。
```javascript
class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit class 的对象吗？
alert( rabbit instanceof Rabbit ); // true
```
### Symbol.hasInstance
`obj instanceof Class` 算法的执行过程大致如下：

1. 如果 `Class` 有静态方法 `Symbol.hasInstance`，那就直接调用这个方法
```javascript
// 设置 instanceOf 检查
// 并假设具有 canEat 属性的都是 animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };

alert(obj instanceof Animal); // true：Animal[Symbol.hasInstance](obj) 被调用
```

2. 没有的话就按照原型链上去查找



> 这里还要提到一个方法 [objA.isPrototypeOf(objB)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/object/isPrototypeOf)，如果 `objA` 处在 `objB` 的原型链中，则返回 `true`。

### Object.prototype.toString(...)

- 对于 number 类型，结果是 `[object Number]`
- 对于 boolean 类型，结果是 `[object Boolean]`
- 对于 `null`：`[object Null]`
- 对于 `undefined`：`[object Undefined]`
- 对于数组：`[object Array]`


<br />

