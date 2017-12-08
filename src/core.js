// Core js
const photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    view.renderCharts();
    photographer.init();
    photographer.startWatch(data => {
        faceApi.AnalyzeImage(data).then(data => {
            console.log(data);
        });
    })
    // let oPerson = {
    //     gender: "male",
    //     age: 24,
    //     emotions: {
    //         "anger": 0,
    //         "contempt": 0,
    //         "disgust": 0,
    //         "fear": 0,
    //         "happiness": 0,
    //         "neutral": 0.986,
    //         "sadness": 0.009,
    //         "surprise": 0.005
    //     },
    //     feeling: "neutral",
    //     time: 1512686380559  // miliseconds
    // }
    // view.updateCharts([oPerson]);
});
