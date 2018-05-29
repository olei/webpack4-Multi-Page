const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templateList = require('./templateList')

const NODE_BUILD = process.env.NODE_BUILD || ''
let entry = {}
let plugins = []

if (NODE_BUILD) {
  if (!templateList[NODE_BUILD]) {
    throw new Error('没有这个文件')
    return
  }
  const ITEM = templateList[NODE_BUILD]
  entry[NODE_BUILD] = ITEM.entry
  plugins.push(new HtmlWebpackPlugin({
    filename: ITEM.filename,
    template: ITEM.template,
    inject: true,
    chunks: ITEM.chunks
  }))
} else {
  for (let item in templateList) {
    const ITEM = templateList[item]
    entry[item] = ITEM.entry
    plugins.push(new HtmlWebpackPlugin({
      filename: ITEM.filename,
      template: ITEM.template,
      inject: true,
      chunks: ITEM.chunks
    }))
  }
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'common'
    }
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        loader: ['source-map-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
      }
    ]
  }
}