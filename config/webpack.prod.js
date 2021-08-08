const baseConfig = require("./webpack.base");

module.exports = {
  ...baseConfig,
  mode: "production",
  watch: false,
  devtool: undefined,
};
