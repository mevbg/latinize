const typography = require('./src/shared/configs/typography');

const plugins = [
  // create smooth linear-gradients that approximate easing functions
  require('postcss-easing-gradients'),

  // this project tries to fix all of flexbug's issues
  // https://github.com/philipwalton/flexbugs
  require('postcss-flexbugs-fixes'),

  // convert modern CSS into something most browsers can understand
  require('postcss-preset-env'),

  // most commonly used mixins, shortcuts and helpers
  require('postcss-utilities'),

  // discard comments in your CSS files with PostCSS
  require('postcss-pxtorem')({
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    rootValue: parseInt(typography['root-font-size'])
  }),

  // transform @import rules by inlining content
  require('postcss-import'),

  // discard comments in your CSS files with PostCSS
  require('postcss-discard-comments')({
    removeAll: true
  })
];

const config = {
  syntax: 'postcss-scss',

  plugins
};

module.exports = config;
