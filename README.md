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

### 在线审核预览

GitHub Pages 预览由 `.github/workflows/preview.yml` 在 `feat/portfolio-review` 推送时构建，执行 lint、生产静态导出、类型检查，再部署并检查公开页面。预览不合并 `main`；演示作品及占位邮箱也会公开展示。工作流部署失败时，以 GitHub Actions 的实际结果为准。

手动验证相同的静态构建：

```bash
PORTFOLIO_STATIC_EXPORT=1 PORTFOLIO_BASE_PATH=/my-portfolio npm run build
```

普通 `npm run build` 仍生成可以用 `npm start` 启动的 Next.js 网站。静态产物在 `out/`，图片和主视觉兼容 GitHub Pages 的仓库子路径。

若 Pages 尚未启用，工作流仍构建并保存静态产物，但跳过公开部署。在仓库 Settings → Pages 中选择 **GitHub Actions** 作为 Source，再重新运行 `Portfolio preview` 工作流。当前云端 GitHub 集成没有启用 Pages 所需的权限，不能自动完成此设置。
