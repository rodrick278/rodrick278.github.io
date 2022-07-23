(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{517:function(t,s,a){"use strict";a.r(s);var n=a(2),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"基本用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本用法"}},[t._v("#")]),t._v(" 基本用法")]),t._v(" "),a("p",[t._v("先看明白下面：")]),t._v(" "),a("p",[a("strong",[t._v("例 1")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8618-20170316165541854-1574871496.png",alt:"img"}})]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("obj.objAge;  // 17\nobj.myFun()  // 小张年龄 undefined\n")])])]),a("p",[a("strong",[t._v("例 2")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8327-20170316170324541-406227186.png",alt:"img"}})]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("shows()  // 盲僧　\n")])])]),a("p",[t._v("比较一下这两者 this 的差别，第一个打印里面的 this 指向 obj，第二个全局声明的 shows() 函数 this 是 window ；")]),t._v(" "),a("p",[a("strong",[t._v("1，call()、apply()、bind() 都是用来重定义 this 这个对象的！")])]),t._v(" "),a("p",[t._v("如：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://www.runoob.com/wp-content/uploads/2018/08/1535346409-8172-20170316172537651-1643313633.png",alt:"img"}})]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("obj.myFun.call(db)；　　　　// 德玛年龄 99\nobj.myFun.apply(db);　　　 // 德玛年龄 99\nobj.myFun.bind(db)();　　　// 德玛年龄 99\n")])])]),a("p",[t._v("以上出了 bind 方法后面多了个 () 外 ，结果返回都一致！")]),t._v(" "),a("p",[t._v("由此得出结论，bind 返回的是一个新的函数，你必须调用它才会被执行。")]),t._v(" "),a("p",[a("strong",[t._v("2，对比call 、bind 、 apply 传参情况下")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://www.runoob.com/wp-content/uploads/2018/08/1535346409-7922-20170316173631526-1279562612.png",alt:"img"}})]),t._v(" "),a("p"),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("obj.myFun.call(db,'成都','上海')；　　　　 // 德玛 年龄 99  来自 成都去往上海\nobj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海  \nobj.myFun.bind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海\nobj.myFun.bind(db,['成都','上海'])();　　 // 德玛 年龄 99  来自 成都, 上海去往 undefined\n")])])]),a("p"),t._v(" "),a("p",[t._v("微妙的差距！")]),t._v(" "),a("p",[t._v("从上面四个结果不难看出:")]),t._v(" "),a("p",[t._v("call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：")]),t._v(" "),a("p",[t._v("call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 "),a("strong",[t._v("obj.myFun.call(db,'成都', ... ,'string' )")]),t._v("。")]),t._v(" "),a("p",[t._v("apply 的所有参数都必须放在一个数组里面传进去 "),a("strong",[t._v("obj.myFun.apply(db,['成都', ..., 'string' ])")]),t._v("。")]),t._v(" "),a("p",[t._v("bind 除了返回是函数以外，它 的参数和 call 一样。")]),t._v(" "),a("p",[t._v("当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！")]),t._v(" "),a("h2",{attrs:{id:"关于-this-丢失"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于-this-丢失"}},[t._v("#")]),t._v(" 关于 this 丢失")]),t._v(" "),a("p",[t._v("加入我们有如下情况：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  myname"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("say")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("hi,")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myname"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("say"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("一秒后会打印： "),a("code",[t._v("hi,undefined")]),t._v(" ，为什么会这样呢，其实是因为 "),a("code",[t._v("user.say")]),t._v(" 作为回调传入 "),a("code",[t._v("setTimeout")]),t._v(" 的时候，上下文就不是 "),a("code",[t._v("user")]),t._v(" 了，相当于是：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  myname"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("say")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("hi,")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myname"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" f "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("say\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("所以我们才需要用包装器包装：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  myname"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("say")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("hi,")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("myname"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("say")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=p.exports}}]);