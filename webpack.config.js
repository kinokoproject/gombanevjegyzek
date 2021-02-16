const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

module.exports = {
  mode: 'production',
  entry: [
    path.join(PATHS.src, 'index.jsx'),
  ],
  output: {
      path: PATHS.dist,
      filename: '[name].bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new JsonMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
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
                }
              ]
          },
          {
            test: /\.json/i,
            type: "javascript/auto",
            use: [
              {
                loader: "json-loader",
                options: {
                  name: "[name].[ext]",
                },
              },
            ],
          },
      ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(PATHS.src, 'index.html'), to: PATHS.dist },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
       clientsClaim: true,
       skipWaiting: true,
     }),
  ],
  devServer: {
      contentBase: PATHS.dist,
      compress: true,
  }
};
