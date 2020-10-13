---
title: HTML快捷写法大全
date: 2020-10-13
categories:
 - 前端
tags:
- html
---



* 父子用>  [Ul>li*3]

  ```html
  <ul>
      <li></li>
      <li></li>
      <li></li>
  </ul>
  ```

* 兄弟之间用+,也可以省写  [p+span]，[ul+]

  ```html
  <p></p><span></span>
  
  <ul>
      <li></li>
  </ul>
  ```

* 寻找父亲或者上级用^,反一层用一个，反两层用两个  [div>h2+ul>li*3^span]

  ```html
  <div>
      <h2></h2>
      <ul>
          <li></li>
          <li></li>
          <li></li>
      </ul>
      <span></span></div>
  ```

* 属性用[], a[title="aaa"]

  ```html
  <a href="" title="aaa"></a>
  ```

* $符号是自动编辑 box>ul>li.items$*10

  ```html
  <box>
      <ul>
          <li class="items1"></li>
          <li class="items2"></li>
          <li class="items3"></li>
          <li class="items4"></li>
          <li class="items5"></li>
          <li class="items6"></li>
          <li class="items7"></li>
          <li class="items8"></li>
          <li class="items9"></li>
          <li class="items10"></li>
      </ul>
  </box>
  ```

* 内容用{} .box>ul>li{这是第$行数据}*10

  ```html
  <div class="box">
      <ul>
          <li>这是第1行数据</li>
          <li>这是第2行数据</li>
          <li>这是第3行数据</li>
          <li>这是第4行数据</li>
          <li>这是第5行数据</li>
          <li>这是第6行数据</li>
          <li>这是第7行数据</li>
          <li>这是第8行数据</li>
          <li>这是第9行数据</li>
          <li>这是第10行数据</li>
      </ul>
  </div>
  ```

  