const merge = require('webpack-merge');
const baseConfig = require('./base.webpack.config');
const devConfig = require('./dev.webpack.config');
const prodConfig = require('./prod.webpack.config');

module.exports = env => {
  return env.NODE_ENV === 'development' ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig);
}
