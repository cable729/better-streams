var path = require('path');
var webpack = require('webpack');

// If this is set, we want to build in production mode
const isProd = process.env.NODE_ENV ? true : false;

const devEntry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './src/client/index'
];
const prodEntry = './src/client/index';

const devPlugins = [new webpack.HotModuleReplacementPlugin()];
const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

const devJsLoaders = ['react-hot', 'babel'];
const prodJsLoaders = ['babel'];


module.exports = {
  devtool: isProd ? undefined : 'eval-source-map',
  entry: isProd ? prodEntry : devEntry,
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: isProd ? prodPlugins : devPlugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: isProd ? prodJsLoaders : devJsLoaders,
      include: path.join(__dirname, 'src')
    }]
  }
};
