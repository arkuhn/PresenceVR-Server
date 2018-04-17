import React, {Component} from 'react';
import {Button, Card, Collapse} from '@blueprintjs/core';
import GRRNavBar from "../GRRNavBar/GRRNavBar";
import './RoomList.css';
import axios from 'axios';
import {API_URL} from "../api.config";
import { Link } from 'react-router-dom';


class RoomList extends Component {

    constructor() {
        super();
        this.refreshAndShowRoomList = this.refreshAndShowRoomList.bind(this);
        this.getRoomListFromEasyRTCServer = this.getRoomListFromEasyRTCServer.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.handleCreateNewRoomClick = this.handleCreateNewRoomClick.bind(this);
        this.isConnected = this.isConnected.bind(this);
        this.state = {rooms: [], clickToShowCreateRoomTextArea: true};
    }

    getRoomListFromEasyRTCServer() {
        console.log("Trying to get room list from EasyRTCServer");
        easyrtc.getRoomList(this.refreshAndShowRoomList,
            function (errorCode, errorText) {
            console.log("errorText: " + errorText);
            console.log("errorCode: " + errorCode);
            })
    }

    isConnected() {
        return !!easyrtc.applicationName;
    }

    getAndDisplayCurrentTimeString() {
        var options = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };

        // TODO: Should check for locale but that's a problem for future me
        document.getElementById("last-update-time").textContent = "Last updated: " + new Date().toLocaleDateString("en-US", options);
    }

    refreshAndShowRoomList(data) {
        console.log("Trying to set rooms state");
        var self = this;
        self.setState({rooms: []});

        Object.keys(data).forEach(function (key) {

            self.setState({
                rooms: self.state.rooms.concat(data[key])
            });
        });

        this.getAndDisplayCurrentTimeString();
    }

    componentDidMount() {

        if (!this.isConnected()) {
            easyrtc.connect('GameRoomRecruiting', function (id, owner) {
                console.log("Connected to EasyRTC server");
            }, function (errorCode, errorText) {
                console.log("Not connected to EasyRTC server");
            });
        }

        this.getRoomListFromEasyRTCServer();
        this.getRoomListFromEasyRTCServer();
        this.getAndDisplayCurrentTimeString();
    }

    createRoom() {
        this.handleCreateNewRoomClick();
        var input = document.getElementById("createRoomInput");
        var newRoomName = input.value;
        input.value = "";

        var joinClause = {"joinOnCompletion": false};
        var self = this;

        easyrtc.joinRoom(newRoomName, joinClause, function (roomName) {
            console.log("Created " + newRoomName);

            axios.post(API_URL + '/api/rooms/', {
                name: newRoomName,
                currentBackground: "city.jpg"
            }).then((result) => {
                self.getRoomListFromEasyRTCServer();
            });

        }, function (errorCode, errorText) {

        });
    }

    joinRoom (roomName) {
        var joinClause = {"joinOnCompletion": true};
        easyrtc.joinRoom(roomName, joinClause, function (roomName) {
            console.log("Joined " + roomName);
            //TODO: Should route to individual room page if less than 2 people are in room

        }, function (errorCode, errorText) {

        });
    }

    handleCreateNewRoomClick () {
        var self = this;
        self.setState({clickToShowCreateRoomTextArea: !this.state.clickToShowCreateRoomTextArea});
    }
    render() {
        return (
            <div>
                <GRRNavBar/>
                <div className="container-fluid">
                    <h1 className="centered" id="header-text">Room Management</h1>
                    <div className="flex-container">
                        <div className="options-container">
                            <div className="pt-vertical full-width">
                                <Button className="pt-intent-success vertical-button" text="Refresh Rooms List" onClick={(e) => this.getRoomListFromEasyRTCServer()}/>
                                <Button className="pt-intent-primary vertical-button" text={this.state.clickToShowCreateRoomTextArea ? "Create New Room (show)" : "Create New Room (hide)"}
                                    onClick={(e) => this.handleCreateNewRoomClick()}/>
                                <Collapse isOpen={!this.state.clickToShowCreateRoomTextArea}>
                                    <input className="pt-input vertical-button" id="createRoomInput" type="text" placeholder="Room Name" />
                                    <Button className="pt-intent-success full-width" id="createButton" text="Create" onClick={(e) => this.createRoom()}/>
                                </Collapse>
                                <p className="centered full-width" id="last-update-time"></p>
                            </div>
                        </div>
                        <div className="rooms-container" data-reference="pt-card">
                            <div className="rooms-container-wrapper">
                                {this.state.rooms.map(room => {
                                    return (
                                        <div className="card-wrapper" key={room.roomName}>
                                            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
                                                <h4 className="centered"><a href="#">{room.roomName}</a></h4>
                                                <p>People here: {room.numberClients}</p>
                                                <p>Privacy level: PRIVATE</p>
                                                {/*<p># of available backgrounds: 0</p>*/}
                                                <Link to={"/rooms/"+room.roomName}><Button className="pt-intent-primary full-width" text="Join" disabled={room.numberClients >= 2} onClick={(e) => this.joinRoom(room.roomName)}/></Link>
                                            </Card>
                                        </div>);
                                })}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default RoomList;