const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {app: path.resolve("./screens/app.js")},
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
                  "@babel/preset-react",
                  {
                    "pragma": "React.createElement",
                    "throwIfNamespace": false
                  }
                ]
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
      template: "./index.html"
    })
  ]
};