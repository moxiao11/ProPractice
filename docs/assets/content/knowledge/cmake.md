# Cmake


### 为什么要有cmake
如果你只用 Makefile，会遇到这些问题：

* Linux / Windows / macOS 写法不同

* 项目一大，Makefile 维护困难

* IDE（VS / CLion / Xcode）不通用

所以 CMake 是一个“跨平台的构建生成工具”


Cmake比写makefile更加抽象，现阶段很多 IDE (如 Visual Studio, CLion) 提供了自动生成 CMakeLists.txt 的功能，上交大也有相应的[IPADS培训第二讲](https://www.bilibili.com/video/BV14h41187FZ/?vd_source=9e7107b0cdbb49c22f53dc3231f6e7b6)
也推荐一个[cmake入门文档](https://llvm.org/docs/CMakePrimer.html#ft-view),这个比官方的写的好多了