'use client'

import { useState, useEffect } from 'react'

interface GitHubUserData {
  username: string
  avatar: string
  bio: string
  location: string
  website: string
  followers: number
  following: number
  publicRepos: number
  githubUrl: string
}

function useGitHubUser() {
  const [githubUser, setGithubUser] = useState<GitHubUserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGithubUser = async () => {
      try {
        const response = await fetch('/api/github/user')
        if (response.ok) {
          const userData = await response.json()
          setGithubUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGithubUser()
  }, [])

  return { githubUser, loading }
}

export default useGitHubUser