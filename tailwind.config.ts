import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/app/**/*.{ts,tsx}',
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/shared/**/*.{ts,tsx}',
        './src/features/**/*.{ts,tsx}',
        './src/layouts/**/*.{ts,tsx}',
        './src/lib/**/*.{ts,tsx}',
        './src/utils/**/*.{ts,tsx}',
        './src/widgets/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    plugins: [],
} satisfies Config
