const esModules = ['@aerisweather'];

module.exports = {
    globals: {
        'ts-jest': {
            babelConfig: {
                presets: [
                    '@babel/preset-env'
                ]
            },
            tsConfig: '<rootDir>/tsconfig.test.json',
            diagnostics: {
                ignoreCodes: [2451, 2686, 2322]
            }
            // isolatedModules: false
        }
    },
    roots: [
        '<rootDir>/src/',
        '<rootDir>/tests/'
    ],
    setupFiles: [
        '<rootDir>/tests/setupTests.ts'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$',
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/tests/setupTests.ts',
        '<rootDir>/tests/fixtures/',
        '<rootDir>/tests/types/',
        '<rootDir>/tests/__mocks__/',
        '<rootDir>/__mocks__/'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: [
        `/node_modules/(?!(${esModules.join('|')}))`
    ]
};
