import { Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface ArticleCardProps {
  title: string
  description: string
  date: string
  slug: string
  tags?: string[]
  image?: string
}

export default function ArticleCard({ title, description, date, slug, tags = [], image }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative bg-card rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* 图片区域 */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        {/* 内容区域 */}
        <div className="p-6">
          {/* 头部信息 */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>5 分钟阅读</span>
            </div>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h2>

          {/* 描述 */}
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-3 w-3 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* 底部操作 */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              <span>阅读文章</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
              <span>阅读更多</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* 悬停效果装饰 */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </article>
    </Link>
  )
}