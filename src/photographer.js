var canvas;

var _init = function() {
    var video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
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
            _onFaceIn();
        });
    });
}

var timeInterval = 10000;

var _onFaceIn = () => {
    if (!haveFaceInCamera) {
        debugger;
        if (typeof callback === "function") {
            debugger;
            setTimeout(() => {
                _onFaceOut();
            }, timeInterval);
            canvas.toBlob(callback);
        }
    }

    haveFaceInCamera = true;
}

var haveFaceInCamera = false;

var _onFaceOut = () => {
    haveFaceInCamera = false;
};

var callback;

var startWatch = (watchCallback) => {
    callback = watchCallback;
}

window.onload = function() {
    _init();
};