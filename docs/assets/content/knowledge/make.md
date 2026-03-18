# make 

---

不知道你是否还记得这条指令
```bash
g++ main.cpp -o main
```
g++ 将main.cpp变成了一个叫main.exe的文件



但是实际的项目长这样
```text
project/
 ├── main.cpp
 ├── graph.cpp
 ├── graph.h
 ├── utils.cpp
 ├── utils.h
 ├── math/
 │    └── matrix.cpp
 └── ...
```
理论上来说，当我g++结束后，把所有文件打包起来了生成一个exe文件，那我要是修改了其中某一个cpp文件，那我是否还需要全部重新g++一次呢?

这时候make诞生了

> make = 根据规则，自动决定“哪些文件需要重新编译”的工具

处理单文件的时候其实和g++一样样的

所以我也给大家介绍过这条指令(上机课week4)
```bash
make hello 
```

如果复杂的文件项目可以用下面的指令，但是有一个前提是写一个叫makefile的文件(这里不展开，有兴趣可以看下面的阅读文章)
```bash
make
```
它会做三件事：

1. 读取 Makefile

2. 分析依赖关系

3. 决定执行哪些命令
其实这里最关键的就是makefile，通过一个文件来决定我要执行哪些事情

这里推荐的一篇阅读文章[跟我一起写makefile](https://seisman.github.io/how-to-write-makefile/overview.html)也值得阅读

### 怎么写(最最最最简单的一种情况)

这里以简单文件来说明，由于这个知识体系很庞大所以无法展开

假设文件目录如下
```text
.
├── main.cpp
├── a.cpp
├── b.cpp
```

写一个叫makefile的文件
```makefile
app: main.cpp a.cpp b.cpp
	g++ main.cpp a.cpp b.cpp -o app
```

然后运行指令
```
make
./app
```
这样程序就能跑起来了

---

<!-- NAV-CARDS:START -->
<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;">
  <a href="#/assets/content/knowledge/bash.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none;">
    <div style="font-size:12px; opacity:.7;">Previous</div>
    <div><strong>Git Bash</strong></div>
  </a>
  <a href="#/assets/content/knowledge/frontend.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; text-align:right;">
    <div style="font-size:12px; opacity:.7;">Next</div>
    <div><strong>Frontend</strong></div>
  </a>
</div>
<!-- NAV-CARDS:END -->
