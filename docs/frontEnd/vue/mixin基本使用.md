---
title: mixin(混入)基本使用
date: 2020-11-09
categories:
 - 前端
tags:
- vue
---

## 类型
`Array<Object>`
## 详细
`mixins` 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 `Vue.extend()` 一样的选项合并逻辑。也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。<br />Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
## 使用
```javascript
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
```
## 注意
mixin可以混入生命周期函数，data，components，methods等，混入后会叠加进实际组件里，但是methods里的函数如果重名，则会被覆盖
