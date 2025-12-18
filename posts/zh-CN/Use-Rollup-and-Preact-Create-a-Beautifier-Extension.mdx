---
title: 搭配 rollup + preact 开发大型页面美化插件
date: 2023/2/5
tag: Coding
---

最近期末成绩也出了（大抵是寄了），觉得学校的教务系统实在太丑，决定写一个浏览器插件美化插件。

打开教务系统，一股00年代的复古拟物风格袭来，无数`tr` `td`构成的表格布局，拼音命名的变量名，随意设置的全局函数...我们大概可以猜到彼时这家公司程序员的工作环境似乎不太好。


![](https://cdn.jsdelivr.net/gh/filess/img3@main/2023/01/19/1674135191542-5a8b7b7f-036d-42a5-9cb0-3edb05d9f880.png)


## 前置知识

## 搭建脚手架

为了减轻插件体积，我们采用优秀的 react 替代品 preact 开发用户页面。

安装一系列依赖
```bash
yarn add preact

yarn add -D @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript @rollup/plugin-babel

yarn add -D @babel/core @rollup/plugin-alias @babel/plugin-transform-react-jsx
```

编写 rollup 配置。
```js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
	{
		input: "src/components/content.js",
		output: [
			{
				file: "dist/content.bundle.cjs.js",
				format: "cjs",
				sourcemap: true,
			},
			{
				file: "dist/content.bundle.esm.js",
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			nodeResolve({ extensions }),
			commonjs(),
			babel({
				babelHelpers: "bundled",
				extensions,
				include: ["src/**/*"],
			}),
		],
	},
];
```

![](https://cdn.jsdelivr.net/gh/filess/img3@main/2023/01/18/1674014555394-c7bdfd44-7991-462f-8f57-ed2cfa157369.png)

## 分析页面
