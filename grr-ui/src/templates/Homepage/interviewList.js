import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image} from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview'

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.consumeInterview = new ConsumeInterview()
      this.interviewList = new InterviewList()
      this.state = {dateValue: props.date,
                    timeValue: '',
                    participantsValue: '',
                    subjectValue: ''};
  
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
      this.handleSubjectChange = this.handleSubjectChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDateChange(event) {
        this.setState({dateValue: event.target.value})
    }

    handleTimeChange(event) {
        this.setState({timeValue: event.target.value})
    }

    handleParticipantsChange(event) {
        this.setState({participantsValue: event.target.value})
    }

    handleSubjectChange(event) {
        this.setState({subjectValue: event.target.value})
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
        <form>
            <List>
                <List.Item>
                    <Input fluid label='Date' placeholder={this.props.date} onChange={this.handleDateChange}/>
                </List.Item>
                <List.Item>
                    <Input fluid label='Time' placeholder='HH:MM:SS' onChange={this.handleTimeChange}/>
                </List.Item>
                <List.Item>
                    <Input fluid label='Participants' placeholder={'No one, I guess'} onChange={this.handleParticipantsChange}/>
                </List.Item>
                <List.Item>
                    <Input fluid label='Subject' placeholder='Art interview' onChange={this.handleSubjectChange}/>
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
        }  size='mini' closeIcon>
            <Modal.Content>
                <NameForm participants={props.participants} date={props.date} />
            </Modal.Content>
        </Modal>
    )
}

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

         } closeIcon >
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
                    <EditForm participants={props.participants} date={props.date} />
                    <Button>Close</Button>
                </Modal.Content>
    </Modal>
    )
}

class InterviewList extends Component {
    constructor(props) {
        super(props)
  
        this.interviews = []
        this.generateInterviews = this.generateInterviews.bind(this)
        this.consumeInterview = new ConsumeInterview()
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