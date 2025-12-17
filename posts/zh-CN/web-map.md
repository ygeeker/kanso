---
title: 玩转 Web 地图
date: 2025-07-08
summary: 本文介绍一下如何在 Web 技术栈里实现一个真实世界里的地图，并定制样式。
keywords:
  - Open Source
tag: Tech
---


本文介绍一下如何在 Web 技术栈里实现一个真实世界里的地图，并定制样式。

你可以访问 [Chizu](http://chizu.ygeeker.com/) 了解一下实际效果。

![Image](/image/post/22cb60fd-4a96-803d-8943-cf3b4584973d_asynccode)

## 地图构成

首先要搞清楚：Web 中的地图是如何实现的？

一般来说会包括如下实体：
- **数据源**：提供地图信息，包括地名、水体、等高线等。可以使用公开数据源，亦可自己托管数据源。不同的渲染引擎有不同的数据约定。常见的数据源有：
  - Google Map
  - Maptiler：商业地图提供商
  - **OpenStreetMap**：由志愿者维护，类似 Wikipedia
  - [Stadia Map](https://docs.stadiamaps.com/maps-for-web/)：商业地图提供商
  - 高德地图等国产地图
- **样式**：描述地图的样式的规范。和数据源一样，不同的渲染引擎有不同的数据约定
- **渲染引擎**：结合数据源和样式源，将其绘制到屏幕上。主流引擎有：
  - Mapbox GL JS：半开源，接入官方数据源需要付费
  - MapLibre GL JS：Mapbox 的开源替代。其制定了一套开源的自有样式方案
  - Leaflet：开源，提供了 JS SDK / React SDK 等
  - OpenLayers：开源

由于不同的渲染引擎都有不同的规范，所以地图数据提供商往往会提供一些 SDK 来实现格式互转。例如：

暂时无法在飞书文档外展示此内容

在中国大陆提供地图服务，需要遵守国家测绘地理信息管理部门的规定，包括使用加密坐标系（如 GCJ-02）、取得地图审图号等合规要求。

在任何地方提供地图服务，通常都需要明显声明数据来源。

## 渲染原理

地图数据通常被分割成离散的**矢量瓦片 (Vector Tiles)**。每个瓦片只包含特定区域和缩放级别的数据。

以 MapLibre 为例。地图从不同角度可以分为两种组成：
- Tile：平面上看，地图可以拆分为一个个瓦片。类似 Unity 2D 中的 Tile。瓦片通过三元组(z, x, y)标识。
- Layer：垂直来看，地图可以拆分为一个个 Layer，例如水体是一个 Layer，道路是一个 Layer，文字是一个 layer。缩放层级从0（全球视图）到20+（街道级细节）。每增加一级缩放，Tile 数量增加4倍（横纵各翻倍）。

地图、字体等数据都是使用 PBF 格式存储的。PBF 存储的是矢量数据（点、线、面），而不是预渲染的图片（栅格瓦片）。这意味着地图渲染引擎（如 MapLibre GL JS）可以在客户端使用 WebGL 进行硬件加速渲染。

PBF 是一种二进制格式，相较于传统的文本格式（如 XML 或 JSON），它能够以更紧凑的方式编码地理空间数据。这意味着文件大小显著减小，例如，OpenStreetMap 的 PBF 文件通常比其 GZIP 压缩的 XML 版本小一半，比 BZIP2 压缩的 XML 版本小 30% 左右。

它还是 Mapbox 矢量瓦片标准的核心格式，被广泛采纳（如 OpenStreetMap、Mapbox、Tilezen 等），保证了兼容性和互操作性。

## 上手搭建

我们这里以搭建一个《荒野大镖客 2：救赎》风格的地图为例。

### 第一步｜选择数据源与渲染引擎

因为是真实世界的地图，所以我们需要使用真实世界的数据源。我们以 Maptile 为例。

1. 注册 [Maptile](https://cloud.maptiler.com/auth/widget?next=https%3A%2F%2Fcloud.maptiler.com%2Fmaps%2F) 账号（免费）
2. 申请一个 API KEY，后续调用时都要带上这个 Query

Maptile 和 Stadia 都允许本地开发时免费调用。如果你实在支付不起费用，可以搭建 Proxy 来模拟 localhost 请求在实际生产中使用。

在 NextJS 中，你可以创建一个 API 来实现。

注意，此方法仅供学习，请勿用于其他用途。

### 第二步｜编写地图样式

Maptile 依赖一个 JSON 文件来描述地图。所以**关键在于这个 JSON 文件**。

Maptile 提供了一个官方的地图编辑器 Maputink，可以直接使用它来进行可视化编辑。你可以打开一个官方的配置直接修改，或者从零开始。这里推荐前者。

![Image](/image/post/22cb60fd-4a96-809d-974d-df933fdd87f3_asynccode)

你也可以直接编辑 JSON 文件。借助 AI 编程也会有不错的效果。

我们需要仔细设计地图，包括配色、字体、显示元素等等。元素还可以根据缩放等级不同控制是否展示。这里不展开来讲。

荒野大镖客的设计语言是这样的：

![Image](/image/post/22cb60fd-4a96-8061-a044-de471c82fab4_asynccode)

这里需要肉眼辨识一下字体。我不是专业的设计师，粗略判断如下：
- 水体 / 景点：Ephesis
- 州（省）名：Merriweather
- 城市名：Outfit
- 水体：Metal

以水体为例：
- 设置 Rotation Aligment 为 Viewport（大镖客中景观文字永远是正的，不会扭曲）
- 设置 Font 为 Ephesis
- 设置 Halo 与字体颜色相同，并通过 Halo Width 调整字体粗细

接下来我们添加等高线。

由于默认的配置不支持等高线，然而《荒野大镖客2》中的地图是有等高线的，所以我们需要**添加一个额外的数据源**，来实现等高线层。这里可以直接使用 maptiler 的数据源：

/api/maptiler/tiles/contours-v2/tiles.json?key=Qnr580YQzLS9WFZBXZYE

也可以使用自己搭建的。首先在 Sources 一栏中新增一个名为 countours 的数据源。

![Image](/image/post/22cb60fd-4a96-8093-a468-e498b62f5d6d_asynccode)

接着添加一个**等高线图层**，使用 Line 类型。指定其使用刚刚新增的数据源，设定颜色、尺寸等信息。

![Image](/image/post/22cb60fd-4a96-80b2-8ce6-f926df61967c_asynccode)

设计好之后导出 JSON 文件备用。

很多属性都支持函数，即并非固定值，而是根据条件计算。图层本身也支持条件渲染。例如上面这个等高线设定，就是仅在 10 - 24 比例展示。再缩小就不显示。

### 第三步｜使用自定义字体

如果你不需要自定义字体，可以跳过这一步。

不同于 CSS，我们没法直接通过 TTF 等文件直接使用字体。和地图其他层的数据一样，我们需要先将其转换为 PBF 格式的文件。

Maplibre 官方也出品了开源的 [FontMaker](https://maplibre.org/font-maker/) 工具，可以把字体文件转换为 PBF 文件。首先上传所有我们需要的字体。

![Image](/image/post/22cb60fd-4a96-8009-ae0a-f250e993dd0f_asynccode)

转换完成后，我们需要把它生成的 PBF 文件托管在云上，以便客户端访问。

引擎访问字体源会通过一个预先设定的地址模版访问，例如：

```plain text
https://www.example.com/font-server/{fontstack}/{range}.pbf

```

其中 fontstack 就是字体的名字，所以服务器上的文件路径大概是这样：

![Image](/image/post/22cb60fd-4a96-80f6-bc0f-e8eeed3ee768_asynccode)

接下来在 JSON 中加载字体即可。添加这一行：

```plain text
"glyphs": "https://chizu.ygeeker.com/font-server/{fontstack}/{range}.pbf",
```

你也可以在 maputnik 中设置 glyphs，它会自动帮你填入 JSON 中：

![Image](/image/post/22cb60fd-4a96-8035-8e68-fc3327251255_asynccode)

字体源配置完毕后，即可在 Glyph 类型的图层中指定字体名称。其中名称就是对应着字体文件夹的名称。

### 第四步｜在页面中展示地图

以 React 为例，加载配置文件 JSON 即可展示地图。接下来可以利用 API 定制更多进阶功能。示例用法如下：

![Image](/image/post/22cb60fd-4a96-8083-939a-cccf9eb92936_asynccode)

## 🎁 奖励内容

你会发现一个有趣的现象：在 Google 地图上深圳和中国香港交界处，深圳方向的卫星地图和道路无法对上，但香港方向却是正常的。

![Image](/image/post/22cb60fd-4a96-8089-a464-fed02b43de35_asynccode)

这是因为中国标准的地图坐标和国际是不一样的。中国大陆使用的地图数据通常基于加密的 GCJ-02 坐标系（俗称“火星坐标系”），而香港和国际通用的 Google 地图采用 WGS-84 坐标系。

GCJ-02 是一个非公开的单向加密算法。也就是说，GCJ-02 难以转换为 WGS-84，但 WGS-84 可以轻松转换为 GCJ-02 算法。

因此，取得中国授权的本地地图软件可以展示正确的卫星地图。对于没有掌握此算法的 Google 等服务商，它们无法把中国政府提供的数据转换为 WGS-84 格式，因此就无法匹配道路和卫星地图。

## 相关资源
- [MapLibre 生态](https://github.com/maplibre/awesome-maplibre)
- [Leaflet 生态](https://leafletjs.com/plugins.html)


