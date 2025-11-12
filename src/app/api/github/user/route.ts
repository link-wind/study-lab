import { NextResponse } from 'next/server'

interface GitHubUser {
  login: string
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export async function GET() {
  try {
    const username = 'link-wind' // 可以从环境变量或其他地方获取

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'StudyLab-Blog/1.0'
      },
      next: { revalidate: 3600 } // 缓存1小时
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user data')
    }

    const user: GitHubUser = await response.json()

    // 格式化返回数据
    const userData = {
      username: user.login,
      avatar: user.avatar_url,
      bio: user.bio || '热爱编程，喜欢分享技术知识',
      location: user.location || '中国',
      website: user.blog || user.html_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      githubUrl: user.html_url
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching GitHub user data:', error)
    // 返回默认数据作为fallback
    return NextResponse.json({
      username: 'link-wind',
      avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      bio: '热爱编程，喜欢分享技术知识',
      location: '中国',
      website: 'https://github.com/link-wind',
      followers: 0,
      following: 0,
      publicRepos: 0,
      githubUrl: 'https://github.com/link-wind'
    })
  }
}