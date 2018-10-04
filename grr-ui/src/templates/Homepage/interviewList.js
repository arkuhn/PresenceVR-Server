import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Image} from 'semantic-ui-react';

function Interview(props) {
    return (
        <Modal trigger={ 
            <Card as='a'>
            <Card.Content>
                <Image floated='right' size='mini' src={props.image} />
                <Card.Header>{props.participant}</Card.Header>
                <Card.Meta>Art student</Card.Meta>
                <Card.Description>
                Scheduled on <strong> {props.date} </strong>
                </Card.Description>
            </Card.Content>
            </Card>

         }>
        <Header icon='alternate calendar outline' content='Interview Details' />
        <Modal.Content>
                    <List>
                        <List.Item>
                            <List.Content>
                                <List.Header>Interview with {props.participant} </List.Header>
                                <List.Description>
                                    Scheduled for {props.date}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                    <Button as={Link} to="/interview">Join</Button>
                    <Button >Edit</Button>
                    <Button>Cancel</Button>
                </Modal.Content>
    </Modal>
    )
}

class InterviewList extends Component {
    constructor(props) {
        super(props)
  
        this.interviews = []
        this.generateInterviews = this.generateInterviews.bind(this)
    }

    generateInterviews() {
        const numOfInterviews = Math.floor(Math.random() * 8) + 1
        const faces = ['https://react.semantic-ui.com/images/avatar/large/steve.jpg', 'https://react.semantic-ui.com/images/avatar/large/molly.png',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg']

    for (let i = 0; i < numOfInterviews; i++) { 
            const interview = ({
                participant: `jaw${i * 1000}@rit.edu`,
                date: `8/${i}/18`,
                person: Math.floor(Math.random() * 3)
            })
            this.interviews.push(interview)
        }
        return this.interviews.map((interview) => {
            return <Interview participant={interview.participant} date={interview.date} image={faces[interview.person]} icon='calendar alternate outline'/>
        })
    }

    render() {
        return (
            <div>
                <Header as='h3' textAlign='center'>Upcoming Interviews</Header>
                {this.generateInterviews()}  
            </div>
            
        )
    }
}

export default InterviewList;