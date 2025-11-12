import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/MdxComponents'

interface MdxContentProps {
  content: string
}

export default function MdxContent({ content }: MdxContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
}