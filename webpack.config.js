const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {app: path.resolve("./src/app.js")},
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:
          {
            loader: "babel-loader",									
            query: {
              "presets": [
                [
                  "@babel/preset-react"
                ]
              ]			,
              "plugins": [
                  [
                    "@babel/plugin-proposal-class-properties"
                  ],
                  ["@babel/plugin-proposal-decorators", { "legacy": true }]
              ]					
            }
          },
      }
      ,
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
      ,
      {
        test: /\.(jpg|png|svg|woff|ttf)$/,
        use: "file-loader"
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/assets/index.html"
    })
  ]
};