// Useful: https://www.valentinog.com/blog/webpack-tutorial/
// This example is really clean:
//  https://github.com/MitchTalmadgeUofU/Digital-Story/blob/master/webpack/webpack.common.config.js
// https://webpack.js.org/configuration/

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const DEVMODE = process.env.NODE_ENV !== 'production'; // Not used anywhere yet

const module_option = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              { decoratorsBeforeExport: true },
            ],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            // Must go after decorators
            // See example under:
            //   https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy
            '@babel/plugin-transform-runtime',
            'react-hot-loader/babel',
          ],
        },
      },
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: { minimize: true },
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
    },
  ],
};

const externals_option = [nodeExternals()];

const plugins_option = [
  new CleanWebpackPlugin(['dist']), // `rm -r ./dist` on every run
  new HtmlWebPackPlugin({
    template: path.resolve(__dirname, 'src/client/index.html'),
    filename: 'index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new webpack.HotModuleReplacementPlugin(),
];

// https://webpack.js.org/configuration/dev-server/#devserver
const devServer_option = {
  compress: true,
  contentBase: 'dist/public',
  hot: true,
  noInfo: true,
  open: 'chrome',
  overlay: true,
  port: 8080, // (default: 8080) doesn't work for other numbers... idk why
  /*proxy: {
    '/api': 'http://localhost:3000',
  },*/
};

const client = {
  devtool: 'cheap-module-source-map',
  // https://webpack.js.org/configuration/devtool/
  entry: {
    react_hot_loader: 'react-hot-loader/patch',
    client: './src/client/index.js',
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].js',
    publicPath: '/',
    // Needed for devServer to work. `Cannot GET /` error otherwise.
    // See https://github.com/webpack/webpack-dev-server/issues/1373#issuecomment-399956296
  },
  module: module_option,
  plugins: plugins_option,
  devServer: devServer_option,
};

const server = {
  devtool: 'cheap-module-source-map',
  entry: {
    server: './src/server/index.js',
    push_data: './src/server/push_data.js',
    utils: './src/utils/utils.js',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: module_option,
  externals: externals_option,
};

module.exports = [client, server];
