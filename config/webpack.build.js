let baseConfig=require('./webpack.base')
const webpack=require('webpack')
baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
baseConfig.plugins.push(new webpack.DefinePlugin({
  "process.env":'"production"'
}))
module.exports={
  ...baseConfig
}