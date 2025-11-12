import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/mdx'
import { processMarkdown } from '@/lib/markdown'
import { formatDate, readingTime } from '@/lib/utils'
import { Calendar, Clock, Tag } from 'lucide-react'
import SocialShare from '@/components/SocialShare'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const processedContent = await processMarkdown(post.content || '')
  const readTime = readingTime(post.content || '')

  return (
    <article className="container py-8">
      <div className="mx-auto max-w-3xl">
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

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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
            <div className="text-sm text-muted-foreground">
              分享这篇文章
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}