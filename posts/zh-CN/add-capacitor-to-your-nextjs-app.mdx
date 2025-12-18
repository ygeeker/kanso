---
title: NextJS App 改造原生 App 的完美指南
date: 2024-05-02
summary: 本文将介绍我如何把一个纯 Web App 改造为优雅的原生 App，让这个产品支持多终端运行。
keywords:
  - Open Source
tag: Coding
---


[Geekits ](https://geekits.ygeeker.com/)是我开发了五年多的开源项目，也是我维护最久的开源项目。在经过不断的迭代之后，在 Next 技术栈稳定了下来。

本文将介绍我如何把一个纯 Web App 改造为优雅的原生 App，让这个产品支持多终端运行。

其实改造要做的工作不仅仅是把 App 放入 Webview，而是要移除原生app不需要的功能，用原生 API 替换某些 JS 实现的功能，样式的适配等等。

## 为什么要做原生 App

我个人并**不完全**赞同“Web 才是未来”的说法。但我很喜欢 Local first 的 web app，所以即使在开发 Web App 时，我都尽力让 Geekits 离线可用。

而迁移到原生让 local first 的实现更加方便，资源加载更快，大的数据也无需联网加载（例如成语查询功能）。

不仅如此，**可操作的窗口尺寸也更大了**，不用担心标签页会被不小心关掉，响应速度也更快。

最后，系统提供了更多浏览器不便获取（或者版本受限）的信息，例如加速度传感器，电池信息等。

## Step 1 - 安装配置 Capacitor

得益于 Capacitor 不错的 DX，一切顺利的话，你只需要几分钟即可得到一个“能运行的”原生版本。

首先，安装 Capacitor：

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npx cap init
npm i @capacitor/android @capacitor/ios
```

修改配置文件  capacitor.config.js ：

```javascript
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.ygeeker.geekits",
	appName: "Geekits",
	webDir: "out",
	server: {
		androidScheme: "https",
		errorPath: "/500.html",
	},
};

export default config;
```

如果你的 Next APP 一直是纯静态导出，那么恭喜你，大功告成。运行此命令可将你的 Next App 编译为静态文件：

```bash
next export
```

接着将编译出的代码同步到 Capacitor：

```bash
npx cap sync
```

大功告成！

但如果你的 Next App 使用了混合构建模式（例如使用了服务端功能），你可能无法直接执行 next export。你需要将一些依赖服务器的逻辑移动到客户端处理。例如：
- 客户端使用 device API 获取 locale（而不是 Next 的 Locale API）
- 客户端使用 hook 获取数据（而不是从 getServerProps 等方法）

从客户端获取 Locale 的示例如下：

```javascript
async function getDeviceLanguage() {
	let { value } = await Device.getLanguageCode();

	if (value === "en") {
		value = "en-US";
	}
	if (value === "zh") {
		value = "zh-CN";
	}

	return value;
}

function MainApp({ Component, pageProps }: AppProps) {
	// The auto-detected locale from NextJS
	// If user has no preferred locale, use auto
	const [preferredLocale, setPreferredLocale] = useState(pageProps.locale);

	useEffect(() => {
		const readLocaleConfig = async () => {
			// https://en.wikipedia.org/wiki/IETF_language_tag
			let preferredSet = localStorage.getItem("locale");
			if (preferredSet) {
				if (preferredSet === "auto" && !isWeb()) {
					setPreferredLocale(await getDeviceLanguage());
				} else if (preferredSet !== "auto") {
					// If user has spicified the language
					setPreferredLocale(preferredSet);
				}
			}
		};

		readLocaleConfig();
	}, []);
	
}
```

## Step 2 - 添加屏幕安全区域

至此我们已经拥有一个基本的原生 App，但仍有很多小问题需要适配。

不同于浏览器环境，移动设备异形屏会影响显示，例如刘海和打孔。为了避免出血，可以在全局 CSS 文件加如下全局变量：

```css
html {
	--ion-safe-area-top: env(safe-area-inset-top);
	--ion-safe-area-bottom: env(safe-area-inset-bottom);
	--ion-safe-area-left: env(safe-area-inset-left);
	--ion-safe-area-right: env(safe-area-inset-right);
}
```

然后在需要预留 Bleeding Area 的地方使用该属性，例如 Appbar（头部）：

```css
padding-top: var(--ion-safe-area-top),
```

## Step 3 - 运行时条件处理

尽管 Capacitor 提供了检测运行平台的 API，但在 Next 静态导出的过程中，其API总是会检测为浏览器环境。

例如，有时候我们希望某些 React 组件仅在原生平台中出现，在导出时就需要告知 Next 我们是否在为原生平台打包。

为了在 Next 导出过程中检测指定打包平台，我们可以手动添加一个环境变量指定导出目标。方便起见，你可以在 package.json 中写入以下脚本：

```json
"scripts": {
		"build": "next build",
		"build:cap": "CAPACITOR_BUILD=true next build && CAPACITOR_BUILD=true next export && npx cap sync",
		"dev:cap": "CAPACITOR_BUILD=true next",
 },
```

接着封装一个方法检测打包平台：

```javascript
const isCapacitor = () => process.env.CAPACITOR_BUILD === "true";
```

## Step 4 - 添加原生图标

Capacitor 并不会为你生成各种尺寸的原生 App 图标，你需要自己手动制作替换。

你只需准备一张 1024 * 1024 的图标原图，接着你可以利用[这个工具](https://www.appicon.co/)一键生成 iOS 和 Android 平台的图标。

将下载下来的文件替换项目中的文件即可。

P.S. 此工具无法生成 [Adaptive Icon](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)，你需要自己制作前景和背景。

## 后续流程

Capacitor 的功能远不止本文所写，你可以从[官方文档](https://capacitorjs.com/docs/)探索更多可能。
