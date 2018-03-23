import React, {Component} from 'react';
import {Menu, MenuItem, MenuDivider, Button, Card, Elevation} from '@blueprintjs/core';
import GRRNavBar from "../GRRNavBar/GRRNavBar";
import './RoomList.css';

class RoomList extends Component {

    constructor() {
        super();
        this.refreshAndShowRoomList = this.refreshAndShowRoomList.bind(this);
        this.getRoomListFromEasyRTCServer = this.getRoomListFromEasyRTCServer.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.state = {rooms: []};
    }

    getRoomListFromEasyRTCServer() {
        easyrtc.getRoomList(this.refreshAndShowRoomList, function (errorCode, errorText) {})
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
        console.log(data);

        var self = this;
        self.setState({rooms: []});

        Object.keys(data).forEach(function (key) {

            console.log(self.state);

            self.setState({
                rooms: self.state.rooms.concat(data[key])
            });
        });

        this.getAndDisplayCurrentTimeString();
    }

    componentDidMount() {
        easyrtc.connect('GameRoomRecruiting', function (id, owner) {}, function (errorCode, errorText) {});
        this.getRoomListFromEasyRTCServer();
        this.getAndDisplayCurrentTimeString();
    }

    createRoom() {
        easyrtc.joinRoom("Test", null, function (roomName) {
            console.log("Joined " + roomName);

        }, function (errorCode, errorText) {
            console.log("Error Code = " + errorCode);
            console.log("Error Text = " + errorText);
        })
    }

    joinRoom (roomName) {
        console.log("Trying to join room: " + roomName);
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
                                <Button className="pt-intent-primary vertical-button" text="Create New Room"/>
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
                                                <Button className="pt-intent-primary full-width" text="Join"/>
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