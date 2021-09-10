const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "main", "index.tsx"),
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: "./public",
    },
    open: true,
    historyApiFallback: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  }, // nao inclui no bundle
  plugins: [
    new CleanWebpackPlugin(),
    // new DefinePlugin({ 
    //   'process.env.API_URL': 'http://fordevs.herokuapp.com/api'
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  
  ],
};
