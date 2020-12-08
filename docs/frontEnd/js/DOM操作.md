---
title: DOM操作
date: 2020-12-06
categories:
 - 前端
tags:
- js
---

## 遍历 DOM⭐
### 获取节点

- 所有子节点： `ele.childNodes` ，**返回值**是一个可迭代对象，不是数组
- 第一个子节点： `ele.firstChild`
- 最后一个子节点： `ele.lastChild` 
- 是否有子节点： `ele.hasChildNodes`  
- 下一个兄弟节点： `ele.nextSibling` 
- 上一个兄弟节点： `ele.previousSibling` 
- 父节点： `ele.parentNode` 


<br />**注意：节点是包括注释、文本(document等)等等都涵盖在内的。**<br /><br />如果我们只是单纯的关心操纵的是代表标签的和形成页面结构的**元素节点**，那么使用下面的方法：
### 获取纯元素节点
<br /><img src="https://gitee.com/rodrick278/img/raw/master/img/1607085786459-87464766-38d3-4007-b624-f2fdb8a8dcb3.png" alt="image.png" style="zoom:50%;" /><br />这些链接和我们在上面提到过的类似，只是在词中间加了 `Element`：

- `children` — 仅那些作为元素节点的子代的节点。
- `firstElementChild`，`lastElementChild` — 第一个和最后一个子元素。
- `previousElementSibling`，`nextElementSibling` — 兄弟元素。
- `parentElement` — 父元素。



### 表格
> 表格的 `<table>` 标签的下一层一定是 `<tbody>` ，即使你的 html 里没写，dom 也会在加载的时候加上去，所以 `table.firstElementChild == <tbody>` 


<br />`<table>` 元素支持 (除了上面给出的，之外) 以下这些属性:

- `table.rows` — `<tr>` 元素的集合。
- `table.caption/tHead/tFoot` — 引用元素 `<caption>`，`<thead>`，`<tfoot>`。
- `table.tBodies` — `<tbody>` 元素的集合（根据标准还有很多元素，但是这里至少会有一个 — 即使没有被写在 HTML 源文件中，浏览器也会将其放入 DOM 中）。


<br />`<thead>`，`<tfoot>`，`<tbody>` 元素提供了 `rows` 属性：

- `tbody.rows` — 表格内部 `<tr>` 元素的集合。


<br />`<tr>`：

- `tr.cells` — 在给定 `<tr>` 中的 `<td>` 和 `<th>` 单元格的集合。
- `tr.sectionRowIndex` — 给定的 `<tr>` 在封闭的 `<thead>/<tbody>/<tfoot>` 中的位置（索引）。
- `tr.rowIndex` — 在整个表格中 `<tr>` 的编号（包括表格的所有行）。


<br />`<td>` 和 `<th>`：

- `td.cellIndex` — 在封闭的 `<tr>` 中单元格的编号。
## 查询搜索节点⭐
### 用法

- **ele.querySelectorAll(css)** ：返回一个满足 css 选择器的所有节点的可迭代对象
- **ele.querySelector(css)** ：返回满足 css 选择器的**第一个元素节点**
- **ele.matches(css)** ：检查 ele 是否与给定的 css 选择器匹配，**返回 bool**
- **ele.closest(css)** ：搜索距离 ele 最近的 **（包括 ele 本身）** 父级链上的**第一个匹配 css 选择器的**元素

### 补充：css 选择器

| 选择器 | 例子 | 例子描述 | CSS |
| :--- | :--- | :--- | :--- |
| [._class_](https://www.w3school.com.cn/cssref/selector_class.asp) | .intro | 选择 class="intro" 的所有元素。 | 1 |
| [#_id_](https://www.w3school.com.cn/cssref/selector_id.asp) | #firstname | 选择 id="firstname" 的所有元素。 | 1 |
| [*](https://www.w3school.com.cn/cssref/selector_all.asp) | * | 选择所有元素。 | 2 |
| [_element_](https://www.w3school.com.cn/cssref/selector_element.asp) | p | 选择所有 <p> 元素。 | 1 |
| [_element_,_element_](https://www.w3school.com.cn/cssref/selector_element_comma.asp) | div,p | 选择所有 <div> 元素和所有 <p> 元素。 | 1 |
| [_element_ _element_](https://www.w3school.com.cn/cssref/selector_element_element.asp) | div p | 选择 <div> 元素内部的所有 <p> 元素。 | 1 |
| [_element_>_element_](https://www.w3school.com.cn/cssref/selector_element_gt.asp) | div>p | 选择父元素为 <div> 元素的所有 <p> 元素。 | 2 |
| [_element_+_element_](https://www.w3school.com.cn/cssref/selector_element_plus.asp) | div+p | 选择紧接在 <div> 元素之后的所有 <p> 元素。 | 2 |
| [[_attribute_]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | [target] | 选择带有 target 属性所有元素。 | 2 |
| [[_attribute_=_value_]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | [target=_blank] | 选择 target="_blank" 的所有元素。 | 2 |
| [[_attribute_~=_value_]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素。 | 2 |
| [[_attribute_\|=_value_]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | [lang&#124;=en] | 选择 lang 属性值以 "en" 开头的所有元素。 | 2 |
| [:link](https://www.w3school.com.cn/cssref/selector_link.asp) | a:link | 选择所有未被访问的链接。 | 1 |
| [:visited](https://www.w3school.com.cn/cssref/selector_visited.asp) | a:visited | 选择所有已被访问的链接。 | 1 |
| [:active](https://www.w3school.com.cn/cssref/selector_active.asp) | a:active | 选择活动链接。 | 1 |
| [:hover](https://www.w3school.com.cn/cssref/selector_hover.asp) | a:hover | 选择鼠标指针位于其上的链接。 | 1 |
| [:focus](https://www.w3school.com.cn/cssref/selector_focus.asp) | input:focus | 选择获得焦点的 input 元素。 | 2 |
| [:first-letter](https://www.w3school.com.cn/cssref/selector_first-letter.asp) | p:first-letter | 选择每个 <p> 元素的首字母。 | 1 |
| [:first-line](https://www.w3school.com.cn/cssref/selector_first-line.asp) | p:first-line | 选择每个 <p> 元素的首行。 | 1 |
| [:first-child](https://www.w3school.com.cn/cssref/selector_first-child.asp) | p:first-child | 选择属于父元素的第一个子元素的每个 <p> 元素。 | 2 |
| [:before](https://www.w3school.com.cn/cssref/selector_before.asp) | p:before | 在每个 <p> 元素的内容之前插入内容。 | 2 |
| [:after](https://www.w3school.com.cn/cssref/selector_after.asp) | p:after | 在每个 <p> 元素的内容之后插入内容。 | 2 |
| [:lang(_language_)](https://www.w3school.com.cn/cssref/selector_lang.asp) | p:lang(it) | 选择带有以 "it" 开头的 lang 属性值的每个 <p> 元素。 | 2 |
| [_element1_~_element2_](https://www.w3school.com.cn/cssref/selector_gen_sibling.asp) | p~ul | 选择前面有 <p> 元素的每个 <ul> 元素。 | 3 |
| [[_attribute_^=_value_]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | a[src^="https"] | 选择其 src 属性值以 "https" 开头的每个 <a> 元素。 | 3 |
| [[_attribute_$=_value_]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | a[src$=".pdf"] | 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。 | 3 |
| [[_attribute_*=_value_]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | a[src*="abc"] | 选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。 | 3 |
| [:first-of-type](https://www.w3school.com.cn/cssref/selector_first-of-type.asp) | p:first-of-type | 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。 | 3 |
| [:last-of-type](https://www.w3school.com.cn/cssref/selector_last-of-type.asp) | p:last-of-type | 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。 | 3 |
| [:only-of-type](https://www.w3school.com.cn/cssref/selector_only-of-type.asp) | p:only-of-type | 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。 | 3 |
| [:only-child](https://www.w3school.com.cn/cssref/selector_only-child.asp) | p:only-child | 选择属于其父元素的唯一子元素的每个 <p> 元素。 | 3 |
| [:nth-child(_n_)](https://www.w3school.com.cn/cssref/selector_nth-child.asp) | p:nth-child(2) | 选择属于其父元素的第二个子元素的每个 <p> 元素。 | 3 |
| [:nth-last-child(_n_)](https://www.w3school.com.cn/cssref/selector_nth-last-child.asp) | p:nth-last-child(2) | 同上，从最后一个子元素开始计数。 | 3 |
| [:nth-of-type(_n_)](https://www.w3school.com.cn/cssref/selector_nth-of-type.asp) | p:nth-of-type(2) | 选择属于其父元素第二个 <p> 元素的每个 <p> 元素。 | 3 |
| [:nth-last-of-type(_n_)](https://www.w3school.com.cn/cssref/selector_nth-last-of-type.asp) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数。 | 3 |
| [:last-child](https://www.w3school.com.cn/cssref/selector_last-child.asp) | p:last-child | 选择属于其父元素最后一个子元素每个 <p> 元素。 | 3 |
| [:root](https://www.w3school.com.cn/cssref/selector_root.asp) | :root | 选择文档的根元素。 | 3 |
| [:empty](https://www.w3school.com.cn/cssref/selector_empty.asp) | p:empty | 选择没有子元素的每个 <p> 元素（包括文本节点）。 | 3 |
| [:target](https://www.w3school.com.cn/cssref/selector_target.asp) | #news:target | 选择当前活动的 #news 元素。 | 3 |
| [:enabled](https://www.w3school.com.cn/cssref/selector_enabled.asp) | input:enabled | 选择每个启用的 <input> 元素。 | 3 |
| [:disabled](https://www.w3school.com.cn/cssref/selector_disabled.asp) | input:disabled | 选择每个禁用的 <input> 元素 | 3 |
| [:checked](https://www.w3school.com.cn/cssref/selector_checked.asp) | input:checked | 选择每个被选中的 <input> 元素。 | 3 |
| [:not(_selector_)](https://www.w3school.com.cn/cssref/selector_not.asp) | :not(p) | 选择非 <p> 元素的每个元素。 | 3 |
| [::selection](https://www.w3school.com.cn/cssref/selector_selection.asp) | ::selection | 选择被用户选取的元素部分。 | 3 |

## 节点属性
### nodeType
在一开始我们知道有元素节点和文本节点等不同的节点，我们可以通过 `nodeType` 属性来区分或用作筛选

- 元素节点：ele.nodeType == 1
- 文本节点：ele.nodeType == 3
- document：ele.nodeType == 9
- 其他值参见 [规范](https://dom.spec.whatwg.org/#node) 
### 标签名

- `ele.nodeName` ：**用于任意节点**
- `ele.tagName` ：**仅用于元素节点**。文本节点等会返回 `undefined` 

注意：**元素节点的名字始终是大写**，比如： `BODY  DIV` ，而其他如文本元素返回值是： `#comment  #document` <br />
## 获取与修改节点值⭐
### innerHTML 和 outerHTML
**取值**

- `innerHTML` ：获取**节点元素**标签内部 html
- `outerHTML` ：获取**节点元素**完整 html
```html
<html>
<body>
<div><p>Hello, world!</p></div>

<script>
  let div = document.querySelector('div');
  console.log(div.innerHTML) // <p>Hello, world!</p>
  console.log(div.outerHTML) // <div><p>Hello, world!</p></div>
</script>
</body>
</html>
```
**设值** 

- `ele.innerHTML = "xxx"` 会替换 `ele` 内本身的内容
- `ele.innerHTML += "<p>fwf</p>"` 会增加上 `p` 元素，而 `ele.innerHTML.append("<p>fwf</p>")` 只会添加一个 "\<p>fwf\</p>" 的文本节点在 HTML 里 
- `ele.outerHTML = "xxx"` 会把原 dom（ele） 整个替换成新 dom（假设是 eleNew），但是 `ele.outerHTML` 的值还是原来的值，因为他指向原 dom ，而不是我们新的 `eleNew` ，举个例子：
```html
<html>
<body>
<div><p>Hello, world!</p></div>

<script>
  let pElem = document.querySelector('p');
  console.log(pElem.outerHTML) // <p>Hello, world!</p>
  pElem.outerHTML = "<span>i'm new element</span>" // 此时画面上变成了 i'm new element
  
  console.log(pElem.outerHTML) // <p>Hello, world!</p> [这里 pEle 还是指向 p 元素，尽管 p 元素已经没有了，但是值还在]
  console.log(document.querySelector('span').outerHTML) // <span>i'm new element</span>
</script>
</body>
</html>

```
### textContent
上面的 `innerHTML`  假设执行 `ele.innerHTML = "<p>text</p>"` ，此时会写入一个 `p` 的元素节点进 HTML ，如果我们想把他作为一整个**纯文本写入**  ，就可以使用 `textContent` 。<br />`textContent` **读取的时候是去掉所有 tags，仅保留文本**
```html
document.querySelector("div").textContent="<p>text</p>"
```
 ![image.png](https://gitee.com/rodrick278/img/raw/master/img/1607149825740-b1e36c61-7609-4562-bc4f-826f29ad0f89.png)<br />`ele.innerText`  也能做到写入和获取内容的事情，但是二者有所区别：

1. `innerText` 不会换行， `textContent` 会
```html
<div id="container">
    <span>666</span>
    <span>999</span>
</div>
<script>
    var oDiv=document.getElementById('container');
    console.log(oDiv.innerText,oDiv.textContent);
</script>

输出结果：
innerText:666 999

textContent:
        666
        999
```

2. 如果一个元素之间包含了 `script` 标签或者 `style` 标签， `innerText` 是获取不到这两个元素之间的文本的，而  `textContent` 可以
```html
<div id="container">
    <script>var a=666;</script>
    <span>666</span>
    <span>999</span>
</div>
<script>
    var oDiv=document.getElementById('container');
    console.log(oDiv.innerText,oDiv.textContent);
</script>   
输出结果：
innerText:666 999

textContent:
    var a=666;
    666
    999   

```

3. `textContent` 可以作用与文本节点等



### nodeValue/data
上面的 `innerHTML` 仅仅对节点元素有效，如果需要**获取（注意！仅获取）注释或文本节点内容**，可以使用 `nodeValue/data` ，这两个的效果并无差异：
```html
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello

    let comment = text.nextSibling;
    alert(comment.data); // Comment [注释节点的data是 <!--  --> 这个标签里面的值！]
  </script>
</body>
```
### 三者区别⭐

- `innerHTML/outerHTML` 仅作用于**标签节点，设置带有 tag 的字符串会转换成 HTML**
- `textContent` 取值会**去掉 tag** ，写入就是**纯文本**，不转换 HTML ，能作用于**任何节点**
- `data/nodeValue` 仅作用于**文本节点**等
## 其他属性

- `hidden` — 隐藏元素，相当于 `style = "display:none"` ，使用方式：
```html
<div hidden>With the attribute "hidden"</div>

ele.hidden = true
```

- `value` — `<input>`，`<select>` 和 `<textarea>`（`HTMLInputElement`，`HTMLSelectElement`……）的 value。
- `href` — `<a href="...">`（`HTMLAnchorElement`）的 href。
- `id` — 所有元素（`HTMLElement`）的 “id” 特性（attribute）的值。



## 特性和属性（Attributes and properties） 
### 概念

- DOM 属性（properties）
   - properties 是大部分是内建且订好的，除非我们在原型链上修改或增加
   - 可以用 `ele.prop` 获取 properties
   - 可以用 `ele.prop = 'xx'` 修改 properties



- HTML 特性（attributes）
   - attributes 分为 **标准** 和 **非标准** ，浏览器渲染 DOM 的时候， **会根据标准 attribute 创建出 DOM property** ，但是非标准不会，例如：
```html
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // 非标准的特性没有获得对应的属性
    alert(document.body.something); // undefined
  </script>
</body>
```

   - 操作 attribute 的方法如下：
   1. `elem.hasAttribute(name)` — 检查特性是否存在
   1. `elem.getAttribute(name)` — 获取这个特性值
   1. `elem.setAttribute(name, value)` — 设置这个特性值 
   1. `elem.removeAttribute(name)` — 移除这个特性
### prop 和 attr 同步⭐
当一个**标准的** attr 被修改，对应的 prop 也会被改变，反之亦然：
```html
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('id', 'id');
  alert(input.id); // id（被更新了）

  // 属性 => 特性
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId（被更新了）
</script>
```
但是**个别特例**<br />比如：
```html
<input>

<script>
  let input = document.querySelector('input');

  // 特性 => 属性
  input.setAttribute('value', 'text');
  alert(input.value); // text

  // 这个操作无效，属性 => 特性
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text（没有被更新！）
</script>
```
在上面这个例子中： 

- 改变特性值 value 会更新属性。 
- 但是属性的更改不会影响特性。 


<br />比如： `.href` 会返回完整 link ，而 `getAttribute('href')` 会返回 HTML 中内容
```html
<a href="/tutorial">/tutorial.html</a>
document.querySeletor('a').href // => https://run.plnkr.co/tutorial
document.querySeletor('a').getAttribute('href') // => /tutorial
```
### data-*
如果我们出于我们的目的使用了非标准的特性，之后它被引入到了标准中并有了其自己的用途，该怎么办？<br />
<br />为了避免冲突，存在 data-* 特性。**所有以 “data-” 开头的特性均被保留供程序员使用。它们可在 dataset 属性中使用。**
```html
<html>
<body>
Hello
<div data-info-test="test"><p>Hello, world!</p></div>

<script>
	console.log(document.querySelector("div").dataset.infoTest) // test
	document.querySelector("div").dataset.infoTest = "new"
	console.log(document.querySelector("div").dataset.infoTest) // new
</script>
</body>
</html>
```
> 使用的时候用 `dataset.xxx` ，且为驼峰写法

## 处理 DOM 元素
### 创建

- `document.createElement(tag)` --- 创建一个**元素节点**
- `document.createTextNode(str)` --- 创建一个文本节点
### 插入
以下都可以插入多个节点或字符串，用 "," 分隔：

- `node.append(...nodes or strings)` —— 在 `node` **末尾** 插入节点或字符串，
- `node.prepend(...nodes or strings)` —— 在 `node` **开头** 插入节点或字符串，
- `node.before(...nodes or strings)` —— 在 `node` **前面** 插入节点或字符串，
- `node.after(...nodes or strings)` —— 在 `node` **后面** 插入节点或字符串，
- `node.replaceWith(...nodes or strings)` —— 将 `node` 替换为给定的节点或字符串。

<br />但是上面的方法，加入我们使用 `node.append('<p>hello</p>')` ，那么会把  `<> </>`  这些转义，作为一般“文本”插入<br />加入我们希望**自动将这种转化为 HTML ，可以使用：**<br />`ele.insertAdjacentHTML(where, html)` <br /><br />该方法的第一个参数是代码字（code word），指定相对于 elem 的插入位置。必须为以下之一：

- "**beforebegin**" — 将 html 插入到 elem 前插入， 
- "**afterbegin**" — 将 html 插入到 elem 开头， 
- "**beforeend**" — 将 html 插入到 elem 末尾， 
- "**afterend**" — 将 html 插入到 elem 后。 

第二个参数是 HTML 字符串，会作为 HTML 插入<br />
<br />这个方法有两个兄弟，但是用的很少：

- `elem.insertAdjacentText(where, text)`  — 语法一样，但是将 text 字符串“作为文本”插入而不是作为 HTML，
- `elem.insertAdjacentElement(where, elem)`  — 语法一样，但是插入的是一个元素。
### 删除与移动

- `node.remove()` --- 删除节点
- 我们在把一个已有的节点插入到另一个位置的时候，会自动删除原有的节点，也就是移动
```html
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 无需调用 remove
  second.after(first); // 获取 #second，并在其后面插入 #first
</script>
```
### 克隆
`elem.cloneNode(bool)` ： `bool` 为 `true` 代表深克隆（克隆所有 attr 和子元素）， `bool` 为 `false` 则不包括子元素。
### 总结⭐

- 创建新节点的方法：
   - document.createElement(tag) — 用给定的标签创建一个元素节点，
   - document.createTextNode(value) — 创建一个文本节点（很少使用），
   - elem.cloneNode(deep) — 克隆元素，如果 deep==true 则与其后代一起克隆。
- 插入和移除节点的方法：
   - node.append(...nodes or strings) — 在 node 末尾插入，
   - node.prepend(...nodes or strings) — 在 node 开头插入，
   - node.before(...nodes or strings) — 在 node 之前插入，
   - node.after(...nodes or strings) — 在 node 之后插入，
   - node.replaceWith(...nodes or strings) — 替换 node。
   - node.remove() — 移除 node。
- 文本字符串被“作为文本”插入。
- 在html中给定一些 HTML，elem.insertAdjacentHTML(where, html)会根据where的值来插入它：
   - "beforebegin" — 将 html 插入到 elem 前面，
   - "afterbegin" — 将 html 插入到 elem 的开头，
   - "beforeend" — 将 html 插入到 elem 的末尾，
   - "afterend" — 将 html 插入到 elem 后面。

另外，还有类似的方法，elem.insertAdjacentText 和 elem.insertAdjacentElement，它们会插入文本字符串和元素，但很少使用。<br />

## 题目
### [从对象创建树](https://zh.javascript.info/modifying-document#cong-dui-xiang-chuang-jian-shu) 
编写一个函数 createTree，从嵌套对象创建一个嵌套的 ul/li 列表（list）。
```html
<html>
<body>
  <div id="container">
  </div>
  <script>
    let data = {
      "Fish": {
        "trout": {},
        "salmon": {}
      },

      "Tree": {
        "Huge": {
          "sequoia": {},
          "oak": {}
        },
        "Flowering": {
          "apple tree": {},
          "magnolia": {}
        }
      }
    };

    let container = document.getElementById('container');
    createTree(container, data); // 将树创建在 container 中

    /**
     * @description: 
     * @Author: rodrick
     * @Date: 2020-12-05 19:56:40
     * @param {*} elem
     * @param {*} data
     * @return {*}
     */
    function createTree(elem, data) {
      // 创建一个ul
      let ulElem = document.createElement("ul")
      // 遍历对象
      Object.entries(data).forEach(([key, val]) => {
        // 创建一个li，会塞进 ulElem
        let liElem = document.createElement("li")
        // 先把key塞进li的值
        liElem.innerHTML = key
        if (Object.keys(val).length != 0) {
          // 如果这个value有值，值和这个li扔进递归，递归里li继续嵌套ul
          ulElem.append(createTree(liElem, val))
        } else {
          ulElem.append(liElem)
        }
      })

      // ul 塞入 elem
      elem.append(ulElem)
      return elem
    }
  </script>
</body>

</html>
```
最终结果：<br />![image.png](https://gitee.com/rodrick278/img/raw/master/img/1607171880778-95d561c6-22f2-4208-892d-a693406bc593.png)
## 样式 class/style
管理 class，有两个 DOM 属性：

- `className` — 字符串值，可以很好地管理整个类的集合。
- `classList` — 具有：
   - `elem.classList.add/remove(class)` — 添加/移除类。
   - `elem.classList.toggle(class)` — 如果类不存在就添加类，存在就移除它。
   - `elem.classList.contains(class)` — 检查给定类，返回 `true/false`。

要改变样式：

- `style` 属性是具有驼峰（camelCased）样式的对象。对其进行读取和修改与修改 `"style"` 特性（attribute）中的各个属性具有相同的效果。

直接 `ele.style.xxx = "aaa"` 修改即可，**注意要带上单位**（px 等）

- `getComputedStyle(elem, [pseudo伪元素])` 返回 elem 的所有样式。只读。



## 元素大小与滚动⭐

<br />![image.png](https://gitee.com/rodrick278/img/raw/master/img/1607245577073-cd6b4310-1328-407b-a607-45e9afbb3653.png)

- `clientWidth/Height` —— width + padding
- `offsetWidth/Height` —— width + padding + scrollbar + border
- `clientLeft/Top` —— scrollbar（在左/上的情况下） + border
- `offetLeft/Top` —— border 以上/左 的距离
- `scrollWidth/Height` —— 完整滚动文档区域（横向或竖向）的宽高（不是可视区域）
- `scrollTop/Left` —— 完整滚动文档区域宽/高 - 可视区域宽/高，可以理解为**已滚动了多少**
> `scrollTop/Left` 是 **可修改** 的，比如 `scrollTop += 10` ，那么就会向下滚动 10px，这样就可以做出滚动效果。

## 窗口大小和滚动⭐
![Snipaste_2020-12-06_19-04-19.png](https://gitee.com/rodrick278/img/raw/master/img/1607252681167-d431e9f9-317b-4d94-ae74-8627e7e8d057.png)<br />

- `document.documentElement.clientWidth/clientHeight` **不带滚动条**的**可视窗口**宽高
- `window.innerWidth/innerHeight` **带有滚动条**的**可视窗口**宽高
- `window.outerWidth/outerHeight` **整个浏览器**的宽高



### 滚动

- 读取当前的滚动：`window.pageYOffset/pageXOffset`。<br />
- 更改当前的滚动：
   - `window.scrollTo(pageX,pageY)` — 绝对坐标，
   - `window.scrollBy(x,y)` — 相对当前位置进行滚动，
   - `elem.scrollIntoView(bool)` — 滚动以使 `elem` 可见（`elem` 与窗口的顶部/底部对齐）。 `bool` 为 `true（缺省值）` 时，将 `elem` 定位到顶部， `bool` 为 `false` 时，将 `elem` 滚动到底部 
- 禁止滚动：  `document.body.style.overflow = 'hidden'`   


<br />

## 坐标⭐

我们常常在各种事件 `event` 中会获取到这两种坐标位置：

- `clientX/Y` —— 相对于窗口的坐标
- `pageX/Y` —— 相对于文档本身的位置

获取一个元素的坐标： `elem.getBoundingClientRect()` ，他会返回一个对象，对象的各个 key 对应的 value 含义如下图，详细坐标说明参见 [JS现代教程](https://zh.javascript.info/coordinates) ：<br />![image.png](https://gitee.com/rodrick278/img/raw/master/img/1607255192628-273b67c0-6ddd-49f4-bc8f-4a548d56be69.png)