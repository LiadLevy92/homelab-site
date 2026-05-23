/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:      '#0a0a0a',
          surface: '#111111',
          border:  '#1a1a1a',
          green:   '#00ff88',
          cyan:    '#00d4ff',
          amber:   '#ffb347',
          red:     '#ff4444',
          muted:   '#4a4a4a',
          text:    '#e0e0e0',
          dim:     '#888888',
        },
        brand: {
          bg:      '#0f0f13',
          surface: '#16161d',
          text:    '#f0f0f0',
          accent:  '#6366f1',
          muted:   '#6b7280',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink':   'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.5s ease-in forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
