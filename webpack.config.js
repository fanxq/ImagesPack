const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'main.js'
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
],
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
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
