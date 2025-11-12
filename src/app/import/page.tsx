'use client'
import { useState, useMemo } from 'react'
import matter from 'gray-matter'

export default function ImportPage() {
  const [fileName, setFileName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [tags, setTags] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [assets, setAssets] = useState<{ filename: string; preview: string; base64: string }[]>([])
  const [selectedCoverIndex, setSelectedCoverIndex] = useState<number | null>(null)

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
    const cover = (() => {
      if (selectedCoverIndex !== null && assets[selectedCoverIndex]) return `/images/${assets[selectedCoverIndex].filename}`
      if (assets.length > 0) return `/images/${assets[0].filename}`
      const m = body.match(/!\[[^\]]*\]\(\s*(\/images\/[^)\s]+)\s*\)/)
      if (m) return m[1]
      return ''
    })()
    const frontmatterLines = [
      '---',
      `title: "${title || normalizedSlug}"`,
      `description: "${description || ''}"`,
      `date: "${date}"`,
      `tags: [${tagsArray.map((t) => `"${t}"`).join(', ')}]`,
      cover ? `image: "${cover}"` : '',
      '---',
      '',
    ].filter(Boolean)
    const imageLines = cover ? `![封面图片](${cover})` : ''
    return `${frontmatterLines.join('\n')}${imageLines ? imageLines + '\n\n' : ''}${body}`
  }, [title, description, date, tags, body, normalizedSlug, assets, selectedCoverIndex])

  const extractTitleFromContent = (content: string) => {
    const lines = content.split(/\r?\n/)
    for (const line of lines) {
      const m = /^#\s+(.*)$/.exec(line)
      if (m) return m[1].trim()
    }
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].trim().length > 0 && /^=+$/.test(lines[i + 1].trim())) {
        return lines[i].trim()
      }
    }
    return ''
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('')
    setFileName(file.name)
    const text = await file.text()
    const parsed = matter(text)
    const data = parsed.data as any
    const autoTitle = extractTitleFromContent(parsed.content || '')
    setTitle(typeof data?.title === 'string' ? data.title : autoTitle)
    setDescription(typeof data?.description === 'string' ? data.description : '')
    setDate(typeof data?.date === 'string' ? data.date : new Date().toISOString().slice(0, 10))
    setTags(Array.isArray(data?.tags) ? data.tags.join(', ') : '')
    setSlug('')
    setBody(parsed.content || '')
  }

  const onImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return
    const next: { filename: string; preview: string; base64: string }[] = []
    for (const f of files) {
      const reader = new FileReader()
      const res: string = await new Promise((resolve) => {
        reader.onload = () => resolve(String(reader.result))
        reader.readAsDataURL(f)
      })
      next.push({ filename: f.name, preview: res, base64: res })
    }
    setAssets(next)
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    let updated = body
    for (const a of next) {
      const patterns = [
        new RegExp(`\x5c]\(\s*${escapeRegex(a.filename)}\s*\)`, 'g'),
        new RegExp(`\x5c]\(\s*\.\/${escapeRegex(a.filename)}\s*\)`, 'g'),
        new RegExp(`\x5c]\(\s*\.\.\/[^)]*${escapeRegex(a.filename)}\s*\)`, 'g'),
      ]
      for (const r of patterns) {
        updated = updated.replace(r, `](/images/${a.filename})`)
      }
    }
    setBody(updated)
    setSelectedCoverIndex(null)
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
        body: JSON.stringify({
          slug: normalizedSlug,
          content: finalContent,
          assets: assets.map((a) => ({ filename: a.filename, content: a.base64, path: `public/images/${a.filename}` })),
        }),
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
      const assetInfo = Array.isArray(data.assets) && data.assets.length > 0 ? `，图片 ${data.assets.length} 个` : ''
      setStatus(`已保存到本地开发环境: ${data.path || ''}${assetInfo}`)
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
        body: JSON.stringify({
          slug: normalizedSlug,
          content: finalContent,
          message: `publish: ${normalizedSlug}`,
          assets: assets.map((a) => ({ filename: a.filename, content: a.base64, path: `public/images/${a.filename}` })),
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        setStatus(`发布失败: ${text}`)
        setPublishing(false)
        return
      }
      const data = await res.json()
      const assetInfo = Array.isArray(data.assets) && data.assets.length > 0 ? `，图片 ${data.assets.length} 个` : ''
      setStatus(`已推送到 GitHub: ${data.url || ''}${assetInfo}`)
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
            <label className="text-sm font-medium">选择文章文件</label>
            <div className="relative">
              <input id="file-article" type="file" accept=".md,.mdx,text/markdown" onChange={onFileChange} className="sr-only" />
              <label htmlFor="file-article" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer hover:bg-primary/90">
                选择文件
              </label>
              {fileName && <span className="ml-3 text-xs text-muted-foreground">{fileName}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">选择图片（可多选）</label>
            <div className="relative">
              <input id="file-images" type="file" accept="image/*" multiple onChange={onImagesChange} className="sr-only" />
              <label htmlFor="file-images" className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 rounded cursor-pointer hover:bg-accent">
                选择图片
              </label>
            </div>
            {assets.length > 0 && (
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                {assets.map((a, index) => (
                  <div key={a.filename} className="border rounded p-2 flex items-center gap-2">
                    <input type="radio" name="cover" checked={selectedCoverIndex === index} onChange={() => setSelectedCoverIndex(index)} className="mr-2" />
                    <img src={a.preview} alt={a.filename} className="w-12 h-12 object-cover rounded" />
                    <span className="text-xs text-muted-foreground break-all">{a.filename}</span>
                  </div>
                ))}
              </div>
            )}
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

          <div className="space-y-2">
            <label className="text-sm font-medium">标签（逗号分隔）</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded border px-3 py-2 bg-background" />
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
            <button onClick={publishToGithub} disabled={publishing} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-60">发布文章</button>
            <button onClick={downloadFile} className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 rounded hover:bg-accent">生成并下载 .mdx 文件</button>
            <button onClick={saveToLocal} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80">保存到本地开发环境</button>
          </div>

          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </div>
      </div>
    </main>
  )
}