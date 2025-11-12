import './globals.css'
import './styles-enhanced.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Github, Twitter } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'StudyLab Notebook',
  description: '个人技术学习博客 - StudyLab Notebook',
  keywords: ['技术博客', '学习笔记', '编程', '前端开发', 'Next.js'],
  authors: [{ name: 'StudyLab' }],
  openGraph: {
    title: 'StudyLab Notebook',
    description: '个人技术学习博客',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyLab Notebook',
    description: '个人技术学习博客',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-8 md:py-12">
              <div className="px-4 lg:px-8">
                <div className="mx-auto max-w-4xl">
                  <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built with Next.js and Tailwind CSS. Hosted on Vercel.
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href="https://github.com/link-wind"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        <a
                          href="https://twitter.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-muted-foreground">
                        © 2024 StudyLab Notebook. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}