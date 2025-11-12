'use client'

import React from 'react'
import GitHubProfile from '@/components/GitHubProfile'
import SocialShare from '@/components/SocialShare'
import useGitHubUser from '@/hooks/useGitHubUser'
import { Calendar, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  post: any
  processedContent: string
  readTime: number
}

export default function BlogPostClient({ post, processedContent, readTime }: Props) {
  const { githubUser, loading } = useGitHubUser()

  return (
    <article className="py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        {/* 文章内容 - 居中 */}
        <div className="max-w-4xl mx-auto">
          {post.image && (
            <div className="mb-8 -mx-4 md:-mx-8">
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" unoptimized />
              </div>
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} 分钟阅读</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <SocialShare
                title={post.title}
                description={post.description}
                url={`/blog/${post.slug}`}
              />
              <div className="text-sm text-muted-foreground">分享这篇文章</div>
            </div>
          </footer>
        </div>

        {/* 作者信息 - 右侧固定 */}
        <aside className="hidden xl:block fixed right-8 top-24 w-80">
          <div className="bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-6 sticky top-8">
            {loading ? (
              <div className="animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            ) : githubUser ? (
              <GitHubProfile
                username={githubUser.username}
                avatar={githubUser.avatar}
                bio={githubUser.bio}
                location={githubUser.location}
                website={githubUser.website}
                followers={githubUser.followers}
                following={githubUser.following}
                publicRepos={githubUser.publicRepos}
                className="!bg-transparent !border-0 !p-0 !rounded-none"
              />
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">无法加载GitHub信息</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}
