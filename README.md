# nq

个人静态站点集合，通过 [GitHub Pages](https://pages.github.com/) 发布。

**站点根地址：** [https://2621532542.github.io/nq/](https://2621532542.github.io/nq/)

---

## 在线应用

| 目录 | 名称 | 链接 |
| ---- | ---- | ---- |
| [`ball/`](./ball/) | **摸黑八** — 14 球双人摸球游戏 | [https://2621532542.github.io/nq/ball/](https://2621532542.github.io/nq/ball/) |
| [`mj/`](./mj/) | **芝麻分析器** — 红中麻将智能分析 | [https://2621532542.github.io/nq/mj/](https://2621532542.github.io/nq/mj/) |

---

## 摸黑八（ball）

双人回合制摸球游戏，玩法类似简化版麻将：76 球、起手 13 张、摸到 14 张判胡。

**玩法模式**

- **双人** — 同屏对战 AI（Lv1 进张优化 / Lv4 值表查表）
- **个人 · 竞速** — 单人摸弃，记录最少摸数
- **个人 · 实验室** — 自搭手牌，弃法分析与局面分享链接

**源码仓库**（开发、测试、构建）：`ball-game`（本地路径示例 `myWeb/ball-game`）

本目录 `ball/` 仅存放 **生产构建产物**（`dist/`），不含源码。

### 更新 ball 部署

在源码目录执行构建，再整包覆盖到本仓库：

```powershell
cd path\to\ball-game
npm run build

Copy-Item -Path dist\* -Destination path\to\nq\ball\ -Recurse -Force

cd path\to\nq
git add ball
git commit -m "update ball-game"
git push
```

推送后等待 GitHub Pages 刷新（约 1～2 分钟），浏览器 **Ctrl+F5** 强刷。

**注意**

- 必须复制 `dist/` 内**全部文件**（含 `assets/`、`favicon.png`、五个 `v14.*.bin` 与 `v14.meta.json`），不要只更新 `index.html`
- Vite 每次构建会更换 `assets/index-*.js` / `*.css` 的文件名哈希，旧文件可删
- Lv4 值表约 70MB，首次进入页面会后台加载，进度显示为 `0/5 → 5/5`

---

## 芝麻分析器（mj）

红中麻将向的效率与分析工具（PWA），静态构建产物位于 `mj/`。

---

## 仓库结构

```
nq/
├── README.md      ← 本文件
├── index.html     ← 站点导航页（/nq/ 入口）
├── ball/          ← 摸黑八（Vite build 输出）
└── mj/            ← 芝麻分析器（Vite build 输出）
```

---

## Pages 配置

- **仓库：** [2621532542/nq](https://github.com/2621532542/nq)
- **分支：** `main`
- **发布路径：** 仓库根目录 → `https://2621532542.github.io/nq/<子目录>/`

各子应用使用相对路径（`base: './'`）构建，可部署在任意子目录下。
