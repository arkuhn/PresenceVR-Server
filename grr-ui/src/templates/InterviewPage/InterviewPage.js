import React, { Component } from 'react';
import './InterviewPage.css';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import Environments from "./environments"
import Assets from "./assets"
import Participants from "./participants"
import { Grid, Header, Divider, List, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import {API_URL} from "../api.config";


function getInterview(id) {
    return axios.get(API_URL + `/api/interview/${id}`).then((response) => {
        console.log('got a result');
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

class InterviewPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {interview: {
            participants: ['test']
        }}

        this.updateList = this.updateList.bind(this);
        //this.state.participants = props.participants;
        //this.state.date = props.date;
        //this.state.description = props.description;
    }

    updateList() {
        getInterview(this.id).then((data) => {
            console.log('got data');
            console.log(data.data);
            this.setState({interview: data.data});
        });
        console.log(this.state.interview);
        console.log("test");
    }

    componentDidMount() {
        this.updateList()
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

    configuration() {
        return (
                <div>
                <Header as='h3'>
                    <Icon name='settings' />
                    Configuration
                </Header>
                <Button.Group>
                <Button>Edit Interview</Button>
                <Button.Or />
                <Button negative>Exit Interview</Button>
            </Button.Group>
            </div>
        );
    }

    render() {
        return (
            <div className="InterviewPage">
                <PresenceVRNavBar/>
                <br/>
                <Grid centered divided>

                    {/* Header */}
                    <Grid.Row>
                        <Grid.Column  width={4}>
                        <Header as='h1' textAlign='center'>
                            <Header.Content>
                            Interview Name
                            <Header.Subheader>These are the interview details.</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Grid.Column>
                    </Grid.Row>
                    

                    {/* Left column*/}
                    <Grid.Column width={4}>
                        {/*Participants*/}
                        <Grid.Row>
                            <Participants participants={this.state.interview.participants}/>
                        </Grid.Row>

                        <Divider />
                        <Grid.Row>
                            {this.configuration()}
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