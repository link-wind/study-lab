import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slug: string = body?.slug
    const content: string = body?.content
    const assets: { filename: string; content: string; path?: string }[] = Array.isArray(body?.assets) ? body.assets : []
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
    const savedAssets: { filename: string; path: string }[] = []
    for (const a of assets) {
      const rel = a.path || `public/images/${a.filename}`
      const target = path.join(process.cwd(), rel)
      await fs.promises.mkdir(path.dirname(target), { recursive: true })
      const base64 = a.content.includes('base64,') ? a.content.split('base64,')[1] : a.content
      await fs.promises.writeFile(target, Buffer.from(base64, 'base64'))
      savedAssets.push({ filename: a.filename, path: rel })
    }
    return NextResponse.json({ ok: true, path: filePath, assets: savedAssets })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}