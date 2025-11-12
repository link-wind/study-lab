/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    // 允许域名（用于 GitHub 头像、外部图床等）
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'user-images.githubusercontent.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trae-api-us.mchost.guru',
        pathname: '/api/ide/v1/text_to_image/**',
      },
      // 支持任意 githubusercontent 子域（例如 GitHub Actions 上传的图片）
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-gfm'),
      require('remark-math')
    ],
    rehypePlugins: [
      require('rehype-highlight'),
      require('rehype-katex')
    ],
  },
})

module.exports = withMDX(nextConfig)