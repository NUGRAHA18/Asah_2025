module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              // masukkan style dengan <style> di bawah dari element <body>
              insert: "body",
            },
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
};
