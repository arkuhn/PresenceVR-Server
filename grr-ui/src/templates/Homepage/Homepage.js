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
                <h3 className="centered" id="header-text">The future of remote interviewing</h3>
                    <div className="homepage-container">

                        <div className="options-container">
                            <div className="pt-vertical full-width options-container fixed-size vert-align">
                                <p className="text-settings">
                                    We've created a system that aims to provide an immersive experience that
                                    emulates physical interviews. It will allow interviewers and interviewees to
                                    stream themselves to each other in a customizeable virtual reality space, and 
                                    display uploadable assets such as past work or accomplishments. 
                                </p>
                            </div>
                        </div>

                        <div className="options-container grey-bg">
                            <div className="fixed-size block-center vert-align">
                                <h2 className="centered">Rooms</h2>
                                <p className="text-settings">
                                    From here, you can create a new room starting with our provided template, <br />
                                    or join an existing room that you've been invited to.
                                </p>
                                <Link to="/rooms"><Button className="pt-intent-primary vert-group-button full-width">View Room List</Button></Link>
                            </div>
                            
                        </div>

                        <div className="options-container">
                            <div className="fixed-size block-center vert-align">
                                <h2 className="centered">The Team</h2>
                                <p className="text-settings">
                                    Team DAAD: Dominic Cicilio, Arshdeep Khalsa, Allen Liu, Daniel Roach <br />
                                    Sponsor: Jim Bondi <br />
                                    Faculty Coach: Yasmine El-glaly
                                </p>     
                            </div>
                        </div>
                        
                    </div>
                
            </div>
        );
    }
}

export default Homepage;