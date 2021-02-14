---
title: 初探vue3
date: 2021-02-14
categories:
 - 前端
tags:
- vue
---

## 一、Composition Api
### 1.1 setup
`setup` 选项应该是一个接受 `props` 和 `context` 的函数。此外，我们从 `setup` **返回**的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。<br />传递给 setup 函数的第二个参数是 `context` 。 `context` 是一个普通的 JavaScript 对象，它暴露三个组件的 `property` 
```javascript
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props, ctx) {
    console.log(props) // { user: '' }
    
    // Attribute (非响应式对象)
    console.log(context.attrs)

    // 插槽 (非响应式对象)
    console.log(context.slots)

    // 触发事件 (方法)
    console.log(context.emit)

    return {} // 这里返回的任何内容都可以用于组件的其余部分
  }
  // 组件的“其余部分”
}
```
### 1.2 ref
通过 `ref` 定义一个值类型的变量 ，可以使其成为响应式。<br />获取 ref 的值，或者修改值时，使用 `xxx.value` 
```javascript
import { ref } from 'vue'
const counter = ref(0)
console.log(counter) // 0
counter.value = 1
console.log(counter) // 1
```
### 1.3 reactive
返回引用类型的响应式副本，如数组或对象
```javascript
import { reactive } from 'vue'
const data = reactive({
	name:"jck",
  age:18
})
// data 整个对象就是响应式的了
```
### 1.4 toRef/toRefs

- **toRef**

可以用来为源响应式对象上的 property 性创建一个 `ref` 。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
```javascript
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

- **toRefs**

将**响应式对象**转换为**普通对象**，其中结果对象的每个 property 都是指向原始对象相应 property 的 `ref` 。
```javascript
import { reactive, toRefs } from 'vue'
const data = reactive({
	name:"jck",
  age:18
})
const { name,age } = toRefs(data)
```
### 1.5 computed
使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。
```javascript
const count = ref(0)
const doubleCount = computed(() => { count.value * 2 })
```
也可以使用 `get` 和 `set` 函数
```javascript
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```
### 1.6 watch
使用导入的 `watch` 函数，他接受三个参数

- 一个响应式引用或我们想要侦听的 getter 函数
- 一个回调
- 可选的配置选项
```javascript
import { ref, watch } from 'vue'

let count = ref(0)
watch(count,(newValue, oldValue) => {
	xxxxx
})
```
注意！上述例子中 `count` 是 ref 的，否则的话需要传入一个 getter 函数
```javascript
watch(() =>{xxx.count},(newValue, oldValue) => {
	xxxxx
})
```
### 1.7 生命周期钩子
Setup 执行的阶段是围绕 `beforeCreate` 和 `created` 和进行的，所以原本在这两个生<br />命周期中做的事情都能够放在 Setup 中处理。<br />其他的生命周期函数 在 setup 里使用 `onXxx` 的形式调用，可以反复使用
> - destroyed 生命周期选项被重命名为 unmounted
> - beforeDestroy 生命周期选项被重命名为 beforeUnmount

```javascript
setup(){
  onMounted(() => {
    timer = setInterval(() => {
      // console.log("onMounted", data.counter);
      counter.value++;
    }, 1000);
  });

  onUnmounted(() => {
    // alert("onUnmounted");
    clearInterval(timer);
  });
}
```
## 二、Teleport
[Teleport](https://vue3js.cn/docs/zh/guide/teleport.html#teleport) 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。<br />他具有一个 Vue 为我们封装好的组件 `<teleport>` <br />

- 使用：

`<teleport to="body">` 中的 body 是一个 **CSS 选择器**，用来指定“Teleport 这个 HTML 到该‘body’标签”。<br />**ModalButton.vue**
```vue
<template>
  <div>
    <button @click="modalflag = true">弹出模态窗口</button>

    <!-- to:选择器 -->
    <teleport to="body">
      <div v-if="modalflag" class="model">
        <div>
          这里是一个弹窗
          <button @click="close">click close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ModalButton",
  setup() {
    let modalflag = ref(false);

    const close = () => {
      modalflag.value = false;
    };

    return { modalflag, close };
  },
};
</script>

<style scoped>
.model {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(126, 126, 126, .5);
}

.model div {
	position: fixed;
	left: 50%;
	top: 50%;
	width: 200px;
	height: 200px;
	background-color: #eee;
	line-height: 200px;
	transform: translate(-50%, -50%);
}
</style>
```
## 三、多根结点
在 2.x 中我们必须在每个 `<template>` 中设置一个根节点，而在 3.x 中，不再需要这样做了
## 四、emit 自定义事件
`emit` 选项可以将需要自定义发射出去的事件进行收集，可以让我们在 `$emit()` 的时候有更好的代码补全，**而且如果 emit 的事件名是一个原生事件 ，如 `click` ，那么在上层组件触发自定义事件的时候会触发两次。**

**用法：**

1. 数组
```javascript
<template>
  <div @click="$emit('click')">自定义事件</div>
</template>

<script>
export default {
  name: "Emits",
  emits: ["click"],
  setup() {
    return {};
  },
};
</script>
```

2. 对象

对象的用法可以对自定义事件做一些判断，用来判断是否需要发射这个事件，参见[官方实例](https://vue3js.cn/docs/zh/guide/component-custom-events.html#%E9%AA%8C%E8%AF%81%E6%8A%9B%E5%87%BA%E7%9A%84%E4%BA%8B%E4%BB%B6)
```javascript
app.component('custom-form', {
  emits: {
    // 没有验证
    click: null,

    // 验证submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email, password })
    }
  }
})
```
## 五、全局 API 调整
### 全局 API 转移到 实例 API（app）
调用 createApp 返回一个应用实例，这是 Vue 3 中的新概念：
```javascript
import { createApp } from 'vue'
const app = createApp({})
```

<br />应用实例暴露当前全局 API 的子集，经验法则是，任何全局改变 Vue 行为的 API 现在都会移动到应用实例 app 上，而不再是使用 `Vue.use` 这种形式，以下是当前全局 API 及其相应实例 API 的表：<br />


| **2.x 全局 API** | **3.x 实例 API (app)** |
| --- | --- |
| Vue.config | app.config |
| Vue.config.productionTip | removed |
| Vue.config.ignoredElements | app.config.isCustomElement  |
| Vue.component | app.component |
| Vue.directive | app.directive |
| Vue.mixin | app.mixin |
| Vue.use | app.use |



### Treeshaking 影响
另外在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问。<br />比如 2.x 中
```javascript
import Vue from 'vue'

Vue.nextTick(() => {
  // 一些和DOM有关的东西
})
```
现在应该是
```javascript
import { nextTick } from 'vue'

nextTick(() => {
  // 一些和DOM有关的东西
})
```
**受影响的 API：**<br />Vue 2.x 中的这些全局 API 受此更改的影响：

- Vue.nextTick
- Vue.observable (用 Vue.reactive 替换)
- Vue.version
- Vue.compile (仅全构建)
- Vue.set (仅兼容构建)
- Vue.delete (仅兼容构建)
## 组件上的 v-model
### 2.x 中的使用
在 2.x 中，在组件上使用 `v-mode` 相当于绑定 `value` prop 和 `input` 事件：
```vue
<ChildComponent v-model="pageTitle" />

<!-- 简写: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```
如果不使用默认的 `value` 和 `input` ，需要在子组件加上 `model` 选项：
```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```
```javascript
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // 这将允许 `value` 属性用于其他用途
    value: String,
    // 使用 `title` 代替 `value` 作为 model 的 prop
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```
实际上就是
```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```
#### v-bind.sync
在需要绑定指定 prop 和 event 的时候，除了使用上面的 model 选项，官方还**推荐使用**`update:myPropName` 抛出事件。<br />例如，对于在上一个示例中带有 `title` prop 的 ChildComponent，我们可以通过下面的方式将分配新 `value` 的意图传达给父级：
```javascript
this.$emit("update:title", newVal)
```
如果需要的话，父级可以监听该事件并更新本地 data property。例如：
```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

<br />为了方便起见，我们可以使用 `.sync` 修饰符来缩写，如下所示：
```html
<ChildComponent :title.sync="pageTitle" />
```
### [3.x 中的使用](https://vue3js.cn/docs/zh/guide/migration/v-model.html#v-model)

- **非兼容**：用于自定义组件时，`v-model`prop 和事件默认名称已更改：
   - prop：`value` -> `modelValue`；
   - event：`input` -> `update:modelValue`；
- **非兼容**：`v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除，可用 `v-model` 作为代替；
- **新增**：现在可以在同一个组件上使用多个 `v-model` 进行双向绑定；
- **新增**：现在可以自定义 `v-model` 修饰符


<br />**Vmodel.vue**
```vue
<template>
  <div>
    <p>str1:<input type="text" :value="str1" @input="str1use" /></p>
    <p>str2:<input type="text" :value="str2" @input="str2use" /></p>
  </div>
</template>

<script>
export default {
  name: "Vmodel",
  // 接收父组件的值在 input 框的 value 中绑定
  props: {
    str1: String,
    str2: String,
  },
  setup(props, ctx) {
    // 发射事件，更新 str1 的值,值为 当前输入框的值
    // 注意 ctx 暴露 emit 方法可以使用，代替 2.x 的 this.$emit
    const str1use = (e) => {
      ctx.emit("update:str1", e.target.value);
    };
    const str2use = (e) => {
      ctx.emit("update:str2", e.target.value);
    };
    return { str1use, str2use };
  },
};
</script>
```
Parent.vue
```vue
<template>
  <!-- v-model -->
  <p>{{ strOne }}</p>
  <p>{{ strTwo }}</p>
	<!-- 绑定str1和str2 -->
  <Vmodel v-model:str1="strOne" v-model:str2="strTwo"></Vmodel>
</template>

<script>
import { ref } from "vue";
import Vmodel from "./Vmodel.vue";

export default {
  name: "Parent",
  components: {
    Vmodel,
  },
  setup() {
    const strOne = ref("str1");
    const strTwo = ref("str2");
    return { strOne, strTwo };
  },
};
</script>
```
## v-bind 的绑定顺序会影响渲染结果
在 3.x，如果一个元素同时定义了 `v-bind="object"` 和一个相同的单独的 property，那么声明绑定的顺序决定了它们如何合并。换句话说，相对于假设开发者总是希望单独的 property 覆盖 object 中定义的内容，现在开发者对自己所希望的合并行为有了更好的控制。
```html
!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```
## 函数式组件变化
首先声明，3.x 中函数式组件性能提升几乎没有，官方也不是很推荐使用<br />[https://vue3js.cn/docs/zh/guide/migration/functional-components.html](https://vue3js.cn/docs/zh/guide/migration/functional-components.html)
## data 始终返回函数
在v3版本中将data的返回值进行了标准化，只接受返回 Object 的 Function, 而在v2版本中同时支持返回 Object 和返回 Object 的 Function。
## mixin 中对象是覆盖不是合并
当合并来自 `mixin` 或 `extend` 的多个 data 返回值时，现在是**浅层次合并的而不是深层次合并的(只合并根级属性)**。
```javascript
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}
const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}

// 生成结果中user整个被覆盖
{
  user: {
    id: 2
  }
}
```
## 过渡用类名修改
过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`<br />详见[官方文档](https://vue3js.cn/docs/zh/guide/transitions-overview.html#%E8%BF%87%E6%B8%A1-%E5%8A%A8%E7%94%BB%E6%A6%82%E8%BF%B0)
## on，​off 和 once 实例方法已被移除

事件总线被没法像原来那样使用了，官方推荐使用 [mitt](https://github.com/developit/mitt)
## 过滤器删除
filters 没有了，官方推荐使用方法函数或者计算属性。

