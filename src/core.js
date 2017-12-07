// Core js
var photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    view.renderCharts();
});

// create instance of photographer and pass it function to call
photographer.watchCamera(1, data => {
    faceApi.AnalyzeImage(data)
});

