# 命令行

### 是什么 

命令行（Command Line）是一种通过输入命令来控制计算机的操作方式。与“点击鼠标的图形界面（GUI）”不同。

图形界面删除文件 → 右键 → 删除

命令行删除文件 → 输入：
```bash
rm test.txt
```

### 命令行长什么样？

通常是一个黑色或白色窗口，比如：

Windows 的 CMD / PowerShell

macOS / Linux 的 Terminal

## 常用命令速查

| 场景 | 命令 | 例子 |
| --- | --- | --- |
| 查看当前目录 | `pwd` | `pwd` |
| 列出文件 | `ls` / `dir` | `ls -la` |
| 切换目录 | `cd` | `cd projects` |
| 创建目录 | `mkdir` | `mkdir demo` |
| 删除文件 | `rm` / `del` | `rm test.txt` |
| 查看文件内容 | `cat` / `type` | `cat README.md` |

<details>
<summary>常见错误（点开看）</summary>

- `No such file or directory`：路径写错或当前目录不对
- `Permission denied`：权限不足，换目录或提升权限
- 命令找不到：程序未安装或未加入 PATH

</details>


---

<!-- NAV-CARDS:START -->
<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;">
  <a href="#/assets/content/knowledge/github.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none;">
    <div style="font-size:12px; opacity:.7;">Previous</div>
    <div><strong>GitHub</strong></div>
  </a>
  <a href="#/assets/content/knowledge/bash.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; text-align:right;">
    <div style="font-size:12px; opacity:.7;">Next</div>
    <div><strong>Git Bash</strong></div>
  </a>
</div>
<!-- NAV-CARDS:END -->
