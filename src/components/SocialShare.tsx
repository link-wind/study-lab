'use client'

import { Facebook, Twitter, Linkedin, Link2, Share2 } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  title: string
  description: string
  url: string
}

export default function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedUrl = encodeURIComponent(shareUrl)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-blue-400 hover:bg-blue-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">分享:</span>
      
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full text-white transition-colors ${link.color}`}
          title={`分享到 ${link.name}`}
          aria-label={`分享到 ${link.name}`}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-full text-white transition-colors ${
          copied 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gray-500 hover:bg-gray-600'
        }`}
        title={copied ? '链接已复制!' : '复制链接'}
        aria-label={copied ? '链接已复制!' : '复制链接'}
      >
        {copied ? <Share2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}