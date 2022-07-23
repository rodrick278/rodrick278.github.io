---
title: babel强化
date: 2022-07-23
categories:
 - 前端
tags:
 - Babel
---

## 前言
babel主要用于做代码的静态分析, 所有的处理转换变化基本都来源于各种各样的plugin, 本次的重点也是在于强化对于babel插件的认识和使用.
### 再说AST
AST, 抽象语法树, babel的分析能力基本完全依赖于它, babel的AST不是一个标准的[ES tree](https://github.com/estree/estree), 具体的标准在[这里](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md).<br />一般我们会借助 [https://astexplorer.net/](https://astexplorer.net/)  来协助分析AST的内容, 比如<br /> `function fn(str){return str + "end"}` <br />会被转换为:
```json
{
  "type": "Program",
  "start": 0,
  "end": 39,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 39,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 11,
        "name": "fn"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 12,
          "end": 15,
          "name": "str"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 39,
        "body": [
          {
            "type": "ReturnStatement",
            "start": 19,
            "end": 37,
            "argument": {
              "type": "BinaryExpression",
              "start": 26,
              "end": 37,
              "left": {
                "type": "Identifier",
                "start": 26,
                "end": 29,
                "name": "str"
              },
              "operator": "+",
              "right": {
                "type": "Literal",
                "start": 32,
                "end": 37,
                "value": "end",
                "raw": "\"end\""
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```
可以发现,主要用来描述的结构属性大体有这些:
```javascript

  "body": [
    {
      "type": "",
      "start": ,
      "end": ,
      "id": {},
      "params": [],
      "argument":{},
    }
  ],

```
type 主要是描述节点的类型,比如:  "FunctionDeclaration"，"Identifier"，或 "BinaryExpression". 后面我们会依赖他来判断对不同类型节点做处理<br />其他的比如 strart/end 描述位置, argument表示参数,operator标识操作符 等等
## babel的处理过程
基本处理过程就是**解析（parse），转换（transform），生成（generate）**,每一个过程都会对应一个babel的插件,这里就这三个插件我们来研究一下
### 解析
解析的过程分成**词法分析**和**语法分析 **<br />词法分析是将静态的代码转换为tokens令牌流, 比如 `n * n`
```javascript
[
  { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
  ...
]
```
经过词法分析的令牌流对每一个令牌有一个type属性用来描述该节点<br />而语法分析阶段就是将令牌流转换为 AST 的过程<br />这个阶段的过程: 静态代码 -> tokens -> AST
#### @babel/parser
@babel/parser (以前是 babylon) 是babel提供的基于 acorn 的一个 AST 转换库(webpack的AST生成也是基于acorn), 让我们简单试用一下:
```javascript
const babelParser = require("@babel/parser");

const code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: [], // default: [] can use ["jsx",......]
});

/**
 * use options to traverse JSX
 */
// const code = `<div>{123}</div>`;

// const ast = babelParser.parse(code,{
//   sourceType: "module", // default: "script"
//   plugins: ["jsx"] // default: [] can use ["jsx",......]
// });

console.log(ast.program.body);

/** 打印结果
[
  Node {
    type: 'FunctionDeclaration',
    start: 0,
    end: 38,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: Node {
      type: 'Identifier',
      start: 9,
      end: 15,
      loc: [SourceLocation],
      name: 'square'
    },
    generator: false,
    async: false,
    params: [ [Node] ],
    body: Node {
      type: 'BlockStatement',
      start: 19,
      end: 38,
      loc: [SourceLocation],
      body: [Array],
      directives: []
    }
  }
]
*/
```
还可以利用option参数配置jsx等, sourceType 可以是 "module" 或者 "script"， "module" 将会在严格模式下解析并且允许模块定义(import/export)，"script" 则不会。
```javascript
parse(code, {
  sourceType: "module", // default: "script"
  plugins: ["jsx"] // default: []
});
```
### 转换
转换阶段对于开发人员是一个比较重要的阶段, 比如 jsx/ts/ES6+ 代码的转换,都是发生在这个阶段, 这个阶段也是各个插件的处理阶段,转换的过程是一个深度遍历的过程, 在遍历AST的时候,每个节点都会经过进出两个阶段:
```javascript
Identifier: {
  enter(path) {
    console.log("Entered!");
  },
  exit(path) {
    console.log("Exited!");
  }
}
```
每次进出节点的时候, 我们接收的第一个参数是path, **path表示的是当前节点所在的这个路径, 而不是节点本身**, 举个例子:
```javascript
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  ...
}
```
如上的这个AST, 如果我们打印一下 path 的keys, 可以看到有很多属性, 包括本身的节点 node, 父节点 parent, 作用域 scope 等, 还有一些增删改节点的方法属性也在path中
```javascript
Identifier: {
  enter(path) {
    console.log(Object.keys(path));
  },
},
/**
  [
  'contexts',  'state',
  'opts',      '_traverseFlags',
  'skipKeys',  'parentPath',
  'container', 'listKey',
  'key',       'node',
  'type',      'parent',
  'hub',       'data',
  'context',   'scope'
]
*/
```
#### @babel/traverse
@babel/traverse 就是用来转换的官方提供的库, 接下来利用他来完善一下之前的例子:
```javascript
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse");

const code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: [], // default: [] can use ["jsx",......]
});

/**
 * use options to traverse JSX
 */
// const code = `<div>{123}</div>`;

// const ast = babelParser.parse(code,{
//   sourceType: "module", // default: "script"
//   plugins: ["jsx"] // default: [] can use ["jsx",......]
// });

console.log(ast.program.body);

traverse.default(ast, {
  FunctionDeclaration(path) {
    path.node.id.name = "x";
  },

  // ======== same as =======
  // FunctionDeclaration: {
  //   enter(path) {
  //     path.node.id.name = "x";
  //   },
  // },
});

```
#### @babel/types
@babel/types 是一个用来处理AST节点的工具库,具体api可以参考[官方文档](https://www.babeljs.cn/docs/babel-types) , 这里用它来修改一下刚才的转换过程:
```javascript
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");

const code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: [], // default: [] can use ["jsx",......]
});

/**
 * use options to traverse JSX
 */
// const code = `<div>{123}</div>`;

// const ast = babelParser.parse(code,{
//   sourceType: "module", // default: "script"
//   plugins: ["jsx"] // default: [] can use ["jsx",......]
// });

console.log(ast.program.body);

traverse.default(ast, {
  // FunctionDeclaration(path) {
  //   path.node.id.name = "x";
  // },

  // ======== same as =======
  // FunctionDeclaration: {
  //   enter(path) {
  //     path.node.id.name = "x";
  //   },
  // },

  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});

```


### 生成
生成阶段就是将转换后的AST再创建为代码的过程,这个阶段同时会创建sourceMap
#### @babel/generator
第二个参数可以传递[各种参数]()
```javascript
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");
const generator = require("@babel/generator");

let code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: [], // default: [] can use ["jsx",......]
});

/**
 * use options to traverse JSX
 */
// const code = `<div>{123}</div>`;

// const ast = babelParser.parse(code,{
//   sourceType: "module", // default: "script"
//   plugins: ["jsx"] // default: [] can use ["jsx",......]
// });

console.log(ast.program.body);

/**
 * traverse
 */
traverse.default(ast, {
  // FunctionDeclaration(path) {
  //   path.node.id.name = "x";
  // },

  // ======== same as =======
  // FunctionDeclaration: {
  //   enter(path) {
  //     path.node.id.name = "x";
  //   },
  // },

  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  },
});

/**
 * generator
 */
const result = generator.default(
  ast,
  {
    /* options */
    sourceMaps: true,
  },
  code
);

console.log(result);

/** 
{
  code: 'function square(x) {\n  return x * x;\n}',
  decodedMap: {
    version: 3,
    file: undefined,
    names: [],
    sourceRoot: undefined,
    sources: [ undefined ],
    sourcesContent: [ 'function square(n) {\n  return n * n;\n}' ],
    mappings: []
  },
  map: [Getter/Setter],
  rawMappings: [Getter/Setter]
}
*/

```
## 编写一个插件
上面我们说了babel的各个过程和每个阶段提供的不同的包的独立使用, 那么在实际编写babel插件的时候,如何把上面的过程融入进去

```javascript
export default function ({ types: t }) {
  return {
    visitor: {
      BinaryExpression: {
        enter(path) {
          // if (path.node.left.name === 'x') return
          // 判断当前的 BinaryExpression 是不是接在一个 return 后面
          if (t.isReturnStatement(path.parent)) {
            path.replaceWith(
              t.binaryExpression(path.node.operator, t.identifier("x"), t.identifier("x"))
            );
            // 因为我们使用替换当前 binaryExpression 使用的是也是binaryExpression,所以会无线触发enter方法
            // 所以在替换完成后加上 path.skip()
            // 或者是在一开始加上 if (path.node.left.name === 'x') return
            path.skip()
          }
        },
      },
    },
  };
}
```

代码git: [https://github.com/rodrick278/my-babel-plugin](https://github.com/rodrick278/my-babel-plugin)
## 参考:

- [babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [astexplorer](https://astexplorer.net/)
