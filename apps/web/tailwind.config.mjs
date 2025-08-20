import tokens from '@craftiro/design-tokens/dist/json/tokens.json' assert { type: 'json' }

const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/ui/src/**/*.{ts,tsx}',
    ],
    theme: {
        screens: tokens.breakpoints,
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                fg: 'var(--color-fg)',
                primary: 'var(--color-primary)',
                accent: 'var(--color-accent)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
            },
        },
    },
    plugins: [],
}

export default config
