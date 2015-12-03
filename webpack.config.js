var path = require('path');
var config = {
  entry: {
    javascript: ['babel-polyfill', './app/index'],
    html: './app/index.html'
  },
  output: {
    path: './dist',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?' + JSON.stringify({
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['jsx-tagclass'],
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
    extensions: ['', '.js', '.ts', '.tsx']
  },
};

if (process.env.NODE_ENV === 'production') {
  var webpack = require('webpack');

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
    }),
  ];
}


module.exports = config;
