import { defineConfig } from 'vitepress'

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
          { text: 'Guide', link: '/en/' },
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/en/' },
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
              ]
            },
          ]
        }
      }
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id',
      link: '/id/',
      themeConfig: {
        nav: [
          { text: 'Panduan', link: '/id/' },
        ],
        sidebar: {
          '/id/': [
            {
              text: 'Memulai',
              items: [
                { text: 'Pengenalan', link: '/id/' },
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
              ]
            },
          ]
        }
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
    }
  }
})
