import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Button, Dialog} from '@blueprintjs/core';
import GRRNavBar from '../GRRNavBar/GRRNavBar';
import Keyer from '../Keyer/Keyer';
import BackgroundImageList from '../BackgroundImageList/BackgroundImageList';
//import stock360 from '../stock360.png';
import './AssetMgmt.css';
import axios from 'axios';
import {API_URL} from "../api.config";
import VRScene from "../VRScene/VRScene";

class AssetMgmt extends Component {

    constructor(props){
        super(props);
        this.toggleVRMode = this.toggleVRMode.bind(this);
        this.selectBackground = this.selectBackground.bind(this);
        this.selectAsset = this.selectAsset.bind(this);
        this.refreshSettings = this.refreshSettings.bind(this);
        this.performCall = this.performCall.bind(this);
        this.toggleCallerDialog = this.toggleCallerDialog.bind(this);
        this.myRef = React.createRef();
        this.state = {callerId: "", vrMode: false, video:null, width: null, height: null, canvas: null, roomName:'', currentBackground: 'stock360.png', backgroundImages: [], assetImages: [], dialogOpen: false};

    }

    toggleVRMode(){
        let video = document.getElementById("self");
        easyrtc.clearMediaStream(video);
        easyrtc.setVideoObjectSrc(video, easyrtc.getLocalStream());

        if(this.state.callerId){
            this.performCall(this.state.callerId);
            let caller_video = document.getElementById("caller");
            
            easyrtc.setVideoObjectSrc(caller_video, easyrtc.getRemoteStream(this.state.callerId));
            // console.log(easyrtc.getRemoteStream(this.state.callerId));
        }

        var self = this;
        axios.patch(API_URL+'/api/rooms/'+this.props.match.params.roomID, {
            vrMode: !self.state.vrMode
        }).then((result) =>{
            self.setState({vrMode: !self.state.vrMode});
        });

    }

    selectBackground (backgroundTitle) {

        var self = this;
        axios.patch(API_URL+'/api/rooms/'+this.props.match.params.roomID, {
            currentBackground: backgroundTitle
        }).then((result) =>{
            this.refreshSettings();
        });

    }

    isConnected() {
        return !!easyrtc.applicationName;
    }
      selectAsset (assetTitle) {

        var self = this;
        axios.patch(API_URL+'/api/rooms/'+this.props.match.params.roomID, {
            currentAsset: assetTitle
        }).then((result) =>{
            this.refreshSettings();
        });

    }

    componentDidMount(){
        this.myinit();
        this.refreshSettings();
        // window.addEventListener("beforeunload", this.onUnload);
    }

    onUnload(event) {
        alert("Wanna try and leave the room: " + this.props.match.package.roomID);
    }

    // TODO: Will work for navigating within GRR
    componentWillUnmount() {

        var self = this;
        let video = document.getElementById("self");
        easyrtc.clearMediaStream(video);

        easyrtc.leaveRoom(self.state.roomName, function (roomName) {
            console.log("Left room: " + self.state.roomName);
        }, function (errorCode, errorText, roomName) {
            
        });

    }

    refreshSettings(){
        var self = this;
        axios.get(API_URL+'/api/rooms/'+this.props.match.params.roomID).then((result) =>{
            self.setState({roomName: result.data.name ,vrMode: result.data.vrMode, currentBackground: result.data.currentBackground,
                currentAsset: result.data.currentAsset ,backgroundImages: result.data.backgroundImages, assetImages: result.data.assetImages});
        });
    }

    myinit(){

        var self = this;

        // If not connected when hitting this page, try to connect to EasyRTC server
        if(!this.isConnected()) {
            easyrtc.connect('GameRoomRecruiting', function (id, owner) {
                console.log("Connected to EasyRTC server");
            }, function (errorCode, errorText) {
                console.log("Not connected to EasyRTC server");
            });
        }

        // If not in the room when hitting this page, try to join the EasyRTC room with the corresponding name
        if(Object.keys(easyrtc.getRoomsJoined).length === 0) {
            var joinClause = {"joinOnCompletion": true};
            easyrtc.joinRoom(this.props.match.params.roomID, joinClause, function (roomName) {
                console.log("Joined " + roomName);
            }, function (errorCode, errorText) {

            });
        }

        easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
            self.setState({callerId:callerEasyrtcid});
            var video = document.getElementById('caller');
            easyrtc.setVideoObjectSrc(video, stream);
        });

        easyrtc.setOnStreamClosed( function (callerEasyrtcid) {
            easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
        });

        let video = document.getElementById("self");
        let width = video.width;
        let height = video.height;
        this.setState({video: document.getElementById("self")});
        this.setState({width: document.getElementById("self").width});
        this.setState({height: document.getElementById("self").height});

        // The target canvas.
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");

        easyrtc.setRoomOccupantListener(this.loggedInListener.bind(this));
        var connectSuccess = function(myId) {
            //console.log("My easyrtcid is " + myId);
        };
        var connectFailure = function(errorCode, errText) {
            console.log(errText);
        };
        // let self = this;
        easyrtc.initMediaSource(
            function(){        // success callback
                //var selfVideo = document.getElementById("self");
                easyrtc.setVideoObjectSrc(video, easyrtc.getLocalStream());
                window.requestAnimationFrame(self.draw.bind(self));
            }, connectFailure);
    }

    toggleCallerDialog() {
        var value = this.state.dialogOpen;
        this.setState({dialogOpen: !value});
    }

    // loggedInListener(roomName, otherPeers) {
    //         var otherClientDiv = document.getElementById('otherClients');
    //         while (otherClientDiv.hasChildNodes()) {
    //             otherClientDiv.removeChild(otherClientDiv.lastChild);
    //         }
    //         for(var i in otherPeers) {
    //             var button = document.createElement('button');
    //             button.onclick = function(easyrtcid) {
    //                 return function() {
    //                     performCall(easyrtcid);
    //                 }
    //             }(i);
    //
    //             label = document.createTextNode(i);
    //             button.appendChild(label);
    //             otherClientDiv.appendChild(button);
    //         }
    // }

    // TODO: need to fix scope (trying to call toggleCallerDialog but it shows up as undefined)
    // TODO: think there's an issue with scoping since method call is from a listener
    // TODO:    so keyword 'this' doesn't refer to REACR
    loggedInListener(roomName, otherPeers) {
        for(var i in otherPeers){
            this.setState({callerId: i});
            if(Object.keys(otherPeers).length === 1  ) {
                this.toggleCallerDialog();
            }
        }
    }

    performCall(easyrtcid) {
        this.setState({dialogOpen : false});
        easyrtc.call(
            easyrtcid,
            function(easyrtcid) { console.log("completed call to " + easyrtcid);},
            function(errorCode, errorText) { console.log("err:" + errorText);},
            function(accepted, bywho) {
                console.log((accepted?"accepted":"rejected")+ " by " + bywho);
            });
    }



    startStream(stream) {
        video.src = URL.createObjectURL(stream);
        video.play();

        // Ready! Let's start drawing.
        requestAnimationFrame(draw);
    }

    draw() {
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");
        var frame = this.readFrame();

        if (frame) {
            this.replaceGreen(frame.data);
            context.putImageData(frame, 0, 0);
        }

        // Wait for the next frame.
        window.requestAnimationFrame(this.draw.bind(this));
    }

    readFrame() {
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");
        try {
            context.drawImage(this.state.video, 0, 0, this.state.width, this.state.height);
        } catch (e) {
            // The video may not be ready, yet.
            return null;
        }
        return context.getImageData(0, 0, this.state.width, this.state.height);
    }

    replaceGreen(data) {
        var len = data.length;

        for (var i = 0, j = 0; j < len; i++, j += 4) {
            // Convert from RGB to HSL...
            var hsl = this.rgb2hsl(data[j], data[j + 1], data[j + 2]);
            var h = hsl[0], s = hsl[1], l = hsl[2];

            // ... and check if we have a somewhat green pixel.
            if (h >= 90 && h <= 160 && s >= 25 && s <= 90 && l >= 20 && l <= 75) {
                data[j + 3] = 0;
            }
        }
    }

    rgb2hsl(r, g, b) {
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




    render() {

        const isVrMode = this.state.vrMode;

        let vidBackground = null;
        if (isVrMode) {
            vidBackground = <div id="background-preview">
                <VRScene {...this.state}></VRScene>
            </div>;
        } else {
            vidBackground = <div id="background-preview">

                        <canvas id="c" ref="c" width="320" height="240" style={{visibility: "hidden"}}></canvas>
                        <canvas id="c2" ref="c2" width="320" height="240"></canvas>
                        <video  id="self" ref="self" width="300" height="200" muted="muted" style={{visibility: "hidden"}} autoPlay></video>
                        <video  id="caller" ref="caller" width="300" height="200"></video>
                        </div>
        }

        return (
            <div>
                <Dialog isOpen={this.state.dialogOpen} onClose={this.toggleCallerDialog} title={"Accept?"} iconName={"phone"}>
                    <div className="pt-dialog-body">
                        Do you want to accept this call?
                        EasyRTC ID:<p id="callerID">{this.state.callerId}</p>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className="pt-intent-success" onClick={(e) => this.performCall(this.state.callerId)}>Accept</Button>
                        </div>
                    </div>
                </Dialog>
                <GRRNavBar/>
                <div className="flex-container">
                <div className="list-container">
                    <BackgroundImageList {...this.state} onToggleVRMode={this.toggleVRMode} onSelectedBackground={this.selectBackground} onSelectedAsset={this.selectAsset} onRefreshSettings={this.refreshSettings}></BackgroundImageList>
                </div>
                    <div className="preview-container" >
                        {vidBackground}
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetMgmt;