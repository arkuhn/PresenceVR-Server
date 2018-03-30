import React, { Component } from 'react';
import {Button} from '@blueprintjs/core'
import './Homepage.css';
import { Link } from 'react-router-dom';
import GRRNavBar from "../GRRNavBar/GRRNavBar";

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <GRRNavBar/>
                <div className="center-content">
                    <h1 id="logo">Game Room Recruiting</h1>
                    <div className="pt-button-group pt-vertical">
                        <Link to="/"><Button className="pt-intent-primary vert-group-button">Dashboard</Button></Link>
                        <Link to="/rooms"><Button className="pt-intent-primary vert-group-button">Rooms</Button></Link>
                        <Link to="/rooms/default"><Button className="pt-intent-primary vert-group-button">Video</Button></Link>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Homepage;