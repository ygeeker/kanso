---
title: 云极客工具开发日志
date: 2021/1/28
categories:
    - Programming
tag: Coding
---

## 写在前面

这篇博客记录我的 [ygktool](https://www.ygktool.cn) 开发历程。

### 缘起

大概是 19 年 7 月份的时候，那时我已经厌倦了停留在 html 和 css 无脑拼装的层次上，希望能向前端大神更近一步，加之一直追随的前辈也有自己的（很强的）工具箱，就想到了做工具箱的点子上。

### 志向

~~至少在中国有和一个木函一样的影响吧？~~

**能被别人的文章推荐到。譬如知乎**

## 历程

2020 年二月份之前，一直都是传统的 php 和 jq 架构。为了营造出 SPA 的效果还死磕`iframe`. 没想到视觉效果还不错。

2020 年二月之后开始接触 NPM，因为之前已经有了 react 基础，很快就用 Create-react-app 搭建了 ygktool pro。紧接着开始了移植工作，移植的过程十分枯燥（当时没用 vscode 都得手动格式化代码）。很快，pro 成为了正式版，从此告别 php + jquery。

### 技术栈

感谢这些优秀的库/框架。另外一些小规模使用的库没有列出。

-   Create-react-app
-   Typescript
-   Sass
-   MDUI
-   Express

## 技术细节

### 使用 npm link 时 Hook 报错

使用 npm link 测试 UI 库时，如果组件使用了 Hook 就会报错。在 GitHub 关于 hook 的 issue 下找到了解决方案。问题原因是两个库使用各自的 React 依赖。解决方法是将 app 的 react 链接到 UI 库的 react 下。

```bash
    npm-link-shared ./node_modules/mdui-in-react/node_modules . react && npm start
```

### 无声明文件的类引用

`gif.js`这个库作者没有发布声明文件，只好自己添加模块。在 react-app-env.d.ts 中添加

```ts
declare module "gif.js" {
	class GIF {
		constructor(config);
	}
	export = GIF;
}
```

### 检测设备的夜间模式

不要遗漏查询串的括号！

```js
window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
```

### React 事件池

在开发`文件树工具`时发现了一个有趣的事

```js
for (var i = 0; i < e.target.files.length; i++) {
	var freader = new FileReader();
	freader.readAsDataURL(file);
	console.log(e.target.files); // ok
	freader.onload = (fe) => {
		console.log(e.target.files); // error!
	};
}
```

循着控制台的提示查了官档：

> The SyntheticEvent is pooled. This means that the SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked. This is for performance reasons. such, you cannot access the event in an asynchronous way.
> SyntheticEvent 是合并而来。这意味着 SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，你不能通过异步访问事件。

这下就明白了，只要在回调函数之前用变量保存事件属性就可以在回调里使用了

### 忽略隐式类型转换而浪费大把时间

开发设置页面时，列表组件会返回选中项目的下标，而设置业务函数没有值传入就会退出。

```js
if (!name || !value) return originSetting;
```

这样写的话，如果 value 为 0 也会退出...

#### 解决方案

```js
if (!name || (!value && value !== 0)) return originSetting;
```

ECMA2020 新特性有对类似问题的解决方案

```js
let number = 0;
let myNumber = number ?? 7; // => 0
```

## 思考

微信的小程序逐渐发展起来，会不会蚕食浏览器市场呢？
