import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Input, Grid, Modal, List, Image} from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview'

class CreateInterview extends React.Component {
    constructor(props) {
        super(props);
        this.consumeInterview = new ConsumeInterview()
        this.state = {dateValue: '',
                      timeValue: '',
                      participantsValue: '',
                      subjectValue: ''};
    
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
      this.consumeInterview.createInterview({
        host: 'currentuser@email.com',
        details: this.state.subjectValue,
        occursOnDate: this.state.dateValue,
        occursAtTime: this.state.timeValue,
        participants: this.state.participantsValue
      })
      event.preventDefault();
    }

    render() {
        return (
            <Modal size='mini' trigger={ 
                <button class='ui circular icon button' role='button'>
                    <i aria-hidden='true' class='add icon' />
                </button>
            }>
            <Header icon='alternate calendar outline' content='Interview Details' />
            <Modal.Content>
                        <List>
                        <List.Item>
                            <Input fluid label='Date' placeholder='MM/DD/YY' onChange={this.handleDateChange}/>
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
                        <Button primary onClick={this.handleSubmit}>Create</Button>
                        <Button secondary>Cancel</Button>
                    </Modal.Content>
        </Modal>
        )
        }
}

export default CreateInterview