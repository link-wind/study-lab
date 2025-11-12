'use client'

import ArticleCard from '@/components/ArticleCard'
import GitHubProfile from '@/components/GitHubProfile'
import { BookOpen, Code, Zap, Users, ArrowRight, Github, Twitter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/mdx'

interface GitHubUserData {
  username: string
  avatar: string
  bio: string
  location: string
  website: string
  followers: number
  following: number
  publicRepos: number
  githubUrl: string
}

interface ClientHomeProps {
  posts: BlogPost[]
}

export default function ClientHome({ posts }: ClientHomeProps) {
  const [githubUser, setGithubUser] = useState<GitHubUserData | null>(null)
  const [loading, setLoading] = useState(true)

  // 获取精选文章（前3篇）和最新文章（其余文章）
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9) // 显示更多文章

  useEffect(() => {
    const fetchGithubUser = async () => {
      try {
        const response = await fetch('/api/github/user')
        if (response.ok) {
          const userData = await response.json()
          setGithubUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGithubUser()
  }, [])

  return (
    <main className="py-8">
      <div className="px-4 lg:px-8">
        {/* 英雄区域 */}
        <section className="mx-auto max-w-4xl mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Zap className="h-4 w-4" />
              基于 Next.js 14 的现代博客
            </div>

            <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              StudyLab Notebook
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              记录学习笔记，分享技术心得，探索编程世界的无限可能。
              基于 Next.js 14、MDX 和 Tailwind CSS 构建的现代化技术博客。
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-shadow duration-200"
              >
                <BookOpen className="h-5 w-5" />
                开始阅读
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 border-2 border-border/50 bg-card/80 backdrop-blur-sm px-8 py-4 rounded-xl font-medium hover:bg-card transition-colors duration-200"
              >
                <Code className="h-5 w-5" />
                了解更多
              </a>
            </div>
          </div>

          {/* 特性展示 */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">代码高亮</h3>
              <p className="text-muted-foreground leading-relaxed">
                支持多种编程语言的语法高亮，集成 Prism.js 和 Shiki，让代码展示更加清晰美观
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">数学公式</h3>
              <p className="text-muted-foreground leading-relaxed">
                集成 KaTeX 支持，完美渲染数学公式和符号，为技术文章提供专业展示
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">响应式设计</h3>
              <p className="text-muted-foreground leading-relaxed">
                移动端优先的设计理念，在各种设备上都有良好体验，支持暗色模式切换
              </p>
            </div>
          </div>
        </section>

        {/* 文章展示区域 */}
        {posts.length > 0 ? (
          <div>
            {/* 精选文章 */}
            {featuredPosts.length > 0 && (
              <section className="mx-auto max-w-6xl mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">精选文章</h2>
                  <p className="text-muted-foreground text-lg">精心挑选的优质内容，带你深入技术世界</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <ArticleCard key={post.slug} {...post} />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <span>查看全部文章</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </section>
            )}

            {/* 最新文章和GitHub信息 */}
            <section className="mx-auto max-w-6xl space-y-20">
              {/* 文章列表 */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">最新文章</h2>
                  <p className="text-muted-foreground text-lg">持续更新的技术分享和学习笔记</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {recentPosts.map((post) => (
                    <ArticleCard key={post.slug} {...post} />
                  ))}
                </div>
              </div>

              {/* GitHub 个人信息 */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">关于作者</h2>
                  <p className="text-muted-foreground text-lg">了解更多关于我的信息和项目</p>
                </div>
                {loading ? (
                  <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 animate-pulse max-w-6xl mx-auto">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-muted rounded mb-3"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="h-8 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                      <div className="text-center">
                        <div className="h-8 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                      <div className="text-center">
                        <div className="h-8 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="h-12 bg-muted rounded"></div>
                  </div>
                ) : githubUser ? (
                  <div className="max-w-6xl mx-auto">
                    <GitHubProfile
                      username={githubUser.username}
                      avatar={githubUser.avatar}
                      bio={githubUser.bio}
                      location={githubUser.location}
                      website={githubUser.website}
                      followers={githubUser.followers}
                      following={githubUser.following}
                      publicRepos={githubUser.publicRepos}
                    />
                  </div>
                ) : (
                  <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center max-w-6xl mx-auto">
                    <p className="text-muted-foreground">无法加载GitHub信息</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <section className="mx-auto max-w-2xl text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">还没有文章</h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              开始创建你的第一篇技术博客文章吧！
            </p>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left shadow-xl">
              <h3 className="font-bold mb-4 text-xl">快速开始：</h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>在 <code className="bg-muted px-2 py-1 rounded text-xs">content/blog/</code> 目录下创建 .md 文件</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>添加 frontmatter 元数据（标题、描述、日期等）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>使用 Markdown 语法编写内容</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>保存文件，文章将自动显示在这里</span>
                </li>
              </ol>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}