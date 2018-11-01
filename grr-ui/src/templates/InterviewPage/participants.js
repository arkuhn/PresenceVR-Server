import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Grid, Header, Divider, List, Icon, Button } from 'semantic-ui-react';

function Participant(props) {
    return (
    <List.Item as='a'>
        <Icon name='user circle' />
        <List.Content>
            <List.Header>{props.name}</List.Header>
            <List.Description>
            Status: {props.status}
            </List.Description>
        </List.Content>
    </List.Item>
    )
}


class Participants extends Component {
    constructor(props) {
        super(props);
        this.state = {participants: props.participants};
        console.log("State of participants: " + this.state.participants)
    }

    generateParticipants() {
        const statuses = ["Online", "Offline"]
        return <Participant name={this.state.participants} status={statuses[Math.floor(Math.random() * 2)]}/>
    }

    componentWillReceiveProps(props) {
        this.setState({participants: props.participants});
    }

    render() {
        const css = ` 
        .ParticipantsList {
            height: 700px;
            overflow:scroll;
            max-width: 100%;
            overflow-x: hidden;
        }
        `
        return (
            <div className="ParticipantsBox">
            <Header as='h3'>
                <Icon name='users' />
                Participants
            </Header>
            <List className="ParticipantsList">
                {this.generateParticipants()}
            </List>
            <style>{css}</style>
            </div>
        );
    }
}

export default Participants;