---
title: 讲清讲楚：SVD（奇异值分解）
date: 2025-04-22
summary: 本文将为零代数基础人士讲清楚这个算法的工作原理。
keywords:
  - AI
  - Donation Strategies
  - 矩阵分解
---


在 NLP 任务中，通过计数原理创建 word-embedding 时，往往需要通过 SVD 算法降维。又或者，在生成式任务中，要比较两个矩阵的相似度，SVD 也是常用的方法。

本文将为零代数基础人士讲清楚这个算法的工作原理。

## 为什么要使用 SVD

线性代数中，SVD 将一个矩阵分解成三个特殊矩阵的乘积。

假设你已经搞清楚了共现矩阵的实现原理，那么我们可以知道共现矩阵含有很多0，即他们是非常稀疏的。

通过 PPMI 算法我们可以确保每个值小于1，但是仍然非常稀疏，会造成计算资源浪费，所以我们使用SVD算法把这个矩阵变为密集矩阵。

注意，降维的方法有很多，SVD 是被广泛采用的方法之一。

## SVD 工作原理

SVD 最基本的公式如下：

$$
A = U \Sigma V^T
$$

简单来说，**一个矩阵被用三个矩阵的乘积表示出来了**。因为这个特性，可以降低 NLP 中创建的矩阵大小，或者利用分解出来的特征值比较矩阵相似度。

接下来我们来讲讲这三个矩阵的构成。

![Image](/image/post/30edf63e-0e4d-4b64-a900-ae2c5864fb15_Untitled.png)

注意观察每个矩阵的形状。我们先看看一些概念。
- $$ V^T $$：矩阵V的转置，即把m×n矩阵 V 的行换成同序数的列得到一个n×m矩阵。经过两次转置运算后将得到原来的矩阵。
- 正交矩阵：如果一个矩阵满足Q^TQ=QQ^T=I（其中I是单位矩阵，Q^T是Q的转置），那么我们就说Q是**正交矩阵。**
- 协方差矩阵：给定矩阵 A，他们的协方差矩阵为 $$ A^TA $$ 和 $$ AA^T $$
- 奇异值：即奇异值矩阵对角线上的所有值（图中已标注）。对于奇异值矩阵，除了对角线上的元素，其余值均为0。

根据最初给出的公式，可以进行如下推导：

$$
AV = U \Sigma V^TV
$$

由于V是正交矩阵，故可得：

$$
AV = U\Sigma
$$

所以：

$$
Av_i = u_i \sigma_i
$$

所以奇异值为

$$
\sigma_i = \frac{Av_i}{u_i}
$$

问题现在变成了如何计算 U 和 VT。在 SVD 中，U 和 V是正交矩阵，它们的列向量是来自于A的协方差矩阵（$$ A^TA和AA^T $$）的特征向量。奇异值（Σ的对角线上的元素）**是A的协方差矩阵的特征值的平方根**。即：

$$
\sigma_i = \sqrt{\lambda_i}
$$

这一步看不懂也没关系，我们一步一步来。首先，你可能会疑惑：**如何对矩阵进行特征分解**？

对于一个给定的方阵 $$ A $$，非零向量v是A的一个特征向量，当且仅当Av是v的标量倍，这个标量就是特征向量v对应的特征值。即：

$$
Av = \lambda v
$$

## Python 实现

通过观察代码实现，你会对这个算法有更好的理解。

```python
import numpy as np

# 输入矩阵 A
A = np.array([[4, 11, 14], [8, 7, -2]])

# 计算 AAT 和 ATA
AAT = A @ A.T
ATA = A.T @ A

# 计算特征值和特征向量
eig_vals_U, eig_vecs_U = np.linalg.eig(AAT)
eig_vals_V, eig_vecs_V = np.linalg.eig(ATA)

# 将特征值排序，降序
idx_U = eig_vals_U.argsort()[::-1]
idx_V = eig_vals_V.argsort()[::-1]

# 使用排序的索引获取对应的特征向量和特征值
eig_vals_U = eig_vals_U[idx_U]
eig_vecs_U = eig_vecs_U[:, idx_U]

eig_vals_V = eig_vals_V[idx_V]
eig_vecs_V = eig_vecs_V[:, idx_V]

# 计算对角矩阵 Sigma
Sigma = np.zeros((A.shape[0], A.shape[1]))
for i in range(min(A.shape)):
    Sigma[i, i] = np.sqrt(eig_vals_U[i])

# 构造U，Sigma，V矩阵
U = eig_vecs_U
V = eig_vecs_V.T
print("U:\n", U)
print("Sigma:\n", Sigma)
print("V:\n", V)
```
