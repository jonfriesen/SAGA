var canvas;
var context;
var video;
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
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            _onFaceDetected();
        });
    });
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

var pictureCanvas = document.createElement('canvas');

var onFaceOut = () => {};
var onFaceIn = () => {
    // canvas.toBlob takes a callback function and will trigger it with the parameter of the actual blob
    // canvas.toBlob(callback);
    // debugger;
    document.body.appendChild(pictureCanvas);
    pictureCanvas.getContext('2d').drawImage(video, 0,0,100,100);
};

var callback = (blob)=>{
    debugger;
    var a =blob;
};

var startWatch = (watchCallback) => {
    callback = watchCallback;
}

// window.onload = function() {
//     _init();
// };

export {
    init,
    startWatch
}