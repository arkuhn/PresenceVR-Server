import React, { Component } from 'react';
import {Button, Card} from '@blueprintjs/core'
import './Homepage.css';
import { Link } from 'react-router-dom';
import GRRNavBar from "../GRRNavBar/GRRNavBar";

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <GRRNavBar/>
                <h1 className="centered" id="header-text">Game Room Recruiting</h1>
                    <div className="flex-container">

                        <div className="options-container">
                            <div className="pt-vertical full-width">
                                <h2 className="centered full-width">Feature Guide</h2>
                                <ul class="font-size-adjust">
                                    <li>You can create or join a room from the Rooms List page.</li>
                                    <li>Click the example video call to view a default room.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="options-container">
                            <div className="rooms-container" data-reference="pt-card">
                            <div className="rooms-container-wrapper">
                                <div className="card-wrapper" >
                                    <Card interactive={true} elevation={Card.ELEVATION_TWO}>
                                        <h4 className="centered"><a href="#">Rooms</a></h4>
                                            <Link to="/rooms"><Button className="pt-intent-primary vert-group-button full-width">View Room List</Button></Link>
                                    </Card>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="options-container">
                            <div className="rooms-container" data-reference="pt-card">
                            <div className="rooms-container-wrapper">
                                <div className="card-wrapper" >
                                    <Card interactive={true} elevation={Card.ELEVATION_TWO}>
                                        <h4 className="centered"><a href="#">Example Video Call</a></h4>
                                            <Link to="/rooms/default"><Button className="pt-intent-primary vert-group-button full-width">View</Button></Link>
                                    </Card>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                
            </div>
        );
    }
}

export default Homepage;