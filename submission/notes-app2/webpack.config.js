// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",

  // 3. Tentukan output (tempat hasil bundle disimpan)
  output: {
    filename: "main.js", // Nama file bundle yang dihasilkan
    path: path.resolve(__dirname, "dist"), // Direktori output (harus berupa path absolut)
    clean: true, // Bersihkan direktori output sebelum build
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Proyek Notes App",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
