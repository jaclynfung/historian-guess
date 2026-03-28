# 公网链接：https://historian-guess.vercel.app/
# 历史迷踪

一个基于 AI 角色扮演的历史人物猜测游戏。AI 会扮演一位历史人物与你对话，你需要通过提问推理出 TA 的真实身份。

## 玩法

### 闯关模式

- 共 10 关，从入门到大师难度递进
- 不限对话次数，对话越少星级越高（3轮内3星，6轮内2星）
- 通关后解锁下一关

### 挑战模式

- 从 22 个历史人物中随机抽取
- 每轮限 10 次对话
- 记录连胜纪录

### 辅助功能

- **线索提示**：每局 3 次，展示人物的时代、领域、国籍（使用后扣一颗星）
- **人物图鉴**：猜中即解锁人物卡片，支持别名匹配
- **进度缓存**：所有数据自动保存在浏览器本地

## 部署到 Vercel

### 1. 推送到 GitHub

```bash
git remote add origin https://github.com/你的用户名/guess-who.git
git push -u origin main
```

### 2. 导入到 Vercel

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点击「New Project」，导入刚才的仓库
3. 在部署设置页面，展开「Environment Variables」，添加以下环境变量：

| 变量名      | 值                              | 说明                                   |
| ----------- | ------------------------------- | -------------------------------------- |
| `API_KEY`   | 你的密钥                        | **必填**，硅基流动或其他平台的 API Key |
| `API_BASE`  | `https://api.siliconflow.cn/v1` | 可选，默认硅基流动                     |
| `API_MODEL` | `Qwen/Qwen2.5-7B-Instruct`      | 可选，默认 Qwen2.5-7B                  |

4. 点击「Deploy」完成部署

密钥存储在 Vercel 服务端环境变量中，前端代码不包含任何密钥信息。

## 项目结构

```
guess-who/
├── index.html      # 前端页面（纯静态）
├── api/
│   └── chat.js     # Vercel Serverless Function（代理 AI 接口）
├── vercel.json     # Vercel 路由配置
└── README.md
```

## 技术栈

- 前端：纯 HTML + Tailwind CSS（CDN）+ Animate.css + Material Icons Round
- 后端：Vercel Serverless Function（Node.js）
- 存储：localStorage 持久化

## 人物库

包含 22 个中外历史人物，涵盖文学、军事、政治、哲学、科学、艺术、音乐等领域。

| 模式 | 人物数     | 示例                                                         |
| ---- | ---------- | ------------------------------------------------------------ |
| 闯关 | 10         | 李白、诸葛亮、武则天、秦始皇、孔子、拿破仑、达芬奇、爱因斯坦... |
| 挑战 | 22（全部） | 额外包含曹操、苏轼、岳飞、屈原、关羽、居里夫人、牛顿、莫扎特... |
