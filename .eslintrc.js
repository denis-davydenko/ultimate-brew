module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['svelte3'],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  ignorePatterns: ['svelte.config.js', 'postcss.config.js'],
  rules: {},
  settings: {
    'svelte3/ignore-styles': attrs => attrs.type === 'text/postcss'
  }
};
