---
title: 换桌面焕新情：Windows 桌面改造 macOS 指南
date: 2022/9/15
cover: https://i.loli.net/2021/11/28/I7SbfaXY4TF6Adl.png
tag: Tech
---

由于大学专业的原因，高考完后我仍然置换了 Windows 笔记本，但是心中对于完整 Apple 生态的向往仍然还在。~在此之前，我仅仅是在背面贴上了 Apple 产品独家赠送的 Sticker。~

话不多说，先看看成品，然后开始动手。

![](https://cdn.sspai.com/2022/09/14/d3f40a5d29e0fe24db4bcae411acc1e1.png)最终效果

## 📲 添加状态栏和 Dock

没错，第一步就是简单粗暴，只需要在壁纸上画上 macOS 标志性的 UI 即可。

使用 Canva、PS 、Figma 或其他你喜欢的图片编辑软件，创建一个和屏幕分辨率一样尺寸的画布。

这里推荐使用 [Canva](https://www.canva.cn/)，可以省去许多处理素材的麻烦。

在 “上传” 中上传你喜欢的壁纸，接着将其设置为背景，在 素材 - 形状 中选择矩形，拖拽到画布中，调整为合适的尺寸，置于顶部。根据你想定制的亮色 / 深色模式，修改状态栏的颜色（根据网络上的图片，深色模式下状态栏颜色代码为**#1a1d25**）。

![](https://cdn.sspai.com/2022/09/14/6650382fea632f9bd22a623ee92b0afa.gif)添加 StatuBar

在素材中，搜索 “Apple”，得到 Apple 的 logo，拖拽将其置于左上角，并把颜色设置为与状态栏相对的颜色。

接着添加状态栏的按钮。在侧边栏选择文字，拖拽进画布并调整内容、大小、颜色。注意：“访达” 较其他按钮字体更粗一些。

接着用同样的方法，借助 “素材” 中的搜索功能，依次搜索 “wifi”“电池” 等，拖拽添加你想要的状态图标。

![](https://cdn.sspai.com/2022/09/14/9dac97d69d1a3fa04dd0049fccb71a14.png)

再用类似方法，添加 Dock，与状态栏不同的是，你需要适当降低透明度，以模拟毛玻璃效果。由于 Canva 没有设置圆角功能，所以这里与实际 Dock 有些微差别，但几乎很难察觉。

![](https://cdn.sspai.com/2022/09/14/28bbb9c0226a81522c32ee93b181622f.png)在右上角设置透明度

你可能需要多次下载并预览，调整 Dock 的位置，直到底层图标可以恰好置于 Dock 中间。

如果你有极致追求，可以开启任务栏自动隐藏，并将 Dock 高度降低即可。

![](https://cdn.sspai.com/2022/09/14/817a355c90b955d4e6bb0cc253d97e5f.png)

## ⬆️ 去除 Dock 中的图标名和小箭头

有了 Dock，我们还需要去除快捷方式的名称。按 win 键，搜索” 字符映射表”，打开并找到 “无中断空格”，选择并在下方复制。

![](https://cdn.sspai.com/2022/09/14/07516b27b4626b2c5992db886e7f7621.png)

接着逐一修改快捷方式的名称。由于文件名不能重复，你需要混搭 “真实的空格” 和“在字符映射表中的空格字符”，来创造多个 “不一样” 的空白名。**文件名不宜过长**，否则会出现省略号。

完成之后，我们还需要去除快捷方式自带的小箭头。在 GitHub 上搜索 [dism++](https://github.com/Chuyu-Team/Dism-Multi-language) 下载系统对应的版本打开，在 系统优化 - Explorer 中勾选 "隐藏快捷方式小箭头" 和 " 隐藏可执行文件小盾牌 “。

![](https://cdn.sspai.com/2022/09/14/4727e9b1fc830ed589cbb8e5ac181491.png)

## 📁 更换文件夹图标

好了，现在桌面是不是已经有些 “果味儿” 了？但是，这时黄色的文件夹就显得非常刺眼。

在网上搜索 macOS 的文件夹图标 ，用图像处理软件将背景设置为透明（如果你是 SAI 用户，只需把图片导入后，用橡皮擦擦除背景，并在图像 - 画布背景中把背景设置为透明即可）。

最后用这个[网站](https://www.freeconvert.com/ico-converter)生成 ico 文件。右键文件夹 - 属性 - 自定义 - 更改图标 即可。快捷方式则通过 右键 - 属性 - 快捷方式 设置。

![](https://cdn.sspai.com/2022/09/14/157c6b4d26e8a432a2c10da5140293c3.png)

然后用类似的方法制作回收站图标，同样用这个[网站](https://www.freeconvert.com/ico-converter)生成 ico 文件：

![](https://cdn.sspai.com/2022/09/14/c8849ff3801e07e0bf197de288f6ea16.png)SAI Ver.2

在 设置 - 个性化 - 主题 - 桌面图标设置 中，即可更换回收站的图标为刚刚制作的 ico 文件。

## 🪟 让访达和文件活起来

有了上面更换图标的思路，那么，我们同样可以给 “我的电脑” 换上透明图标，并放在状态栏对应按钮的位置，模拟点击效果。

在桌面空白处 右键 - 查看，取消勾选 “将图标与网格对齐”。

使用 PS 等软件绘制一个 200 X 200 的透明图片（你也可以到文末直接下载），并用这个[网站](https://www.freeconvert.com/ico-converter)转换为

在 设置 - 个性化 - 主题 - 桌面图标设置 中，把 “我的电脑”“控制面板” 都换成透明的图标，并用之前的方法把他们的名称也隐藏掉，再将其拖到状态栏对应位置。

![](https://cdn.sspai.com/2022/09/14/09fe597a7ef5e295227e7e1f1f59af4a.png)设置 - 个性化 - 桌面图标设置![](https://cdn.sspai.com/2022/09/14/ee78eb37a92dcd4f08d4acb9fb191b61.png)似乎 Windows 会给透明图标生成一个边框，不过不仔细看看不出来。我暂时想不到完美的解决方法，如果你有好的方法，欢迎留言。

之后的使用，只要点击 “状态栏” 即可。

## ⬜ 将任务栏设为透明

最后一步，只需要下载 [TranslucentTB](https://apps.microsoft.com/store/detail/9PF4KZ2VN4W9?hl=en-us&gl=US) 这个软件即可把任务栏设为透明，可在微软商店搜索下载，此外，还有汉化版可供选择。

![](https://cdn.sspai.com/2022/09/14/6f4b546ae8d0a28aa5b013f64c7e235d.png)

## ⏱️ 可选功能：让时钟活起来

利用 Windows 自带的幻灯片壁纸功能，我们可以设计多个时钟不一样的壁纸，再将其轮流播放，把间隔设置为 1 分钟即可。

![](https://cdn.sspai.com/2022/09/14/c3d4d8bac16feec9cb266cf1dac1003b.png)

## ⬇️ 素材下载

如果你懒得自己处理图标，可以使用我预制好的图标素材包以及成品壁纸（2600 x 1600）。

-   图标以及成品壁纸（2600 x 1600）：[下载地址](https://www.aliyundrive.com/s/Ks1PZ6SSavY)
-   Canva 项目：[查看地址](https://www.canva.cn/design/DAFMLWswCf4/HWvHBpNchqSltCJI_PzgWg/edit?utm_content=DAFMLWswCf4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
-   macOS 壁纸：[下载地址](https://wallpapercave.com/mac-os-4k-wallpapers)

有任何问题欢迎留言，我会尽量解答。
