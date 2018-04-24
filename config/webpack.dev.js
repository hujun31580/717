let baseConfig=require('./webpack.base')
const webpack=require('webpack')
baseConfig.plugins.push(new webpack.DefinePlugin({
  "process.env":'"development"'
}))
module.exports={
  ...baseConfig,
  devServer:{
    historyApiFallback:true,
    port:3000,
    inline:true,
    open:true
  },
  devtool:'eval-source-map'
}