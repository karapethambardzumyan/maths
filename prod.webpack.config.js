const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBGL_RENDERER: true,
      CANVAS_RENDERER: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css/,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
};
