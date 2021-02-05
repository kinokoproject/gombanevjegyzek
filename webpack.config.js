const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [];
if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  plugins,
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
      path: path.resolve(__dirname, 'output'),
      filename: 'bundle.js'
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
  module: {
      rules: [
         {
             test: /\.jsx/,
             use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-react',
                    '@babel/preset-env'
                  ]
                }
             }
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader']
         }
      ]
  },
  devServer: {
      contentBase: path.resolve(__dirname),
  }
};
