import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getPostsByTag } from '@/lib/mdx'

interface TagPageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag)

  return (
    <main className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/tags"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← 返回标签列表
          </Link>
          <h1 className="text-3xl font-bold">标签: {params.tag}</h1>
          <p className="text-muted-foreground mt-2">
            找到 {posts.length} 篇文章
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">暂无文章</h2>
            <p className="text-muted-foreground">
              这个标签下还没有文章。
            </p>
          </div>
        )}
      </div>
    </main>
  )
}