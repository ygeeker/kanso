---
title: 黑苹果不完全指南
date: 2023-04-11T14:39:00.000Z
summary:  ---    **会进 bios**  **会英语或者翻译**  **有手、耐心**  **需要一
---


---



**会进 bios**

**会英语或者翻译**

**有手、耐心**

**需要一个 U 盘**

## **前言**

本文适合对黑苹果毫无了解的小白。如果你已经买到电脑，想装黑苹果，可以继续阅读。

若你准备买一台可以装黑苹果设备，可参考 [笔记本](https://github.com/daliansky/Hackintosh) [台式机](https://macx.top/18202.html)

本文默认你会科学上网、会使用 GitHub 。

## **前期搜索&明确配置**

黑果的大概启动原理是：修改 config 和 DSDT 来启动 OS X。

明确配置的一会搜索驱动会少很多事，你需要做的就是去搜一下 「机型+EFI」 。

有的话,直接跳到安装部分

你的电脑如果找不到或者太冷门，且也想装黑苹果。就需要自己配 EFI

**配置 EFI**

这是一个 ！大点！

请结合多方信息，

不要只看我的这篇、也不要局限于国内互联网。

**你需要知道的信息**

黑苹果不怎么挑 U，但太老、太偏、AMD，就节约时间不考虑了。上网本（奔腾、赛扬就直接 pass 不得行）

Intel 的集显(HD+一些数字)、AMD 的独立显卡大多都可驱动，这个请搜索 显卡型号+黑苹果”

网卡能驱动上的很少，能驱动的也有各种特殊方法。
具体情况请自行搜索，本文不展开

声卡同理，请自行搜索。

## **下载工作**

### *必须下载*

~~这里的文件~~~~[参考](https://dortania.github.io/OpenCore-Install-Guide/ktext.html#must-haves)~~~~部分软件~~
请记住他的别称（打在括号里的）

***请将你下载好的文件放在一起，软件请安装。请确保所有的东西你都能找到！***

编辑 plist 配置的[plist 编辑器](https://github.com/corpnewt/ProperTree) 或者[OpenCoreCFG](https://mackie100projects.altervista.org/opencore-configurator/)

必备，下载 release[最简 EFI](https://github.com/acidanthera/OpenCorePkg/releases)

[SSDT](https://github.com/corpnewt/SSDTTime)

diskgeunis(区分工具)百度去下

[Lilu](https://github.com/acidanthera/Lilu/releases)

[VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)

[WhateverGreen !部分 AMD 的集显不能装！](https://github.com/acidanthera/WhateverGreen/releases)

[AICP 编辑工具](https://acpica.org/downloads/binary-tools)

[写盘工具](https://github.com/balena-io/etcher/releases/download/v1.7.9/balenaEtcher-Setup-1.7.9.exe)

[黑果小兵](https://blog.daliansky.net/)这里下载一个镜像，可以私聊我给你发一个

[排错 1](https://shuiyunxc.gitee.io/2020/04/06/Faults/index/) [排错 2](https://apple.sqlsec.com/10-%E6%8E%92%E9%94%99/)
这里面是常见的黑苹果会遇到的问题，遇到问题了来这看看

*共 10 个文件*

**这里是笔记本的附加部分，台式机请跳过**

~~因为有电池、键盘鼠标等，笔记本用户大多都需要补充这些驱动。当然凡事无绝对，你无法确保有些吃饱没事干，搞特殊~~

这一部分适用于大部分用户，如果这一部分按照广普的教程不行，请百度搜索以下内容：

**所有笔记本用户**。
- SMCProcessor.kext
- SMCSuperIO.kext
- SMCLightSensor.kext
- SMCBatteryManager.kext
- SMCDellSensors.kext(仅限 dell 用户)

*共 4 个(戴尔是 5 个)*

***AMD 用户**** 需要额外补充的驱动*

[AMDProcesser](https://github.com/trulyspinach/SMCAMDProcessor)

[AMDRadeonGPU](https://github.com/aluveitie/RadeonSensor)

### **显卡**

*Intel 核显 （也就是整个电脑没有显卡）*

直接用这个[OC 工具箱](https://www.123pan.com/s/rd39-MkpOd)特别省事

*Nvdia*

~~仅支持到 10.13.6~~

[参考](https://www.bilibili.com/video/BV1wr4y1r78X?spm_id_from=333.337.search-card.all.click&vd_source=b2ed1387674e77df3a3f4f6acfe5a846)
这个部分争议较大，且这个技术比较新，又加上我没有 Nvdia 的显卡无法测试

所以英伟达用户请自行测试

*AMD 显卡（独显，如果你是 vega8 这类集显，要么等，要么 C++逆向）*

AMD 显卡要么就是免驱

要么就是仿冒 ID

这一步 AMD 用户可以大喊一声：AMD YES

如果你是 vega8 的用户

且你刚好会 C++，接触过逆向工程。欢迎联系我

### **声卡**

声卡部分，由于不同品牌的网卡有不同的驱动方式

有些事注入 ID 就好，有些需要单独加驱动，有些又无法驱动

在此我帮你搜到了全网的大部分声卡驱动，剩下的你自己测试
[声卡](https://radcliffe.vercel.app/post/hei-ping-guo-sheng-qia-qu-dong/)

### **网卡**

网卡部分 intel 的看[Intel](https://zhuanlan.zhihu.com/p/299695036)

[其他网卡](https://zhuanlan.zhihu.com/p/339648390)

把你的网卡型号在这里面搜索一下

有你的网卡，你就去对应搜索“型号+黑苹果

**现在，所有的下载工作应该都做完了，你可以稍事休息一下辛苦了，但真正的硬菜马上就来了。少喝酒，多吃菜**

## **配置 EFI**

请按照这个顺序或者你自己不会弄错的顺序来。

请将下载好的文件解压、安装。如果你看到 XXX.kext 这种文件夹，就证明她已经是最简了

请将下载好的文件分好类。

### *地基*

将「最简 EFI」解压到你找到地方

删除 Tools 文件夹下的所有东西

把 Drivers 文件下删得只剩 OpenRuntime.efi 「！仔细理解这句话！」

把[这个](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)放在 Drivers 里面

### *ACIP*

~~这一步的目的是让系统可以控制硬件，软件控制硬件
~~~~[参考](https://www.bilibili.com/read/cv10117507/)~~

1.打开 \***\******SSDT\******\*** 打开里的 \***\******SSDTTime.bat\******\***

2.以「4，3，2」的顺序「顺序不能错」会生成 3 个文件

3.现在我们需要处理下 **SSDT-RTC0.dsl**

没有自动生成就[下载](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0.dsl)

用文本编辑器之类的打开它，用尽你毕生所学找到

```plain text
External (_SB_.PCI0.LPCB, DeviceObj)

Scope (_SB.PCI0.LPCB)

```

修改成

```plain text
External (_SB_.PCI0.LPC, DeviceObj)

Scope (_SB.PCI0.LPC)

```

4.处理 **SSDT-PMC**
没有就[下载](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-PMC.dsl)

```plain text
External (_SB_.PCI0.LPCB, DeviceObj)

Scope (_SB.PCI0.LPCB)

```

修改为

```plain text
ternal (_SB_.PCI0.LPC, DeviceObj)

Scope (_SB.PCI0.LPC)

```

5.编译
用这个指令

```plain text
acpihelp.exe -o 文件名字

```

**把「文件名字」 依次换成 刚刚变出来的 5 个文件**
最后你需要确保 你可以看到 5 个以 XXX.aml 结尾的文件。

6.现在，请新建一个文件夹，把文件放入，命名为「ACPI」替换在「最简 EFI』文件夹里

### *配置 OpenCoreCFG*

[请看](https://post.smzdm.com/p/aqm8nxvx/)，这个部分这个作者写的好，请看他

以后会考虑自己写

### *组装*

将 **kexts 文件夹** **ACPI** 放在「最简 EFI 里」

这个时候你的「最简 EFI」里会有 图 1.1 1.2

![Image](/image/post/13b3032c-0204-4b35-9569-c515d16027a1_xS2aDI.png)

![Image](/image/post/8882f2b3-b890-4822-8333-db70fa06eb71_xS2hV0.png)

将你的「最简 EFI」重命名为 EFI

```plain text
休息下吧，看到这里

辛苦啦

这一步之后，就要正式开始安装了

```

## **开始安装**

### 1.写盘

用「写盘工具」将你下载映像写入 U 盘

~~如果你卡在 Vailting 这个地方 跳过就好~~

对于小白：当你同时看到绿色的进度条和 Skip 这个单词时直接点 **skip**

### 2.进入 BIOS

*以你的毕生所学，进入 bios 并且关闭（没有的不管）*

```plain text
Fast Boot
Secure Boot
Serial/COM Port
Parallel Port
VT-d
CSM
Thunderbolt（有些没有驱动）
Intel SGX
Intel Platform Trust
CFG Lock(可以的话)

```

*打开*

```plain text
VT-x
Above 4G decoding
Hyper-Threading
Execute Disable Bit
EHCI/XHCI Hand-off
OS type: other
UEFI Mode
DVMT Pre-Allocated: 64MB
SATA Mode: AHCI

```

### 3.Boot up

从你的 U 盘启动

### 4.安装

一、请将安装程序调成你熟悉的语言，最好不要登陆 Apple ID、不要

如果你发现你下载的镜像是俄语的，且找不到地方修改它

请使用翻译软件，推荐 *谷歌翻译*

二、如果你是在安装 Catalina(10.15.x)之前的系统，请[参考](https://www.applex.net/threads/macos-mojave.93508/)

### 善后

现在，不出意外，你应该在系统里面了，

有部分网卡、声卡需要别的操作的，请按照对应的教程进行

三码注入部分,前面配置*OpenCoreCFG*部分

另一位作者已经提到，不再赘述

## 尾言

文章写得很赶，有些东西自己也不太会。希望大家有耐心慢慢搞。

苹果发布 M1 型片后，就不知道黑苹果还能活多久。且行且珍惜

如果你是 vega8 用户，又刚好会 C++写驱动，可以带你去找找国外的进度

感谢那些曾经为黑苹果默默做出贡献的开发者！

此致

——————————————————————————

转载请注明出处，可以二创。

如果你在安装时遇到问题，可在电报上联系我：[Charles](https://www.notion.so/rivertwilight/t.me/Mistry_Rain)

所有的操作均来自互联网，遇到问题请你自己负责！

文章已授权 [Gloridust](https://gloridust.xyz/) [Rene](https://rene.wang/)发布
