# 命令行（CLI）

> 一句话：命令行是“用文字直接控制计算机”的方式，速度快、可批量、可自动化。

---

## 为什么要学 CLI

- 图形界面适合偶尔操作，CLI 适合重复操作
- 可以把操作写成脚本，复用成本低
- 远程服务器通常只有命令行环境

## 30 秒看懂工作方式

```text
你输入命令  ->  Shell 解析  ->  系统执行  ->  返回结果
```

## 常用命令速查

| 场景 | 命令 | 例子 |
| --- | --- | --- |
| 查看当前目录 | `pwd` | `pwd` |
| 列出文件 | `ls` / `dir` | `ls -la` |
| 切换目录 | `cd` | `cd projects` |
| 创建目录 | `mkdir` | `mkdir demo` |
| 删除文件 | `rm` / `del` | `rm test.txt` |
| 查看文件内容 | `cat` / `type` | `cat README.md` |

## 入门练习

```bash
mkdir cli-demo
cd cli-demo
echo hello > note.txt
cat note.txt
```

<details>
<summary>常见错误（点开看）</summary>

- `No such file or directory`：路径写错或当前目录不对
- `Permission denied`：权限不足，换目录或提升权限
- 命令找不到：程序未安装或未加入 PATH

</details>
