---
title: 汇编语言入门
date: 2024-05-07
summary:  ## 前置知识  ### 在 Intel 平台运行汇编程序  首先，将汇编代码转换为机器码：  `
---


## 前置知识

### 在 Intel 平台运行汇编程序

首先，将汇编代码转换为机器码：

```shell
$ yasm -f macho64 hello-world.asm
```

### 在 ARM 平台上运行



## 汇编语言是什么

CPU是敏捷的，又是愚蠢的。本质上，它只能阅读0和1这两种数字，但是却可以每秒钟进行数百万次运算。看似矛盾的说法，在阅读完本文后，相信读者会有自己的答案。

我们平时编写的诸如 Java, Python, Javascript 等均属于“高级语言”。计算机（机器）本身是无法理解这些代码的。举个例子，对于有听力障碍的人士，需要手语师将语言转换为手势。

这些高级编程语言，不能直接在计算机硬件上执行**，需要将代码转换为计算机可以理解的机器语言（通常是机器代码或字节码）**。

虽然高级编程语言具有易读、易编写和跨平台等优点，但作为低级语言，汇编语言在某些情况下仍然具有重要意义。它可以：
- 直接与系统硬件交互
- 消耗更少的资源，可用于优化性能

需要注意的是，**无论高级语言还是低级语言，最终都需要先转换为机器码才能运行。**

掌握汇编语言后，你可以收获：
- 深入理解计算机内部工作原理
- 优化现有高级语言代码的性能
- 编写操作系统和底层驱动程序
- 逆向破解程序

常见的汇编语言类型有：
- X86
- ARM
- 6502
- …

## 机器码

机器码是CPU可以直接运行的代码。通常情况下，我们不需要手动编写机器码，而是使用汇编器将汇编代码（或者其他高级语言）转换为机器码。

机器码大概长这样：

```javascript
10111000000000000000011
00000000010100000000110
```



然而这样的代码难以记忆又不方便调式，于是人们造出了汇编语言。

汇编语言的核心是汇编指令。

在汇编语言中，我们可以使用寄存器来存储变量。例如，使用mov指令将数据存储到寄存器中，使用add指令将两个寄存器中的数据相加。

函数是汇编语言中的一个重要概念。与高级语言中的函数类似，汇编语言中的函数也可以接受参数并返回值。我们可以使用call指令来调用函数，使用ret指令返回函数结果。

下面我们将讲解汇编语言中的常见用法。

## 变量操作

## 条件控制

在Javascript中，常见的条件控制语法如下：

```javascript
if (condition) {
  // do something
} else {
  // do something else
}
```

在汇编语言中，我们可以使用cmp指令进行比较，使用je和jne指令进行跳转：

其中：
- je 代表 Jump if Equal
- jne 代表 Jump if Not Equal

```plain text
    mov eax, 1      ; set eax to 1
    cmp eax, 1      ; compare eax to 1
    je true_label   ; jump to true_label if equal
    ; do something if not equal
    jmp end_label   ; jump to end_label
true_label:
    ; do something if equal
end_label:

```

以上代码将实现一个简单的if/else语句块。

## 循环处理

由于汇编语言缺少很多更高级语言的“语法糖”，很多场景下我们需要模拟一些高级语言的特性。

例如，在Javascript中的循环写法如下

```javascript
for (let i = 0; i < 10; i++) {
  // do something
}
```

在汇编语言中，我们可以使用cmp指令进行比较，使用jmp指令进行跳转：

```plain text
    mov rcx, 0      ; initialize counter
loop_start:
    cmp rcx, 10     ; compare counter to 10
    jge loop_end    ; jump to end if greater than or equal to 10
    ; do something
    inc rcx         ; increment counter
    jmp loop_start  ; jump to loop_start
loop_end:

```

以上代码将实现一个从0到9的计数器。

## 函数



## 实战：编写一个汇编程序
