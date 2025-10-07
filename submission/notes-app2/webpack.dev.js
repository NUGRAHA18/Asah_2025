// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Membantu debugging dengan menunjukkan error di file asli
  devServer: {
    static: "./dist", // Menjalankan server dari direktori 'dist'
    open: true, // Otomatis membuka browser saat server dijalankan
    hot: true, // Mengaktifkan Hot Module Replacement
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
