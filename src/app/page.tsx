import { getBlogPosts } from '@/lib/mdx'
import ArticleCard from '@/components/ArticleCard'
import { BookOpen, Code, Zap, Users, ArrowRight, Github, Twitter } from 'lucide-react'

export default function Home() {
  const posts = getBlogPosts()
  
  // 获取精选文章（前3篇）和最新文章（其余文章）
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9) // 显示更多文章

  return (
    <main className="container py-8">
      {/* 英雄区域 */}
      <section className="mx-auto max-w-4xl mb-16 animate-fadeIn">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            基于 Next.js 14 的现代博客
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            StudyLab Notebook
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            记录学习笔记，分享技术心得，探索编程世界的无限可能。
            基于 Next.js 14、MDX 和 Tailwind CSS 构建的现代化技术博客。
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              开始阅读
            </a>
            <a 
              href="#features" 
              className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
            >
              <Code className="h-4 w-4" />
              了解更多
            </a>
          </div>
        </div>

        {/* 特性展示 */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg bg-card border hover-lift hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">代码高亮</h3>
            <p className="text-muted-foreground text-sm">
              支持多种编程语言的语法高亮，让代码展示更清晰
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border hover-lift hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">数学公式</h3>
            <p className="text-muted-foreground text-sm">
              集成 KaTeX 支持，完美渲染数学公式和符号
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border hover-lift hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">响应式设计</h3>
            <p className="text-muted-foreground text-sm">
              移动端优先的设计理念，在各种设备上都有良好体验
            </p>
          </div>
        </div>
      </section>

      {/* 文章展示区域 */}
      {posts.length > 0 ? (
        <div className="animate-fadeIn">
          {/* 精选文章 */}
          {featuredPosts.length > 0 && (
            <section className="mx-auto max-w-4xl mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">精选文章</h2>
                <a 
                  href="/blog" 
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium group"
                >
                  查看全部
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <ArticleCard key={post.slug} {...post} />
                ))}
              </div>
            </section>
          )}

          {/* 最新文章 */}
          {recentPosts.length > 0 && (
            <section className="mx-auto max-w-4xl mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">最新文章</h2>
                <a 
                  href="/blog" 
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium group"
                >
                  查看全部
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <ArticleCard key={post.slug} {...post} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <section className="mx-auto max-w-2xl text-center py-16 animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">还没有文章</h2>
          <p className="text-muted-foreground mb-8">
            开始创建你的第一篇技术博客文章吧！
          </p>
          <div className="bg-muted rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-3">快速开始：</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>1. 在 <code className="bg-background px-2 py-1 rounded">content/blog/</code> 目录下创建 .md 文件</li>
              <li>2. 添加 frontmatter 元数据（标题、描述、日期等）</li>
              <li>3. 使用 Markdown 语法编写内容</li>
              <li>4. 保存文件，文章将自动显示在这里</li>
            </ol>
          </div>
        </section>
      )}

      {/* 底部 CTA */}
      <section className="mx-auto max-w-2xl text-center py-16">
        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4">准备开始写作了吗？</h2>
          <p className="text-muted-foreground mb-6">
            StudyLab Notebook 提供了完整的 Markdown 支持和现代化的写作体验。
            开始记录你的技术学习之旅吧！
          </p>
          <div className="flex gap-4 justify-center mb-6">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              浏览文章
            </a>
            <a 
              href="/tags" 
              className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
            >
              查看标签
            </a>
          </div>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
export const dynamic = 'force-dynamic'
export const revalidate = 0