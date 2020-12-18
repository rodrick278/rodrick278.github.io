---
title: Web安全策略
date: 2020-12-18
categories:
 - 前端
tags:
 - 安全
---

## 点击劫持(ClickJacking)
### 原理
原理很简单，在网页的某一个可点击的元素上方，加上一个透明的 `<iframe>` ，并置于顶层，然后用户点击元素的时候实际上会点击这个 `<iframe>` 
### 有效的防御措施

- **X-Frame-Options** 

修改服务器 `header` ，添加 `X-Frame-Options` 响应头，有三种设置值：

1. **DENY**  —— 始终禁止在 frame 中显示此页面。
1. **SAMEORIGIN** —— 允许在和父文档同源的 frame 中显示此页面。
1. **ALLOW-FROM <domain>** —— 允许在来自给定域 `domain` 的父文档的 frame 中显示此页面。



- **protector  div** 

上面的 `X-Frame-Options` 有一个问题是，别人的网页也无法用 `frame` 引用我们的页面。


我们可以用一个样式为 **height: 100%; width: 100%;**  的 `<div>` “覆盖”页面，这样它就能拦截所有点击。如果 `window == top`  或者我们确定不需要保护时，再将该 `<div>`  移除。
```javascript
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">前往网站</a>
</div>

<script>
  // 如果顶级窗口来自其他源，这里则会出现一个 error
  // 但是在本例中没有问题
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```


- **samesite cookie** 

具有 `samesite`  特性的 cookie 仅在网站是通过直接方式打开（而不是通过 frame 或其他方式）的情况下才发送到网站。
## XSS
### 什么是 XSS
Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全
### XSS 分类



| 类型 | 存储区 | 插入点 |
| --- | --- | --- |
| 存储型 XSS | 后端数据库 | HTML |
| 反射型 XSS | URL | HTML |
| DOM 型 XSS | 后端数据库/前端存储/URL | 前端 JavaScript |

#### 存储型

1. 恶意代码被存入 **数据库** 
1. 用户打开网页后代码被 **服务端** 取出返回给客户端
1. 客户端浏览器解析响应恶意代码

这种攻击常见于带有 **用户保存数据的网站功能** ，如论坛发帖、商品评论、用户私信等。
#### 反射型

1. 攻击者伪造 **特殊 URL** 
1. 用户打开恶意 URL， **服务端** 将恶意代码从 URL 中取出（参数等），拼接进 HTML 
1. 恶意代码被响应，窃取信息，冒充用户行为

常见于 **通过 URL 传递参数** 的功能，如网站搜索、跳转等，诱导用户主动打开恶意 URL。
**POST 方式也可以触发反射型 XSS** ，但是需要构造表单提交页面，并引导用户点击。
#### DOM 型

1. 攻击者构造出 **特殊的 URL** ，其中包含恶意代码。
1. 用户打开带有恶意代码的 URL。
1. 用户浏览器接收到响应后解析执行， **前端 JavaScript 取出 URL 中的恶意代码并执行** 。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

**DOM 型是属于前端 JavaScript 的安全漏洞，前两种是服务端的安全漏洞** 
### 防御 XSS
#### 不靠谱的输入过滤
**Q**：用户提交时，由前端过滤输入，然后提交到后端。这样做是否可行？
**A**：不可行。一旦攻击者绕过前端过滤，直接构造请求，就可以提交恶意代码了
**Q**：后端在写入数据库前，对输入进行过滤，然后把“安全的”内容，返回给前端。这样是否可行呢？
**A**：我们举一个例子：
一个正常的用户输入了 `5 < 7` 这个内容，在写入数据库前，被转义，变成了 `5 &lt; 7`。
问题是：在提交阶段，我们并不确定内容要输出到哪里。


这里的“并不确定内容要输出到哪里”有两层含义：

1. 用户的输入内容可能同时提供给前端和客户端，而一旦经过了 `escapeHTML()`，客户端显示的内容就变成了乱码( `5 &lt; 7` )。
1. 在前端中，不同的位置所需的编码也不同。
- 当 `5 &lt; 7` 作为 HTML 拼接页面时，可以正常显示：
```
<div title="comment">5 &lt; 7</div>
```


- 当 `5 &lt; 7`  通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等。

**所以，对于明确的输入输出场合，可以使用，但是不确定输出场合的话，这个方法并不可靠** 


#### No.1 预防存储型和反射型 XSS
由于这两种 XSS 都是服务端取出恶意代码，所以我们可以用如下两种方案：


**一、纯前端渲染** 
不使用 SSR 方案，完全前后端分离，使用 Ajax 调用数据。
在学习 Vue 的 `v-html` 指令时，官方文档有这么一段话
> Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). Only use v-html on trusted content and never on user-provided content.
> 在你的网站上动态渲染任意的HTML是非常危险的，因为它很容易导致XSS攻击。只在可信的内容上使用v-html，永远不要在用户提供的内容上使用。



但是在对于性能要求高，或有SEO需求的页面，我们仍然会有拼接 HTML 的问题。


**二、转义 HTML** 
如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。
常用的模板引擎，如 doT.js、ejs、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 `& < > " ' /` 这几个字符转义掉，确实能起到一定的 XSS 防护作用，但并不完善：

| **XSS 安全漏洞**  | **简单转义是否有防护作用**  |
| --- | --- |
| HTML 标签文字内容 | 有 |
| HTML 属性值 | 有 |
| CSS 内联样式 | 无 |
| 内联 JavaScript | 无 |
| 内联 JSON | 无 |
| 跳转链接 | 无 |

所以要完善 XSS 防护措施，我们要使用更完善更细致的转义策略。
例如 Java 工程里，常用的转义库为 `org.owasp.encoder`。以下代码引用自 [org.owasp.encoder 的官方说明](https://www.owasp.org/index.php/OWASP_Java_Encoder_Project#tab=Use_the_Java_Encoder_Project)。
```html
<!-- HTML 标签内文字内容 -->
<div><%= Encode.forHtml(UNTRUSTED) %></div>
<!-- HTML 标签属性值 -->
<input value="<%= Encode.forHtml(UNTRUSTED) %>" />
<!-- CSS 属性值 -->
<div style="width:<= Encode.forCssString(UNTRUSTED) %>">
<!-- CSS URL -->
<div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">
<!-- JavaScript 内联代码块 -->
<script>
  var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
  alert(msg);
</script>
<!-- JavaScript 内联代码块内嵌 JSON -->
<script>
var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
</script>
<!-- HTML 标签内联监听器 -->
<button
  onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
  click me
</button>
<!-- URL 参数 -->
<a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">
<!-- URL 路径 -->
<a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">
<!--
  URL.
  注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
-->
<a href='<%=
  urlValidator.isValid(UNTRUSTED) ?
    Encode.forHtml(UNTRUSTED) :
    "/404"
%>'>
  link
</a>
```
可见，HTML 的编码是十分复杂的，在不同的上下文里要使用相应的转义规则。


#### No.2 预防 DOM 型 XSS
DOM 型的 XSS ，是由于前端的防范漏洞造成的。

- 使用会写入 HTML 片段的方法时要特别小心，不要把，比如 `innerHTML` 、 `outerHTML` 、 `document.write` ，尽量使用 `textContent` 、 `setAttribute()` 等
- 如果用 Vue/React 技术栈，并且不使用 `v-html/dangerouslySetInnerHTML`  功能，就在前端 render 阶段避免 `innerHTML` 、 `outerHTML`  的 XSS 隐患。
- DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
```html
<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>

```
### 其他防御措施
#### Content Security Policy
严格的 CSP 在 XSS 的防范中可以起到以下的作用：

- 禁止加载外域代码，防止复杂的攻击逻辑。
- 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
- 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
- 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
- 合理使用上报可以及时发现 XSS，利于尽快修复问题。



#### 输入内容长度控制
对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。
#### 其他安全措施

- HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
- 验证码：防止脚本冒充用户提交危险操作。
### 检测 XSS
两个方法：

1. 使用通用 XSS 攻击字符串手动检测 XSS 漏洞。
1. 使用扫描工具自动检测 XSS 漏洞。



参考 [Unleashing an Ultimate XSS Polyglot](https://github.com/0xsobky/HackVault/wiki/Unleashing-an-Ultimate-XSS-Polyglot) 一文中，使用如下字符串：
```
jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e
```
它能够检测到存在于 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等多种上下文中的 XSS 漏洞，也能检测 `eval()`、`setTimeout()`、`setInterval()`、`Function()`、`innerHTML`、`document.write()` 等 DOM 型 XSS 漏洞，并且能绕过一些 XSS 过滤器。


除了手动检测之外，还可以使用自动扫描工具寻找 XSS 漏洞，例如 [Arachni](https://github.com/Arachni/arachni)、[Mozilla HTTP Observatory](https://github.com/mozilla/http-observatory/)、[w3af](https://github.com/andresriancho/w3af) 等。
## CSRF
### CSRF 概念
CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
一个典型的CSRF攻击有着如下的流程：

- 受害者登录a.com，并保留了登录凭证（Cookie）。
- 攻击者引诱受害者访问了b.com。
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会览器会默认携带a.com的Cookie。
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
- a.com以受害者的名义执行了act=xx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作
### 常见攻击类型

- GET 类型

GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：
```html
<img src="http://bank.example/withdraw?amount=10000&for=hacker" >
```
受害者访问包含这个 img 的页面时，浏览器会自动向 `bank.example` 发送一个 HTTP 请求， `bank.example` 就会收到包含受害者信息（cookie 等）的一次跨域请求

- POST 类型

这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：
```html
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

- 链接型    

链接类型，其实就是诱导用户点击恶意链接，这种比较少见。


### CSRF 的特点

- 攻击**一般发起在第三方网站**，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
- 攻击利用受害者在被攻击网站的登录凭证，**冒充**受害者提交操作；而**不是直接窃取数据**。
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“**冒用**”。
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

CSRF**通常是跨域**的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。
### 防护策略
关于防护策略，主要有两种方式：

- 阻止不明外域的访问
   - 同源检测
   - Samesite Cookie
- 提交时要求附加本域才能获取的信息
   - CSRF Token
   - 双重Cookie验证
#### 同源检测
在跨域请求中，浏览器会自动添加 `Origin Header` 、 `Referer Header` 用来标记来源域名，服务器可以通过解析 Header 中的域名来确定请求源。


**Origin Header 在两种情况下不存在** ：

- **IE11 同源策略：**IE 11 不会在跨站CORS请求上添加Origin标头，Referer头将仍然是唯一的标识。
- **302重定向：**在302重定向之后Origin不包含在重定向的请求中，因为Origin可能会被认为是其他来源的敏感信息。



但是，当一个请求是页面请求（比如网站的主页），而来源是**搜索引擎的链接**（例如百度的搜索结果），**也会被当成疑似CSRF攻击**。
而且，CSRF大多数情况下来自第三方域名，但**并不能排除本域发起**。如果攻击者有权限在本域发布评论（含链接、图片等，统称UGC），那么它可以直接在本域发起攻击，这种情况下同源策略无法达到防护的作用。 
#### CSRF Token
CSRF的另一个特征是，攻击者**无法直接窃取到用户的信息**（Cookie，Header，网站内容等），仅仅是冒用Cookie中的信息。
那么我们可以利用这一点，将所有的用户请求都携带一个攻击者无法拿到的 Token ，服务器通过验证这个 Token 来判断是否被 CSRF

1. 用户打开页面的时候，服务器生成一个加密过的 token，token **不能放在 cookie 中**，否则依旧会被盗用，可以放在服务器的 Session 中
1. 页面加载的时候，js 遍历 DOM 树，给 a 标签，form 标签加上 token
1. 页面加载后动态生成的 HTML，需要手动添加 token
1. 页面提交的请求的时候，携带这个 token，以便后台验证



但是这种方式有一些**弊端**：

- 在 **分布式集群** 中，由于 Session 默认存储在单机服务器内存中，因此在分布式环境下同一个用户发送的多次 HTTP 请求可能会先后落到不同的服务器上，导致**后面发起的 HTTP 请求无法拿到之前的 HTTP 请求存储在服务器中的 Session 数据**，因此分布式集群中可能需要用到 Redis 等公共空间来存储
- 后端需要对每个接口进行 token 验证，**工作量很大且容易遗漏**
#### 双重 Cookie 验证
根据 CSRF 攻击不能获取到用户 Cookie 的特点，我们使用如下方法：

1. 用户访问网页时，像请求的域名注入一个随机字符串 cookie，比如 `csrfcookie=qwer` 
1. 在正常发起请求时，取出这个 cookie，拼接到参数中 `POST https://www.a.com/comment?csrfcookie=qwer` 
1. 后端验证是否参数与 cookie 中的字段是否一致



但是这个也有 **弊端** ：

- **任何跨域在没有设置都会导致前端无法获取 cookie 中的字段**，**而在 cookie 没有设置** [`domain`](https://zh.javascript.info/cookie#domain)  属性的时候，**子域也无法拿到 cookie**。比如 `a.com` 向 `api.a.com` 发请求。
- 而如果设置了 `domain` 属性，然后子域 `api.a.com` 被 **XSS 攻击** 了，那么对方就可以拿到我们的 cookie。
#### [samesite](https://zh.javascript.info/cookie#samesite) Cookie 属性
**一、samesite = strict**
只要是来自非同一网站，那么设置了 `samesite=strict` 的 cookie，一定不会被发送
**二、samesite = lax**
假如这个请求是这种请求（改变了当前页面或者打开了新页面）且同时是个GET请求，则这个Cookie可以作为第三方Cookie。


举个例子， `a.com` 向 `b.com` 发送了一个请求， `b.com` 有如下 cookie 
```
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```
当用户从 `a.com` 点击链接进入 `b.com` 时，foo 这个 Cookie 不会被包含在 Cookie response 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 `a.com` 发起的对 `b.com` 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。
### 防止网站被利用
对于来自黑客自己的网站，我们无法防护。但对其他情况，那么如何防止自己的网站被利用成为攻击的源头呢？

- 严格管理所有的上传接口，防止任何预期之外的上传内容（例如HTML）。
- 添加Header `X-Content-Type-Options: nosniff` 防止黑客上传HTML内容的资源（例如图片）被解析为网页。
- 对于用户上传的图片，进行转存或者校验。不要直接使用用户填写的图片链接。
- 当前用户打开其他用户填写的链接时，需告知风险（这也是很多论坛不允许直接在内容中发布外域链接的原因之一，不仅仅是为了用户留存，也有安全考虑）。
