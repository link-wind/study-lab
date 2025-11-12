import { getBlogPosts } from '@/lib/mdx'

export default async function sitemap() {
  const posts = getBlogPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://study-lab.vercel.app'
  
  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const tagUrls = Array.from(new Set(posts.flatMap((post) => post.tags))).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...blogPosts,
    ...tagUrls,
  ]
}