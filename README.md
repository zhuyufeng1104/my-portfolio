# My Portfolio

My personal AI filmmaking and creative portfolio website.

## 第一版 / First edition

Next.js App Router + TypeScript + Tailwind CSS。黑色电影风格个人作品集，包含首页、作品分类、4 个项目详情、About / Contact、中英文切换、移动端导航以及 reduced-motion 适配。

### 本地预览

需要 Node.js 22.13+（当前使用 Node.js 24），在仓库目录执行：

```bash
npm ci
npm run dev
```

在本机浏览器访问 `http://localhost:3000`。云环境请使用平台提供的端口转发功能转发 3000 端口。生产模式使用 `npm run build` 后运行 `npm start`。

```bash
npm run lint
npm run typecheck
npm run build
```

### 页面与素材

- `/`：沉浸式首页、精选作品、个人介绍、联系区。
- `/works`：支持分类筛选的作品海报列表。
- `/projects/afterlight`、`/projects/liquid-form`、`/projects/echoes`、`/projects/other-sun`：项目详情及 HTML5 视频。
- 所有作品均为虚构的自主概念演示，没有声称与任何真实客户合作。
- `public/images/*.svg` 是本项目生成的抽象占位海报，不依赖外部图片服务。
- 视频使用 MDN 的 CC0 flower 示例，明确标注为通用示例，不代表作品本身。播放需要访问 `interactive-examples.mdn.mozilla.net`，受限网络可能无法播放。
- `FRAME` 是演示站点名称；`hello@example.com` 是占位邮箱。正式发布前请替换。

### 修改内容

作品数据在 `lib/projects.ts`；页面、双语文案和联系方式在 `components/portfolio.tsx`；视觉样式在 `app/globals.css`。可替换海报并在项目数据中增加独立视频地址。语言偏好保存在浏览器本地；不需要 API 密钥、数据库或后端服务。

### 云环境安装

若默认 npm 缓存目录不可写，使用 `npm ci --cache /tmp/portfolio-npm-cache`。每个云任务已有独立环境，直接使用现有检出目录，无需新建 worktree。服务进程不随环境快照保留，需重新执行 `npm run dev`。

### GitHub Pages 正式部署

`.github/workflows/preview.yml` 在 `main` 更新时自动构建并部署；PR 只构建检查，不进入 `github-pages` 环境。保留现有环境部署分支限制、审核要求及其他保护规则。只有 `main` 的 push 或手动运行可以部署。

工作流分为 `build` 和 `deploy`：构建任务仅有 `contents: read` 权限；部署任务拥有 `pages: write` 和 `id-token: write`，并使用受保护的 `github-pages` 环境。Pages 未启用或配置错误会明确失败，不会显示跳过部署的成功状态。

部署使用 `PORTFOLIO_STATIC_EXPORT=1`（Next.js `output: export`、尾斜线 URL）和 `PORTFOLIO_BASE_PATH=/my-portfolio`。页面、作品图及主视觉资源都带仓库子路径。图片关闭在线优化，产物由 GitHub Pages 直接托管。

本地复现：

```bash
npm ci
npm run lint
PORTFOLIO_STATIC_EXPORT=1 PORTFOLIO_BASE_PATH=/my-portfolio npm run build
npm run typecheck
node scripts/check-static-export.mjs
```

普通 `npm run build` 仍生成可用 `npm start` 启动的 Next.js 网站。

合并部署修复 PR 到 `main` 后，在 Actions 中查看 **Deploy portfolio to GitHub Pages**：`build` 和 `deploy` 都应通过；如环境要求人工批准，在部署任务中按现有流程批准，不修改保护规则。Settings → Pages 的 Source 应为 **GitHub Actions**。

部署完成后打开 https://zhuyufeng1104.github.io/my-portfolio/ ，检查首页、作品分类、项目详情、海报及手机导航。直接打开 `/my-portfolio/works/` 和 `/my-portfolio/projects/afterlight/` 后刷新，确认正常。浏览器 Network 中的 JS、CSS 和图片应返回 200，资源路径应以 `/my-portfolio/` 开头。

需要手动重试时，从 `main` 分支运行该工作流。修复 PR 合并前的检查不会发布网站。
