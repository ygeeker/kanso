---
title: 玩机备忘录：步骤、工具以及注意事项
date: 2023-04-23T02:59:00.000Z
summary:  这几个月陆陆续续刷了好多机，每次都容易忘记一些东西，所以写下这篇文章，以便下次刷机时查阅。  ##
---


这几个月陆陆续续刷了好多机，每次都容易忘记一些东西，所以写下这篇文章，以便下次刷机时查阅。

## 离开 MIUI 的缺点
- 相机将被限制在 1200 万像素，目前尚无解决方案。
- 某些定制功能可能无法使用，例如 MIUI 的「双开」功能、杜比音效、按下电源键再解锁等。
- 某些设备可能无法再使用门禁卡。
- 游戏性能可能会下降。

## 解锁 Bootloader

解锁 Bootloader 后将有一定的风险，可能导致数据泄露，请注意。

1. 从小米官网下载解锁工具。
2. 将手机与电脑用数据线连接（要选择有文件传输功能的线材）。
3. 在工具中按提示操作，可能需要等待 7 天。
4. 解锁完成后，可进入开发者选项查看解锁状态。

## Root & 刷入 Magisk

Magsik 的工作原理是直接把 API 写入系统的 boot.img 中，其安装方法也就是把已经 Hack 过的镜像重新刷入。Magisk 安装成功后，我们也同时拥有 Root 权限了。

1. 从**目前运行的系统镜像**中提取出 boot.img，并把它发送到手机上。通常民间说的“线刷包”才有这个文件，“卡刷包（后缀为 zip）”就需要通过工具提取。
2. 在手机上安装 Magisk APP。建议从官方 Github 仓库下载安装包。
3. 点击“安装”，选择修补一个文件，选择之前提取的 boot.img。修补完成后，默认会把已修补的镜像放在 /Download 文件夹中。
4. 将手机与电脑用数据线连接（要选择有文件传输功能的线材）。
5. 把手机上修补过的镜像复制到电脑上。
6. 关机状态下，同时按住音量减和电源键，进入 Fastboot 模式。
7. 打开 adb 命令行，执行fastboot flash boot <img_directry>
8. 刷入完毕后，执行fastboot reboot重启设备。完成。

## 刷入官方 ROM

⚠ 请务必做好设备数据备份，例如照片、联系人、信息等。

1. 从小米官网下载 ROM 以及 Mifalsh，并把 rom 解压。
2. 设备关机状态下，同时按住音量减和电源键，进入 Fastboot 模式。将手机与电脑用数据线连接。
3. 打开 Miflash，选择刚刚解压的 ROM **文件夹**。
4. 点击”加载设备“，选中你要刷的设备。
5. **在右下角勾选“清除所有数据”**。
6. 点击“刷入”，等待刷入完成。可能耗时 5-20 分钟。

## 刷入第三方 Rom

请务必做好设备数据备份，例如照片、联系人、信息等。

这并不是一个很繁杂的操作，请保持冷静、平常心来做。

1. 确保设备目前正在运行 OS 符合第三方 Rom 的要求。包括：**设备代号**、Android 版本、OS 版本等等。
2. 确保设备已解锁 Bootloader。可以在开发者选项中查看设备的解锁状态。
3. 下载第三方 Rom 以及推荐的 Recovery （如果有）。
4. 关机状态下，同时按住音量减和电源键，进入 Fastboot 模式。将手机与电脑用数据线连接。
5. 电脑上打开 adb 命令行，执行fastboot boot <recovery_directry>。如果一切正常，手机会进入 Recovery。
6. 进入 Recovery 后，如果该 rec 支持 sideload 模式，可以直接进入 sideload 模式，执行adb sideload <rom_directry>；如果不支持 sideload 模式，可以选择刷入 zip 包的方式，执行adb push <rom_directry> /sdcard/Download，然后在 Recovery 中选择刷入 zip 包。

## 其他资源

### 系统增强 APP

这些 app 弥补了类原生系统的一些缺陷，或者增强了其功能。
- 炼妖壶：可以在沙盒中运行一些 app，并且相当于“双开”，例如微信、QQ、支付宝等。
- Shizuku： 应用权限管理
- Thanox：管理后台
- Scene4：场景模式
- Google Camera：安卓平台最强相机
- SD Maid SE：老牌垃圾清理软件

### 清理 MIUI 毒瘤应用

```shell
adb uninstall -k --user 0 com.miui.analytics
adb uninstall -k --user 0 com.miui.analytics.service
adb uninstall -k --user 0 com.miui.bugreport
# 更多包名可自行进入设置查看
```

### 链接
- 小米设备代号查询：[https://miuiver.com/xiaomi-device-codename/](https://miuiver.com/xiaomi-device-codename/)
- MIUI 官方下载：[https://www.miui.com/download.html](https://www.miui.com/download.html)
- MIUI 历史版本下载：[https://miuiver.com/](https://miuiver.com/)
- 消除信号栏的感叹号：[https://www.evil42.com/index.php/archives/17/](https://www.evil42.com/index.php/archives/17/)
