const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

const environment = process.env.NODE_ENV || 'development'
const modeType = 'production' === environment ? 'production' : 'development'
const enabledSourceMap = !(environment === 'production')

// ejsからhtmlを出力させる
const ejsEntries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './src/**/*.ejs')], { ignore: path.resolve(__dirname, './src/**/_*.ejs') })()
const htmlWebpackPlugins = Object.entries(ejsEntries).map(
  ([k, v]) =>
    new HtmlWebpackPlugin({
      //出力ファイル名
      filename: `${k}.html`,
      //テンプレートに使用するファイルを指定 htmlの場合は.html ejsの場合は.ejs
      template: htmlWebpackPluginTemplateCustomizer({
        htmlLoaderOption: {
          //ファイル自動読み込みと圧縮を無効化
          sources: false,
          minimize: false
        },
        templatePath: v
      }),
      //JS・CSS自動出力と圧縮を無効化
      inject: false,
      minify: false,
      // スクリプト読み込みのタイプ
      scriptLoading: 'defer'
    })
)

module.exports = {
  mode: modeType,
  devServer: {
    client: {
      overlay: false // エラー発生時にブラウザ上にオーバーレイでエラー内容を表示するやつ（不要であれば消して構わない）
    },
    // host: 'gift.local.nicovideo.jp', //API叩くにあたってドメインをlocalhostから変えたい時に指定
    hot: true,
    open: true,
    port: 8080,
    server: 'https',
    static: {
      directory: path.join(__dirname, 'dist')
    },
    watchFiles: [path.resolve(__dirname, './src/**/*')] // いったんsrc下すべてを対象にしているが絞っても良い
  },

  entry: {
    global: './src/assets/js/global.js',
    static: './src/assets/js/static.js',
    style: './src/assets/scss/style.scss'
  },
  output: {
    clean: true,
    filename: 'assets/js/[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/img/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }],
                  ['cssnano', { preset: 'default' }],
                  ['postcss-sort-media-queries', {}],
                  ['css-declaration-sorter', { order: 'smacss' }],
                  [
                    '@fullhuman/postcss-purgecss',
                    {
                      content: [`./src/**/*.ejs`, `./src/**/*.js`],
                      safelist: []
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: enabledSourceMap }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].css' }),
    new RemoveEmptyScriptsPlugin(),
    ...htmlWebpackPlugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${path.resolve(__dirname, 'src')}/assets/img/`,
          to: `${path.resolve(__dirname, 'dist')}/assets/img/`
        }
      ]
    }),
    new ImageMinimizerPlugin({
      test: /\.(gif|svg)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['svgo', { plugins: ['preset-default'] }]
          ]
        }
      }
    }),
    new ImageMinimizerPlugin({
      test: /\.(png|jpe?g)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {
              quality: 85
            },
            oxipng: {
              level: 3,
              interlace: false
            }
          }
        }
      }
    }),
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules'
    }),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.js'),
      files: ['./src/**/*.scss']
    })
  ],
  resolve: {
    alias: {
      userEnv$: path.resolve(__dirname, `.env/${environment}.js`)
    }
  }
}
