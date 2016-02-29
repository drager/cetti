var path = require('path');

const production = process.env.NODE_ENV === 'production';

const babelPlugins = ['jsx-tagclass'];
const babelProdPlugins = babelPlugins.concat(
  ['transform-react-constant-elements', 'transform-react-inline-elements']
);


var config = {
  entry: {
    javascript: ['babel-polyfill', './app/index'],
    html: './app/index.html'
  },
  output: {
    path: './dist',
    filename: 'app.js',
  },
  debug: !production,
  devtool: production ? 'source-map' : 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?' + JSON.stringify({
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-2'),
            ],
            plugins: production
              ? babelProdPlugins
              : babelPlugins,
          }),
          'ts',
        ],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        exclude: /\.global\.scss$/,
        loaders: [
          'style',
          'css?modules',
          'resolve-url',
          'sass',
        ],
      },
      {
        test: /\.global\.scss$/,
        loaders: [
          'style',
          'css',
          'resolve-url',
          'sass',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
    modulesDirectories: ['node_modules', path.resolve('./node_modules')],
  },
};

if (pproduction) {
  var webpack = require('webpack');

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
    }),
  ];
}


module.exports = config;
