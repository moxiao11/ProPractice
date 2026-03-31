# Week3：`test.cpp` 执行过程解析

这份代码实现了一个简化版“四则表达式解释器”，核心流程是：

1. 把输入字符串切分成 `Token`（词法分析）
2. 按规则不断“归约”成表达式树（语法归约 + 计算）
3. 用访问者模式按后序遍历输出每一步表达式及其值

---

## 1. 程序整体结构

代码中的标记类型：

- `NumType`：数字
- `OperatorType`：运算符 `+ - * /`
- `LeftBracket` / `RightBracket`：括号
- `ExprType`：已经归约出来的表达式节点

对应类：

- `Token`：所有标记基类（有 `text` 和 `type`）
- `NumToken` / `OperatorToken` / `BracketToken`：基础标记
- `ExprToken`：表达式节点，保存子表达式和计算结果 `value`
- `Visitor` / `PrintVistor`：访问者接口与打印实现

---

## 2. 从 `main` 开始的真实执行路径

`main` 中只有三步：

```cpp
std::cin >> s;
std::vector<Token *> vec = parse(s);
compile(vec);
```

也就是：读入字符串 -> 词法分析 -> 归约并输出结果。

---

## 3. 第一步：`parse` 词法分析

`parse(std::string text)` 逐字符扫描输入：

- 遇到 `+ - * /`：生成 `OperatorToken`
- 遇到 `(` 或 `)`：生成 `BracketToken`
- 遇到数字串：生成 `NumToken`
- 空格会被跳过（但当前主程序用 `cin >> s` 读取，通常拿不到带空格整行输入）

例如输入：`1+2*3`  
`parse` 后序列为：

`[Num(1), Op(+), Num(2), Op(*), Num(3)]`

---

## 4. 第二步：`compile` 归约与计算

`compile` 的核心是“循环归约直到只剩一个表达式”。

### 4.1 先把所有数字升级为表达式

先把每个 `NumToken` 包装成 `ExprToken`，这样后续规则统一用 `ExprType` 处理。

---

### 4.2 归约优先级（每轮最多做一次归约）

每次循环按下面顺序尝试：

1. `expr ::= '(' expr ')'`
2. `expr ::= expr '*' expr` 或 `expr ::= expr '/' expr`
3. `expr ::= expr '+' expr` 或 `expr ::= expr '-' expr`

一旦匹配成功就立即 `break`，进入下一轮循环。

这种设计保证了：

- 括号最先处理
- 乘除优先于加减
- 同级运算从左到右逐步归约

---

### 4.3 `is_expr` 的关键点

函数原型：

```cpp
bool is_expr(Token *lhs, Token *op, Token *rhs, bool priority = false)
```

这里 `priority = false` 是正确默认值，含义是：

- `priority = true`：只匹配 `*`、`/`
- `priority = false`：只匹配 `+`、`-`

如果默认值写成 `true`，加减匹配逻辑会出问题。

---

## 5. 第三步：`visit` 输出执行过程

归约结束后，`vec[0]` 是整棵表达式树根节点。  
然后执行：

```cpp
PrintVistor v;
vec[0]->visit(&v);
```

`ExprToken::visit` 的顺序是：

1. 访问左子树
2. 访问右子树
3. 打印自己

这是后序遍历，所以输出顺序是“先子表达式，后父表达式”。

---

## 6. 示例：输入 `1+2*3` 的完整执行

### 6.1 词法结果

`[Num(1), Op(+), Num(2), Op(*), Num(3)]`

### 6.2 转为表达式节点后

`[Expr(1), Op(+), Expr(2), Op(*), Expr(3)]`

### 6.3 归约过程

1. 先匹配乘法：`Expr(2) * Expr(3)` -> `Expr(2*3)`，值为 `6`
2. 再匹配加法：`Expr(1) + Expr(2*3)` -> `Expr(1+2*3)`，值为 `7`

### 6.4 打印过程（后序）

输出顺序为：

1. `1 = 1`
2. `2 = 2`
3. `3 = 3`
4. `2*3 = 6`
5. `1+2*3 = 7`

程序前缀会带行号，形式类似：

```text
#1: 1 = 1
#2: 2 = 2
#3: 3 = 3
#4: 2*3 = 6
#5: 1+2*3 = 7
```



