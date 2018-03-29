import React, { Component } from 'react';
import {Button} from '@blueprintjs/core'
import './Homepage.css';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div className="center-content">
                    <h1 id="logo">Game Room Recruiting</h1>
                    <div className="pt-button-group pt-vertical">
                        <Link to="/"><button id="vert-group-button fullwidth">Dashboard</button></Link>
                        <Link to="/rooms"><button id="vert-group-button fullwidth">Rooms</button></Link>
                        <Link to="/vrcall"><button id="vert-group-button fullwidth">Video</button></Link>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Homepage;