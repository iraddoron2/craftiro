// style-dictionary.config.cjs
const THEME = process.env.THEME || 'light'

module.exports = {
    // טוענים תמיד foundation
    source: [
        'src/tokens/foundation/**/*.json',
        // מוסיפים את התמה הרלוונטית בלבד
        `src/tokens/themes/${THEME}.json`,
        `src/tokens/themes/${THEME}/**/*.json`,
    ],

    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'dist/css/',
            files: [
                {
                    destination: `vars.${THEME}.css`,
                    format: 'css/variables',
                    options: {
                        // רק סלקטור data-theme, בלי :root
                        selector: `html[data-theme="${THEME}"]`,
                    },
                },
            ],
        },
    },
}
