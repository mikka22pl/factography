var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "/src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: "./js/app.js",
    vendor: ['../node_modules/jquery/dist/jquery.min.js', '../node_modules/bootstrap/dist/js/bootstrap.min.js']
  },
  output: {
    path: path.join(__dirname, "/src"),
    filename: "./[name].min.js",  //[name].min-[hash:6].js
    //publicPath: 'http://localhost:5000/factography/',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js"),
    new HtmlWebpackPlugin({template : __dirname + '/src/index.html'}),
    new webpack.UglifyJsPlugin({ mangle: false, sourcemap: false}),
    new webpack.ProvidePlugin({   
       jQuery: 'jquery',
       $: 'jquery',
       jquery: 'jquery'
   })
  ]
};
