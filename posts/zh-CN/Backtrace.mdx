---
title: 【图片 + 渐进式】换一种方式理解回溯
date: 2023/2/11
tag: Coding
---

今天做的是回溯算法题。题目如下

![](https://cdn.jsdelivr.net/gh/filess/img1@main/2023/02/11/1676101161776-a208b8e6-40f2-4785-9e1c-4ec4d5a8fcfb.png)

> 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
> candidates 中的每个数字在每个组合中只能使用 一次 。
> 注意：解集不能包含重复的组合。

于是决定以本题为基础写篇文章讲讲回溯算法。

首先我们看看回溯最基本的框架：

```python
class Solution:
    def combinationSum2():
        res = []

        def tranceback():
           for i in xxx:

        tranceback()
        return res
```

这段代码相当于遍历了一遍某个数组。

但是我们遇到的问题往往是需要重复使用某一个元素（也许结果不允许重复，但是我们也要不止一次地遍历到它）。例如，求和最基础的穷举思路：

![](https://cdn.jsdelivr.net/gh/filess/img18@main/2023/02/11/1676101255682-fa2aeb83-e33a-4703-997f-2314287d4bde.png)

这样的方法十分低效，会不断重复匹配组合，例如[1, 2] [2, 1]

> 其实回溯也是一种枚举方法，但我们有更大优化的空间。回溯算法的核心思想是不断地试错，在每一步搜索中，如果发现当前的决策不可行，则进行回溯，退回到上一步重新做决策。

所以我们希望能"记住"已经匹配过的部分，

我们将上面的代码继续添加内容：

```
class Solution:
    def combinationSum2(self, candidates: List[int], target: int):
        res = []

        def tranceback(index, path, remain):

           for i in range(index,len(candidates)):

        tranceback(0, [], target)
        return res
```

回溯函数接受三个参数，第一个就是指针，第二个是组合，第三个是目前的组合距离目标还有多远。

函数内的循环是从指针的位置开始的，避免了重复检查内容。

循环每走一次，我们就看看是否满足了要求。

```python
for i in range(index, len(candidates)):
    candi = candidates[i]

    # 达到目标，不用再循环了
    if candi == remain:
        res.append(path + [candi])
        return
    #还不够，继续
    if candi < remain:
        # 往下阅读
```

如果不够，我们可以继续从指针循环：

```python
for i in range(index, len(candidates)):
    candi = candidates[i]

    # 达到目标，不用再循环了
    if candi == remain:
        res.append(path + [candi])
        return
    #还不够，继续
    if candi < remain:
        for i in range(i + 1, len(candidates)):
            remain -= candi
            # 重复上面的操作
```

![](https://cdn.jsdelivr.net/gh/filess/img9@main/2023/02/11/1676101246046-fc35411e-bfa1-425c-87aa-6bc688e94af1.png)

每遍历到一个数，执行的逻辑都是相似的：检查 remain 够不够，不够的话往下走....

所以我们不妨重用这个函数本身，把作为参数的指针向后挪一位即可。

```python
if candi < remain:
    tranceback(i + 1, path + [candi], remain - candi)
```

想象一下：假如目标是无穷大，我们就会一直循环调用，指针也会一直往后移。

而最外层的循环，让每一个节点都有了成为“无限循环的开始”的权利。

这就是回溯的核心思想：以每一个节点为起始，再遍历一遍其他的节点。

这段代码仍然可以优化。因为某些情况下完全没必要继续进行循环了，比如

-   达到了目标
-   目前指针所指的数字超过了剩余的和

所以每次回溯我们都可以检查一下，这叫“剪枝”。

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []

        def tranceback(index, path, remain):

           for i in range(index,len(candidates)):
                candi = candidates[i]

                if candi == remain:
                    res.append(path + [candi])
                    return
                if candi < remain:
                    tranceback(i + 1,path + [candi], remain - candi)
                if candi > remain:
                    return

        tranceback(0, [], target)
        return res
```

这就是完整的回溯解法。但是我们仍然可以改进。

首先，如果给定的数组是升序，那么我们可以更快得到结果。因为答案密度在较小的数字中比较大。

其次，如果遇到了一样的数字，我们可以直接跳过。因为答案不允许重复。

![](https://cdn.jsdelivr.net/gh/filess/img12@main/2023/02/11/1676101269773-c0a9429a-6c57-46bf-9574-6b955ad24105.png)

优化过后的代码：

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []

        def tranceback(index, path, remain):

           for i in range(index,len(candidates)):

                candi = candidates[i]
                # 重复就直接跳过
                if i > index and candidates[i-1] == candidates[i]:
                    continue
                if candi == remain:
                    res.append(path + [candi])
                    return
                if candi < remain:
                    tranceback(i + 1,path + [candi], remain - candi)
                if candi > remain:
                    return

        tranceback(0, [], target)
        return res
```

## 实践：八皇后问题

「八皇后问题」是一个经典的回溯算法题目，要求在 8x8 的国际象棋棋盘上放置 8 个皇后，使它们不互相攻击，即任意两个皇后都不能处于同一行、同一列或同一对角线上。

下面的源码中，yield 可以理解为往存放结果的数组中追加元素。

```python
# state是一个一维数组，记录每一行的皇后横坐标。例如[1, 4, 6, 3, 0, 7, 5, 2]

def queens(num=8,state=()):
    for pos in range(num):
        # 剪枝：如果冲突了就不循环了，相当于上面的return
        if not conflict(state, pos):
           # 到了倒数第二行，就不必嵌套了，返回所有可能的坐标即可（不符合的x位置已经被过滤掉了）
            if len(state)==num-1:
                yield(pos,)
            else:
                # 以当前状态为起点，再次调用函数自身。
                for result in queens(num, state+(pos,)):
                    yield (pos,)+result

```

同样经典的模式：以每一次循环的状态为起点，搜索剩余的部分。

感谢阅读，欢迎关注我的 [GitHub](https://github.com/RiverTwilight), 我会持续分享更多技术内容。
