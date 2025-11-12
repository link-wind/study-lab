'use client'
import { useState, useMemo } from 'react'
import matter from 'gray-matter'

export default function ImportPage() {
  const [fileName, setFileName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [tags, setTags] = useState('')
  const [image, setImage] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [publishing, setPublishing] = useState(false)

  const normalizedSlug = useMemo(() => {
    const base = (slug || title || fileName.replace(/\.(md|mdx)$/i, '') || '').toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fa5\-\s]/g, '')
      .replace(/\s+/g, '-')
    return base || 'untitled'
  }, [slug, title, fileName])

  const finalContent = useMemo(() => {
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    const frontmatterLines = [
      '---',
      `title: "${title || normalizedSlug}"`,
      `description: "${description || ''}"`,
      `date: "${date}"`,
      `tags: [${tagsArray.map((t) => `"${t}"`).join(', ')}]`,
      image ? `image: "${image}"` : '',
      '---',
      '',
    ].filter(Boolean)
    return `${frontmatterLines.join('\n')}${body}`
  }, [title, description, date, tags, image, body, normalizedSlug])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('')
    setFileName(file.name)
    const text = await file.text()
    const parsed = matter(text)
    const data = parsed.data as any
    setTitle(typeof data?.title === 'string' ? data.title : '')
    setDescription(typeof data?.description === 'string' ? data.description : '')
    setDate(typeof data?.date === 'string' ? data.date : new Date().toISOString().slice(0, 10))
    setTags(Array.isArray(data?.tags) ? data.tags.join(', ') : '')
    setImage(typeof data?.image === 'string' ? data.image : '')
    setSlug('')
    setBody(parsed.content || '')
  }

  const downloadFile = () => {
    const blob = new Blob([finalContent], { type: 'text/markdown;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${normalizedSlug}.mdx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(a.href)
    setStatus('已生成并下载文章文件')
  }

  const saveToLocal = async () => {
    setStatus('')
    try {
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: normalizedSlug, content: finalContent }),
      })
      if (res.status === 405) {
        setStatus('生产环境不支持直接写入，请使用下载文件并手动添加到 content/blog/')
        return
      }
      if (!res.ok) {
        setStatus('保存失败')
        return
      }
      const data = await res.json()
      setStatus(`已保存到本地开发环境: ${data.path || ''}`)
    } catch (e) {
      setStatus('请求失败')
    }
  }

  const publishToGithub = async () => {
    setStatus('')
    setPublishing(true)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: normalizedSlug, content: finalContent, message: `publish: ${normalizedSlug}` }),
      })
      if (!res.ok) {
        const text = await res.text()
        setStatus(`发布失败: ${text}`)
        setPublishing(false)
        return
      }
      const data = await res.json()
      setStatus(`已推送到 GitHub: ${data.url || ''}`)
    } catch (e) {
      setStatus('请求失败')
    }
    setPublishing(false)
  }

  return (
    <main className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">导入 Markdown 文章</h1>
        <p className="text-muted-foreground mb-6">选择本地 .md 或 .mdx 文件，完善信息后生成文章并保存或下载。</p>

        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">选择文件</label>
            <input type="file" accept=".md,.mdx,text/markdown" onChange={onFileChange} className="block" />
            {fileName && <p className="text-xs text-muted-foreground">已选择: {fileName}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">标题</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">日期</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">描述</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">标签（逗号分隔）</label>
              <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">封面图片路径</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug（可选）</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
            <p className="text-xs text-muted-foreground">实际使用的 slug: {normalizedSlug}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">正文</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} className="w-full rounded border px-3 py-2 bg-background" />
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={saveToLocal} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">保存到本地开发环境</button>
            <button onClick={downloadFile} className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 rounded hover:bg-accent">生成并下载 .mdx 文件</button>
            <button onClick={publishToGithub} disabled={publishing} className="inline-flex items-center gap-2 bg-primary/80 text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-60">发布到 GitHub 并触发部署</button>
          </div>

          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </div>
      </div>
    </main>
  )
}