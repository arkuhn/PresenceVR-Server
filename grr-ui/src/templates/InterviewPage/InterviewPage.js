import React, { Component } from 'react';
import './InterviewPage.css';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import Environments from "./environments"
import Assets from "./assets"
import Participants from "./participants"
import ChatPane from "./chat"
import { Grid, Header, Divider, List, Icon, Button } from 'semantic-ui-react';

class InterviewPage extends Component {

    participants() {
        return (
            <Header as='h3'>Participants</Header>
        );
    }

    chat () {
        return (
            <Header as='h3'>Chat</Header>
        );
    }

    aframe() {
        return (
            <Header as='h3'>Aframe</Header>
        );
    }

    render() {
        return (
            <div className="InterviewPage">
                <PresenceVRNavBar/>
                <br/>
                <Grid centered divided>

                    {/* Left column*/}
                    <Grid.Column width={4}>
                        {/*Participants*/}
                        <Grid.Row>
                            <Participants />
                        </Grid.Row>
                    </Grid.Column>


                    {/* Center Column*/}
                    <Grid.Column width={8}>
                        {/* Browser mode */}
                        <Grid.Row>
                            {this.aframe()}
                        </Grid.Row>
                        
                        <Divider/>
                        {/* Chat */}
                        <Grid.Row>
                            <ChatPane />
                        </Grid.Row>
                    </Grid.Column>


                    {/* Right column*/}
                    <Grid.Column width={4}>
                        {/* Environments */}
                        <Grid.Row>
                            <Environments />
                        </Grid.Row>
                        <Divider/>
                        {/* Assets */}
                        <Grid.Row>
                            <Assets />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default InterviewPage;