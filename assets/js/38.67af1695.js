(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{524:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"可选链"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#可选链"}},[t._v("#")]),t._v(' 可选链"?."')]),t._v(" "),a("blockquote",[a("p",[t._v("参考"),a("a",{attrs:{href:"https://zh.javascript.info/",target:"_blank",rel:"noopener noreferrer"}},[t._v("现代 JavaScript 教程"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"为了解决什么问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为了解决什么问题"}},[t._v("#")]),t._v(" 为了解决什么问题")]),t._v(" "),a("p",[t._v("可能见过这种情况：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这个 user 恰巧没有 address")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("street"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error!")]),t._v("\n")])])]),a("p",[t._v("或者这种情况：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果 querySelector(...) 的结果为 null，则会报错")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" html "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'.my-element'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"可选链-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#可选链-2"}},[t._v("#")]),t._v(" 可选链")]),t._v(" "),a("h3",{attrs:{id:"在可选链之前如何防止这种问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在可选链之前如何防止这种问题"}},[t._v("#")]),t._v(" 在可选链之前如何防止这种问题")]),t._v(" "),a("p",[t._v("在 JavaScript 这门语言中出现 "),a("code",[t._v("?.")]),t._v(" 前，"),a("code",[t._v("&&")]),t._v(" 运算符常被用来解决这个问题。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// user 没有 address")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("address "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("street "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined（不报错）")]),t._v("\n")])])]),a("h3",{attrs:{id:"现在的解决方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#现在的解决方法"}},[t._v("#")]),t._v(" 现在的解决方法")]),t._v(" "),a("p",[a("strong",[t._v("为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 "),a("code",[t._v("null")]),t._v(" 也不是 "),a("code",[t._v("undefined")]),t._v("，那么它就“存在”。")]),t._v("\n下面这是一种安全地访问 "),a("code",[t._v("user.address.street")]),t._v(" 的方式：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// user 没有 address")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("street "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined （不报错）")]),t._v("\n")])])]),a("p",[t._v("以 "),a("code",[t._v("user?.address")]),t._v(" 的方式来读取 "),a("code",[t._v("address")]),t._v(" 是可行的，即使对象 "),a("code",[t._v("user")]),t._v(" 不存在：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("address "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("street "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n")])])]),a("p",[t._v("请注意："),a("code",[t._v("?.")]),t._v(" 语法使其前面的值成为可选值，但不会对其后面的起作用。\n在上面的例子中，"),a("code",[t._v("user?.")]),t._v(" 只允许 "),a("code",[t._v("user")]),t._v(" 为 "),a("code",[t._v("null/undefined")]),t._v("。\n另一方面，如果 "),a("code",[t._v("user")]),t._v(" 存在，那么它必须具有 "),a("code",[t._v("user.address")]),t._v(" 属性，否则 "),a("code",[t._v("user?.address.street")]),t._v(" 在第二个点符号处会报错。")]),t._v(" "),a("h3",{attrs:{id:"注意"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[t._v("#")]),t._v(" 注意")]),t._v(" "),a("ul",[a("li",[t._v("⚠"),a("strong",[t._v("不要过度使用可选链")])])]),t._v(" "),a("p",[t._v("我们应该只将 "),a("code",[t._v("?.")]),t._v(" 使用在一些东西可以不存在的地方。\n例如，如果根据我们的代码逻辑，"),a("code",[t._v("user")]),t._v(" 对象必须存在，但 "),a("code",[t._v("address")]),t._v(" 是可选的，那么 "),a("code",[t._v("user.address?.street")]),t._v(" 会更好。\n所以，如果 "),a("code",[t._v("user")]),t._v(" 恰巧因为失误变为 undefined，我们会知道并修复这个失误。否则，"),a("strong",[t._v("代码中的 error 在不恰当的地方被消除了，这会导致调试更加困难。")])]),t._v(" "),a("ul",[a("li",[t._v("⚠ "),a("code",[t._v("?.")]),t._v(" ** 前的变量必须已声明**")])]),t._v(" "),a("p",[t._v("如果未声明变量 "),a("code",[t._v("user")]),t._v("，那么 "),a("code",[t._v("user?.anything")]),t._v(" 会触发一个错误")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ReferenceError: user is not defined")]),t._v("\nuser"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("code",[t._v("?.")]),t._v(" 前的变量必须已通过 "),a("code",[t._v("let/const/var user")]),t._v(" 进行声明。可选链仅适用于已声明的变量。")]),t._v(" "),a("h3",{attrs:{id:"短路效应"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#短路效应"}},[t._v("#")]),t._v(" 短路效应")]),t._v(" "),a("p",[t._v("正如前面所说的，如果 "),a("code",[t._v("?.")]),t._v(" 左边部分不存在，就会立即停止运算（“短路效应”）。\n所以，如果后面有任何函数调用或者副作用，它们均不会执行：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nuser"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sayHi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 没事发生")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0，值没有增加")]),t._v("\n")])])]),a("h3",{attrs:{id:"其它情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其它情况"}},[t._v("#")]),t._v(" 其它情况：?.()，?.[]")]),t._v(" "),a("p",[t._v("可选链 "),a("code",[t._v("?.")]),t._v(" 不是一个运算符，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。\n例如，将 "),a("code",[t._v("?.()")]),t._v(" 用于调用一个可能不存在的函数。\n在下面这段代码中，有些用户具有 "),a("code",[t._v("admin")]),t._v(" 方法，而有些没有：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("admin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"I am admin"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nuser1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("admin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// I am admin")]),t._v("\nuser2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("admin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("在这两行代码中，我们首先使用点符号 "),a("code",[t._v(".")]),t._v(" 来获取 "),a("code",[t._v("admin")]),t._v(" 属性，因为用户对象一定存在，因此可以安全地读取它。\n然后 "),a("code",[t._v("?.()")]),t._v(" 会检查它左边的部分：如果 admin 函数存在，那么就调用运行它（对于 "),a("code",[t._v("user1")]),t._v("）。否则（对于 "),a("code",[t._v("user2")]),t._v("）运算停止，没有错误。")]),t._v(" "),a("p",[t._v("如果我们想使用方括号 "),a("code",[t._v("[]")]),t._v(" 而不是点符号 "),a("code",[t._v(".")]),t._v(" 来访问属性，语法 "),a("code",[t._v("?.[]")]),t._v(" 也可以使用。跟前面的例子类似，它允许从一个可能不存在的对象上安全地读取属性。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  firstName"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设，我们不能授权此用户")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"firstName"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// John")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" user1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("something"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("not"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("existing"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n")])])]),a("p",[t._v("此外，我们还可以将 "),a("code",[t._v("?.")]),t._v(" 跟 "),a("code",[t._v("delete")]),t._v(" 一起使用：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果 user 存在，则删除 user.name")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("⚠ 我们可以使用 "),a("code",[t._v("?.")]),t._v(" 来安全地读取或删除，但不能写入")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 下面这段代码的想法是要写入 user.name，如果 user 存在的话")]),t._v("\n\nuser"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?.")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error，不起作用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// because it evaluates to undefined = "John"')]),t._v("\n")])])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("可选链 "),a("code",[t._v("?.")]),t._v(" 语法有三种形式：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("obj?.prop")]),t._v(" —— 如果 "),a("code",[t._v("obj")]),t._v(" 存在则返回 "),a("code",[t._v("obj.prop")]),t._v("，否则返回 "),a("code",[t._v("undefined")]),t._v("。")]),t._v(" "),a("li",[a("code",[t._v("obj?.[prop]")]),t._v(" —— 如果 "),a("code",[t._v("obj")]),t._v(" 存在则返回 "),a("code",[t._v("obj[prop]")]),t._v("，否则返回 "),a("code",[t._v("undefined")]),t._v("。")]),t._v(" "),a("li",[a("code",[t._v("obj?.method()")]),t._v(" —— 如果 "),a("code",[t._v("obj")]),t._v(" 存在则调用 "),a("code",[t._v("obj.method()")]),t._v("，否则返回 "),a("code",[t._v("undefined")]),t._v("。")])]),t._v(" "),a("p",[t._v("正如我们所看到的，这些语法形式用起来都很简单直接。"),a("code",[t._v("?.")]),t._v(" 检查左边部分是否为 "),a("code",[t._v("null/undefined")]),t._v("，如果不是则继续运算。\n"),a("code",[t._v("?.")]),t._v(" 链使我们能够安全地访问嵌套属性。\n但是，我们应该谨慎地使用 "),a("code",[t._v("?.")]),t._v("，仅在当左边部分不存在也没问题的情况下使用为宜。")])])}),[],!1,null,null,null);s.default=n.exports}}]);