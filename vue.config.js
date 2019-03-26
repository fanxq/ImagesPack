const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyPluin = require('copy-webpack-plugin');
module.exports = {
    outputDir: path.resolve(__dirname, 'wc'),
    configureWebpack: {
        plugins: [
            new FileManagerPlugin({
                onStart: [{
                    delete: ['./wc']
                }]
            }),
            new CopyPluin([{
                from: './wc/images-pack.js',
                to: '../src',
                force: true
            }])
        ]
    }
}