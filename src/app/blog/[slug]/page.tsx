import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/mdx'
import { processMarkdown } from '@/lib/markdown'
import { formatDate, readingTime } from '@/lib/utils'
import { Calendar, Clock, Tag } from 'lucide-react'
import SocialShare from '@/components/SocialShare'
import BlogPostClient from './BlogPostClient'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

interface BlogPostPageContentProps {
  post: any
  processedContent: string
  readTime: number
}

// 客户端内容已移动到同目录下的 BlogPostClient.tsx

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const processedContent = await processMarkdown(post.content || '')
  const readTime = readingTime(post.content || '')

  return (
    <BlogPostClient
      post={post}
      processedContent={processedContent}
      readTime={readTime}
    />
  )
}