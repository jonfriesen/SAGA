require("tracking");
require("tracking/build/data/face");

var canvas;
var context;
var video;

var hdConstraints = {
    video: {
        mandatory: {
            minWidth: 1280,
            minHeight: 720
        }
    }
};

navigator.getUserMedia(hdConstraints, () => {
    console.log("Successfuly set user media res");
}, () => {
    console.error("uhoh, something bad happend when settin user media");
});

var init = function() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            context.strokeStyle = '#a64ceb';
            var canvasPos = $(canvas).position();
            canvasPos.top;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            _onFaceDetected();
        });
    });

    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;
    
    var cameraDiv = document.querySelector(".cameraDiv");
    canvas.setAttribute("height", cameraDiv.offsetHeight);
    canvas.setAttribute("width", cameraDiv.offsetWidth);

    invisibleCanvas.setAttribute("height", 720);
    invisibleCanvas.setAttribute("width", 1280);
}

var timeInterval = 1000;

var _onFaceDetected = () => {
    faceTrackedSinceOutTimer = true;
    if (!haveFaceInCamera) {
        if (typeof callback === "function") {
            startOutTimer();
            onFaceIn();
        }
        haveFaceInCamera = true;
    }
}

var haveFaceInCamera = false;
var faceTrackedSinceOutTimer = false;
var startOutTimer = () => {
    faceTrackedSinceOutTimer = false;
    setTimeout(() => {
        if (!faceTrackedSinceOutTimer) {
            haveFaceInCamera = false;
            onFaceOut();
        } else {
            startOutTimer();
        }
    }, timeInterval);
}

var invisibleCanvas = document.createElement('canvas');

var onFaceOut = () => {};
var onFaceIn = () => {
    
    document.body.appendChild(invisibleCanvas);
    invisibleCanvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
    invisibleCanvas.toBlob(callback);
};

var callback = (blob)=>{
    // debugger;
    // var a =blob;
};

var startWatch = (watchCallback) => {
    callback = watchCallback;
}

export {
    init,
    startWatch
}