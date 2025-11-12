import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  content?: string
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog')

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        image: data.image,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return allPostsData
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`)
  const mdxPath = path.join(contentDirectory, `${slug}.mdx`)
  
  let filePath = fullPath
  if (!fs.existsSync(fullPath) && fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (!fs.existsSync(fullPath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      image: data.image,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getBlogPosts()
  const tags = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts()
  return posts.filter((post) => post.tags.includes(tag))
}