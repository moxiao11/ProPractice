# 飞机大战变量说明


## 一、基础类型

### `Vec2`
- `x`: 横坐标（左右方向）
- `y`: 纵坐标（上下方向）

说明：游戏里所有位置基本都用 `Vec2` 表示。

## 二、玩家相关

### `Player`
- `position`: 玩家中心点坐标（`Vec2`）
- `width`: 玩家宽度
- `height`: 玩家高度
- `lives`: 剩余生命值
- `alive`: 是否存活（`true/false`）

## 三、子弹相关

### `Bullet`
- `id`: 子弹唯一编号
- `position`: 子弹中心点坐标
- `speedY`: 子弹在 y 方向速度（负数表示向上）
- `active`: 是否有效（失效后会被清理）

## 四、敌机相关

### `Enemy`
- `id`: 敌机唯一编号
- `position`: 敌机中心点坐标
- `width`: 敌机宽度
- `height`: 敌机高度
- `speedY`: 敌机在 y 方向速度（正数表示向下）
- `active`: 是否有效（被击中或出界后会失效）

## 五、全局游戏状态

### `GameState`
- `player`: 当前玩家对象
- `bullets`: 子弹数组
- `enemies`: 敌机数组
- `score`: 当前得分
- `gameOver`: 游戏是否结束
- `nextBulletId`: 下一颗子弹要使用的 id
- `nextEnemyId`: 下一架敌机要使用的 id
- `enemySpawnTimer`: 敌机生成计时器（累计时间）
- `fireCooldown`: 开火冷却计时器

## 六、引擎中的常量（`GameEngine`）

- `PLAYER_SPEED`: 玩家移动速度
- `BULLET_SPEED`: 子弹速度
- `ENEMY_SPEED`: 敌机速度
- `ENEMY_SPAWN_INTERVAL`: 敌机生成间隔
- `CANVAS_WIDTH`: 画布宽度
- `CANVAS_HEIGHT`: 画布高度
- `PLAYER_WIDTH`: 玩家宽度常量
- `PLAYER_HEIGHT`: 玩家高度常量
- `BULLET_WIDTH`: 子弹宽度常量
- `BULLET_HEIGHT`: 子弹高度常量
- `ENEMY_WIDTH`: 敌机宽度常量
- `ENEMY_HEIGHT`: 敌机高度常量

## 七、函数参数名说明（学生常见）

### `update(float dt, bool left, bool right, bool fire)`
- `dt`: 本帧时间差（delta time），用于做“按时间移动”
- `left`: 当前是否按下左方向
- `right`: 当前是否按下右方向
- `fire`: 当前是否按下开火键

### `checkCollision(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2)`
- `x1, y1`: 物体1中心点
- `w1, h1`: 物体1宽高
- `x2, y2`: 物体2中心点
- `w2, h2`: 物体2宽高

## 八、代码里常见临时变量名

- `halfW`: 一半宽度（常用于边界限制）
- `random01`: `0~1` 之间随机数（常用于随机生成敌机位置）
- `first`: 序列化 JSON 时是否第一个元素（控制逗号）
- `oss`: `ostringstream` 对象，用于拼接 JSON 字符串

## 九、命名习惯补充

- 末尾带 `_`（例如 `state_`）通常表示类的成员变量。
- `nextXxxId` 表示“下一个要分配的编号”。
- `is/has` 风格布尔语义在本项目里常用 `alive`、`active`、`gameOver` 这种直观词。