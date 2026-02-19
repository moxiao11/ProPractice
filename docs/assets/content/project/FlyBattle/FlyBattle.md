# 飞机大战

鉴于此前有关飞机大战的介绍少之又少，而且我们的课程以往都是以Qt桌面开发为主，今年提出以前后端为核心的飞机大战，易上手，降低了负担，同时提供了一定的代码框架供参考使用。

首先拿到该压缩包，可以看到一系列的文件如下

```text
飞机大战/
├── game-core/          # C++ 游戏引擎（学生实现重点）
│   ├── game_logic.h    # 数据结构与接口
│   ├── game_logic.cpp  # 游戏逻辑实现
│   ├── main.cpp        # 进程入口，与 Node 通信
│   └── CMakeLists.txt
├── server/             # Node.js 桥接服务器
│   ├── server.js       # WebSocket + 静态资源
│   └── package.json
├── frontend/           # 前端
│   ├── index.html
│   ├── style.css
│   └── game.js         # 绘制逻辑
├── build.bat           # Windows 编译运行
├── build.sh            # Linux/Mac 编译运行
└── README.md
```

首先需要了解知识库中的什么是前端，什么是后端，此处简而言之就是**前端控制你看到的，比如有一个验证页面，后端控制验证登录的实现**

其次因为本部分的大部分文件隶属计算机教程，实际过程无需改动，同时由于一些限制，代码的成熟度上有限，所以大家是有很大的空间进行开放式改的，但需要完成一定的基础。




## 学生任务：C++ 逻辑实现

学生主要编辑 `game-core/game_logic.cpp`，完成或优化以下逻辑：

| 模块 | 说明 |
|------|------|
| **玩家移动** | 根据 left/right 更新 x，并限制在屏幕内 |
| **子弹发射** | fire 为 true 时在玩家上方生成子弹 |
| **子弹飞行** | 每帧更新子弹 y 坐标 |
| **敌机生成** | 定时在屏幕上方生成敌机 |
| **敌机下落** | 每帧更新敌机 y 坐标 |
| **碰撞检测** | AABB 矩形碰撞：子弹-敌机、敌机-玩家 |
| **边界处理** | 飞出屏幕的子弹/敌机标记为失效 |

可自行扩展：难度递增、道具、多种敌机等。

---

## 文档导航

<ul>
  <li><a href="#/assets/content/project/FlyBattle/Environment.md">环境配置</a></li>
  <li><a href="#/assets/content/project/FlyBattle/run.md">运行方式</a></li>
  <li><a href="#/assets/content/project/FlyBattle/Variable.md">变量说明</a></li>
  <li><a href="#/assets/content/project/FlyBattle/task.md">任务清单</a></li>
</ul>
