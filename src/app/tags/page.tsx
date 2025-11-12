import Link from 'next/link'
import { getAllTags } from '@/lib/mdx'

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <main className="container py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">标签</h1>
        
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">暂无标签</h2>
            <p className="text-muted-foreground">
              创建一些带有标签的文章来查看它们。
            </p>
          </div>
        )}
      </div>
    </main>
  )
}