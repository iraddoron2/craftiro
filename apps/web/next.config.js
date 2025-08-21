import path from 'node:path'

const nextConfig = {
    transpilePackages: [
        '@craftiro/ui',
        '@craftiro/ui-composites',
        '@craftiro/core',
        '@craftiro/design-tokens',
    ],
    webpack: (config) => {
        const root = process.cwd()

        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(root, './src'),
            '@hooks': path.resolve(root, './src/hooks'),
            '@styles': path.resolve(root, './src/styles'),
            // '@core': path.resolve(__dirname, '../../packages/core/src'),
            // '@ui': path.resolve(__dirname, '../../packages/ui/src'),
            // '@craftiro/ui': path.resolve(__dirname, '../../packages/ui/src'),
            // '@craftiro/ui-composites': path.resolve(
            //     __dirname,
            //     '../../packages/ui-composites/src'
            // ),
            // '@craftiro/design-tokens': path.resolve(
            //     __dirname,
            //     '../../packages/design-tokens/src'
            // ),
        }
        return config
    },
}

export default nextConfig
