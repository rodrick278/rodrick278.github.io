---
title: markdown作图指南
date: 2020-10-27
categories:
 - 其他
tags:
- markdown
---

本文以Typora 为例

## 一、graph(流程图)

每次作图时，代码以「**graph <布局方向>」**开头，如：

```
graph TB
    ...
    ...
```

布局方向有四种：

- TB（Top Bottom）表示从上向下布局，另外三种是
- BT
- LR（Left Right）
- RL

### 1. 节点画法

#### 1.1 节点类型

1. **圆角矩形**：表示开始和结束

![image](https://gitee.com/rodrick278/img/raw/master/img/1603779004545-9e5e50e1-b0a2-4678-b950-2502ee2d5cee.png)

1. **矩形**：表示过程，也就是整个流程中的一个环节

![image](https://gitee.com/rodrick278/img/raw/master/img/1603779004527-3e362dcf-9a81-4ebc-ab30-7a4bcaa73202.png)

1. **单向箭头线段**：表示流程进行方向

![image](https://gitee.com/rodrick278/img/raw/master/img/1603779004533-95931a13-b16c-46a5-9d2c-253234993b90.jpeg)

1. **菱形**：表示判断、决策

![image](https://gitee.com/rodrick278/img/raw/master/img/1603779004509-6b60610b-7a49-4e24-bb42-20620ccf87c0.jpeg)

1.  **圆形**：表示连接。为避免流程过长或有交叉，可将流程切开，圆形即相当于切口处的连接头（成对出现）

![image](https://gitee.com/rodrick278/img/raw/master/img/1603779004544-75db12f1-717e-4287-bdc7-bab6c5f3bb23.jpeg)

1.  另外还有嵌入在以上符号中的描述文本



#### 1.2 画节点

```
graph TB
    A(开始)
    B[打开冰箱门]
    C{"冰箱小不小？"}
    D((连接))
```



![img](https://gitee.com/rodrick278/img/raw/master/img/0a4256155ad8598c6470a6d169514973.svg)

- A,B,C,D是描述节点的名字，可以理解为变量名，方便后面复用
- 括号是不同图形：

- - () 圆角矩形
  - [] 矩形
  - {} 菱形
  - (()) 圆形



### 2. 完整画图

```
graph TD
        A(作成) --> B[审核] -->CHECK{是否通过} 
        CHECK --> |审核完了| C[承认] --> D[承认完了]
        CHECK --> |却下| A 
        
    start(流程开始) --> SH1[审核1] --> CR[承认]
    start(流程开始) --> SH2[审核2] --> CR[承认] 
    start(流程开始) --> SHX[审核X] --> CR[承认]
    CR[承认] --> END[承认完了]
```

效果：

这里的 `|xxx|` 代表节点的选项 

![img](https://gitee.com/rodrick278/img/raw/master/img/0ea5a8d3afd4fdfb917e7bc3781eea35.svg)

### 3. 其他图形

```
graph TB
  A1-->B1
  A2---B2
  A3--text---B3
  A4--text-->B4
  A6-.-B5
  A6-.->B6
  A7-.text.-B7
  A8-.text.->B8
  A9===B9
  A10==>B10
  A11==text===B11
  A12==text==>B12
  
  A[x]
  B["if(x<0)"]
  C["x=-x"]
  D[return x]
  A-->B-->C-->D
  C-->D
```

![img](https://gitee.com/rodrick278/img/raw/master/img/3c8c5f8e4f619907797eadfd4517a4d1.svg)



## 二、subgraph(子图)

### 1. 格式

```
graph LR
  subgraph g1
    a1-->b1
  end
  subgraph g2
    a2-->b2
  end
```

![img](https://gitee.com/rodrick278/img/raw/master/img/0870675ae4c232ae3c90adfb4516ef74.svg)

**后面的都是复制来的，不常用，需要时回头再来学** 

## 三、sequenceDiagram(序列图)

### 功能

- participant
  参与者，相当先定义模块，可通过设定参与者(participant)的顺序控制展示顺序。
  例如：

```
partcipant A
partcipant B
```



也可以使用别名：

```
sequenceDiagram
  participant A as A dog
  participant B as Bob
  A->B:Hello
```



- note
  注释，格式如下

```
note right of或left of 变量:Text
note over 变量左,变量右 :Text
```

- 循环

```
loop 题目
代码
end
```

- 选择

```
alt 题目
代码
else
代码
end
```

在没有else的情况下使用 opt(option,选择)

```
opt 题目
代码
end
```

例如：

```
sequenceDiagram
　　A->>B: Hello B, how are you?
　　alt is sick
　　　　B->>A:not so good :(
　　else is well
　　　　B->>A:good
　　end
　　opt another
　　　　B->>A:Thanks for asking
　　end
```



- 激活停用
  可以激活`activate`或停用`deactivate`。

```
sequenceDiagram
    Alice->>John: Hello John, how are you?
    activate John
    John-->>Alice: Great!
    deactivate John
```



也可通过在消息箭头后面添加`+`或`-`后缀，这一种快捷方式标记：

```
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    John-->>-Alice: Great!
```



- 平行
  可以显示并行发生的动作。

```
par [题目]
代码
and [题目]
代码
and [题目]
代码
end
sequenceDiagram
  participant A
  participant B
  par A to B
    A->B:Hello
  and A to C
    A->C:Hello
  end
```

### 连线

| 代码 | 形状       |
| ---- | ---------- |
| ->   | 无箭头实线 |
| ->>  | 有箭头实线 |
| -->  | 无箭头虚线 |
| -->> | 有箭头虚线 |
| -x   | 带x实线    |
| --x  | 带x虚线    |

**在必须后面加`:`,以加以注释。**

例如：

```
sequenceDiagram
  A -> B : none
  A ->> B : none
  A --> B : none
  A --> B : none
  A -x B : none
  A --x B : none
```

## 四、gantt(甘特图)

甘特图是一类条形图，由Karol Adamiechi在1896年提出, 而在1910年Henry Gantt也独立的提出了此种图形表示。通常用在对项目终端元素和总结元素的开始及完成时间进行的描述



### 功能

| 代码       | 解释               |
| ---------- | ------------------ |
| title      | 标题               |
| dateFormat | 日期写入格式       |
| axisFormat | 日期输出格式       |
| section    | 模块               |
| done       | 已经完成           |
| Active     | 当前正在进行       |
| Future     | 后续待处理         |
| crit       | 关键阶段           |
| 日期缺失   | 默认从上一项完成后 |

格式基本为：`内容:关键是否,状态,变量,日期`



### 日期写入格式

默认为：`dateFormat YYYY-MM-DD`

| 代码      | 例如           | 解释            |
| --------- | -------------- | --------------- |
| YYYY      | 2020           | 4位年数         |
| YY        | 20             | 2位年数         |
| Q         | 4              | 季度            |
| M或MM     | 1或12          | 月              |
| D或DD     | 1或31          | 日              |
| Do        | 1st或31st      | 序数的日        |
| DDD或DDDD | 1或365         | 年的日          |
| X         | 1410715640.579 | 秒              |
| x         | 1410715640579  | 毫秒            |
| H或HH     | 0或23          | 时              |
| h或hh     | 1或12          | 12时记时法      |
| a或A      | am或pm         | 12时的附加      |
| m或mm     | 0或59          | 分              |
| s或ss     | 0或59          | 秒              |
| S         | 0或9           | 十分之一秒      |
| SS        | 0或99          | 百分之一秒      |
| SSS       | 0或999         | 千分之一秒      |
| Z或ZZ     | +12:00         | 从UTC偏移的时间 |



### 日期输出格式

默认为：`axisFormat %Y-%m-%d`

| 代码 | 解释                                                        |
| ---- | ----------------------------------------------------------- |
| %a   | 星期几的缩写                                                |
| %A   | 完整的工作日名称                                            |
| %b   | 月份的缩写                                                  |
| %B   | 完整的月份名称                                              |
| %c   | 日期和时间如"％a％b％e％H：％M：％S％Y"                     |
| %d   | 以十进制数[01,31]补零的月份                                 |
| %e   | 以十进制数字表示的月份中带空格的日期[1,31]                  |
| %H   | 小时(24小时制)十进制数字[00,23]                             |
| %I   | 小时(12小时制)十进制数字[01,12]                             |
| %j   | 年中的天十进制数字[001,366]                                 |
| %m   | 以十进制数字[01,12]表示的月份                               |
| %M   | 分钟十进制数字[00,59]                                       |
| %L   | 十进制数字[000，999]表示的毫秒                              |
| %p   | AM或PM                                                      |
| %S   | 秒十进制数字[00,61]                                         |
| %U   | 一年中的第几周(星期日为一周的第一天)以十进制数[00,53]为准   |
| %w   | 工作日以十进制数字[0,6]                                     |
| %W   | 一年中的第几周(星期一为一周中的第一天)以十进制数[00,53]为准 |
| %x   | 日期以“％m /％d /％Y”表示                                   |
| %X   | 时间以“％H：％M：％S”表示                                   |
| %y   | 不带世纪的十进制数字[00,99]                                 |
| %Y   | 以世纪作为十进制数字的年份                                  |
| %Z   | 时区偏移量                                                  |
| %%   | 文字“％”字符                                                |



### 例如

```
gantt
  title AB
  section A
  A1 : done, 2020-01-01,2020-01-02
  A2 : active, 2020-01-02,1d
  section B
  B1 : future, 2020-01-03
  B2 : crit,active,b2,2020-01-03,48h
  section C
  C1 : done,after b2,1d
```

## 五、classDiagram(类图)

类图是面向对象建模的主要构建块。它用于应用程序结构的一般概念建模，以及用于将模型转换为编程代码的详细建模。类图也可以用于数据建模。类图中的类表示主要元素，应用程序中的交互以及要编程的类。

**就是大了点，以我现在的能力是无法改变的。**



### 功能

- 类
  UML提供了表示类成员的机制，例如属性和方法，以及有关它们的其他信息。图中一个类的单个实例包含三个隔离专区：

> 顶部的小节包含类的名称。它以粗体和居中打印，并且第一个字母大写。它还可能包含描述类性质的可选注释文本。
>
> 中间隔离专区包含类的属性。它们左对齐，第一个字母为小写。
>
> 底部的隔离区包含类可以执行的操作。它们也左对齐，首字母为小写。

- 定义类
  定义类有两种方法：

1. 使用关键字类（如）明确定义一个类class A.
2. 通过它们之间的关系定义两个类A <|-- B
   命名约定：类名应由字母数和下划线字符组成。

```
classDiagram
    class A
    A <|-- B
```



- 定义成员
  根据括号`()`是否存在来区分属性和函数/方法。与`()`一起的被视为函数/方法，而其他被视为属性。
  使用:（冒号）后跟成员名称来关联类的成员

```
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal : +isMammal()
    Animal : +mate()
    Duck : +String beakColor
    Duck : +swim()
    Duck : +quack()
    Fish : -int sizeInFeet
    Fish : -canEat()
    Zebra : +bool is_wild
    Zebra : +run()
```



- 能见度
  为了指定类成员的可见性（即任何属性或方法），可以将这些符号放在成员名称的前面，但它是可选的：
  1.`+`Public
  2.`-`Private

  

```
classDiagram
     AA <|-- BB
     AA : +a()
     BB : -b()
```



### 连线

大概定义为：

> 类型1 关系 类型2 ： 注释

| 代码   | 代码   | 解释     |
| ------ | ------ | -------- |
| `<|--` | `--|>` | 实线三角 |
| `*--`  | `--*`  | 实线菱头 |
| `o--`  | `--o`  | 实线空菱 |
| `<--`  | `-->`  | 实线箭头 |
| `--`   | `--`   | 实线直连 |
| `<..`  | `..>`  | 实线箭头 |
| `<|..` | `..|>` | 实线三角 |
| `..`   | `..`   | 实线直连 |

例如：

```
classDiagram
       A1 <|-- B1
       B1 --|> C1
       A2 *-- B2
       B2 --* C2
       A3 o-- B3
       B3--o C3
       A4 <-- B4
       B4--> C4
       A5 -- B5
       B5-- C5
       A6 <.. B6
       B6..> C6
       A7 <|.. B7
       B7 ..|> C7
       A8 .. B8
       B8 .. C8
```