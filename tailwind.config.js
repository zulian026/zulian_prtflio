/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-1': '#111111',
        'bg-2': '#161616',
        'bg-3': '#1c1c1c',
        line: 'rgba(255,255,255,0.07)',
        'line-hover': 'rgba(255,255,255,0.12)',
        'line-strong': 'rgba(255,255,255,0.16)',
        'text-1': '#fafafa',
        'text-2': '#888888',
        'text-3': '#444444',
        'text-4': '#2a2a2a',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(56px,10vw,120px)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '300' }],
        'display-sm': ['clamp(40px,7vw,80px)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '300' }],
        'heading': ['clamp(28px,4vw,48px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'label': ['11px', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '500' }],
      },
      spacing: {
        section: '160px',
        'section-sm': '100px',
      },
      maxWidth: {
        content: '960px',
        wide: '1200px',
      },
      animation: {
        'fade-in': 'fade-in 1s ease forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
      },
      boxShadow: {
        'subtle': '0 1px 0 0 rgba(255,255,255,0.05)',
        'soft': '0 4px 24px rgba(0,0,0,0.6)',
        'glass': '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        xl: '40px',
      },
    },
  },
  plugins: [],
}
