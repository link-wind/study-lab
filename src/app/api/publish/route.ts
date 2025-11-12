import { NextResponse } from 'next/server'

async function getFileSha(owner: string, repo: string, path: string, branch: string, token: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('failed to get file')
  const data = await res.json()
  return data.sha as string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slug: string = body?.slug
    const content: string = body?.content
    const message: string = body?.message || `chore: publish post ${slug}`
    if (!slug || !content) {
      return NextResponse.json({ error: 'missing parameters' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN || ''
    const owner = process.env.GITHUB_OWNER || ''
    const repo = process.env.GITHUB_REPO || ''
    const branch = process.env.GITHUB_BRANCH || 'main'
    const committerName = process.env.GITHUB_COMMITTER_NAME || 'StudyLab Bot'
    const committerEmail = process.env.GITHUB_COMMITTER_EMAIL || 'bot@studylab.local'

    if (!token || !owner || !repo) {
      return NextResponse.json({ error: 'missing github env' }, { status: 500 })
    }

    const path = `content/blog/${slug.endsWith('.md') || slug.endsWith('.mdx') ? slug : `${slug}.mdx`}`
    const sha = await getFileSha(owner, repo, path, branch, token)
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch,
        sha: sha || undefined,
        committer: { name: committerName, email: committerEmail },
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: 'publish failed', detail: text }, { status: 500 })
    }
    const data = await res.json()
    return NextResponse.json({ ok: true, path, url: data.content?.html_url })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}