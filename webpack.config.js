const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
      path: path.resolve(__dirname, 'dist'),
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
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    // options...
                  }
                }
              ]
         }
      ]
  },
  plugins: [new MiniCssExtractPlugin()],
  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
  }
};
