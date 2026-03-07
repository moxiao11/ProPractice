# C++ Reference

## `vector` 速查表

> 面向初学者的常用操作总结。

### 准备

```cpp
#include <vector>
#include <algorithm> // sort, reverse
using namespace std;
```

### Table of Contents

1. [创建与初始化](#创建与初始化)
2. [常用成员函数](#常用成员函数)
3. [访问与遍历](#访问与遍历)
4. [常见算法（配合 vector）](#常见算法配合-vector)

---

## 创建与初始化

| Name | Description | Input | Output |
|------|------|------|------|
| `vector<int> v;` | 创建空数组 | 无 | 空 `vector` |
| `vector<int> v(n);` | 创建长度为 `n` 的数组，元素默认值初始化 | `n: size_t` | 大小为 `n` 的 `vector` |
| `vector<int> v(n, x);` | 创建长度为 `n` 的数组，每个元素为 `x` | `n`, `x` | 大小为 `n` 的 `vector` |
| `vector<int> v = {1,2,3};` | 列表初始化 | 初始化列表 | 含指定元素的 `vector` |
| `vector<int> b(a);` | 拷贝构造 | `a: vector<int>` | `a` 的副本 |

## 常用成员函数

| Name | Description | Input | Output |
|------|------|------|------|
| `v.size()` | 返回元素个数 | 无 | `size_t` |
| `v.empty()` | 判断是否为空 | 无 | `bool` |
| `v.push_back(x)` | 在末尾追加元素 | `x: T` | 无（修改 `v`） |
| `v.pop_back()` | 删除末尾元素 | 无（需非空） | 无（修改 `v`） |
| `v.clear()` | 清空所有元素 | 无 | 无（修改 `v`） |
| `v.insert(pos, x)` | 在位置 `pos` 前插入元素 | 迭代器 `pos`, `x` | 新元素位置迭代器 |

## 访问与遍历

| Name | Description | Input | Output |
|------|------|------|------|
| `v[i]` | 下标访问（不做越界检查） | `i: size_t` | 元素引用 |
| `v.at(i)` | 下标访问（越界会抛异常） | `i: size_t` | 元素引用 |
| `v.front()` | 访问第一个元素 | 无（需非空） | 元素引用 |
| `v.back()` | 访问最后一个元素 | 无（需非空） | 元素引用 |
| `for (int x : v)` | 范围 for 遍历（只读） | `v` | 逐个访问元素 |
| `for (int &x : v)` | 范围 for 遍历（可修改） | `v` | 可原地修改元素 |
| `v.begin(), v.end()` | 获取正向迭代器区间 | 无 | 迭代器 |

## 常见算法（配合 `vector`）

| Name | Description | Input | Output |
|------|------|------|------|
| `sort(v.begin(), v.end())` | 升序排序 | 迭代器区间 | 无（修改 `v`） |
| `reverse(v.begin(), v.end())` | 反转顺序 | 迭代器区间 | 无（修改 `v`） |
| `find(v.begin(), v.end(), x)` | 查找元素 | 区间, `x` | 迭代器（找不到返回 `v.end()`） |
| `count(v.begin(), v.end(), x)` | 统计元素出现次数 | 区间, `x` | `int`/计数类型 |
| `accumulate(v.begin() , v.end() , x)` | 求和 | 迭代器区间 | 求和结果 |

### 常见坑（建议记住）

| 场景 | 说明 |
|------|------|
| `pop_back()` / `back()` / `front()` | 空 `vector` 上调用是未定义行为 |
| `v[i]` 越界 | 不报错也可能崩溃，调试时优先用 `at()` |
| `insert/erase` 后旧迭代器 | 可能失效，尤其扩容后 |
| `size()` 返回类型 | 是无符号类型（`size_t`），和 `int` 比较要小心 |



