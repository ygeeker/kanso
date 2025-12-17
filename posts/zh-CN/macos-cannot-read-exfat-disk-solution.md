---
title: macOS 无法读取 exFAT 硬盘解决方案
date: 2023-11-30T02:40:00.000Z
summary: 昨天把移动硬盘插上Mac，发现竟然无法读取，而磁盘工具显示为“未挂载”。
tag: Tech
---


昨天把移动硬盘插上Mac，发现竟然无法读取，而磁盘工具显示为“未挂载”。

![Image](/image/post/35137315-a2e0-4cdb-a178-12475dfe4cf0_Untitled.png)

查阅资料后发现，这种情况通常是由于没有正确推出 exFAT 格式磁盘导致的。试了很多种解决方案，终于在一个 gist [页面](https://gist.github.com/scottopell/595717f0f77ef670f75498bd01f8cab1)（的评论区）找到了可行的。

首先，确保硬盘连接了Mac，在终端输入以下命令：

```bash
diskutil list
```

这会获取一个磁盘列表。找到你的磁盘，记住硬盘的 ID。比如我的是 disk8s1。

![Image](/image/post/f1cb76b9-5c7a-4084-9a87-bd02ca257382_Screenshot_2023-11-30_at_10.46.27.png)

接着输入这个命令，其中 ID 是你刚刚记住的数字：

```bash
sudo ps -ax | grep <ID>
```

你会得到一个新的 ID，例如：

```bash
65633 ??         0:00.96 /System/Library/Filesystems/exfat.fs/Contents/Resources/./fsck_exfat -y /dev/rdisk8s1
65825 ttys000    0:00.00 grep disk8s1
```

记住后面有两个？的PID，最后杀死这个进程：

```bash
sudo kill -9 65633
```

会有弹窗提示你硬盘有问题，但此时你已经可以读取硬盘数据了。

最后，进入磁盘工具，执行硬盘急救，硬盘恢复如初。

![Image](/image/post/6d41fd20-f86c-439b-ac2c-15907fe8e40e_Untitled.png)

为避免这个情况再次发生，务必记得正确推出 exFAT 格式的磁盘，而不是硬插拔。
