import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image, Divider } from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview';
import EditInterview from './editInterview';
import CancelInterview from './cancelInterview'
import _ from 'lodash';



function Interview(props) {
    console.log(props)
    return (
            <Card centered>
            <Card.Content textAlign='left'>
                <Image floated='right' size='mini' src={props.image} />
                <Card.Header>{props.participant}</Card.Header>
                <Card.Meta>{props.details}</Card.Meta>
                <Card.Description>
                Scheduled on <strong> {props.date} : {props.time} </strong>
                </Card.Description>
                <Divider />
                <Card.Content extra>
                    <div className='ui three buttons'>
                    <Button as={Link} to="/interview" basic color='green'>
                        Join
                    </Button>
                    <EditInterview participants={props.participant} date={props.date} time={props.time} details={props.details}/>
                    
                    <CancelInterview participants={props.participant} date={props.date} time={props.time} details={props.details}/>
                    </div>
                </Card.Content>
            </Card.Content>
            </Card>
    )
}

class InterviewList extends Component {
    constructor(props) {
        super(props);
        this.consumeInterview = new ConsumeInterview();
        this.state = {
            interviews: []
        }
        this.updateList = this.updateList.bind(this);
        this.populateList = this.populateList.bind(this);
    }

    updateList() {
        this.consumeInterview.getAllInterviews().then((interviews) => {
            this.setState({interviews: interviews.data});
        });
    }

    componentDidMount() {
        this.updateList()
    }

    populateList() {
        if (this.state.interviews.length === 0) {
            return (
            <List.Item>
            <List.Content>
                <List.Header>No interviews to show!</List.Header>
            </List.Content>
            </List.Item>)
        }
        
        const faces = ['https://react.semantic-ui.com/images/avatar/large/steve.jpg', 'https://react.semantic-ui.com/images/avatar/large/molly.png',
            'https://react.semantic-ui.com/images/avatar/large/jenny.jpg'];

        return this.state.interviews.map((interview) => {
            return  (  
                <Interview participant={interview.participants.join()} 
                                details={interview.details}
                                date={interview.occursOnDate} 
                                time={interview.occursAtTime}
                                image={faces[Math.floor(Math.random() * 2) + 1]} 
                                icon='calendar alternate outline' />
            )
        })
    }

    render() {
        return (
            <div>
                <Grid.Row>
                    <Card.Group>
                        {this.populateList()}
                    </Card.Group>
                </Grid.Row>
            </div>
        )
    }
}

export default InterviewList;