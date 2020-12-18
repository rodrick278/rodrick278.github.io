---
title: HTML面试题整理
date: 2020-10-09
categories:
 - 前端
tags:
 - 面试
---

# 一、HTML5的新特性

## 1. 声明方式

> **HTML4和HTML5的区别**

最重要的标志，就是看类型声明；

- HTML5是用 `<!DOCTYPE html>` 这种的声明
- HTML4是用 `<! DOCTYPE html PUBLIC “-//W3C//DTD XHTML 4.0 Transitional//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>` 这种的声明；

`<!DOCTYPE>` 声明推荐是放在 HTML 文档的第一行，位于 `<html>` 标签之前。

> **为什么HTML和HTML5声明的类型不同？**

- 在 HTML4 中，`<!DOCTYPE>` 声明引用 **DTD**，因为 **HTML4 基于 SGML**。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。
- HTML5 不基于 SGML，所以不需要引用 DTD。

## 2. 移除的元素

- 纯表现的元素： basefont 、 big 、 center 、 font 、 s 、 strike 、 tt 、 u
- 对可⽤性产⽣负⾯影响的元素： frame 、 frameset 、 noframes

## 3. 新增的元素

### 3.1 语义化标签

- [header](https://www.axihe.com/api/html/styles-semantics/tag-header.html)
- [footer](https://www.axihe.com/api/html/styles-semantics/tag-footer.html)
- [article](https://www.axihe.com/api/html/styles-semantics/tag-article.html)
- [aside](https://www.axihe.com/api/html/styles-semantics/tag-aside.html)
- [section](https://www.axihe.com/api/html/styles-semantics/tag-section.html)
- [details](https://www.axihe.com/api/html/styles-semantics/tag-details.html)
- [summary](https://www.axihe.com/api/html/styles-semantics/tag-summary.html)
- [dialog](https://www.axihe.com/api/html/styles-semantics/tag-dialog.html)

> **常见标签和应用场景**

**header**

---

如果页面中有一块包含一组介绍性或导航的区域， 应该用 header 元素对其进行标记。

一个页面可以有任意数量的 header 元素， 它们的含义可以根据其上下文而有所不同。

例如，处于页面顶端或接近这个位置的 header 可能代表整个页面的页眉（有时称为 页头）

通常，页眉包括网站Logo、主导航和其他全站链接，甚至搜索框。这是 header 元素最常见的使用形式。

**footer**

---

页面底部的页脚（通常包括版权声明， 可能还包括指向隐私政策页面的链接以及其他类似的内容）。

HTML5 的 footer 元素可以用在这样的地方， 但它同 header 一样， 还可以用在其他的地方。

footer 元素只有当它最近的祖先是 body 时， 它才是整个页面的页脚。

**article**

---

`<article>`元素可以是 一篇论坛帖子、一篇杂志或报纸文章、一篇博客详情、一则用户提交的评论或者任何其他独立的内容项。

`<article>`元素用来包裹独立的内容片段。

最明显的例子 就是博客正文。

**details**

---

details 标签定义元素的细节，用户可进行查看，或通过点击进行隐藏。

与 legend 一起使用，来制作 detail 的标题。该标题对用户是可见的，当在其上 点击时可打开或关闭 detail。

**mark**

---

mark 主要用来在视觉上向用户呈现那些需要突出的文字。mark 标签的一个比较 典型的应用就是在搜索结果中向用户高亮显示搜索关键词。

### 3.2 音频、视频标签

音频、视频 API(audio,video)

- [audio](https://www.axihe.com/api/html/audio-video/tag-audio.html)
- [video](https://www.axihe.com/api/html/audio-video/tag-video.html)
- `<embed>` 作为外部应用的容器
- `<track>` 标签为诸如 video 元素之类的媒介规定外部文本轨道。用于规定字幕文件或其他包含文本的文件，当媒介播放时，这些文件是可见的。
- `<source>` 对多种媒体源的支持很有帮助

### 3.3 表单控件

HTML5 拥有多个新的表单输入类型。这些新特性提供了更好的输入控制和验证。

- color
- date
- datetime
- datetime-local
- email
- month
- number
- range
- search
- tel
- time
- url
- week

具体参考：[HTML5 新的 Input 类型](https://www.axihe.com/edu/html5/form/input-types.html)

### 3.4 五个API

* **localStorage/sessionStorage**

  **localStorage**

  ---

  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；

  只读的 localStorage 属性允许你访问一个 Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。

  localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除 。

  具体参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage

  

  **sessionStorage** 

  ---

  sessionStorage 的数据在浏览器关闭后自动删除

  sessionStorage 属性允许你访问一个 session Storage 对象。它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置，而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookies 的运行方式不同。

  具体参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage

---

*  **画布/Canvas**

  * [canvas](https://www.axihe.com/api/html/images/tag-canvas.html)
  * [figure](https://www.axihe.com/api/html/images/tag-figure.html)
  * [figcaption](https://www.axihe.com/api/html/images/tag-figcaption.html)

  演示：https://wow.techbrood.com/fiddle/30964

---

* **地理/Geolocation**

  地理位置 API 允许用户向 Web 应用程序提供他们的位置。出于隐私考虑，报告地理位置前会先请求用户许可。

  具体参考：[HTML5 Geolocation（地理定位）](https://www.axihe.com/edu/html5/api/geolocation.html)

  类似Google搜索页面，底部显示位置的样子,还有点餐的，我的位置相关的；

  延伸：如果我们打算根据不同的地理位置加载不同的资源，可以借助第三方的IP库；参考 [JavaScript 获取用户客户端的 ip 地址，邮编，城市名](https://www.axihe.com/anbang/blog/javascript/js-get-user-clients-ip-address-zip-code-city-name.html);

---

* **拖拽释放**

  HTML拖拽释放 (Drag and drop) 接口使应用程序能够在浏览器中使用拖放功能。

  例如，通过这些功能，用户可以使用鼠标选择可拖动元素，将元素拖动到可放置元素，并通过释放鼠标按钮来放置这些元素。

  可拖动元素的一个半透明表示在拖动操作期间跟随鼠标指针。

  详情参考 [HTML 拖放 API](https://www.axihe.com/web/api/html-drag-and-drop-api.html)

  在线浏览拖拽效果：https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html

  **核心**

  ---

  功能：可以把一个元素拖动放到目标区域，并且可以定义它的中间效果；

  它的实现过程有：

  - 1.确定什么是可拖动的源
  - 2.定义拖动元源
    - 定义拖动数据
    - 定义拖动图像
    - 定义拖动效果
  - 3.定义一个放置区
  - 4.处理放置效果
  - 5.拖动结束

---

* **Web Workers**

  webworker, websocket, Geolocation

  当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

  web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

  具体参考：[HTML5 Web Workers](https://www.axihe.com/edu/html5/edu/webworkers.html)

  **核心**

  ---

  Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。

  在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

  这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

### 3.5 其他

- [ruby](https://www.axihe.com/api/html/formatting/tag-ruby.html)
- [bdi](https://www.axihe.com/api/html/formatting/tag-bdi.html)
- [wbr](https://www.axihe.com/api/html/formatting/tag-wbr.html)
- [mark](https://www.axihe.com/api/html/formatting-stress/tag-mark.html)
- [meter](https://www.axihe.com/api/html/formatting-area/tag-meter.html)
- [progress](https://www.axihe.com/api/html/formatting-area/tag-progress.html)
- [time](https://www.axihe.com/api/html/formatting-definition/tag-time.html)
- [datalist](https://www.axihe.com/api/html/forms-input/tag-datalist.html)
- [output](https://www.axihe.com/api/html/forms-input/tag-output.html)
- [keygen](https://www.axihe.com/api/html/forms-input/tag-keygen.html)
- [menu](https://www.axihe.com/api/html/lists/tag-menu.html)
- [command](https://www.axihe.com/api/html/lists/tag-command.html)
- [dir](https://www.axihe.com/api/html/lists/tag-dir.html)
- [nav](https://www.axihe.com/api/html/links/tag-nav.html)
- [embed](https://www.axihe.com/api/html/programming/tag-embed.html)

>  推荐一个HTML和HTML5的速查，可以了解一下：[HTML 速查表](https://www.axihe.com/map/html.html)



## 4. Doctype作用？严格模式与混杂模式如何区分？它们有何差异？

### 4.1 Doctype作用

\<!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，这并不是一个 HTML 标签。

---

### 4.2 严格模式与混杂模式如何区分？它们有何意义？

**严格模式[Standards]：** 又称标准模式，是指浏览器按照 W3C 标准解析代码。

**混杂模式[Quirks]：** 又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

**如何区分：** 浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

1、如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。**（严格 DTD ——严格模式）** 
2、包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。**（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式）** 
3、DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。**（DTD不存在或者格式不正确——混杂模式）**
4、HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。**（ HTML5 没有严格和混杂之分）**

**意义：** 严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。



## 5. 在 HTML5 页面嵌入音频

HTML 5 包含嵌入音频文件的标准方式，支持的格式包括 MP3、Wav 和 Ogg：

HTML `<audio>` 元素用于在文档中表示音频内容。

\<audio> 元素可以包含多个音频资源， 这些音频资源可以使用 src 属性或者 <source> 元素来进行描述； 浏览器将会选择最合适的一个来使用。

因为这个标签是 HTML5 引入的，是 HTML5 中的新属性。

更多可以通过 [HTML audio 标签](https://www.axihe.com/api/html/audio-video/tag-audio.html) 来了解

### 5.1 第一种写法

```html
<audio src="***.mp3"></audio>
```

### 5.2 第二种写法

```html
<audio controls>
	<source src="jamshed.mp3" type="audio/mpeg">
  您的浏览器不支持音频嵌入功能。
</audio>
```

```html
<audio controls="controls">  
  Your browser does not support the <code>audio</code> element.  
  <source src="horse.ogv" type="audio/wav">  
  <source src="axihe.mp3" type="audio/mpeg">  
  您的浏览器不支持 audio 元素。
</audio>
```



## 6. 在 HTML5 页面嵌入视频

HTML5 定义了嵌入视频的标准方法，支持的格式包括：MP4、WebM 和 Ogg：

HTML `<video>` 元素 用于在 HTML 或者 XHTML 文档中嵌入媒体播放器，用于支持文档内的视频播放。

你也可以将 `<video>` 标签用于音频内容，但是 `<audio>` 元素可能在用户体验上更合适。

## 实现方法

```html
<video controls width="250">
  <source src="/media/examples/flower.webm" type="video/webm">    
  <source src="/media/examples/flower.mp4"  type="video/mp4">    
  您的浏览器不支持 video 标签。
</video>
```

## 其它例子

```html
<!-- Simple video example -->
<video src="videofile.ogg" autoplay poster="posterimage.jpg">  
  抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a href="videofile.ogg">下载</a>  并用你喜欢的播放器观看!
</video>
<!-- Video with subtitles -->
<video src="foo.ogg">  
  <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English">  
  <track kind="subtitles" src="foo.sv.vtt" srclang="sv" label="Svenska">
</video>
```

第一个例子播放一个视频，视频一收到，允许播放的时候就会立马开始播放，而不会停下来直到下载更多内容。

图片 “posterimage.jpg” 会一直展示在视频区域，直到开始播放。

第二个例子允许用户选择不同的字幕。

更多可以通过 [HTML video 标签](https://www.axihe.com/api/html/audio-video/tag-video.html) 来了解



## 7. HTML5 的 form 如何关闭自动完成功能

> **自动完成的功能**
>
> HTML 的输入框可以拥有自动完成的功能，当你往输入框输入内容的时候，浏览器会从你以前的同名输入框的历史记录中查找出类似的内容并列在输入框下面，这样就不用全部输入进去了，直接选择列表中的项目就可以了。

使用 `autocomplete="off"`（给不想要提示的 form 或某个 input 设置为 autocomplete=off。）

很多时候，需要对客户的资料进行保密，防止浏览器软件或者恶意插件获取到；

可以在 input 中加入 autocomplete=“off” 来关闭记录 系统需要保密的情况下可以使用此参数

提示：autocomplete 属性有可能在 form 元素中是开启的，而在 input 元素中是关闭的。

注意：autocomplete 适用于 `<form>` 标签，以及以下类型的 `<input>` 标签：text, search, url, telephone, email, password, datepickers, range 以及 color。

HTML form 中开启 autocomplete （一个 input 字段关闭 autocomplete ):

### 开启

```html
<form action="demo-form.php" autocomplete="on"> 
  First name:<input type="text" name="fname"><br>  
  Last name: <input type="text" name="lname"><br>  
  E-mail: <input type="email" name="email" autocomplete="off"><br> 
  <input type="submit">
</form>
```

### 关闭

```html
<form action="demo-form.php" autocomplete="off"> 
  First name:<input type="text" name="fname"><br>  
  Last name: <input type="text" name="lname"><br> 
  E-mail: <input type="email" name="email" autocomplete="off"><br>
  <input type="submit">
</form>
```

### 解决 Chrome 记住的方式

> 注意
>
> 虽然你设置了`autocomplete="off"`，但是如果用户选择了记住，Chrome 还是会在下次登录给你补全的； 解决 Chrome 记住的方式

一个解决方案，有需要的可以试一试

```html
<input type="password" style="display:none;width:0;height:0;">
<input data-placeholder="请输入密码" name="password" data-required="true"  type="password" autocomplete="new-password" data-max-length="50" tabindex="2" spellcheck="false" id="auto-id-1505904797992" placeholder="请输入密码">
```

先输入一个隐藏文本域，再输入第二个展示的文本框，重点是我加黑的字体，编译器可能会无法识别，但是浏览器可以解析。



## 8. canvas的使用

[参见MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)，后面可能会针对canvas和WebGL单独做文章



## 9. Canvas 绘制的图形保存时候加上二维码

### 分析需求

生成 Canvas 图，页面显示的图片上有提示长按保存图片的按钮。

保存至手机相册时，需要拼上二维码，并去掉相关提示信息。

**主要做的有 2 点**

将 Canvas 图和二维码这两张图片合并成一张图片

页面中显示的图片，与长按图片保存的是不一样的

### 解决方案

生成图片 A，同时用 canvas 绘制有二维码的图片 B，通过定位方式将 A、B 图重叠，并将 B 置顶，透明度为 0.01（不设置为 0, 在有些机器下有 bug)。

这样可以做到页面显示的是 A 图，长按保存的是 B 图。

### canvas 绘图

1. js 文件中动态创建 canvas

```js
let canvas = document.createElement('canvas')
canvas.width = "700"
canvas.height = "980"  //创建画布，并设置宽高
//注意canvas元素本身并没有绘制能力（它仅仅是图形的容器
//getContext()方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性
let ctx = canvas.getContext("2d")
ctx.rect(0,0, 700, 980) //矩形坐标，大小 (距离左上角x坐标,距离左上角y坐标,宽度,高度)
ctx.fillStyle = "#fff" //矩形的颜色
ctx.fill() //填充
```

2. 画布上绘制图像

```js
context.drawImage(image,x,y,w,h)
```

x，y 为画布中画图的起始坐标，w,h 指绘制出来的图像的宽度与高度，比例与原图宽高最好一致，图像不会变形。

这里需要注意一下，图片加载完成再调用 drawImage 绘图

所以，定义了一个 promise 函数，当图片数据信息都加载完成后再调用 drawImage 绘图

```js
function loadImg(src) {
    let paths = Array.isArray(src) ? src : [src]
    let promise = paths.map((path) => {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.setAttribute("crossOrigin", 'anonymous')
            img.src = path
            //只是更新了DOM对象,图片数据信息还未加载完成，加载资源是异步执行的,需要监听load事件的,事件发生后,就能获取资源
            img.onload = () => {
                resolve(img)
            }
            img.onerror = (err) => {
                alert('图片加载失败')
            }
        })
      })
      return Promise.all(promise)
}
```

图片加载完成，调用 drawImage 绘图

```js
loadImg([
    'https://image.ibb.co/f4Lged/2017072615215296mg_ULNAVisju_Wh_D.jpg',
    'https://image.ibb.co/dkSoQJ/qrcode_for_gh_2039c29e81ca_430.jpg',
]).then(([img1, img2])=> {
    ctx.drawImage(img1, 0, 0, 400, 200) //画布上先绘制人物图`
    ctx.drawImage(img2, 250, 130, 60, 60) //再绘制二维码图，根据设计图设置好坐标。`
    imageURL = canvas.toDataURL("image/png") //获取图片合并后的data-URL,参数可选图片格式，图片质量，详自查API`
    let img3 = new Image()
    document.getElementsByClassName("box")[0].append(img3)
    img3.src = imageURL
    canvas.style.display = "none"
});
```

这样就将两张图片合成为一张图片了，然后可以利用 HTML5 a 标签 download 属性，也可以将其通过 img 标签展示到页面，然后长按 / 右键保存到本地。



## 10. 你知道多少种 Doctype 文档类型？

HTML 4.01 规定了三种文档类型：**Strict、Transitional 以及 Frameset**。

XHTML 1.0 规定了三种 XML 文档类型：**Strict、Transitional 以及 Frameset**。

**Standards** （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，

而 **Quirks**（包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。



# 二、通信

## 1. 多浏览器窗口间通信

* window.opener

  父子窗口通信

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <script>
  function openWin(){
      myWindow=window.open('','','width=200,height=100');
      myWindow.document.write("<p>这是我的窗口</p>");
      myWindow.focus();
      myWindow.opener.document.write("<p>这个是源窗口!</p>");
  }
  </script>
  </head>
  <body>
  
  <input type="button" value="打开我的窗口" onclick="openWin()" />
  
  </body>
  </html>
  ```

* WebSocket

  非http方式，后端连协

* **localstorge**

  **标签页 1**：

  ```html
  <input id="name">
  <input type="button" id="btn" value="提交">
  
  <script type="text/javascript">
      $(function(){
          $("#btn").click(function(){
             var name=$("#name").val();
              localStorage.setItem("name", name); //存储需要的信息
          });
     });
  </script>
  ```

  **标签页 2**：

  ```js
  $(function(){
      window.addEventListener("storage", function(e){
  	   console.log(e.key + "=" + e.newValue);
      });     //使用storage事件监听添加、修改、删除的动作
  });
  ```

  > `e` 中常用属性
  >
  > * e.key：发生变化的 key
  > * e.oldValue：旧的值
  > * e.newValue：新的值
  >
  > ---
  >
  > `localStorage` 方法
  >
  >  localStorate.setItem(), localStorage.removeItem() 或者 localStorage.clear()
  >
  > 如果是调用的 localStorage.clear()，则 e.key 的值是 null（测试结果，不一定在每个浏览器上都一样）
  >
  > 直接修改值： localStorage.test = “hello storage”



## 2. websocket 是什么？

WebSocket **不是 HTTP 协议**，HTTP 只负责建立 WebSocket 连接。

websocket 的**原理自然就是 socke**t，即 tcp/ip 通讯

http 也是基于 tcp/ip 通讯，只不过包了一层，加了限制并简化了使用

你可以把WebSocket看成是一个改良设计

在**以前 HTTP 协议**中所谓的 keep-alive connection 是指在一次 TCP 连接中完成多个 HTTP 请求，但是对每个请求仍然要单独发 header；所谓的 polling 是指从客户端（一般就是浏览器）不断主动的向服务器发 HTTP 请求查询是否有新数据

这两种模式有一个共同的**缺点**，就是除了真正的数据部分外，**服务器和客户端还要大量交换 HTTP header，信息交换效率很低。**

WebSocket **解决的第一个问题**是，通过第一个 HTTP request 建立了 TCP 连接之后，之后的交换数据都不需要再发 HTTP request 了，使得这个长连接变成了一个真。长连接。

在此基础上 WebSocket 还是一个**双通道**的连接，在同一个 TCP 连接上既可以发也可以收信息。



## 3. webSocket 如何兼容低版本浏览器

Adobe Flash Socket 、 ActiveX HTMLFile (IE) 、 基于 multipart 编码发送 XHR 、 基于长轮询的 XHR



# 三、标签

## 1. img 中的 alt 和元素的 title 属性作用

* alt

  如果无法显示图像，浏览器将显示 alt 指定的内容

* title

  鼠标移到元素上显示的内容

## 2. table 和 div+css 的区别

* div：加载方式是即读即加载，遇到<div> 没有遇到</div> 的时候一样加载<div> 中的内容，读多少加载多少；
  table

* table：加载方式是完成后加载，遇到<table> 后，在读到</table> 之前，<table> 中的内容不加载

## 3. HTML 语义化的理解

1. 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
2. 有利于 SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
3. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4. 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。 HTML5 中新增加的很多标签（如：`<article>`、`<nav>`、`<header>`和`<footer>`等） 就是基于语义化设计原则）

## 4. iframe缺点

- iframe 会阻塞主页面的 Onload 事件
- 搜索引擎的检索程序⽆法解读这种页面，不利于 SEO
- iframe 和主页面共享连接池，⽽浏览器对相同域的连接有限制，所以会影响页面⾯的并行加载

## 5. b 与 strong 的区别

**`<b>`为了加粗而加粗，`<strong>`为了标明重点而加粗。**

它们的区别就再于一个是**物理元素**，一个是**逻辑元素**。

物理元素所强调的是一种物理行为，比如说我把一段文字用 b 标记加粗了，我的意思是告诉浏览器应该给我加粗了显示这段文字，从单词的语义也可以分析得出，b 是 Bold（加粗）的简写，所以这个 B 标记所传达的意思只是加粗，没有任何其它的作用。

而 Strong 我们从字面理解就可以知道他是强调的意思，所以我们用这个标记向浏览器传达了一个强调某段文字的消息，而这个 Strong 就是我们所说的逻辑元素，他是强调文档逻辑的，并非是通知浏览器应该如何显示。

## 6. i 与 em 的区别

同样，**I 是 Italic（斜体），而 em 是 emphasize（强调）。**

所以说：物理元素是告诉浏览器我应该以何种格式显示文字，逻辑元素告诉浏览器这些文字有怎么样的重要性。