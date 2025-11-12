import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slug: string = body?.slug
    const content: string = body?.content
    if (!slug || !content) {
      return NextResponse.json({ error: 'missing parameters' }, { status: 400 })
    }
    const isProd = process.env.VERCEL || process.env.NODE_ENV === 'production'
    if (isProd) {
      return NextResponse.json({ error: 'not allowed in production' }, { status: 405 })
    }
    const dir = path.join(process.cwd(), 'content', 'blog')
    await fs.promises.mkdir(dir, { recursive: true })
    const file = slug.endsWith('.md') || slug.endsWith('.mdx') ? slug : `${slug}.mdx`
    const filePath = path.join(dir, file)
    await fs.promises.writeFile(filePath, content, 'utf8')
    return NextResponse.json({ ok: true, path: filePath })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}