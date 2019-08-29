const webpack = require('webpack');
const path = require('path')
const WriteFilePlugin =require ('write-file-webpack-plugin');
module.exports = {
  entry: {
    eventList:'./src/eventList/index.js',
    home:'./src/home/index.js',
    admin:'./src/admin/index.js',
    login:'./src/login/index.js',
    signup:'./src/signup/index.js',
    management:'./src/management/index.js',
    event:'./src/event/index.js',
    passwordRecovery:'./src/passwordRecovery/index.js',
    eventList:'./src/eventList/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.css'],
  },
  output: {
    path: path.resolve(__dirname, '../backend/public/js'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin()

  ],
  devServer: {
    contentBase: './dist',
    proxy: {
      "/api/*":{
        target:"http://localhost:3000/",
        secure:"false"
      }},
    port:8080,
    hot: true
  }
};