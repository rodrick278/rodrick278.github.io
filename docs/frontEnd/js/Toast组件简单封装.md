---
title: Toast组件简单封装
date: 2020-11-29
categories:
 - 前端
tags:
- js
---


## 封装
```javascript
  /**
   * @description: Toast
   * @Author: rodrick
   * @Date: 2020-11-28 11:49:22
   * @param {*} msg
   * @param {*} duration
   * @return {*}
   */
  function Toast(msg, duration = 3000) {
    let m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = `max-width:60%;min-width: 150px;
                        padding:0 14px;height: 40px;
                        color: rgb(255, 255, 255);
                        line-height: 40px;text-align: center;
                        border-radius: 4px;
                        position: fixed;
                        top: 50%;left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 999999;
                        background: rgba(0, 0, 0,.7);font-size: 16px;`;
    document.body.appendChild(m);
    setTimeout(function () {
      const d = 500;
      m.style.webkitTransition = '-webkit-transform ' + d + 'ms ease-in, opacity ' + d + 'ms ease-in';
      m.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(m)
      }, d);
    }, duration);
  }
```
## 使用
```javascript
 Toast("copy success!", 800)
```
## 效果
![WWWW.gif](https://cdn.nlark.com/yuque/0/2020/gif/2735301/1606536003594-43ca7f25-ac01-42cf-9e62-8dcadf464fde.gif#align=left&display=inline&height=263&margin=%5Bobject%20Object%5D&name=WWWW.gif&originHeight=355&originWidth=418&size=39178&status=done&style=none&width=310)
