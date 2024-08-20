const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
<<<<<<< HEAD
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
=======
      patterns: [{
        from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
      }],
>>>>>>> upstream/master
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
<<<<<<< HEAD
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
=======
    ]
  }
>>>>>>> upstream/master
};
