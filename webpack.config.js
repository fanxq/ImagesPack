const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackChromeReloaderPlugin = require('webpack-chrome-extension-reloader');

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: './src/main.js',
    background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name].js'
  },
  plugins: [
    new WebpackChromeReloaderPlugin({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'main',
        background: 'background'
      }
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: './src/manifest.json'
    }, {
      from: './images/icon16.png'
    }, {
      from: './images/icon48.png'
    }, {
      from: './images/icon128.png'
    }, {
      from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
    }, {
      from: './node_modules/vue/dist/vue.min.js'
    }])
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[name]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};