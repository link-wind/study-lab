/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trae-api-us.mchost.guru',
        pathname: '/api/ide/v1/text_to_image/**',
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