---
title: mapGetters & mapActions
date: 2020-11-09
categories:
 - 前端
tags:
- vue
---


## mapGetters 
### 介绍
`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
### 用法

- 导入 `mapGetters` 
- `computed` 中使用 `...mapGetters(["xxx1", "xxx2"])` 
- xxx1 和 xxx2 是 vuex 中对应的 `getters` 
```javascript
<template>
  <div>{{cartList}} - {{cartLength}}</div>
</template>

import { mapGetters } from "vuex";

computed: {
    ...mapGetters(["cartList", "cartLength"]),
    xxxx
}
```
也可以给 getters 起别名：
```javascript
<template>
  <div>{{cl}} - {{cLen}}</div>
</template>

import { mapGetters } from "vuex";

computed: {
    ...mapGetters({
    	cl:"cartList",
      cLen:"cartLength"
    }),
    xxxx
}
```
## mapActions
### 介绍
你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）
### 用法

- `...mapActions` 写在 methods 里
- 也支持别名
- 使用的时候注意根据 actions 接收 payload 方式不同两种写法 （是否解构）
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    
    // 使用时
    someMethod(){
      let obj = {id:1}
      // 没有 payload
    	this.incrementBy().then(res => {xxx})
      // 需要 payload，根据接收方式两种写法
      // actions 里接收：payload.id
      this.incrementBy(obj).then(res => {xxx})
      // actions 里接收：payload.obj.id
      this.incrementBy({obj}).then(res => {xxx})
    }
  }
}
```
### 补充：Actions 的两种分发方式（同mutation）
Actions 支持同样的载荷方式和对象方式进行分发：
```javascript
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})
// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
