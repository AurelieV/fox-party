module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false,
      tsx: false,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  overrides: [
    {
      files: ['.eslintrc.js', 'tailwind.config.js'],
      env: {
        node: true,
      },
    },
  ],
}
