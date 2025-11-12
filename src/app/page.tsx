import { getBlogPosts } from '@/lib/mdx'
import ClientHome from './ClientHome'

export default function Home() {
  const posts = getBlogPosts()

  return <ClientHome posts={posts} />
}