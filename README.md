# StudyLab Notebook

个人技术学习博客，基于 Next.js 14、MDX 和 Tailwind CSS 构建。

## 🚀 功能特性

- ✅ **Markdown/MDX 支持** - 使用 Markdown 编写文章，支持 MDX 组件
- ✅ **代码高亮** - 集成 Prism.js 实现代码语法高亮
- ✅ **数学公式** - 支持 KaTeX 数学公式渲染
- ✅ **暗黑模式** - 支持明暗主题切换
- ✅ **响应式设计** - 移动端优先的响应式布局
- ✅ **SEO 优化** - 自动生成 sitemap.xml 和 RSS 订阅
- ✅ **标签系统** - 自动分类和标签管理
- ✅ **社交分享** - 集成社交分享功能
- ✅ **Vercel 部署** - 一键部署到 Vercel

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **内容**: MDX
- **主题**: next-themes
- **图标**: Lucide React
- **部署**: Vercel

## 📦 安装和运行

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/study-lab.git
cd study-lab

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📝 创建文章

在 `content/blog/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "我的文章标题"
description: "文章描述"
date: "2024-01-01"
tags: ["Next.js", "React", "前端"]
image: "/images/my-image.jpg"
---

# 文章内容

这里是文章内容，支持 Markdown 和 MDX 语法。

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

## 🚀 部署到 Vercel

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/study-lab.git
   git push -u origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

3. **自动部署**
   - 每次推送到 `main` 分支都会自动触发部署

## 🎨 自定义

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... 其他颜色变量 */
}
```

### 添加新页面

在 `src/app/` 目录下创建新的文件夹和 `page.tsx` 文件。

### 自定义组件

编辑 `src/components/` 目录下的组件文件。

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com)
- [Vercel 部署指南](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app)

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件