# C++ Reference

## `string` 速查表

> 面向初学者的常用操作总结。

### 准备

```cpp
#include <string>
#include <algorithm> // sort, reverse
#include <sstream>   // stringstream
using namespace std;
```

### Table of Contents

1. [创建与初始化](#创建与初始化)
2. [常用成员函数](#常用成员函数)
3. [访问与遍历](#访问与遍历)
4. [常见处理技巧](#常见处理技巧)
5. [常见坑建议记住](#常见坑建议记住)

---

## 创建与初始化

| Name | Description | Input | Output |
|------|------|------|------|
| `string s;` | 创建空字符串 | 无 | 空 `string` |
| `string s = "hello";` | 用字面量初始化 | C 字符串 | `"hello"` |
| `string s(n, 'a');` | 创建由 `n` 个字符组成的字符串 | `n`, `char` | 如 `"aaaa"` |
| `string b(a);` | 拷贝构造 | `a: string` | `a` 的副本 |
| `string s = to_string(123);` | 数值转字符串 | 数值 | `string` |

## 常用成员函数

| Name | Description | Input | Output |
|------|------|------|------|
| `s.size()` / `s.length()` | 返回字符个数 | 无 | `size_t` |
| `s.empty()` | 判断是否为空 | 无 | `bool` |
| `s.clear()` | 清空字符串 | 无 | 无（修改 `s`） |
| `s.push_back(c)` | 末尾追加一个字符 | `c: char` | 无（修改 `s`） |
| `s += t` | 追加字符串或字符 | `t: string/char* /char` | 无（修改 `s`） |
| `s.append(t)` | 追加字符串 | `t: string` | `*this` |
| `s.substr(pos, len)` | 截取子串 | 起点, 长度 | 新字符串 |
| `s.find(t)` | 查找子串首次出现位置 | `t: string` | 位置或 `string::npos` |
| `s.replace(pos, len, t)` | 替换一段内容 | 起点, 长度, 新串 | 无（修改 `s`） |

## 访问与遍历

| Name | Description | Input | Output |
|------|------|------|------|
| `s[i]` | 下标访问（不检查越界） | `i: size_t` | `char` 引用 |
| `s.at(i)` | 下标访问（越界抛异常） | `i: size_t` | `char` 引用 |
| `s.front()` / `s.back()` | 访问首尾字符 | 无（需非空） | `char` 引用 |
| `for (char c : s)` | 只读遍历 | `s` | 逐字符访问 |
| `for (char &c : s)` | 可修改遍历 | `s` | 原地修改字符 |
| `s.begin(), s.end()` | 获取迭代器区间 | 无 | 迭代器 |

## 常见处理技巧

| Name | Description | Input | Output |
|------|------|------|------|
| `reverse(s.begin(), s.end())` | 字符串反转 | `s` | 无（修改 `s`） |
| `sort(s.begin(), s.end())` | 按字符升序排序 | `s` | 无（修改 `s`） |
| `getline(cin, s)` | 读取一整行（含空格） | 输入流 | `s` |
| `stringstream ss(line)` | 字符串按空格切分 | `line: string` | 可逐词提取 |
| `stoi(s)` / `stoll(s)` / `stod(s)` | 字符串转数值 | 数字字符串 | 对应数值类型 |
| `s.c_str()` | 转 `const char*` 供 C 接口使用 | `s` | C 风格字符串 |

## 常见坑建议记住

| 场景 | 说明 |
|------|------|
| `find` 结果比较错误 | 找不到时返回 `string::npos`，不要和 `-1` 混用 |
| `cin >> s` 后直接 `getline` | 会读到残留换行，先处理缓冲区换行 |
| 越界访问 `s[i]` | 是未定义行为，调试阶段优先用 `at()` |
| `front()/back()` 用在空串 | 空字符串上调用是未定义行为 |
| 把 `c_str()` 长期保存 | 字符串修改后旧指针可能失效 |
| 字符串比较用地址 | `string` 应直接 `==` 比较内容 |
