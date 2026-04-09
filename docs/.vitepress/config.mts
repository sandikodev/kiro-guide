import { defineConfig } from 'vitepress'

const enSidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Introduction', link: '/en/01-getting-started' },
    ]
  },
  {
    text: 'Kiro Chat',
    items: [
      { text: 'Vibe vs Spec Chat', link: '/en/02-chat-modes' },
    ]
  },
  {
    text: 'Configuration',
    items: [
      { text: 'Steering Files', link: '/en/03-steering' },
      { text: 'Hooks', link: '/en/04-hooks' },
      { text: 'Agents', link: '/en/05-agents' },
    ]
  },
  {
    text: 'Workflows',
    items: [
      { text: 'Spec Workflow', link: '/en/06-spec-workflow' },
      { text: 'TDD with Kiro', link: '/en/07-tdd' },
    ]
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Kiro CLI', link: '/en/08-cli' },
      { text: 'Tips & Patterns', link: '/en/09-tips' },
    ]
  },
]

const idSidebar = [
  {
    text: 'Memulai',
    items: [
      { text: 'Pengenalan', link: '/id/01-memulai' },
    ]
  },
  {
    text: 'Kiro Chat',
    items: [
      { text: 'Vibe vs Spec Chat', link: '/id/02-mode-chat' },
    ]
  },
  {
    text: 'Konfigurasi',
    items: [
      { text: 'Steering Files', link: '/id/03-steering' },
      { text: 'Hooks', link: '/id/04-hooks' },
      { text: 'Agents', link: '/id/05-agents' },
    ]
  },
  {
    text: 'Workflow',
    items: [
      { text: 'Spec Workflow', link: '/id/06-spec-workflow' },
      { text: 'TDD dengan Kiro', link: '/id/07-tdd' },
    ]
  },
  {
    text: 'Lanjutan',
    items: [
      { text: 'Kiro CLI', link: '/id/08-cli' },
      { text: 'Tips & Pola', link: '/id/09-tips' },
    ]
  },
]

export default defineConfig({
  title: 'Kiro Guide',
  description: 'Community guide to Kiro IDE, Chat, and CLI',
  base: '/kiro-guide/',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/01-getting-started' },
          { text: 'GitHub', link: 'https://github.com/sandikodev/kiro-guide' },
        ],
        sidebar: { '/en/': enSidebar },
        docFooter: { prev: 'Previous', next: 'Next' },
      }
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id',
      link: '/id/',
      themeConfig: {
        nav: [
          { text: 'Panduan', link: '/id/01-memulai' },
          { text: 'GitHub', link: 'https://github.com/sandikodev/kiro-guide' },
        ],
        sidebar: { '/id/': idSidebar },
        docFooter: { prev: 'Sebelumnya', next: 'Selanjutnya' },
        darkModeSwitchLabel: 'Tampilan',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Kembali ke atas',
        outlineTitle: 'Di halaman ini',
      }
    }
  },

  themeConfig: {
    logo: '⚡',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sandikodev/kiro-guide' }
    ],
    editLink: {
      pattern: 'https://github.com/sandikodev/kiro-guide/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 sandikodev and contributors'
    },
    search: {
      provider: 'local'
    }
  }
})
