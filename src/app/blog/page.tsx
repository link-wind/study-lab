import ArticleCard from '@/components/ArticleCard'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="py-8">
      <div className="px-4 lg:px-8">
        <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">所有文章</h1>
        
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
              开始创建你的第一篇博客文章吧！
            </p>
          </div>
        )}
        </div>
      </div>
    </main>
  )
}
export const dynamic = 'force-dynamic'
export const revalidate = 0