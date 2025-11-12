import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slug: string = body?.slug
    const content: string = body?.content
    const assets: { filename: string; content: string; path?: string }[] = Array.isArray(body?.assets) ? body.assets : []
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

    const refUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`
    const refRes = await fetch(refUrl, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } })
    if (!refRes.ok) {
      const text = await refRes.text()
      return NextResponse.json({ error: 'ref failed', detail: text }, { status: 500 })
    }
    const refData = await refRes.json()
    const latestCommitSha = refData.object?.sha

    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } })
    if (!commitRes.ok) {
      const text = await commitRes.text()
      return NextResponse.json({ error: 'commit fetch failed', detail: text }, { status: 500 })
    }
    const commitData = await commitRes.json()
    const baseTreeSha = commitData.tree?.sha

    const files: { path: string; content: string; encoding: 'utf-8' | 'base64' }[] = []
    const postPath = `content/blog/${slug.endsWith('.md') || slug.endsWith('.mdx') ? slug : `${slug}.mdx`}`
    files.push({ path: postPath, content, encoding: 'utf-8' })
    for (const asset of assets) {
      const assetPath = asset.path || `public/images/${asset.filename}`
      const base64 = asset.content.includes('base64,') ? asset.content.split('base64,')[1] : asset.content
      files.push({ path: assetPath, content: base64, encoding: 'base64' })
    }

    const blobShas: { path: string; sha: string; mode: string; type: string }[] = []
    for (const f of files) {
      const blobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
        body: JSON.stringify({ content: f.content, encoding: f.encoding }),
      })
      if (!blobRes.ok) {
        const text = await blobRes.text()
        return NextResponse.json({ error: 'blob failed', detail: text }, { status: 500 })
      }
      const blobData = await blobRes.json()
      blobShas.push({ path: f.path, sha: blobData.sha, mode: '100644', type: 'blob' })
    }

    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify({ base_tree: baseTreeSha, tree: blobShas }),
    })
    if (!treeRes.ok) {
      const text = await treeRes.text()
      return NextResponse.json({ error: 'tree failed', detail: text }, { status: 500 })
    }
    const treeData = await treeRes.json()

    const newCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify({ message, tree: treeData.sha, parents: [latestCommitSha], author: { name: committerName, email: committerEmail }, committer: { name: committerName, email: committerEmail } }),
    })
    if (!newCommitRes.ok) {
      const text = await newCommitRes.text()
      return NextResponse.json({ error: 'commit create failed', detail: text }, { status: 500 })
    }
    const newCommitData = await newCommitRes.json()
    const newSha = newCommitData.sha

    const updateRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify({ sha: newSha, force: false }),
    })
    if (!updateRes.ok) {
      const text = await updateRes.text()
      return NextResponse.json({ error: 'ref update failed', detail: text }, { status: 500 })
    }

    const commitUrl = `https://github.com/${owner}/${repo}/commit/${newSha}`
    return NextResponse.json({ ok: true, path: postPath, url: commitUrl, assets: files.filter((f) => f.path.startsWith('public/images/')).map((f) => ({ path: f.path })) })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}