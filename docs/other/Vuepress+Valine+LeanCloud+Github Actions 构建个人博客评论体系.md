---
title: Vuepress+Valine+LeanCloud+Github Actions 构建个人博客评论体系
date: 2020-09-11
categories:
 - 其他
tags:
- valine
- git
sticky: 1
---


::: tip 背景
由于 `LeanCloud` 的各种“你懂的”的原因，现在国内节点需要备案等等限制

加上自己又想白嫖 `LeanCloud` 来实现浏览量+评论管理+邮件通知一条龙服务

网上也没有很好的综合文档，所以这里整理一份完整的操作步骤
:::

<!-- more -->



## Vuepress+Valine+LeanCloud+Github Actions 构建个人博客评论体系

### 参考来源

> [Valine](https://valine.js.org/) ：评论管理系统
>
> [Valine-Admin](http://www.zhaojun.im/hexo-valine-admin/)：`Valine v1.4.0` 之后已经去除了邮件提醒功能，所以我们这里使用 `Valine-Admin` by [@zhaojun1998](https://github.com/zhaojun1998/Valine-Admin)
>
> [LeanCloud流控原因的解决方案](https://www.antmoe.com/posts/ff6aef7b/)：由于白嫖党过多导致的官方限流解决方案

### 开始

#### vuepress配置LeanCloud

##### 1. 打开[`LeanCloud`](https://console.leancloud.app/) 官网，注册账号

<img src="C:\Users\Rodrick\AppData\Roaming\Typora\typora-user-images\image-20200911183531065.png" alt="image-20200911183531065" style="zoom: 50%;" />

##### 2. 登陆

登陆之后右上角选择 **国际版**【**如果你的域名备过案了就选个正常节点就行，但是没备案的或者使用ghpages这种的，请选择国际版**】，然后创建新的应用

![image-20200911183742658](https://gitee.com/rodrick278/img/raw/master/img/image-20200911183742658.png)



##### 3. 应用创建后

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`,找到你的`APP ID`和`APP Key`,然后填入我们项目的 `config.js`

<img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200911184026702.png" alt="image-20200911184026702" style="zoom:50%;" />

```js
 valineConfig: {
      appId: 'xxxxx',// your appId
      appKey: 'xxxxxx', // your appKey
  }
```

##### 4. `valine-admin` 的配置

这段不做详细介绍，参见[官方说明](http://www.zhaojun.im/hexo-valine-admin/)

要注意的几个点：

* 记得在 设置->域名绑定->云引擎、ClientEngine 域名 这里绑定你的域名，这就是为什么要选个国际版，因为没国内节点没备案你是过不了审的
* 部署填写代码库直接是在 云引擎->部署页面最下面的`Git部署`

1. Leancloud 休眠策略【重要】

   首先按照大佬给的[教程](https://github.com/zhaojun1998/Valine-Admin/blob/master/%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE.md#leancloud-%E4%BC%91%E7%9C%A0%E7%AD%96%E7%95%A5)如下：

   

   免费版的 LeanCloud 容器，是有强制性休眠策略的，不能 24 小时运行：

   - 每天必须休眠 6 个小时
   - 30 分钟内没有外部请求，则休眠。
   - 休眠后如果有新的外部请求实例则马上启动（但激活时此次发送邮件会失败）。

   分析了一下上方的策略，如果不想付费的话，最佳使用方案就设置定时器，每天 7 - 23 点每 20 分钟访问一次，这样可以保持每天的绝大多数时间邮件服务是正常的。

   首先需要先配置下 Web 主机的域名【现在叫”云引擎域名“】，使用定时器时要用到。配置方式如下。

   <img src="https://gitee.com/rodrick278/img/raw/master/img/image-20200911185002555.png" alt="image-20200911185002555" style="zoom: 33%;" />

   后台登录需要账号密码，需要在这里设置，只需要填写 `email`、`password`、`username`，这三个字段即可, 使用 `email` 作为账号登陆即可。（为了安全考虑，此 `email` 必须为配置中的 `SMTP_USER` 或 `TO_EMAIL`， 否则不允许登录） [![img](https://camo.githubusercontent.com/6e1b23da8abe54d08a1ce90d35e982c3ce171bb8/68747470733a2f2f63646e2e6a756e362e6e65742f3230313830313131323133335f3436372e706e67)](https://camo.githubusercontent.com/6e1b23da8abe54d08a1ce90d35e982c3ce171bb8/68747470733a2f2f63646e2e6a756e362e6e65742f3230313830313131323133335f3436372e706e67)

   #### LeanCloud 自带定时器[推荐]

   首先需要添加环境变量，`ADMIN_URL`：`Web 主机域名【现在叫”云引擎域名“】`，如图所示（添加后重启容器才会生效）：

   [![img](https://camo.githubusercontent.com/4239e2376c7ead8e71433ad3cf62a6825cf0ee75/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313430395f3136372e706e67)](https://camo.githubusercontent.com/4239e2376c7ead8e71433ad3cf62a6825cf0ee75/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313430395f3136372e706e67)

   然后点击云引擎 - 定时任务，新增定时器，按照图片上填写：

   [![img](https://camo.githubusercontent.com/676c31d97af7ffa113ef0f622891c43f3f3121d4/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313433335f3536382e706e67)](https://camo.githubusercontent.com/676c31d97af7ffa113ef0f622891c43f3f3121d4/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313433335f3536382e706e67)

   > 注意, LeanCloud 最近更新了定时器校验规则, 需要将 Cron 表达式写为: `0 */20 7-23 * * ?` !!!
   >
   > 上面这个写法是国内的时间！！！国际版和国内有八小时时差，所以国际版请使用`0 */20 0-15 * * ?`

   添加后要记得**点击启用**：

   [![img](https://camo.githubusercontent.com/1127fa5a265eac435e643c198e29ca2802eacc20/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313433345f3131382e706e67)](https://camo.githubusercontent.com/1127fa5a265eac435e643c198e29ca2802eacc20/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313433345f3131382e706e67)

   启用成功后，每 20 分钟在云引擎的 - 应用日志中可以看到提示：

   [![img](https://camo.githubusercontent.com/35e08261b6a7d2570c8bab872dc69ffd21116dc0/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313434345f3738332e706e67)](https://camo.githubusercontent.com/35e08261b6a7d2570c8bab872dc69ffd21116dc0/68747470733a2f2f63646e2e6a756e362e6e65742f3230313831323031313434345f3738332e706e67)

##### 5. 流控问题解决

​	用一段时间后，会在日志里发现定时任务报错："因流控原因，通过定时任务唤醒体验版实例失败，建议升级至标准版云引擎实例避免休眠"，官方说法是：

![img](https://cdn.jsdelivr.net/gh/blogimg/picbed@latest/2020/05/14/690052ad1e12bd97d8459f6533fcc64b.png)

然后我去参照了[这篇文章](https://www.antmoe.com/posts/ff6aef7b/)，里面介绍的很详细了，就不重复说明了

基本思路就是：

既然你自带的定时任务你可以监控到然后限制，那么我就定时从**外部发起请求**，只要外部发起请求没有问题，那就可以保证适当的活跃时间，并且避开白天休眠的情况

使用 [Github Action](https://github.com/features/actions)，来**代替**自带的定时器功能，**或者代替**休眠期后的第一次唤醒工作，因为有人发现只要从休眠中的第一次唤醒是外部发起的，后面定时器执行就不会报错





