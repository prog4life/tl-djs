const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplPkgCheckrPlugin = require('duplicate-package-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BabelPluginTransformImports = require('babel-plugin-transform-imports');
// const CompressionPlugin = require('compression-webpack-plugin');
// const VisualizerPlugin = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');
const scssSyntax = require('postcss-scss');
// const cssnano = require('cssnano');

// const env = process.env.NODE_ENV;
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

console.log('env === "development" ', env === 'development');
console.log('isProduction (env === "production") ', isProd);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
  entry: {
    polyfills: './src/config/polyfills.js',
    bundle: [
      // './src/config/polyfills.js',
      // 'normalize.css/normalize.css',
      'sanitize.css/sanitize.css',
      './src/styles/index.scss',
      './src/index.jsx',
    ],
  },
  output: {
    filename: isProd ? 'js/[name].[chunkhash].js' : '[name].[id].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash].js' : '[id].[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/styles.[contenthash].css',
      allChunks: true,
      disable: env === 'development', // OR: !isProd
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new CleanWebpackPlugin(
      ['dist'], // OR: 'dist', removes folder
      { exclude: ['index.html'] }, // TEMP
    ),
    new HTMLWebpackPlugin({
      title: 'TL App for DJS testcase',
      // favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
      favicon: './src/assets/favicon.png',
      inject: false,
      template: path.resolve(__dirname, 'src/assets/template-index.html'),
      chunksSortMode(a, b) {
        const order = ['polyfills', 'antd', 'vendors', 'bundle'];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      },
      appMountId: 'app',
      mobile: true,
      // minify: false,
      // excludeChunks: ['common']
      // filename: 'assets/custom.html'
      // hash: true // usefull for cache busting
    }),
    // new CompressionPlugin({
    //   deleteOriginalAssets: true,
    //   test: /\.js/
    // }),
    ...isProd
      ? [
        new webpack.HashedModuleIdsPlugin(),
        new UglifyJSPlugin({
          parallel: true, // default === os.cpus().length -1
          sourceMap: true, // cheap-source-map don't work with this plugin
          uglifyOptions: {
            ecma: 8,
            // compress: { warnings: false },
          },
        }),
      ]
      : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
      ],
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
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['antd'],
      chunks: ['vendors'],
      minChunks: ({ resource }) => resource && (/antd/).test(resource),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    //   // minChunks: Infinity
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    // new VisualizerPlugin(),
    new DuplPkgCheckrPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      actions: path.resolve(__dirname, 'src/actions'),
      constants: path.resolve(__dirname, 'src/constants'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
    modules: [
      // path.resolve(__dirname, 'src'),
      // path.resolve(__dirname, 'src/components'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx', '.less', '*'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          plugins: [
            'react-hot-loader/babel',
            'fast-async',
            'transform-class-properties',
            ['import', {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true, // true OR 'css'(without optimization)
            }],
            // [BabelPluginTransformImports, { // TODO: try "transform-imports"
            //   'react-bootstrap': {
            //     transform(importName) {
            //       return `react-bootstrap/lib/${importName}`;
            //     },
            //     preventFullImport: true,
            //   },
            // }],
          ].concat(isProd ? [] : ['transform-react-jsx-source']),
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: 'usage',
              // useBuiltIns: 'entry',
              // useBuiltIns: false,
              debug: false,
              targets: {
                browsers: ['last 2 versions'],
              },
              exclude: [
                'transform-regenerator',
                'transform-async-to-generator',
              ],
            }],
            'react',
            'stage-3',
          ],
          // This is a feature of `babel-loader` for Webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 3, sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                syntax: scssSyntax,
                plugins: [
                  autoprefixer,
                ],
                sourceMap: true,
              },
            },
            // 'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2, sourceMap: true },
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: [autoprefixer],
            //     sourceMap: true
            //   }
            // },
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true, sourceMap: true },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isProd ? '[name].[hash].[ext]' : '[name].[ext]',
              // outputPath: 'assets/', // custom output path,
              useRelativePath: true, // isProd
            },
          },
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
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000
      //   }
      // }
    ],
  },
  devServer: {
    progress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    // port: 9000,
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
};
