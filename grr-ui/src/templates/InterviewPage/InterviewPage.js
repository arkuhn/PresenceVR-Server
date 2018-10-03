import React, { Component } from 'react';
import './InterviewPage.css';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Grid, Header, Divider } from 'semantic-ui-react';

class InterviewPage extends Component {
    environments() {
        return (
            <Header as='h3'>Environments</Header>
        );
    }

    assets() {
        return (
            <Header as='h3'>Assets</Header>
        );
    }

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
                            {this.participants()}
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
                            {this.chat()}
                        </Grid.Row>
                    </Grid.Column>


                    {/* Right column*/}
                    <Grid.Column width={4}>
                        {/* Environments */}
                        <Grid.Row>
                            {this.environments()}
                        </Grid.Row>
                        <Divider/>
                        {/* Assets */}
                        <Grid.Row>
                            {this.assets()}
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default InterviewPage;