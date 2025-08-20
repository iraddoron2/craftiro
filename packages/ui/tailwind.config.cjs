// tailwind.config.cjs
const tokens = require('@craftiro/design-tokens/dist/json/tokens.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['src/**/*.{ts,tsx}'],
    theme: {
        screens: tokens.breakpoints,
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                fg: 'var(--color-fg)',
                primary: 'var(--color-primary)',
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
