// ===================================================|
// WEBPACK CONFIG

// -------------------------| Import
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const jsonImporter = require('node-sass-json-importer');
const pkg = require('./package.json');

// -------------------------| Definitions
const dev_env = process.env.NODE_ENV === 'development';
const output_dir_name = path.join(__dirname, 'dist');

// -------------------------| Config
const config = {
  name: pkg.name,

  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: output_dir_name,
    filename: `${pkg.name}.[chunkhash].js`
  },

  stats: {
    loggingDebug: ['sass-loader']
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', 'scss']
  },

  devtool: dev_env ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              customElement: true
            }
          },
          'vue-svg-loader'
        ]
      },
      {
        test: /\.vue$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: dev_env
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: dev_env,
              modules: {
                exportLocalsConvention: 'dashes',
                localIdentName: dev_env
                  ? '[name]__[local]__[hash:base64:5]'
                  : '[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: true
              },
              sourceMap: dev_env
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: [jsonImporter()]
              }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              hoistUseStatements: true,
              resources: [
                'functions/**/*.scss',
                'data/swatches/index.scss',
                'data/roles/index.scss',
                'mixins/**/*.scss',
                'placeholders/**/*.scss'
              ].map((res) => `src/styles/resources/${res}`)
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin(),
    new StyleLintPlugin({
      files: ['./**/*.scss', './**/*.vue'],
      configFile: '.stylelintrc'
    }),
    new MiniCssExtractPlugin({
      filename: `${pkg.name}.[chunkhash].css`
    }),
    new HtmlWebpackPlugin({
      templateParameters: pkg,
      template: './src/index.html',
      filename: 'index.html',
      meta: {
        description: { name: 'description', content: pkg.description },
        // keyword: { name: 'keywords', content: '...' },
        'og:title': { property: 'og:title', content: pkg.title },
        'og:description': {
          property: 'og:description',
          content: pkg.description
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: pkg.homepage },
        'og:image': {
          property: 'og:image',
          content: `${pkg.homepage}/assets/cover.png`
        },
        'twitter:card': {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        'twitter:title': { name: 'twitter:title', content: pkg.title },
        'twitter:description': {
          name: 'twitter:description',
          content: pkg.description
        },
        'twitter:image': {
          name: 'twitter:image',
          content: `${pkg.homepage}/assets/cover.png`
        }
      }
    }),
    new FaviconsWebpackPlugin({
      logo: 'src/assets/icon.svg',
      mode: 'webapp',
      favicons: {
        appName: 'latinize.me',
        appDescription: pkg.description,
        developerName: pkg.author.name,
        developerURL: pkg.author.url,
        background: '#fff',
        theme_color: '#1d3702',
        appleStatusBarStyle: 'black-translucent',
        icons: {
          android: { offset: 10 },
          appleIcon: { offset: 10 },
          appleStartup: { offset: 5 },
          favicons: { offset: 5, background: '#fff' },
          windows: { offset: 10 },
          yandex: { offset: 10 }
        }
      },
      inject: (htmlPlugin) =>
        path.basename(htmlPlugin.options.filename) === 'index.html'
    })
  ],

  optimization: {
    minimize: !dev_env,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: !dev_env,
            drop_console: !dev_env
          },
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: 'dist'
    },
    devMiddleware: {
      writeToDisk: false
    },
    compress: false,
    port: 'auto'
  }
};

// -------------------------| Export
module.exports = config;
