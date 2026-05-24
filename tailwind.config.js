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
        bg: 'var(--bg)',
        'bg-1': 'var(--bg-1)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        line: 'var(--line)',
        'line-hover': 'var(--line-hover)',
        'line-strong': 'var(--line-strong)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        'text-4': 'var(--text-4)',
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
