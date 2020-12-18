---
title: git-ssh配置
date: 2020-09-07
categories:
 - 其他
tags:
- git
---

::: tip Tip
vuepress部署的时候，因为ssh的问题踩了点坑总结一下
:::

<!-- more -->

### 配置获取ssh

1. 检查是否有SSH key

   ```
   cd ~/.ssh
   ls
   ```

   

2. 检查一下有没有`id_rsa` 和 `id_rsa_pub`两个文件,如果有跳过3

3. 生成密钥

   ```
   ssh-keygen -t rsa -C "你的邮箱地址"
   ```

   然后一路回车

4. 添加密钥到ssh-agent

   根据 `git` [官方文档](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)，介绍如下

   > 我们需要寻找一对以 `id_dsa` 或 `id_rsa` 命名的文件，其中一个带有 `.pub` 扩展名。 `.pub` 文件是你的公钥，另一个则是与之对应的私钥。 如果找不到这样的文件（或者根本没有 `.ssh` 目录），你可以通过运行 `ssh-keygen` 程序来创建它们。 在 Linux/macOS 系统中，`ssh-keygen` 随 SSH 软件包提供；在 Windows 上，该程序包含于 MSysGit 软件包中

   文件我们已经创建过了，接下来需要捕获

   ```
   $ cat ~/.ssh/id_rsa.pub
   ```

   这时候会生成类似

   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
   GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
   Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
   t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
   mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
   NrRFi9wrf+M7Q== schacon@mylaptop.local
   ```

   注意，从**ssh-rsa**开始复制到邮箱前为止，然后在你项目的 `Settings->Deploy keys` 选择`Add deploy key` 将刚才复制的key粘贴进去，勾选 `Allow write access` 然后确定

   ![image-20200907215253630](https://gitee.com/rodrick278/img/raw/master/img/image-20200907215253630.png)

   

> 另外，deploy.sh运行的时候，最好直接去双击运行，否则可能会遇到问题