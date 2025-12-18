---
title: 小程序踩坑记录
date: 2021/2/20
categories:
    - Programming
tag: Coding
---

刚花了五天做一个小程序，准备审核的时候发现个人小程序不允许有用户发布内容，心都碎了....

## update 函数出现问题？

-   1.数据库权限，首先检查当前数据库的集合是否为第一个选项，所有用户可读，仅创建者可读写

-   2.检查集合中的字段是否有 openid,如果从外部导入的表需要加上 openid 字段

-   **3.在小程序端使用 update 只能更新字段中的 openid 和自己目前的 openid 相同的字段，如果需要更改别人创建的信息应该在云函数中使用 update，具体看官方文档，很简单。**

-   4.在使用云函数 update 的时候，记得在 cloud.init({env: ‘xxx’})中填写你的环境 id。

-   5.确保你上传的数据中的 data 不是 undefined,不然成功上传也会显示更新数据为一条

## 云函数相关

-   `cloud.init()`这个方法要放到 app.js 的 onLaunch 的生命周期中，以后无需调用。
-   修改后记得右键修改过的文件，选择`上传`，否则更改不生效。

## 开发前注意

-   先搜索一下看看有没有撞名。

-   仔细阅读官方文档的[服务类目](https://developers.weixin.qq.com/minigame/product/material/#%E4%B8%AA%E4%BA%BA%E4%B8%BB%E4%BD%93%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E6%94%BE%E7%9A%84%E6%9C%8D%E5%8A%A1%E7%B1%BB%E7%9B%AE)

-   个人小程序不能有用户发布内容！

## tabBar 图标不显示？

用真机调试即可。[这里](https://svgtopng.com/)有个 SVG 转 PNG 格式的工具，方便把设计稿中的 svg 图标转为 Png。
