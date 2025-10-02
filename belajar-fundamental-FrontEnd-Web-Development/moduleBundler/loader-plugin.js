// Mengimpor Plugin yang akan kita gunakan
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // 1. Tentukan file utama aplikasi Anda
  entry: "./src/index.js",

  // 2. Tentukan tempat hasil bundle akan disimpan
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // ===================================
  // Bagian 1: LOADERS (Untuk Transformasi File Individual)
  // ===================================
  module: {
    rules: [
      {
        // Mencari file yang berakhiran dengan .css
        test: /\.css$/i,

        // Loader yang digunakan. Diproses dari kanan ke kiri!
        // 1. 'css-loader': Mengubah file CSS menjadi modul JS
        // 2. 'style-loader': Menyuntikkan CSS (dari modul JS) ke dalam DOM
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // ===================================
  // Bagian 2: PLUGINS (Untuk Tugas Tingkat Kompilasi Global)
  // ===================================
  plugins: [
    // HtmlWebpackPlugin:
    // Tugasnya adalah MENGATUR OUTPUT, bukan mentransformasi file.
    // Plugin ini membuat file 'index.html' di folder 'dist'
    // dan secara otomatis menyertakan 'bundle.js' di dalamnya.
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Opsional: gunakan template HTML yang sudah ada
      filename: "index.html",
    }),

    // Anda bisa menambahkan Plugin lain di sini, misalnya untuk membersihkan folder dist
    // atau mendefinisikan variabel lingkungan.
  ],
};
