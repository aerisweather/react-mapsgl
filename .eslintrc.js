module.exports = {
    globals: {
        __PATH_PREFIX__: true
    },
    env: {
        es6: true,
        browser: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    extends: ['plugin:@aerisweather/recommended'],
    plugins: ['@aerisweather']
};
