var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, './grr-ui/build');
var APP_DIR = path.resolve(__dirname, './grr-ui/src');

const config = {
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   module: {
     rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
      },
     {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: BUILD_DIR
          }        
        }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }]
     }
    ],

  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      { from: './grr-ui/src/api', to: './api' },
      { from: './grr-ui/src/assets', to: './assets'}
    ])
  ]
};

module.exports = config;