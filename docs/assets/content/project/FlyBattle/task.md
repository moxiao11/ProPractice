## 飞机大战任务清单


### 建议完成顺序





<a id="task-checkCollision"></a>
### 1. `checkCollision` - 碰撞检测

两个矩形碰撞的条件：在 x 轴和 y 轴都有重叠。

- 矩形1: 中心 (x1,y1)，半宽 w1/2，半高 h1/2
- 矩形2: 中心 (x2,y2)，半宽 w2/2，半高 h2/2

**提示**：无碰撞当且仅当 `right1 < left2` 或 `left1 > right2` 或 `bottom1 < top2` 或 `top1 > bottom2`。

实现要求：
- 统一使用“中心点 + 宽高”推导边界，避免混用左上角坐标导致误判。
- 函数应为纯判断逻辑，不修改任何游戏状态，便于后续复用和测试。
- 贴边是否算碰撞请在实现中保持一致（建议在整个项目里采用同一规则）。

自检建议：
- 两个完全重叠的矩形应返回 `true`。
- 距离很近但未接触应返回 `false`。
- 一方宽高较小或高速移动时，不应出现明显异常判断。

---

<a id="task-updatePlayerMovement"></a>
### 2. `updatePlayerMovement` - 玩家移动

根据 `left`、`right` 更新 `state.player.position.x`，并限制在 `[halfW, CANVAS_WIDTH - halfW]` 内。使用常量 `PLAYER_SPEED`。

实现要求：
- 位移应与 `dt` 相关，确保不同帧率下手感一致。
- 同时按下 `left` 和 `right` 时行为要稳定（通常等价于不移动）。
- 边界限制要在每帧生效，避免玩家越界后“卡在墙外”。

自检建议：
- 长按方向键时，玩家最终不会离开画布可见区域。
- 到达边缘后继续按该方向，不应产生抖动或穿出屏幕。

---

<a id="task-trySpawnBullet"></a>
### 3. `trySpawnBullet` - 子弹发射

`state.fireCooldown -= dt`；当 `fire` 为 true 且 `fireCooldown <= 0` 时，在玩家正上方创建新子弹加入 `state.bullets`，并设置 `fireCooldown = 0.15f`。

实现要求：
- 冷却计时与发射判定顺序要固定，避免偶发“多发/漏发”。
- 子弹初始位置应与玩家位置对齐，避免视觉上从机体侧面飞出。
- 新子弹初始化字段要完整（`id`、坐标、速度、`active`）。

自检建议：
- 按住开火后射速稳定，不会在某些帧突然连发。
- 不按开火键时，冷却变化不应导致无输入发射。

---

<a id="task-updateBullets"></a>
### 4. `updateBullets` - 子弹飞行

遍历 `state.bullets`，更新 `y += speedY * dt`，飞出屏幕（y < -BULLET_HEIGHT）则 `active = false`。

实现要求：
- 仅更新仍然有效的实体，减少无意义计算。
- 出界判定与坐标系方向保持一致（本项目子弹向上通常是负方向）。
- 不在本函数直接 `erase`，避免与遍历冲突（统一交给清理阶段）。

自检建议：
- 连续发射后，旧子弹会按预期离场并被后续清理。
- 子弹速度变化时，出界判定依旧正确。

---

<a id="task-trySpawnEnemy"></a>
### 5. `trySpawnEnemy` - 敌机生成

`state.enemySpawnTimer += dt`；达到 `ENEMY_SPAWN_INTERVAL` 时重置计时器，在顶部（y = -ENEMY_HEIGHT）随机 x 创建敌机。

实现要求：
- 敌机生成节奏应随时间稳定，不受帧率波动明显影响。
- 随机 x 需要保证敌机初始位置整体在可接受范围内（避免一出生就半出界）。
- 初始化字段完整，确保后续碰撞与渲染可用。

自检建议：
- 长时间运行下，敌机生成频率稳定。
- 敌机不会连续生成在明显非法位置。

---

<a id="task-updateEnemies"></a>
### 6. `updateEnemies` - 敌机移动

遍历 `state.enemies`，更新 `y += speedY * dt`，飞出屏幕则 `active = false`。

实现要求：
- 与子弹更新逻辑保持风格一致，便于维护。
- 仅处理有效敌机，降低无效遍历成本。
- 出界阈值应按敌机尺寸考虑，避免“明明看不见还在碰撞”。

自检建议：
- 敌机下落连续平滑，无突然跳变。
- 飞出屏幕后能及时进入失效状态。

---

<a id="task-checkBulletEnemyCollision"></a>
### 7. `checkBulletEnemyCollision` - 子弹 vs 敌机

遍历子弹和敌机，调用 `checkCollision`，碰撞则 `b.active = e.active = false`，`state.score += 10`。

实现要求：
- 碰撞检测前先判断双方是否仍为 `active`。
- 单次碰撞结算要明确，避免同一子弹在同帧击中多个敌机并重复加分。
- 计分逻辑与失效标记保持原子性，防止状态不一致。

自检建议：
- 一颗子弹命中一架敌机时，得分只增加一次。
- 被标记失效的实体在同帧后续逻辑中不应继续参与有效碰撞。

---

<a id="task-checkEnemyPlayerCollision"></a>
### 8. `checkEnemyPlayerCollision` - 敌机 vs 玩家

检测敌机与玩家碰撞，碰撞则 `e.active = false`，`lives--`，若 `lives <= 0` 则 `gameOver = true`。

实现要求：
- 生命值变化要有下限保护，避免出现负数带来的显示问题。
- `gameOver` 状态一旦成立应稳定，不被后续帧意外恢复。
- 玩家已结束状态下，后续碰撞结算应避免重复扣血。

自检建议：
- 连续撞击时扣血次数符合预期，不会同一敌机反复结算。
- 生命耗尽后，游戏结束状态与前端显示一致。

---

<a id="task-removeInactiveEntities"></a>
### 9. `removeInactiveEntities` - 清理失效实体

将 `active = false` 的子弹和敌机从 vector 中移除（可用 `std::remove_if` + `erase`）。

实现要求：
- 清理逻辑集中到此函数，其他更新函数只负责标记失效。
- 对子弹、敌机都执行清理，顺序可固定以便调试。
- 注意容器操作后迭代器失效问题，避免后续访问越界。

自检建议：
- 高强度射击和大量敌机场景下，容器大小不会无限增长。
- 清理后渲染与碰撞不会访问到已失效对象。

---

## 扩展挑战

- 增加敌机种类和速度变化
- 添加道具（护盾、双发子弹等）
- 实现 BOSS 战
- 添加关卡系统
