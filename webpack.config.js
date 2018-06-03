const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplPkgCheckrPlugin = require('duplicate-package-checker-webpack-plugin');
// const BabelPluginTransformImports = require('babel-plugin-transform-imports');
// const CompressionPlugin = require('compression-webpack-plugin');
// const VisualizerPlugin = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');
// const scssSyntax = require('postcss-scss');
// const cssnano = require('cssnano');

process.traceDeprecation = true; // or run process with --trace-deprecation flag

const env = process.env.NODE_ENV || 'development';
// const devMode = process.env.NODE_ENV !== 'production';
const isProd = env === 'production';

console.log('env: ', env);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
  mode: env,
  entry: {
    // polyfills: './src/config/polyfills.js',
    bundle: [
      // 'normalize.css/normalize.css',
      // 'sanitize.css/sanitize.css',
      // './src/styles/index.scss',
      // './src/config/polyfills.js',
      './src/index.jsx',
    ],
  },
  output: {
    filename: isProd ? 'js/[name].[chunkhash:4].js' : '[name].[id].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash:4].js' : '[id].[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [ // setting this overrides webpack 4 defaults
      new UglifyJSPlugin({
        cache: true,
        parallel: 2, // if "true": os.cpus().length -1 (default)
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        base: {
          // test: /(react|react-dom|react-router|react-router-dom)/,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            const re = /[\\/](react|react-dom|react-router|react-router-dom|history|core-js|whatwg-fetch|regenerator-runtime)[\\/]/;
            const result = re.test(name);

            // console.log(`module.nameForCondition: ${name}`);
            // console.log(`RegExp .test() RESULT: ${result}`);

            return result;
          },
        },
        // to extract css to single file
        // 'common-styles': {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProd ? 'css/styles.[contenthash:4].css' : '[name].css',
      chunkFilename: isProd ? 'css/[name].[contenthash:4].css' : '[id].css',
    }),
    new CleanWebpackPlugin(
      ['dist'], // OR: 'build', removes folder
      { exclude: ['index.html'] }, // TEMP
    ),
    new HTMLWebpackPlugin({
      title: 'TL Studios',
      // favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
      favicon: './src/assets/favicon.png',
      // meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      inject: false,
      template: path.resolve(__dirname, 'src/assets/template.html'),
      // chunksSortMode(a, b) {
      //   const order = ['polyfills', 'vendors', 'bundle'];
      //   return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      // },
      appMountId: 'app',
      mobile: true,
    }),
    // new CompressionPlugin({
    //   deleteOriginalAssets: true,
    //   test: /\.js/
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      // reportFilename: '../temp', // relative to output.path
      openAnalyzer: false,
    }),
    new DuplPkgCheckrPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new VisualizerPlugin(),
    ...isProd ? [] : [new webpack.HotModuleReplacementPlugin()],
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      actions: path.resolve(__dirname, 'src/actions'),
      constants: path.resolve(__dirname, 'src/constants'),
      utils: path.resolve(__dirname, 'src/utils'),
      selectors: path.resolve(__dirname, 'src/selectors'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      config: path.resolve(__dirname, 'src/config'),
    },
    modules: [
      // path.resolve(__dirname, 'src'),
      // path.resolve(__dirname, 'src/components'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx', '*'],
  },
  module: {
    rules: [
      // -------------------- JS/JSX BABEL-LOADER -----------------------------
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          // ------------------------ BABEL PLUGINS ---------------------------
          plugins: [
            'react-hot-loader/babel',
            // 'fast-async',
            'syntax-dynamic-import',
            'transform-class-properties',
            // 'transform-flow-strip-types',
            // [BabelPluginTransformImports, { // TODO: try "transform-imports"
            //   'reactstrap': {
            //     transform(importName) {
            //       return `reactstrap/lib/${importName}`;
            //     },
            //     preventFullImport: true,
            //   },
            // }],
          ].concat(isProd ? [] : ['transform-react-jsx-source']),
          // ------------------------ BABEL PRESETS ---------------------------
          presets: [
            ['env', {
              // need to be turned on for Jest testing
              // modules: env === 'development' ? false : 'commonjs',
              modules: false,
              useBuiltIns: 'usage', // or 'entry' or false
              debug: true,
              targets: { // ['defaults', 'firefox 52', 'not ie <= 11']
                browsers: ['last 2 versions'], // ['not android <= 62']
              },
              exclude: [
                'web.timers', // needed only for IE9-
                // 'transform-regenerator',
                // 'transform-async-to-generator',
              ],
            }],
            // 'flow',
            'react',
            'stage-3',
          ],
          cacheDirectory: true,
        },
      },
      // --------------------- CSS/SCSS LOADERS -------------------------------
      {
        test: /\.(scss|css)$/, // OR /\.s?[ac]ss$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { // not translates url() that starts with "/"
            loader: 'css-loader',
            // options: { importLoaders: 3, url: false }
            options: { minimize: true, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // syntax: scssSyntax,
              plugins: [autoprefixer],
              sourceMap: true,
            },
          },
          // 'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // TODO: consider to remove include
        include: path.resolve(__dirname, 'src'),
        use: [
          // --------------------- FILE-LOADER --------------------------------
          {
            loader: 'file-loader',
            options: {
              name: isProd ? '[name].[hash:4].[ext]' : '[name].[ext]',
              // outputPath: 'assets/', // custom output path,
              useRelativePath: true, // TODO: switch to isProd
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
      // --------------------------- URL-LOADER -------------------------------
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
