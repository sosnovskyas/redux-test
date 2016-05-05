'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

// import NpmInstallPlugin from 'npm-install-webpack-plugin';

import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default {
  watch: isDevelopment,
  devtool: isDevelopment ? 'cheap-module-inline-cource-map' : null,
  target: 'node',

  entry: [
    './src/server'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
    publicPath: '/static/'
  },

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext
  }, {}),

  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin()//,
    // new webpack.HotModuleReplacementPlugin()//,
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
        loaders: ['react-hot', 'babel-loader'],
        include: [
          path.resolve(__dirname, "src")
        ],
        test: /\.js$/,
        plugins: ['transform-runtime']
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
