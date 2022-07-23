(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{518:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"背景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),a("p",[t._v("昨天在尝试二开某国产工作流引擎的时候，在 iframe 子窗口和父窗口传参通讯的时候，遇到了")]),t._v(" "),a("blockquote",[a("p",[t._v('Blocked a frame with origin "http://www.xxx.com" from accessing a cross-origin frame.')])]),t._v(" "),a("p",[t._v("的问题，看起来是因为 iframe 窗口间通信跨域，面向谷歌编程后处理如下：")]),t._v(" "),a("h2",{attrs:{id:"解决方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决方法"}},[t._v("#")]),t._v(" 解决方法")]),t._v(" "),a("ul",[a("li",[t._v("父窗口中：")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发送消息")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" frame "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'your-frame-id'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nframe"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("contentWindow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("postMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*这里可以传任何信息*/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("fn"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"save"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://your-second-site.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 接收消息")]),t._v("\nwindow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'message'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 检查消息是否来自你的目标子 site")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("origin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("startsWith")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://your-second-site.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// event.data: Save() 的返回值")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),a("ul",[a("li",[t._v("子窗口")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'message'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 建议这里进行发行信息的域的判断 ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("origin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("startsWith")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://your-first-site.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n     \t "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// event.data: {fn:"save"}')]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fn"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Save"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里执行了子窗口的 Save() 函数，并将函数的返回值返回回去，'*'代表不限制发送给哪个 site")]),t._v("\n        \twindow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("postMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里用来处理一些不是你目标 site 传来的信息")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("注意，这里的消息是异步发送的，postMessage 发送后不负责接收返回值，如果有后续处理注意异步情况")]),t._v(" "),a("h2",{attrs:{id:"语法分析-window-postmessage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#语法分析-window-postmessage"}},[t._v("#")]),t._v(" 语法分析 window.postMessage")]),t._v(" "),a("p",[t._v("根据 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN"),a("OutboundLink")],1),t._v(" 的介绍")]),t._v(" "),a("blockquote",[a("p",[t._v("**"),a("strong",[t._v("window.postMessage()")]),t._v(" **方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Document.domain")]),a("OutboundLink")],1),t._v("设置为相同的值) 时，这两个脚本才能相互通信。**"),a("strong",[t._v("window.postMessage()")]),t._v(" **方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。")])]),t._v(" "),a("p",[a("strong",[t._v("otherWindow.postMessage(message, targetOrigin, [transfer]);")]),a("br")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("otherWindow")]),t._v("其他窗口的一个引用，比如iframe的contentWindow属性、执行"),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/DOM/window.open",target:"_blank",rel:"noopener noreferrer"}},[t._v("window.open"),a("OutboundLink")],1),t._v("返回的窗口对象、或者是命名过或数值索引的"),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/DOM/window.frames",target:"_blank",rel:"noopener noreferrer"}},[t._v("window.frames"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("li",[a("code",[t._v("message")]),t._v("将要发送到其他 window的数据。它将会被"),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/DOM/The_structured_clone_algorithm",target:"_blank",rel:"noopener noreferrer"}},[t._v("结构化克隆算法"),a("OutboundLink")],1),t._v("序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。")]),t._v(" "),a("li",[a("code",[t._v("targetOrigin")]),t._v('通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用postMessage传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的第三方截获。'),a("em",[a("em",[t._v("如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的targetOrigin，而不是")]),t._v("。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。")]),t._v("*")]),t._v(" "),a("li",[a("code",[t._v("_**transfer**_")]),t._v("  **"),a("em",[t._v("可选")]),t._v(" ** 是一串和message 同时传递的 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Transferable",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Transferable")]),a("OutboundLink")],1),t._v(" 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。")])]),t._v(" "),a("h2",{attrs:{id:"跨域情况补充"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跨域情况补充"}},[t._v("#")]),t._v(" 跨域情况补充")]),t._v(" "),a("p",[t._v("如果网页本身地址是： "),a("a",{attrs:{href:"http://www.example.com/home/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://www.example.com/home/index.html"),a("OutboundLink")],1),a("br"),t._v("以下是各种情况是否跨域：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("URL                                             RESULT \nhttp://www.example.com/home/other.html       -> Success \nhttp://www.example.com/dir/inner/another.php -> Success \nhttp://www.example.com:80                    -> Success (default port for HTTP) \nhttp://www.example.com:2251                  -> Failure: different port \nhttp://data.example.com/dir/other.html       -> Failure: different hostname \nhttps://www.example.com/home/index.html:80   -> Failure: different protocol\nftp://www.example.com:21                     -> Failure: different protocol & port \nhttps://google.com/search?q=james+bond       -> Failure: different protocol, port & hostname\n")])])]),a("br")])}),[],!1,null,null,null);s.default=e.exports}}]);