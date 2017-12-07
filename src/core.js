// Core js
var photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");


faceApi.AnalyzeImage("asdasd");

// get chart objects from html and pass to view


// create instance of photographer and pass it function to call
photographer.watchCamera(1, data => {
    faceapi(data)
})

