const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react'
              ]
            }
          },
        ],
      },
      {
        test: /\.?jsx$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react'
              ]
            }
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
  ],
}
