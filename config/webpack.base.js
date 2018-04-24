const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
let dir = process.cwd()
let baseConfig = {
  entry: {
    app: __dirname + '/../app.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].js',
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',

        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: ['url-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }

}
module.exports = baseConfig