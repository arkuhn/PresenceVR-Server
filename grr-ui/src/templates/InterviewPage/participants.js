import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Grid, Header, Divider, List, Icon, Button } from 'semantic-ui-react';

function Participant(user) {
    return (
    <List.Item as='a'>
        <Icon name='user circle' />
        <List.Content>
            <List.Header>{user.name}</List.Header>
            <List.Description>
            Status: {user.status}
            </List.Description>
        </List.Content>
    </List.Item>
    )
}


class Participants extends Component {

    generateParticipants() {
        const numOfParts = Math.floor(Math.random() * 15) + 1
        const parts = []
        const firstNames = ["Alice", "Bob", "Claire", "Dean", "Ella", "Frank", "Gwen", "Henry", "Isla", "Justin", "Kathryn", "Landon", "Mary", 
        					"Nicholas", "Oprah", "Peter", "Quinlan", "Robert", "Sarah", "Trevor", "Ursula", "Victor", "Wanda", "Xander", "Yasmine", "Zachary"]
        const lastNames =  ["Adams", "Baker", "Cook", "Drake", "Edwards", "Furciniti", "G", "Howard", "Ignatovic", "Judson", "Kemp", "Litner", "Milliman",
        					"Nichols", "Ognibene", "Parker", "Querry", "Richardson", "Smith", "Taylor", "Uebing", "Vogal", "Williamson", "Xi", "Yager", "Zuckerberg"]
        const statuses = ["Online", "Offline"]
        var offline = 0
        for (let i = 0; i < numOfParts; i++) { 
        	let firstName = firstNames[Math.floor(Math.random() * 26)]
        	let lastName = lastNames[Math.floor(Math.random() * 26)]
        	let status = statuses[Math.floor(Math.random() * 2)]
        	if (status == "Offline") {
        		offline = 1
        	}
        	if (offline != 0) {
        		status = "Offline"
        	}
            const part = ({
                name: firstName + " " + lastName,
                status: status
            })
            parts.push(part)
        }
        return parts.map((part) => {
            return <Participant name={part.name} status={part.status}/>
        })

    }

    render() {
        const css = ` 
        .ParticipantsList {
            height: 80%;
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