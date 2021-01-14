---
title: HTTP缓存
date: 2021-01-14
categories:
 - 前端
tags:
 - http
---

## 强缓存
### 概念
**强缓存是向客户端查看是否存在缓存，若存在即使用，不存在则请求服务器。**<br />包含在 `response-header` 中。
### 实现方法
#### 1. Expires
**HTTP/1.0** 使用，它的值是**第一次请求时**服务器返回的缓存到期时间，在再次发起该请求时，如果客户端时间小于这个时间，则直接使用缓存。<br />**缺点：** 由于时间是服务端返回的，如果客户端与服务端时间不一致，则会出现问题。
```
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```
#### 2. Cache-Control
**HTTP/1.1** 使用，他可以设置几种值用来设定缓存规则：

- public：所有内容都将被缓存（客户端和代理服务器都可缓存）<br />
- private：所有内容只有客户端可以缓存，Cache-Control的默认取值<br />
- no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定<br />
- no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存<br />
- max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效
```
Cache-Control:public, max-age=31536000
```
### 判断命中
图源来自 [掘金-浅聊HTTP缓存 (HTTP Cache)-Neo_Huang](https://juejin.cn/post/6844903717574017031) <br />![](https://gitee.com/rodrick278/img/raw/master/img/1610589582370-dcf756b2-0943-45d3-8008-dd652a4eb5a8.webp)<br />状态码为**灰色& 200** 的请求则代表使用了强制缓存，请求对应的 S**ize 值则代表该缓存存放的位置。**
### 总结
`cache-control` 优先级比 `expires` 高。 `expires` 会存在两端时间不统一问题。
## 协商缓存
**协商缓存**指客户端**第一次发起请求时**服务端会返回一个标识，客户端记录下后，**下次请求**客户端会携带这个缓存标识向服务器发送请求，由服务器根据标识判断是否使用缓存，这就是“协商”的过程。<br />在强缓存的 `cache-control` 设置了 `no-cache` 时会使用协商缓存。
### 实现方法
由于协商缓存过程中客户端会携带标识，所以所有的协商缓存都有**客户端/服务端这样成对的 header：**
#### 1. If-Modified-Since/Last-modified
`Last-Modified` 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间。
```
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT 
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```
#### 2. If-None-Match/Etag
`Etag` 是服务器第一次响应时返回的一个当前资源的唯一标识，当客户端再次发起时， `If-none-Match` 携带这个 `Etag` 值询问服务器，服务器会根据 `If-None-Match` 的字段值与该资源在服务器的 `Etag` 值做对比，一致则返回 304，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为 200。
```
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
ETag: W/"0815"
```
`W/` 可选 `W/` （区分大小写）表示使用弱验证程序。弱验证器很容易生成，但对于比较来说却不太有用。强大的验证器是进行比较的理想选择，但可能非常难以高效生成。
### 判断命中
命中返回 304。
## 浏览器操作影响
图源来自：[Web缓存机制系列2 – Web浏览器的缓存机制 - Alloy Team](http://www.alloyteam.com/2012/03/web-cache-2-browser-cache/)<br />![](https://gitee.com/rodrick278/img/raw/master/img/1610589582370-dcf756b2-0943-45d3-8008-dd652a4eb5a8.webp)
## 浏览器缓存的控制
### 使用 HTML Meta 标签
Web 开发者可以在 HTML 页面的<head> 节点中加入<meta> 标签，代码如下：
```html
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
```
上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。使用上很简单，但只有部分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析 HTML 内容本身。
## 相关字段总结
图源来自：[Web缓存机制系列2 – Web浏览器的缓存机制 - Alloy Team](http://www.alloyteam.com/2012/03/web-cache-2-browser-cache/)<br />![](https://gitee.com/rodrick278/img/raw/master/img/http-header1.png)
