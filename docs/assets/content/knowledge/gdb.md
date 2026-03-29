# 调试

### 引言

wiki百科上有一篇debug的概念介绍[what's is debug](https://en.wikipedia.org/wiki/Debugging),可能对于现在来说感受不到，因为我们写的代码简短，再加上AI一问就有答，debug的性价比逐渐下降，但这也是一个程序员必不可少的工具.



### 调试信息查看方法

对于现代的IDE，都有自己的debug方法，可以自行搜索然后摸索，这里主要提供vscode和clion，对于命令行来说可以使用gdb。

- clion调试方法：[Clion](https://blog.csdn.net/annesede/article/details/133940779?ops_request_misc=elastic_search_misc&request_id=85b4a1429f9f06f89f767383322ca911&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-133940779-null-null.142^v102^pc_search_result_base8&utm_term=clion%E8%B0%83%E8%AF%95&spm=1018.2226.3001.4187)

- vscode调试方法[vscode调试](https://blog.csdn.net/metabamboo/article/details/130332787?ops_request_misc=elastic_search_misc&request_id=86de300988cf027d918e174e53f523e8&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-130332787-null-null.142^v102^pc_search_result_base8&utm_term=vscode%E8%B0%83%E8%AF%95&spm=1018.2226.3001.4187)


- 命令行调试核心工具：[GDB](https://sourceware.org/pub/gdb/releases/)(核心是设置
断点，让程序在特定位置停止，然后使用各种命令检查程序状态，控制其逐步执行）
###
[GDB](https://blog.csdn.net/weixin_45031801/article/details/134399664?sharetype=)基本调试流程

1.编译时加入调试信息：使用`-g`编译选项生成包含源代码符号的可执行文件
`gcc -g -o test_program test_program.c`

2.启动 GDB：在命令行加载可执行文件
`gdb ./test_program`

3.设置断点：在函数名或行号处设置断点

```
(gdb) break main #在 main 函数入口设置断点
(gdb) break 10 #在第 10 行设置断点
```
4.运行程序：在 GDB 环境中启动程序，程序会在第一个断点处停止
`(gdb) run`
5.查看与操控:程序暂停后，即可使用各种命令查看信息或控制执行
```
(gdb) print variable # 打印变量 variable 的当前值[ref_4]
(gdb) backtrace # 查看当前的函数调用栈[ref_4]
(gdb) list # 查看当前停止位置附近的源代码[ref_4]
(gdb) next # 执行下一行代码（单步跳过，不进入函数）
(gdb) step # 执行下一行代码（单步进入，会进入函数内部）[ref_4]
(gdb) continue # 继续运行程序，直到下一个断点或结束
```
6.退出 GDB：
`(gdb) quit`