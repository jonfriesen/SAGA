// Core js
const photographer = require("./photographer.js");
const wrangler = require("./wrangler.js");
const faceApi = require("./faceapi.js");
const view = require("./view.js");

window.addEventListener("load", () => {
    view.renderCharts();

    let sampleData = {
        aggregatedAnalysis: {
            "anger": 0,
            "contempt": 0,
            "disgust": 0,
            "fear": 0,
            "happiness": 0,
            "neutral": 0.986,
            "sadness": 0.009,
            "surprise": 0.005
        },
        persons: [{
            gender: "male",
            age: 24,
            emotions: {
                "anger": 0,
                "contempt": 0,
                "disgust": 0,
                "fear": 0,
                "happiness": 0,
                "neutral": 0.986,
                "sadness": 0.009,
                "surprise": 0.005
            },
            feeling: "neutral"
        } // or more person objects
        ],
        time: 1512686380559 // miliseconds
    };
    view.updateCharts(sampleData);

    let sampleData1 = {
        aggregatedAnalysis: {
            "anger": 0.1,
            "contempt": 0.1,
            "disgust": 0.1,
            "fear": 0.1,
            "happiness": 0.1,
            "neutral": 0.1,
            "sadness": 0.1,
            "surprise": 0.3
        },
        persons: [{
            gender: "female",
            age: 24,
            emotions: {
                "anger": 0.1,
                "contempt": 0.1,
                "disgust": 0.1,
                "fear": 0.1,
                "happiness": 0.1,
                "neutral": 0.1,
                "sadness": 0.1,
                "surprise": 0.3
            },
            feeling: "neutral"
        } // or more person objects
        ],
        time: 2512686380559 // miliseconds
    };
    view.updateCharts(sampleData1);

    photographer.init();
    photographer.startWatch(data => {
        faceApi.AnalyzeImage(data).then(data => {
            console.table(data);
            let newData = wrangler.wrangle(data);
            view.updateCharts(newData);
        });
    });
});