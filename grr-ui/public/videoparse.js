

(function (doc, nav) {
    "use strict";

    var video, width, height, context;

    easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
        var video = document.getElementById('caller');
        easyrtc.setVideoObjectSrc(video, stream);
    });

    easyrtc.setOnStreamClosed( function (callerEasyrtcid) {
        easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
    });


    function my_init() {
        let selfVideoEl = doc.getElementById("self");
        let widthSelf = selfVideoEl.width;
        let heightSelf = selfVideoEl.height;

        let callerVideoEl = doc.getElementById("caller");
        let widthCaller = callerVideoEl.width;
        let heightCaller = callerVideoEl.height;

        // The target canvas.
        let canvasSelf = doc.getElementById("c");
        let contextSelf = canvasSelf.getContext("2d");

        let canvasCaller = doc.getElementById("c2");
        let contextCaller = canvasCaller.getContext("2d");

        easyrtc.setRoomOccupantListener( loggedInListener);
        var connectSuccess = function(myId) {
            //console.log("My easyrtcid is " + myId);
        }
        var connectFailure = function(errorCode, errText) {
            console.log(errText);
        }

        easyrtc.initMediaSource(
            function(){        // success callback
                //var selfVideo = document.getElementById("self");
                
                let localStream = easyrtc.setVideoObjectSrc(selfVideoEl, easyrtc.getLocalStream());
                easyrtc.enableMicrophone(false, localStream);
                easyrtc.connect("Company_Chat_Line", connectSuccess, connectFailure);
                requestAnimationFrame(() => {
                    draw(selfVideoEl, contextSelf, callerVideoEl, contextCaller, widthSelf, heightSelf, widthCaller, heightCaller);
                });
                
            }, connectFailure);
    }


    function loggedInListener(roomName, otherPeers) {
        var otherClientDiv = document.getElementById('otherClients');
        while (otherClientDiv.hasChildNodes()) {
            otherClientDiv.removeChild(otherClientDiv.lastChild);
        }
        for(var i in otherPeers) {
            var button = document.createElement('button');
            button.onclick = function(easyrtcid) {
                return function() {
                    performCall(easyrtcid);
                }
            }(i);

            var label = document.createTextNode(i);
            button.appendChild(label);
            otherClientDiv.appendChild(button);
        }
    }


    function performCall(easyrtcid) {
        easyrtc.call(
            easyrtcid,
            function(easyrtcid) { console.log("completed call to " + easyrtcid);},
            function(errorCode, errorText) { console.log("err:" + errorText);},
            function(accepted, bywho) {
                console.log((accepted?"accepted":"rejected")+ " by " + bywho);
            });
    }



    function startStream(stream) {
        video.src = URL.createObjectURL(stream);
        video.play();

        // Ready! Let's start drawing.
        requestAnimationFrame(draw);
    }

    function draw(selfVideoEl, contextSelf, callerVideoEl, contextCaller, widthSelf, heightSelf, widthCaller, heightCaller) {
        //console.log("draw");
        
        var frameSelf = readFrame(selfVideoEl, contextSelf, widthSelf, heightSelf);
        var frameCaller = readFrame(callerVideoEl, contextCaller, widthCaller, heightCaller);

        if (frameSelf) {
            replaceGreen(frameSelf.data);
            contextSelf.putImageData(frameSelf, 0, 0);
        }

        if (frameCaller) {
            replaceGreen(frameCaller.data);
            contextCaller.putImageData(frameCaller, 0, 0);
        }

        // Wait for the next frame.
        requestAnimationFrame(() => {
            draw(selfVideoEl, contextSelf, callerVideoEl, contextCaller, widthSelf, heightSelf, widthCaller, heightCaller);
        });
    }

    function readFrame(videoEl, context, width, height) {
        try {
            context.drawImage(videoEl, 0, 0, width, height);
            console.log('drawn');
        } catch (e) {
            // The video may not be ready, yet.
            console.log(e);
            return null;
        }

        return context.getImageData(0, 0, width, height);
    }

    function replaceGreen(data) {
        var len = data.length;

        for (var i = 0, j = 0; j < len; i++, j += 4) {
            // Convert from RGB to HSL...
            var hsl = rgb2hsl(data[j], data[j + 1], data[j + 2]);
            var h = hsl[0], s = hsl[1], l = hsl[2];

            // ... and check if we have a somewhat green pixel.
            if (h >= 90 && h <= 160 && s >= 25 && s <= 90 && l >= 20 && l <= 75) {
                data[j + 3] = 0;
            }
        }
    }

    function rgb2hsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var h, s, l;

        if (max == min) {
            h = 0;
        } else if (r == max) {
            h = (g - b) / delta;
        } else if (g == max) {
            h = 2 + (b - r) / delta;
        } else if (b == max) {
            h = 4 + (r - g) / delta;
        }

        h = Math.min(h * 60, 360);

        if (h < 0) {
            h += 360;
        }

        l = (min + max) / 2;

        if (max == min) {
            s = 0;
        } else if (l <= 0.5) {
            s = delta / (max + min);
        } else {
            s = delta / (2 - max - min);
        }

        return [h, s * 100, l * 100];
    }

    addEventListener("DOMContentLoaded", my_init);
})(document, navigator);
