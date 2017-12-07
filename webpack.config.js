module.exports = {
    entry: ["./src/core.js","./src/view.js","./src/faceapi.js","./src/wrangler.js","./src/photographer.js",],
    output: {
      filename: "./dist/bundle.js"
    },
    devtool: 'eval-source-map'
  }