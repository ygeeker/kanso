---
title: Nextjs踩坑记录
date: 2020/6/20
categories:
    - Programming
tag: Coding
---

## 部署

### 部署方法

类似 express， 编译完成后运行`npm run start`命令，服务器配置反向代理即可

### 端口占用

Next 默认在开发环境下使用 3000 端口，若此时执行`npm run start`命令会提示端口被占用，将`package.json`文件下 script 的 start 命令改成如下即可

```cli
npm run start -p <port>
```

## i18n 功能不支持静态导出

无奈之下只能放到服务器上了。
