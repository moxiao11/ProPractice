
# git

---

### 是什么

Git 是一个分布式版本控制系统（Distributed Version Control System），用于跟踪文件变化、管理代码版本，并支持多人协作开发。

它最初由 Linus Torvalds 在 2005 年为开发 Linux 内核而创建。

### 干什么

简单来说就是代码的时间机器

* 记录每一次文件修改

* 查看修改历史

* 回退到任意历史版本

* 创建分支进行功能开发

* 合并不同分支的代码

### 怎么用 

需要使用到git bash来进行一些命令

### git指令

我自己写很多教程可以说是班门弄斧了，这里的git教程摘自伯克利大学的CS61B


---

`init`

如果你想把某个目录初始化为一个 Git 仓库，可以在该目录下运行：

```bash
git init
```

这条命令会在当前目录中创建一个新的 Git 仓库。

---

`git add 和 git commit`

当我们想保存对仓库所做的更改时，需要先选择要保存的文件。

添加单个文件：

```bash
git add some_file.txt
```

添加所有更改：

```bash
git add .
```

执行 `git add` 后，文件会进入 **暂存区（staging area）**，但还没有真正保存。

要真正保存更改（创建一次提交快照），需要运行：

```bash
git commit -m "在这里写提交说明"
```

建议写清晰、具体的提交信息，方便之后查看历史记录和团队协作。

---

`git status`

查看当前仓库的状态：

```bash
git status
```

可能看到类似输出：

```text
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
	modified:   file1.java
	modified:   file2.java
```

- **Changes not staged for commit**：已修改但未加入暂存区
- **Changes to be committed**：已加入暂存区，等待提交
- **Untracked files**：未被 Git 跟踪的文件

---

`git log`

查看提交历史：

```bash
git log
```

示例输出：

```text
commit 8g955d88159fc8e4504d7220e33fad34f8f2c6bd
Author: Elana Ho <elana@example.com>
Date:   Tue Feb 7 19:06:48 2016 -0800

    Added common Git problems to lab04.
```

说明：

- `commit` 后面的字符串是 **commit id（提交编号）**
- 提交信息是你在 `git commit -m` 中写的内容
- 可以查看完整的提交历史

---

`git restore`

### 恢复到最近一次提交版本：

```bash
git restore 文件路径
```

### 恢复到指定提交版本：

```bash
git restore --source=commitID 文件路径
```

其中 `commitID` 是通过 `git log` 查到的提交编号。

---

### 小结

常用 Git 命令：

```bash
git init
git add .
git commit -m "message"
git status
git log
git restore
```

Git 的核心流程：

```text
修改文件
   ↓
git add
   ↓
git commit
   ↓
git log 查看历史
```

同时附上Itai的六节youtube视频，纯英(需要挂梯子),可以说是非常详细(听完整个人都升华了)

[Git Intro - Part 1](https://www.youtube.com/watch?v=yWBzCAY_5UI)

[Git Intro - Part 2](https://www.youtube.com/watch?v=CnMpARAOhFg)

[Git Intro - Part 3](https://www.youtube.com/watch?v=t0tzTcZESWk)

[Git Intro - Part 4](https://www.youtube.com/watch?v=ca1oCEMQGRQ)

[Git Intro - Part 5](https://www.youtube.com/watch?v=dZbj9gjjYv8)

[Git Intro - Part 6](https://www.youtube.com/watch?v=r0oHi0vXhLE)

当然如果只是应付作业的话，可以只学会git add,git commit,git push完全足够。看一节就够了

---

<!-- NAV-CARDS:START -->
<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;">
  <a href="#/assets/content/knowledge/Scoop.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none;">
    <div style="font-size:12px; opacity:.7;">Previous</div>
    <div><strong>Scoop</strong></div>
  </a>
  <a href="#/assets/content/knowledge/github.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; text-align:right;">
    <div style="font-size:12px; opacity:.7;">Next</div>
    <div><strong>GitHub</strong></div>
  </a>
</div>
<!-- NAV-CARDS:END -->
