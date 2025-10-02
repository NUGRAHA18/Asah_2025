const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // hapus dist sebelum build baru
  },
  module: {
    rules: [
      /* Loader untuk CSS */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      /* Loader untuk JS (Babel) */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
    new MomentLocalesPlugin({
      localesToKeep: ["id"], // hanya simpan locale bahasa Indonesia
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
