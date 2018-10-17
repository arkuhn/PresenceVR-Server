import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image } from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview';
import CreateInterview from './createInterview';
import _ from 'lodash';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.interviewList = new InterviewList();
        this.consumeInterview = new ConsumeInterview();
        this.state = {
            dateValue: props.date,
            timeValue: '',
            participantsValue: '',
            subjectValue: ''
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDateChange(event) {
        this.setState({ dateValue: event.target.value })
    }

    handleTimeChange(event) {
        this.setState({ timeValue: event.target.value })
    }

    handleParticipantsChange(event) {
        this.setState({ participantsValue: event.target.value })
    }

    handleSubjectChange(event) {
        this.setState({ subjectValue: event.target.value })
    }

    handleSubmit(event) {
        this.consumeInterview.updateInterview(0)
        event.preventDefault();
    }

    handleDelete(event) {
        this.consumeInterview.cancelInterview(0);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <List>
                    <List.Item>
                        <Input fluid label='Date' placeholder={this.props.date} onChange={this.handleDateChange} />
                    </List.Item>
                    <List.Item>
                        <Input fluid label='Time' placeholder='HH:MM:SS' onChange={this.handleTimeChange} />
                    </List.Item>
                    <List.Item>
                        <Input fluid label='Participants' placeholder={'No one, I guess'} onChange={this.handleParticipantsChange} />
                    </List.Item>
                    <List.Item>
                        <Input fluid label='Subject' placeholder='Art interview' onChange={this.handleSubjectChange} />
                    </List.Item>
                </List>
                <Button primary type='submit' onClick={this.handleSubmit}>Edit</Button>
                <Button secondary onClick={this.handleDelete}>Cancel Interview</Button>
            </form>
        );
    }
}

function EditForm(props) {
    return (
        <Modal trigger={<Button >Edit</Button>
        } size='mini' closeIcon>
            <Modal.Content>
                <NameForm participants={props.participants} date={props.date} />
            </Modal.Content>
        </Modal>
    )
}

function Interview(props) {
    console.log(props)
    return (
        <Modal trigger={
            <Card fluid as='a'>
            <Card.Content>
                <Image floated='right' size='mini' src={props.image} />
                <Card.Header>{props.participant}</Card.Header>
                <Card.Meta>{props.details}</Card.Meta>
                <Card.Description>
                Scheduled on <strong> {props.date} : {props.time} </strong>
                </Card.Description>
            </Card.Content>
            </Card>

        } closeIcon >
            <Header icon='alternate calendar outline' content='Interview Details' />
            <Modal.Content>
                <List>
                    <List.Item>
                        <List.Content>
                            <List.Header>Interview with {props.participant} </List.Header>
                            <List.Description>
                                Scheduled on <strong> {props.date} </strong> at <strong> {props.time} </strong>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                <Button as={Link} to="/interview">Join</Button>
                <EditForm participants={props.participants} date={props.date} />
                <Button>Close</Button>
            </Modal.Content>
        </Modal>
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
                <List.Item>
                <List.Content>
                <Interview participant={interview.participants.join()} 
                                details={interview.details}
                                date={interview.occursOnDate} 
                                time={interview.occursAtTime}
                                image={faces[Math.floor(Math.random() * 2) + 1]} 
                                icon='calendar alternate outline' />
                </List.Content>
                </List.Item> 
            )
        })
    }

    render() {
        return (
            <div>
                <Grid.Row>
                    <List horizontal>
                        {this.populateList()}
                    </List>
                </Grid.Row>
            </div>
        )
    }
}

export default InterviewList;