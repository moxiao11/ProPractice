# git Bash

---

### bash是什么

Bash（Bourne Again SHell）是一种常见的 命令行解释器（Shell），用于在操作系统中通过文本命令与系统进行交互。

### 和命令行关系是什么

命令执行流程如下图:

```text
你输入命令
      ↓
Bash（Shell 解释器）
      ↓
操作系统执行
      ↓
返回结果
```

### 怎么用

它广泛运行在 Linux、macOS 系统中，也可以在 Windows（如 WSL 或 Git Bash）中使用。因此如果你是windows系统，需要安装git bash或者wsl来使用，我们的课程采用前者,给出两篇安装参考教程，可以看第一篇的第一大步(第二大步就是之后的流程了)或者第二篇(二选一)

ps:还有就是装git，附赠git bash所以我们的教程都是装git

[【Git安装】Git安装流程和基础使用步骤（保姆级教程）](https://blog.csdn.net/qq_39809160/article/details/145712755?ops_request_misc=elastic_search_misc&request_id=e2429e10ff1430a2c7386dec16f50db5&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-145712755-null-null.142^v102^pc_search_result_base8&utm_term=git%20bash%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)


[Git安装教程（图文安装）](https://blog.csdn.net/qq_38473254/article/details/137244558?ops_request_misc=elastic_search_misc&request_id=e2429e10ff1430a2c7386dec16f50db5&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-137244558-null-null.142^v102^pc_search_result_base8&utm_term=git%20bash%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)

给出一个对比图，即使用的linux系统也要装git，因为纯bash是没有git的

| 对比       | Bash           | Git Bash         |
| -------- | -------------- | ---------------- |
| 本质       | 一种 Shell 程序    | Windows 上的一个工具   |
| 是否依赖系统   | Linux/macOS 自带 | Windows 需要安装     |
| 是否包含 Git | 不一定            | 一定包含             |
| 作用       | 解释命令           | 提供 Bash + Git 环境 |

可以将Git Bash看作是一个终端模拟器，它提供了类似于Linux和Unix系统下Bash Shell环境的功能。通过Git Bash，用户可以在Windows系统中运行基于Bash的命令行，使用一些常见的Linux命令以及Git命令。

### 使用命令

其实这个上学期教过了，只是在powershell下有些指令也是相同的
```bash
pwd          # 显示当前路径
ls           # 查看当前目录内容
cd 目录名     # 进入目录
cd ..        # 返回上一级目录
mkdir 文件夹名  # 创建文件夹
```

```bash
touch 文件名      # 创建文件
rm 文件名         # 删除文件
rm -r 文件夹名     # 删除文件夹
cp 源 目标        # 复制文件
mv 源 目标        # 移动或重命名
```

如果不懂的话可以看看MIT的missing lecture，记住了只听一节，最多两节，之后的基本就是学linux运维可能需要用的高阶技巧，不适合大部分学生。

[MIT missing lecture](https://missing.csail.mit.edu/2026/course-shell/)
