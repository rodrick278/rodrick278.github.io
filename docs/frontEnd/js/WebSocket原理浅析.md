---
title: WebSocket原理浅析
date: 2020-08-31
categories:
 - 前端
tags:
 - WebSocket
publish: true
---




## 前言

在 WebSocket 出现之前，大多数情况下是通过客户端发起轮询来拿到服务端实时更新的数据，因为 HTTP1.x 协议有一个缺陷就是通信只能由客户端发起，服务端没法主动给客户端推送。这种方式在对实时性要求比较高的场景下，比如即时通讯、即时报价等，显然会十分低效，体验也不好。为了解决这个问题，便出现了 WebSocket 协议，实现了客户端和服务端双向通信的能力。首先我们先了解下轮询实现推送的方式。

## 短轮询（Polling）

短轮询的实现思路就是浏览器端每隔几秒钟向服务器端发送 HTTP 请求，服务端在收到请求后，不论是否有数据更新，都直接进行响应。在服务端响应完成，就会关闭这个 TCP 连接，代码实现也最简单，就是利用 XHR ， 通过 setInterval 定时向后端发送请求，以获取最新的数据。

```
setInterval(function() {
  fetch(url).then((res) => {
      // success code
  })
}, 3000);
复制代码
```

- 优点：实现简单。
- 缺点：会造成数据在一小段时间内不同步和大量无效的请求，安全性差、浪费资源。

## 长轮询（Long-Polling）

客户端发送请求后服务器端不会立即返回数据，服务器端会阻塞请求连接不会立即断开，直到服务器端有数据更新或者是连接超时才返回，客户端才再次发出请求新建连接、如此反复从而获取最新数据。大致效果如下：



![长轮询示意图](https://user-gold-cdn.xitu.io/2019/9/29/16d7a81140d86334?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



客户端代码如下：

```
function async() {
    fetch(url).then((res) => {
    	async();
    	// success code
	}).catch(() => {
		// 超时
        async();
	})
}
复制代码
```

- 优点：比 Polling 做了优化，有较好的时效性。
- 缺点：保持连接挂起会消耗资源，服务器没有返回有效数据，程序超时。

## WebSocket

前面提到的短轮询（Polling）和长轮询（Long-Polling）， 都是先由客户端发起 Ajax 请求，才能进行通信，走的是 HTTP 协议，服务器端无法主动向客户端推送信息。

当出现类似体育赛事、聊天室、实时位置之类的场景时，轮询就显得十分低效和浪费资源，因为要不断发送请求，连接服务器。WebSocket 的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力。

没用过 WebSocket 的人，可能会以为它是个什么高深的技术。其实不然，WebSocket 常用的 API 不多也很容易掌握，不过在介绍如何使用之前，让我们先看看它的通信原理。

### 通信原理

当客户端要和服务端建立 WebSocket 连接时，在客户端和服务器的握手过程中，客户端首先会向服务端发送一个 HTTP 请求，包含一个 Upgrade 请求头来告知服务端客户端想要建立一个 WebSocket 连接。

在客户端建立一个 WebSocket 连接非常简单：

```
let ws = new WebSocket('ws://localhost:9000');
复制代码
```

类似于 HTTP 和 HTTPS，ws 相对应的也有 wss 用以建立安全连接，本地已 ws 为例。这时的请求头如下：

```
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: Upgrade	// 表示该连接要升级协议
Cookie: _hjMinimizedPolls=358479; ts_uid=7852621249; CNZZDATA1259303436=1218855313-1548914234-%7C1564625892; csrfToken=DPb4RhmGQfPCZnYzUCCOOade; JSESSIONID=67376239124B4355F75F1FC87C059F8D; _hjid=3f7157b6-1aa0-4d5c-ab9a-45eab1e6941e; acw_tc=76b20ff415689655672128006e178b964c640d5a7952f7cb3c18ddf0064264
Host: localhost:9000
Origin: http://localhost:9000
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: 5fTJ1LTuh3RKjSJxydyifQ==		// 与响应头 Sec-WebSocket-Accept 相对应
Sec-WebSocket-Version: 13	// 表示 websocket 协议的版本
Upgrade: websocket	// 表示要升级到 websocket 协议
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
复制代码
```

响应头如下：

```
Connection: Upgrade
Sec-WebSocket-Accept: ZUip34t+bCjhkvxxwhmdEOyx9hE=
Upgrade: websocket
复制代码
```





![img](https://user-gold-cdn.xitu.io/2019/11/20/16e88fa8f23df259?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



此时响应行（General）中可以看到状态码 status code 是 101 Switching Protocols ， 表示该连接已经从 HTTP 协议转换为 WebSocket 通信协议。 转换成功之后，该连接并没有中断，而是建立了一个全双工通信，后续发送和接收消息都会走这个连接通道。

注意，请求头中有个 Sec-WebSocket-Key 字段，和相应头中的 Sec-WebSocket-Accept 是配套对应的，它的作用是提供了基本的防护，比如恶意的连接或者无效的连接。Sec-WebSocket-Key 是客户端随机生成的一个 base64 编码，服务器会使用这个编码，并根据一个固定的算法：

```
GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";    //  一个固定的字符串
accept = base64(sha1(key + GUID));	// key 就是 Sec-WebSocket-Key 值，accept 就是 Sec-WebSocket-Accept 值
复制代码
```



其中 GUID 字符串是 [RFC6455](https://tools.ietf.org/html/rfc6455#section-5.5.2) 官方定义的一个固定字符串，不得修改。

客户端拿到服务端响应的 Sec-WebSocket-Accept 后，会拿自己之前生成的 Sec-WebSocket-Key 用相同算法算一次，如果匹配，则握手成功。然后判断 HTTP Response 状态码是否为 101（切换协议），如果是，则建立连接，大功告成。

### 实现简单单聊

下面来实现一个纯文字消息类型的一对一聊天（单聊）功能，废话不多说，直接上代码，注意看注释。

客户端：

```
function connectWebsocket() {
    ws = new WebSocket('ws://localhost:9000');
    // 监听连接成功
    ws.onopen = () => {
        console.log('连接服务端WebSocket成功');
        ws.send(JSON.stringify(msgData));	// send 方法给服务端发送消息
    };

    // 监听服务端消息(接收消息)
    ws.onmessage = (msg) => {
        let message = JSON.parse(msg.data);
        console.log('收到的消息：', message)
        elUl.innerHTML += `<li class="b">小秋：${message.content}</li>`;
    };

    // 监听连接失败
    ws.onerror = () => {
        console.log('连接失败，正在重连...');
        connectWebsocket();
    };

    // 监听连接关闭
    ws.onclose = () => {
    	console.log('连接关闭');
    };
};
connectWebsocket();
复制代码
```



从上面可以看到 WebSocket 实例的 API 很容易理解，简单好用，通过 send() 方法可以发送消息，onmessage 事件用来接收消息，然后对消息进行处理显示在页面上。 当 onerror 事件（监听连接失败）触发时，最好进行执行重连，以保持连接不中断。

服务端 Node : （这里使用 [ws ](https://github.com/websockets/ws) 库）

```
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => { 

  // 监听客户端发来的消息
  ws.on('message', (message) => {
    console.log(wss.clients.size);
    let msgData = JSON.parse(message);   
    if (msgData.type === 'open') {
      // 初始连接时标识会话
      ws.sessionId = `${msgData.fromUserId}-${msgData.toUserId}`;
    } else {
      let sessionId = `${msgData.toUserId}-${msgData.fromUserId}`;
      wss.clients.forEach(client => {
        if (client.sessionId === sessionId) {
          client.send(message);	 // 给对应的客户端连接发送消息
        }
      })  
    }
  })

  // 连接关闭
  ws.on('close', () => {
    console.log('连接关闭');  
  });
});
复制代码
```



同理，服务端也有对应的发送和接收的方法。完整示例代码见 [这里](https://github.com/lvbowen/WebSocket)



这样浏览器和服务端就可以愉快的发送消息了，效果如下：



![message](https://user-gold-cdn.xitu.io/2019/11/20/16e86f4da01fc06e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



其中绿色箭头表示发出的消息，红色箭头表示收到的消息。

### 心跳保活

在实际使用 WebSocket 中，长时间不通消息可能会出现一些连接不稳定的情况，这些未知情况导致的连接中断会影响客户端与服务端之前的通信，

为了防止这种的情况的出现，有一种心跳保活的方法：客户端就像心跳一样每隔固定的时间发送一次 ping ，来告诉服务器，我还活着，而服务器也会返回 pong ，来告诉客户端，服务器还活着。ping/pong 其实是一条与业务无关的假消息，也称为心跳包。



可以在连接成功之后，每隔一个固定时间发送心跳包，比如 60s:

```
setInterval(() => {
    ws.send('这是一条心跳包消息');
}, 60000)
```

