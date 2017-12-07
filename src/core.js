// Core js
var photographer = require("./photographer.js");
const faceApi = require("./faceapi.js");


faceApi.analyzeImage("asdasd");
// import * as wrangler from '/wrangler.js';
// import * as faceapi from '/faceapi.js';
// import * as view from '/view.js';
// import * as photographer from '/photographer.js';

// get chart objects from html and pass to view


// create instance of photographer and pass it function to call
photographer.watchCamera(1, data => {
    faceapi(data)
})

