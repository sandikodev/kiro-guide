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
      { text: 'Bugfix Workflow', link: '/en/10-bugfix-workflow' },
    ]
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Kiro CLI', link: '/en/08-cli' },
      { text: 'Tips & Patterns', link: '/en/09-tips' },
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Real World Example', link: '/en/11-real-world' },
      { text: 'FAQ', link: '/en/faq' },
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
      { text: 'Bugfix Workflow', link: '/id/10-bugfix-workflow' },
    ]
  },
  {
    text: 'Lanjutan',
    items: [
      { text: 'Kiro CLI', link: '/id/08-cli' },
      { text: 'Tips & Pola', link: '/id/09-tips' },
    ]
  },
  {
    text: 'Referensi',
    items: [
      { text: 'Contoh Nyata', link: '/id/11-contoh-nyata' },
      { text: 'FAQ', link: '/id/faq' },
    ]
  },
]

export default defineConfig({
  title: 'Kiro Guide',
  description: 'Community guide to Kiro IDE, Chat, and CLI — built from real-world usage.',
  base: '/kiro-guide/',

  sitemap: {
    hostname: 'https://sandikodev.github.io/kiro-guide'
  },

  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kiro Guide' }],
    ['meta', { property: 'og:image', content: 'https://sandikodev.github.io/kiro-guide/og.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://sandikodev.github.io/kiro-guide/og.png' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      description: 'Community guide to Kiro IDE, Chat, and CLI — built from real-world usage.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/01-getting-started' },
          { text: 'FAQ', link: '/en/faq' },
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
      description: 'Panduan komunitas Kiro IDE, Chat, dan CLI — dari penggunaan nyata.',
      themeConfig: {
        nav: [
          { text: 'Panduan', link: '/id/01-memulai' },
          { text: 'FAQ', link: '/id/faq' },
          { text: 'GitHub', link: 'https://github.com/sandikodev/kiro-guide' },
        ],
        sidebar: { '/id/': idSidebar },
        docFooter: { prev: 'Sebelumnya', next: 'Selanjutnya' },
        darkModeSwitchLabel: 'Tampilan',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Kembali ke atas',
        outlineTitle: 'Di halaman ini',
        lastUpdatedText: 'Terakhir diperbarui',
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
      provider: 'local',
      options: {
        locales: {
          id: {
            translations: {
              button: { buttonText: 'Cari', buttonAriaLabel: 'Cari' },
              modal: {
                noResultsText: 'Tidak ada hasil untuk',
                resetButtonTitle: 'Reset pencarian',
                footer: { selectText: 'pilih', navigateText: 'navigasi' }
              }
            }
          }
        }
      }
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'short' }
    }
  }
})
