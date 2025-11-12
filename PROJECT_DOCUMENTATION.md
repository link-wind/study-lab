# StudyLab Notebook 项目文档

## 📋 项目总览

StudyLab Notebook 是一个现代化的个人技术博客系统，基于 Next.js 14、MDX 和 Tailwind CSS 构建。

### 项目名称
- **中文**: 学习笔记实验室
- **英文**: StudyLab Notebook

### 核心功能
✅ Markdown文章管理系统（支持frontmatter元数据）
✅ 分类/标签自动生成系统
✅ 代码高亮（Prism.js/Shiki）与数学公式支持（KaTeX）
✅ 响应式布局（移动端优先设计）
✅ 暗黑/明亮模式切换（CSS变量实现）
✅ SEO优化（自动生成sitemap.xml/RSS订阅）
✅ 社交分享按钮（Twitter/Facebook/LinkedIn）
✅ 一键Vercel部署（通过Git集成）

### 技术栈
- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **内容**: MDX
- **主题**: next-themes
- **图标**: Lucide React
- **部署**: Vercel

## 🏗️ 项目结构

```
study-lab/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # 主要页面
│   │   │   ├── page.tsx       # 首页
│   │   │   └── layout.tsx     # 全局布局
│   │   ├── blog/              # 博客相关页面
│   │   │   ├── page.tsx       # 文章列表页
│   │   │   └── [slug]/        # 文章详情页
│   │   │       ├── page.tsx
│   │   │       └── generateStaticParams.ts
│   │   ├── tags/              # 标签相关页面
│   │   │   ├── page.tsx       # 标签列表页
│   │   │   └── [tag]/         # 标签分类页
│   │   │       ├── page.tsx
│   │   │       └── generateStaticParams.ts
│   │   ├── rss.xml/           # RSS订阅
│   │   │   └── route.ts
│   │   ├── sitemap.ts         # 网站地图
│   │   └── globals.css        # 全局样式
│   ├── components/              # React组件
│   │   ├── Header.tsx         # 页头组件
│   │   ├── ThemeToggle.tsx   # 主题切换
│   │   ├── ThemeProvider.tsx  # 主题提供者
│   │   ├── ArticleCard.tsx   # 文章卡片
│   │   ├── MdxComponents.tsx # MDX自定义组件
│   │   └── SocialShare.tsx   # 社交分享
│   ├── hooks/                 # 自定义Hooks
│   │   └── useTheme.ts       # 主题管理
│   └── lib/                   # 工具函数
│       ├── mdx.ts            # MDX处理逻辑
│       └── utils.ts          # 通用工具函数
├── content/
│   ├── blog/                  # 博客文章
│   │   ├── welcome.mdx       # 欢迎文章
│   │   ├── nextjs-14-features.mdx
│   │   └── react-hooks-guide.mdx
│   └── config.json           # 全局配置
├── public/                    # 静态资源
├── package.json              # 项目依赖
├── tsconfig.json             # TypeScript配置
├── next.config.js            # Next.js配置
├── tailwind.config.js        # Tailwind配置
├── vercel.json               # Vercel部署配置
├── README.md                 # 项目说明
├── LICENSE                   # 许可证
└── .gitignore               # Git忽略文件
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
cd study-lab
npm install
```

### 开发环境
```bash
npm run dev
```
访问 http://localhost:3000

### 生产构建
```bash
npm run build
npm start
```

## 📝 创建文章

在 `content/blog/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2024-01-01"
tags: ["Next.js", "React", "前端"]
image: "/images/cover.jpg"
---

# 文章内容

支持 Markdown 和 MDX 语法。

\`\`\`javascript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

## 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 🎨 自定义配置

### 主题配置
编辑 `src/app/globals.css` 中的 CSS 变量来自定义主题颜色。

### 网站信息
修改 `content/config.json` 来配置网站基本信息。

### SEO 配置
在 `src/app/layout.tsx` 中修改默认的 SEO 元数据。

## 📱 响应式设计

项目采用移动端优先的响应式设计：
- 默认移动端布局
- `md:` 前缀用于平板及以上设备
- `lg:` 前缀用于桌面设备

## 🎯 核心组件说明

### ArticleCard
文章卡片组件，显示文章标题、描述、日期和标签。

### ThemeToggle
主题切换按钮，支持明暗模式切换。

### SocialShare
社交分享组件，支持 Twitter、Facebook、LinkedIn 分享和链接复制。

### MdxComponents
MDX 自定义组件，定义了文章中各种元素的渲染样式。

## 🔧 部署配置

### Vercel 部署
1. 推送代码到 GitHub
2. 在 Vercel 控制台导入项目
3. 自动触发部署流程

### 环境变量
可选环境变量：
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📚 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [MDX 文档](https://mdxjs.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React 文档](https://reactjs.org/docs/getting-started.html)

## 🤝 贡献指南

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**StudyLab Notebook** - 让技术写作变得简单而优雅！