// Core js
const photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    view.renderCharts();
});

faceApi.AnalyzeImage("asdasd");

// get chart objects from html and pass to view
// view.updateCharts();

// create instance of photographer and pass it function to call
photographer.init();
photographer.startWatch(data => {
    // faceApi.AnalyzeImage(data).then(data => {
    //     console.log(data);
    // });
})