module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommanded',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
}
