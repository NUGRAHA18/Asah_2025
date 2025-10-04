const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 3000,
    host: "127.0.0.1",
  },
});
