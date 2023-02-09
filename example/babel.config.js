module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: [
                    '> 0.25%',
                    'not dead',
                    'not ie < 11'
                ]
            },
            corejs: { version: 3 }
        }]
    ],
    plugins: []
};
