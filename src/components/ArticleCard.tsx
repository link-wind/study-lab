import { Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

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
      <article className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 overflow-hidden">
        {/* 图片区域 */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}

        {/* 内容区域 */}
        <div className="relative p-6">
          {/* 头部信息 */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 backdrop-blur-sm">
              <Calendar className="h-3 w-3" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              <span>5 分钟阅读</span>
            </div>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-tight">
            {title}
          </h2>

          {/* 描述 */}
          <p className="text-muted-foreground mb-5 line-clamp-3 leading-relaxed text-sm">
            {description}
          </p>

          {/* 彩色标签 */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <Tag className="h-3 w-3 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => {
                  const colors = [
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-800',
                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-800',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 border-purple-200 dark:border-purple-800',
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-800',
                    'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200 border-pink-200 dark:border-pink-800',
                  ]
                  const colorClass = colors[index % colors.length]

                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-colors duration-200 hover:bg-opacity-80 ${colorClass}`}
                    >
                      {tag}
                    </span>
                  )
                })}
                {tags.length > 3 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border/50 backdrop-blur-sm">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 底部操作 */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>阅读文章</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-200">
              <span>阅读更多</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}