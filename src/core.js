// Core js
const photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    // view.renderCharts();
    photographer.init();
    photographer.startWatch(data => {
        faceApi.AnalyzeImage(data).then(data => {
            console.log(data);
        });
    })
});