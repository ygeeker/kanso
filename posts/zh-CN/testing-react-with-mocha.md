---
title: 使用 Mocha + chai 测试 React 应用
date: 2023-04-12T01:23:00.000Z
summary:  ---    最近在继续开发之前的 [Kindle UI](https://github.com/
keywords:
  - Open Source
tag: Coding
---


---



最近在继续开发之前的 [Kindle UI](https://github.com/RiverTwilight/kindle-ui) 库，想到该写一下测试，于是决定使用 [Mocha](https://mochajs.org/) 的测试方案（尝试一些新东西）。

（此段由GPT生成👉）在开发过程中，保证代码质量和正确性是非常重要的。测试是达到这个目的的有效方法之一，特别是在 JavaScript 开发中。在 React 应用开发中，Mocha 和 Chai 是两个非常流行的测试框架。本文将介绍如何使用 Mocha 和 Chai 测试 React 应用。

## 为什么不用 react 官方推荐的 Jest 测试?

jest 最初是为测试 react app 设计的。相比 Jest, Mocha 具有更高的灵活性（后者可以且必须进行额外的配置，而前者开箱即用），可以在浏览器和 node 环境下运行，并且支持一些复杂的语句例如：

```plain text
expect(person.age).to.be.lte(35).and.to.be.gte(18);Q

```

由于我的项目并非单个 react app 而是 monorepo，所以在 workspace 根目录使用 mocha 无疑是更好的选择。

## 安装依赖

Mocha 本身是不支持 JSX 的，所以我们要安装一些依赖：

```shell
yarn add mocha -D

# Babel 配套插件
yarn add -W -D @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/register

# 此依赖用于渲染 react, 请根据 react 版本选择依赖版本！
yarn add react-test-renderer@17.0.2 -D -W
```
> 注意：如果你在 workspace 根目录安装测试依赖（推荐的做法），记得添加 -W 参数。

## 配置 Mocha

在项目根目录创建一个 .mocharc.js 文件，内容如下：

```javascript
module.exports = {
	extension: ["js", "mjs", "ts", "tsx"],
	ignore: ["**/build/**", "**/node_modules/**"],
	recursive: true,
	timeout: (process.env.CIRCLECI === "true" ? 5 : 2) * 1000, // Circle CI has low-performance CPUs.
	reporter: "dot",
	require: [require.resolve("./test/utils/setupBabel")],
	"watch-ignore": [
		".git",
		"**/node_modules/**",
		"**/build/**",
		"docs/.next/**",
	],
};

```

在 /test/utils/setupBabel 目录创建一个 setupBabel.js 文件

```javascript
require("@babel/register")({
	extensions: [".js", ".ts", ".tsx"],
});
```

## 配置 Babel

有了 babel， 我们可以使用 cjs 格式的测试文件而无需进行 "type": "module" 这种令人讨厌的设置。

```plain text
// babel.config.js
module.exports = function getBabelConfig(api) {
	const useESModules = api.env(["legacy", "modern", "stable", "rollup"]);

	const presets = [
		[
			"@babel/preset-env",
			{
				browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
				modules: useESModules ? false : "commonjs",
			},
		],
		[
			"@babel/preset-react",
			{
				runtime: "automatic",
			},
		],
		"@babel/preset-typescript",
	];

	const plugins = [];

	return {
		assumptions: {
			noDocumentAll: true,
		},
		presets,
		plugins,
		ignore: [/@babel[\\\\|/]runtime/], // Fix a Windows issue.
		overrides: [
			{
				exclude: /\\.test\\.(js|ts|tsx)$/,
				plugins: ["@babel/plugin-transform-react-constant-elements"],
			},
		],
	};
};

```

## 测试

在 package.json 添加快捷脚本，此处请根据实际项目配置：

```plain text
"test:unit": "cross-env NODE_ENV=test mocha --config .mocharc.js 'packages/kindle-ui/**/*.test.{mjs,js,ts,tsx}' 'test/utils/**/*.test.{js,ts,tsx}'"

```

之后我们可以愉快地编写测试了。

关于 react-test-renderer 的更多用法，可以参考[官方文档](https://reactjs.org/docs/test-renderer.html)。

此处列举一些常见测试场景供参考：

### 检查组件类型

```plain text
import * as React from "react";
import { expect } from "chai";
import renderer from "react-test-renderer";
// 建议使用 link 后的包，以确保贴近实际场景。
import { ListItem } from "@kindle-ui/core";

describe("<ListItem />", () => {
	describe("prop: component", () => {
		it("renders a div", () => {
			const component = renderer.create(<ListItem />);
			expect(component.toTree().rendered).to.have.property("type", "div");
		});

		it("renders a link", () => {
			const component = renderer.create(
				<ListItem component="a" href="#" />
			);
			expect(component.toTree().rendered).to.have.property("type", "a");
		});
	});
});

```

### 检查渲染结果

```plain text
it("render in Container", () => {
	expect(() =>
		renderer.create(
			<Container>
				<ListItem>test</ListItem>
			</Container>
		)
	).not.to.throw();
});

```

## 改进

react 官方提供的测试库功能比较局限，例如，我们无法测试一个元素是否可见，也无法模拟用户操作页面。

所以，我们可以使用@testing-library/react来进行进一步改进。

注意，node 环境下没有 document 对象，需要使用 JSDom 这个库模拟一个。

先为 mocha 添加钩子：

```javascript
// .mocharc.js

module.exports = {
    {/**... */}
	beforeEach: () => {
		const dom = new JSDOM("", {
			pretendToBeVisual: true,
			url: "<http://localhost>",
		});
		global.window = dom.window;
	},
};
```

更新测试代码：

```plain text
import { queries, within } from "@testing-library/react/pure";

describe("general rendering", async () => {
	it("render in Container", async () => {
		render(<ListItem>KindleUI</ListItem>);

		expect(
			within(document.body, { ...queries })
				.getByRole("ListItem")
				.toHaveTextContent("KindleUI")
		).to.be(true);
	});
});

```
