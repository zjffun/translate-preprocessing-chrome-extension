const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const getEntry = (src) => {
  return [path.resolve(__dirname, "../src/", src)];
};

module.exports = {
  mode: "development",
  watch: true,
  devtool: "inline-source-map",
  entry: {
    popup: getEntry("./popup.js"),
    background: getEntry("./background.js"),
    preprocess: getEntry("./preprocess.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/popup.html" },
        { from: "src/manifest.json" },
        { from: "src/highlight.css" },
        { from: "src/images", to: "images" },
        { from: "src/_locales", to: "_locales" },
      ],
    }),
  ],
};
