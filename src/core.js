// Core js
const photographer = require("./photographer.js");
const wrangler = require("./wrangler.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    view.renderCharts();

    photographer.init();
    photographer.startWatch(data => {
        faceApi.AnalyzeImage(data).then(data => {
            console.table(data);
            let newData = wrangler.wrangle(data);
            view.updateCharts(newData);
        });
    });
});