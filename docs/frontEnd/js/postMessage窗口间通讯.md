---
title: postMessage窗口间通讯
date: 2020-11-06
categories:
 - 前端
tags:
 - js
---

## 背景
昨天在尝试二开某国产工作流引擎的时候，在 iframe 子窗口和父窗口传参通讯的时候，遇到了
> Blocked a frame with origin "http://www.xxx.com" from accessing a cross-origin frame.

的问题，看起来是因为 iframe 窗口间通信跨域，面向谷歌编程后处理如下：
## 解决方法

- 父窗口中：
```javascript
// 发送消息
const frame = document.getElementById('your-frame-id');
frame.contentWindow.postMessage(/*这里可以传任何信息*/{fn:"save"}, 'http://your-second-site.com');

// 接收消息
window.addEventListener('message', event => {
  // 检查消息是否来自你的目标子 site
  if (event.origin.startsWith('http://your-second-site.com')) {
    // event.data: Save() 的返回值
    console.log(event.data);
  }
});

```

- 子窗口
```javascript
window.addEventListener('message', event => {
    // 建议这里进行发行信息的域的判断 
    if (event.origin.startsWith('http://your-first-site.com')) { 
     	 // event.data: {fn:"save"}
       if(event.data.fn=="Save"){
          // 这里执行了子窗口的 Save() 函数，并将函数的返回值返回回去，'*'代表不限制发送给哪个 site
        	window.parent.postMessage(Save(), '*');
       }
    } else {
        // 这里用来处理一些不是你目标 site 传来的信息
        return; 
    } 
});
```
注意，这里的消息是异步发送的，postMessage 发送后不负责接收返回值，如果有后续处理注意异步情况
## 语法分析 window.postMessage
根据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 的介绍
> ****window.postMessage()** **方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 [`Document.domain`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain)设置为相同的值) 时，这两个脚本才能相互通信。****window.postMessage()** **方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。



**otherWindow.postMessage(message, targetOrigin, [transfer]);**<br />

- `otherWindow`其他窗口的一个引用，比如iframe的contentWindow属性、执行[window.open](https://developer.mozilla.org/en-US/docs/DOM/window.open)返回的窗口对象、或者是命名过或数值索引的[window.frames](https://developer.mozilla.org/en-US/docs/DOM/window.frames)。
- `message`将要发送到其他 window的数据。它将会被[结构化克隆算法](https://developer.mozilla.org/en-US/docs/DOM/The_structured_clone_algorithm)序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。
- `targetOrigin`通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用postMessage传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的第三方截获。**如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的targetOrigin，而不是*。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。**
- `_**transfer**_`  **_可选_ ** 是一串和message 同时传递的 [`Transferable`](https://developer.mozilla.org/zh-CN/docs/Web/API/Transferable) 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。
## 跨域情况补充
如果网页本身地址是： [http://www.example.com/home/index.html](http://www.example.com/home/index.html)<br />以下是各种情况是否跨域：
```
URL                                             RESULT 
http://www.example.com/home/other.html       -> Success 
http://www.example.com/dir/inner/another.php -> Success 
http://www.example.com:80                    -> Success (default port for HTTP) 
http://www.example.com:2251                  -> Failure: different port 
http://data.example.com/dir/other.html       -> Failure: different hostname 
https://www.example.com/home/index.html:80   -> Failure: different protocol
ftp://www.example.com:21                     -> Failure: different protocol & port 
https://google.com/search?q=james+bond       -> Failure: different protocol, port & hostname
```

<br />

