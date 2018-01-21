import React, { Component } from 'react';
import {Button} from '@blueprintjs/core'
import cslogo from '../static/img/rit_oces.png'
import ritlogo from '../static/img/rit_logo.jpg'
import './Homepage.css';

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div className="center-content">
                    <h1 id="logo">Game Room Recruiting</h1>
                    <div className="pt-button-group pt-vertical">
                        <Button className="pt-intent-warning vert-group-button" text="What is Game Room Recruiting?"/>
                        <Button className="pt-intent-success vert-group-button" text="Create an Account"/>
                        <Button className="pt-intent-primary vert-group-button" text="User Sign In"/>
                        <Button className="pt-intent-primary vert-group-button" text="Admin Sign In"/>
                    </div>
                </div>
                <img id="rit-logo" src={ritlogo} alt="rit logo" />
                <img id="oces-logo" src={cslogo} alt="career services logo"/>
            </div>
        );
    }
}

export default Homepage;