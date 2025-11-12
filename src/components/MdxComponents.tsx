import { MDXComponents } from 'mdx/types'
// import Image from 'next/image'

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-6 ml-6 list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mt-2">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-8" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium underline underline-offset-4 hover:text-primary"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  img: (props) => (
    <div className="my-8">
      <img
        {...props}
        className="rounded-lg border max-w-full h-auto"
        alt={props.alt || ''}
      />
    </div>
  ),
  code: ({ children, className }) => {
    const language = className?.replace('language-', '') || ''
    return (
      <code className={`language-${language}`}>{children}</code>
    )
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border bg-muted p-4">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse border border-muted">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-muted px-4 py-2 text-left font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-muted px-4 py-2">{children}</td>
  ),
}