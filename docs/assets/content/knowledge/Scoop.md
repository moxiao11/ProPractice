# Scoop 

### 为什么使用Scoop

我相信大部分人都经常有一个困难的地方，就是安装环境，因为一会儿可能这里不对，一会儿可能哪里不对，那么Scoop的诞生让便捷式安装这些环境都成为了可能

例如安装nodejs和python
```powershell
scoop install python
scoop install nodejs
```

如何安装scoop在上学期基本已经教过大家，这里附上
```Powershell
# 设置 PowerShell 执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# 下载安装脚本
irm get.scoop.sh -outfile 'install.ps1'
# 执行安装, --ScoopDir 参数指定 Scoop 安装路径
.\install.ps1 -ScoopDir 'C:\Scoop'
```


同时scoop也有自己的[官方介绍文档](https://github.com/ScoopInstaller/Scoop)

---

<!-- NAV-CARDS:START -->
<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;">
  <a href="#/assets/content/knowledge/cmake.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none;">
    <div style="font-size:12px; opacity:.7;">Previous</div>
    <div><strong>CMake</strong></div>
  </a>
  <a href="#/assets/content/knowledge/git.md" style="flex:1; min-width:220px; padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; text-align:right;">
    <div style="font-size:12px; opacity:.7;">Next</div>
    <div><strong>Git</strong></div>
  </a>
</div>
<!-- NAV-CARDS:END -->
