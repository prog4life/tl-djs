const webpack = require('webpack');
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const DuplPkgCheckrPlugin = require('duplicate-package-checker-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const scssSyntax = require('postcss-scss');
// const cssnano = require('cssnano');

// module.exports = (env = process.env.NODE_ENV || 'development') => {
module.exports = (env = process.env.NODE_ENV) => {
  const isProduction = env === 'production';

  console.log('env === "development" ', env === 'development');
  console.log('isProduction (env === "production") ', isProduction);
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  return {
    entry: {
      polyfills: './src/config/polyfills.js',
      bundle: [
        // './src/config/polyfills.js',
        // 'babel-polyfill',
        // 'normalize.css/normalize.css',
        // './src/styles/index.scss',
        './src/index.jsx'
      ]
    },
    output: {
      filename: '[name].js',
      // filename: '[name].[chunkhash].js',
      // chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    plugins: [
      new ExtractTextPlugin({
        filename: getPath => (
          getPath('[name].css').replace('bundle', 'styles') // OR: 'css/styles'
        ),
        allChunks: true,
        disable: env === 'development' // OR: !isProduction
      }),
      // new UglifyJsPlugin({
      //   sourceMap: true,
      //   parallel: true, // default === os.cpus().length -1
      // }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        }
      }),
      new CleanWebpackPlugin(
        ['public'], // OR: 'dist', removes folder
        { exclude: ['index.html', 'studios.json'] }
      ),
      new HTMLWebpackPlugin({
        title: 'TL App for DJS testcase',
        favicon: path.resolve(__dirname, 'src/assets/favicon-32x32.png'),
        inject: false,
        template: path.resolve(__dirname, 'src/assets/template-index.html'),
        chunksSortMode(a, b) {
          const chunks = ['manifest', 'polyfills', 'vendors', 'bundle'];
          return chunks.indexOf(a.names[0]) - chunks.indexOf(b.names[0]);
        },
        appMountId: 'app',
        mobile: true
        // excludeChunks: ['common']
        // filename: 'assets/custom.html'
        // hash: true // usefull for cache busting
      }),
      // new CompressionPlugin({
      //   deleteOriginalAssets: true,
      //   test: /\.js/
      // }),
      // useful during development for more readable output, if compare with
      // new webpack.NamedModulesPlugin(), // HashedModuleIdsPlugin
      // new webpack.HashedModuleIdsPlugin(), // better for production
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'common',
      //   minChunks: 2
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        chunks: ['bundle'],
        minChunks(module) { // 1st arg: 'module', 2nd: count
          // This prevents stylesheet resources with the .css or .scss extension
          // from being moved from their original chunk to the vendor chunk
          if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
            return false;
          } // eslint-disable-next-line
          return module.context && module.context.includes('node_modules');
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
        // minChunks: Infinity
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new VisualizerPlugin(),
      new DuplPkgCheckrPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        App: path.resolve(__dirname, 'src/components/App.jsx'),
        Components: path.resolve(__dirname, 'src/components'),
        Utilities: path.resolve(__dirname, 'src/utils')
      },
      modules: [
        // path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js', '.json', '.jsx', '*']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: [
            path.resolve(__dirname, 'src')
          ],
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          options: {
            plugins: [
              'fast-async',
              'transform-class-properties',
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css' // true OR 'css'(without optimization)
              }]
            ],
            presets: [
              ['env', {
                modules: false,
                useBuiltIns: 'usage',
                // useBuiltIns: 'entry',
                // useBuiltIns: false,
                debug: true,
                targets: {
                  browsers: ['last 2 versions']
                },
                exclude: [
                  'transform-regenerator',
                  'transform-async-to-generator'
                ]
              }],
              'react',
              'stage-3'
            ]
          }
        },
        {
          test: /\.(scss|css)$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
          ],
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 3,
                  // url: false, // enable/disable url() resolution
                  // minimize: true, // OR cssnano config object
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  syntax: scssSyntax,
                  plugins: [
                    autoprefixer
                    // cssnano // with def config it brokes antd spinner
                  ],
                  sourceMap: true
                }
              },
              // 'resolve-url-loader',
              { loader: 'sass-loader', options: { sourceMap: true } }
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]', // '[name].[hash].[ext]'
                outputPath: 'assets/img/' // custom output path
              }
            }
            // {
            //   loader: 'image-webpack-loader',
            //   query: {
            //     progressive: true,
            //     optimizationLevel: 7,
            //     interlaced: false,
            //     pngquant: {
            //       quality: '65-90',
            //       speed: 4
            //     }
            //   }
            // }
          ]
        }
        // {
        //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000
        //   }
        // }
      ]
    },
    devServer: {
      progress: true,
      contentBase: path.resolve(__dirname, 'public'),
      compress: true,
      historyApiFallback: true
      // port: 9000,
    },
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'
    devtool: 'source-map'
  };
};
