module.exports = {
    env: {
        node: true,
        es6: true
    },

    root: true,

    parser: '@typescript-eslint/parser',

    plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'sort-requires'],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/@typescript-eslint'
    ],

    rules: {
        'prettier/prettier': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
        'sort-requires/sort-requires': 2,
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error'
    }
}
