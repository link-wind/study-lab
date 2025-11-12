import { getBlogPosts } from '@/lib/mdx'

export async function GET() {
  const posts = getBlogPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://study-lab.vercel.app'
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>StudyLab Notebook</title>
    <link>${siteUrl}</link>
    <description>个人技术学习博客 - StudyLab Notebook</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('')}
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}