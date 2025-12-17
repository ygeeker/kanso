---
title: Flutter 接入内购指南之 App Store 
date: 2025-05-20
summary: 本文将介绍 Flutter App 对接 App Store 实现
---


## 概览

本文将介绍 Flutter App 对接 App Store 实现**内购和订阅**，以及异常情况处理和防止掉单的最佳实践。本文同时假设读者已经有基本的 Flutter 开发经验（会写基本的UI）。

只需要跟着本文一步步走，就可以实现完美的内购功能。注意：**本文适用于你有自己的账号系统。如果你的 App 完全离线管理订阅，那么本文可能不适合你。**

## App Store 商店设置

开发者需要提前在 App Store Connect 中配置商品信息。App Store 的购买分为两种：订阅和消耗品。对于永久会员，建议使用 In-Ap Purchase，对于订阅类（例如会员），则使用 Subscription。

![Image](/image/post/a4f48e4a-4198-4879-a71e-3feca35e5191_Screenshot_2024-06-26_at_19.18.30.png)

创建订阅或商品时，会要求提供两个值：
- Reference Name：建议写为人类可读的格式，例如 ClipMemo Plus
- Product ID：商品 ID，建议使用下划线连接，全小写。例如 lifetime_plus_v2。注意：一旦创建了这个商品，那么这个 ID 就不能再被使用了（即使你删除了这个商品）

然后配置可用区及价格。

![Image](/image/post/8e9d3ad0-e4c0-4482-b91c-4063c318d404_Screenshot_2024-07-13_at_17.32.26.png)

最后，我们需要提供服务器通知 API，用于接受来自 Apple 的通知。

提交版本之前，别忘了将这些内购选项也勾选提交。

![Image](/image/post/52aa1283-163d-44a1-870c-6041a203c8f2_Screenshot_2024-08-01_at_14.22.14.png)

至此，App Store 便设置完毕。

## Xcode 配置

配置好后，我们需要在 XCode 中添加 Storekit 用作本地测试。

在 Xcode 新建一个文件，选择 StoreKit。在弹出的窗口中勾选”Sync this file with an app in App Store Connect”选项。此操作会把我们在后台配置的商品信息自动同步。

![Image](/image/post/e18a72bc-ab2c-421c-b108-2f03f02ea01b_Untitled.png)

你可以直接将这个文件放在根目录。创建好后，刚刚在后台设置的商品信息就会同步过来。

值得一提的是，如果你在后台更新了商品，需要手动到 Xcode 中点击同步。另外，更新商品信息后可能需要过段时间才能被 flutter 查询到。

## Flutter 代码实现

首先需要安装官方出品的内购工具 in_app_purchase。打开购买页面后，首先要获取商品信息：

```dart

```

## 数据库设计

我们需要更新数据库来保存用户的订阅信息。当然，你也可以完全在本地存储购买信息。用户切换设备后，只需要点击恢复购买即可更新本地的购买信息，这里不多讨论。

首先，在用户数据库中新增一个 order 表，用于存储订单信息。
| 名称 |  类型 |  说明 | 
| --- | --- | --- |
| product_id |  text |  商品 ID，与App Store中的保持一致 | 
| transaction_id |  text |  交易 ID，由 Apple 提供 | 
| purchase_date |  date |  购买时间 | 
| expires_date |  date |  过期时间 | 

接着，新增一个 subscription 表，用于存储订阅（包括永久买断）信息。
| 名称 |  类型 |  说明 | 
| --- | --- | --- |
| product_id |  text |  商品 ID，与App Store中的保持一致 | 
| user_id |  text |  用户 ID | 
| purchase_date |  date |  购买时间 | 
| expires_date |  date |  过期时间 | 
| is_lifetime |  bool |  是否为永久买断 | 



## 服务端实现

服务端是整个流程中最复杂的部分，建议仔细阅读。不同的服务框架处理逻辑仍然是类似的，此处以 Javascript 为例。

![Image](/image/post/5644ac04-cd3b-4438-b150-3d1e7e8f73af_Screenshot_2024-06-26_at_23.09.37.png)

首先，理清需要**服务器的需求**：

1. 接收 Apple 发来的订购通知
2. 接收 Apple 发来的自动续订通知
3. 接收 Apple 发来的兑换通知
4. 接收 App 发来的订单验证请求
5. 接收 App 发来的订阅状态查询请求

因此，我们需要编写两个边缘函数（或者 API）。分别处理 App Store Server Notification 和 app 发来的请求。推荐首先参阅 App Store 的这篇[文档](https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2decodedpayload)。

整个购买流程如下：



这样设计可以**避免用户在 App 切换账号，然后不断使用恢复购买来刷出大量有订阅资格的账号。**

对 payload 解包后，首先判断 notifcationType 来进行后续操作。注意，此处仅列出常用的类型处理逻辑，对于更复杂的业务需求，建议查看文档自己拓展。
- OFFER_REDEEMED** ：**兑换邀请码。我们需要将兑换请求存放，以供稍后验证。
- SUBSCRIBED ：用户发起订阅（已完成支付）。我们只需要将订单信息插入到订单数据表即可，等待前端查询。
- DID_RENEW：自动续费订阅成功。我们需要根据提供的交易 ID 在数据库中找到对应的用户，并延长他们的到期时间。
- REFUND：用户发起退款。我们需要根据提供的交易 ID 在数据库中找到对应用户并撤销他们的订阅。

理清思路后，以下是参考代码实现：



配置好我们的服务器后，我们需要把处理来自 App Store 的通知的 API 提交到 App Store Connect。



## 异常处理

一个常见的问题就是，客户端发来订单验证请求，但此时 Apple 的订单信息还没落库。所以我们需要：
- 第一次
- 

## 测试

你可以在三种环境下测试内购：
- Xcode 模拟器：无法接受服务器通知
- TestFlight 测试环境：可以接受服务器通知
- App Store 生产环境：可以接受服务器通知

为了贴近真实的购买环境，推荐创建沙盒用户。在你的 App Store Connect 中可以创建账户模拟不同地区账户。此外，你还可以点击

![Image](/image/post/b1c5f2d5-a62b-4044-8373-8d057980433e_Screenshot_2024-07-12_at_13.29.11.png)


