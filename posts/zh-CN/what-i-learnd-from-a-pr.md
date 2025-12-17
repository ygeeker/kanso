---
title: 一次 PR 带来的启示
date: 2023-06-23T01:23:00.000Z
summary: 最近往一个开源项目提交了一个 PR，作者很快回复我，并且修改了我的代码之后合并到主分支。这次 PR 给我带来的启示非常多。
tag: Coding
---


最近往一个开源项目提交了一个 PR，作者很快回复我，并且修改了我的代码之后合并到主分支。

但我收获的却不止这些。这次 PR 给我带来的启示非常多，包括程序员与 AI 的关系，编程的哲学等等。本文将详细分享我的这些启示，希望能对读者有所启迪。

这个项目是一个跨设备互传工具，使用 flutter 开发，而我做的就是为几个页面增加了“按 Esc 返回上一页“的功能。实现这个功能的代码不到 100 行，并且完全是 ChatGPT 帮我写的。

GPT 帮我编写的版本：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ShortcutWrapper extends StatelessWidget {
  final Widget child;
  final Map<LogicalKeySet, Intent> additionalShortcuts;

  ShortcutWrapper({
    required this.child,
    this.additionalShortcuts = const {},
  });

  @override
  Widget build(BuildContext context) {
    final shortcuts = {
      LogicalKeySet(LogicalKeyboardKey.escape): ActivateIntent(),
      ...additionalShortcuts,
    };

    return Shortcuts(
      shortcuts: shortcuts,
      child: Actions(
        actions: {
          ActivateIntent: CallbackAction<ActivateIntent>(
            onInvoke: (ActivateIntent intent) => Navigator.pop(context),
          ),
        },
        child: Focus(
          autofocus: true,
          child: child,
        ),
      ),
    );
  }
}
```

作者的修改版本：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:localsend_app/util/native/platform_check.dart';
import 'package:routerino/routerino.dart';

class ShortcutWatcher extends StatelessWidget {
  final Widget child;
  const ShortcutWatcher({required this.child});
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: {
        // The select button on AndroidTV needs this to work
        LogicalKeySet(LogicalKeyboardKey.select): const ActivateIntent(),
        // Add Control+Q binding for Linux
        // https://github.com/localsend/localsend/issues/194
        if (checkPlatform([TargetPlatform.linux])) LogicalKeySet(LogicalKeyboardKey.control, LogicalKeyboardKey.keyQ): _ExitAppIntent(),

        LogicalKeySet(LogicalKeyboardKey.escape): _PopPageIntent(),
      },
      child: Actions(
        actions: {
          _ExitAppIntent: CallbackAction(onInvoke: (_) => exit(0)),
          _PopPageIntent: CallbackAction(onInvoke: (_) async => Navigator.of(Routerino.context).maybePop()),
        },
        child: child,
      ),
    );
  }
}

class _ExitAppIntent extends Intent {}

class _PopPageIntent extends Intent {}
```

在此之前，我从没接触过 flutter，然后借助 GPT 快速地开发出了我自己的一个产品。我给自己的 flutter 项目用上了这个逻辑，然后再原封不动的往这个仓库提交了 PR 。

作者回复称：我们应该全局应用这个设计，**并且大幅****[修改](https://github.com/localsend/localsend/pull/543)****了我的代码**。我看完它的修改版本之后很震惊。

我一瞬间学到了几件事：

**GPT 并不会主动帮我们考虑边缘情况**，而是按照我们的指示精确地执行。在这个 PR 中，我只考虑到了 Windows 的退出逻辑，而没有考虑到 Linux 和 Android TV 的逻辑。如果我在编程时没有主动思考这些情况，那么我只可能会在收到用户反馈时再去修改。而考虑到种种极端情况应该是程序员的基本素养。

此外，仓库维护者修改我的代码时，使用了一些我从未见过的代码组织方式。如果不去自己尝试、解决 bug，或者不断调整代码结构，那么编程素养很难提升，仅仅是完成了一件事情而已。

会出现以上情况，是**因为我们习惯于认为 GPT 给我们的代码是完美的**。

当我们习惯把需求给 GPT 完成，而不亲手编写代码时，编码能力会直线下降。如果是一个人开发的项目，就更可怕了，因为没有人指出你代码中潜在的问题和改进空间，只有用户反馈才能帮你提出问题。

所以，**我们应该抱着代码评审的态度对待 GPT 生成的代码**，而不是”能跑就行“。也许你会热衷于成为提示词工程师，但我认为这是成为一个真正高水平的程序员不可绕开的道路。

费曼说的话至今依然很有道理：”只有创造出一样东西，才是真正懂了“。


