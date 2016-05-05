'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

import path from 'path'
import webpack from 'webpack'

// import NpmInstallPlugin from 'npm-install-webpack-plugin'
import autoprefixer from 'autoprefixer'
import precss from 'precss'

export default {
  watch: isDevelopment,
  devtool: isDevelopment ? 'cheap-module-inline-cource-map' : null,
  entry: [
    // 'webpack-hot-middleware/client',
    // 'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new NpmInstallPlugin() // автоустановка неустановленных зависимостей
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "src")
        ]
      }
    ],
    loaders: [
      {
        loaders: [
          // 'react-hot',
          'babel-loader'
        ],
        include: [
          path.resolve(__dirname, "src")
        ],
        test: /\.js$///,
        // plugins: ['transform-runtime']
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
};
