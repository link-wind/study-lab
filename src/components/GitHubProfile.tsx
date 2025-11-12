import { Github, MapPin, Link as LinkIcon, Users, Star, GitFork } from 'lucide-react'
import Image from 'next/image'

interface GitHubProfileProps {
  username?: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  followers?: number
  following?: number
  publicRepos?: number
  className?: string
}

export default function GitHubProfile({
  username = 'link-wind',
  avatar = 'https://avatars.githubusercontent.com/u/your-username',
  bio = '热爱编程，喜欢分享技术知识',
  location = '中国',
  website = 'https://github.com/link-wind',
  followers = 0,
  following = 0,
  publicRepos = 0,
  className = ''
}: GitHubProfileProps) {
  return (
    <div className={`bg-card border rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
          <Image src={avatar} alt={username} fill className="object-cover" unoptimized />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-sm text-muted-foreground">{bio}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LinkIcon className="h-4 w-4" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {website.replace('https://', '')}
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-primary">{publicRepos}</div>
          <div className="text-xs text-muted-foreground">仓库</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">{followers}</div>
          <div className="text-xs text-muted-foreground">关注者</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">{following}</div>
          <div className="text-xs text-muted-foreground">正在关注</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors justify-center"
        >
          <Github className="h-4 w-4" />
          访问 GitHub
        </a>
      </div>
    </div>
  )
}