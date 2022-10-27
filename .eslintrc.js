module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module' // Allows for the use of imports
  },
  plugins: [],
  // add your custom rules below
  rules: {
    // Debugging rules
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Code convention rules
    camelcase: 0,

    // ES rules
    'no-var': 'error',

    // Vue rules
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'error',
    'vue/valid-v-on': [
      'error',
      {
        modifiers: ['propagate']
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'never',
        math: 'never'
      }
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
  }
};
