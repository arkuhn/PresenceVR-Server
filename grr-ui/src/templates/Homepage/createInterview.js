import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Input, Grid, Modal, List, Image} from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview'

class CreateInterview extends React.Component {
    constructor(props) {
        super(props);
        this.consumeInterview = new ConsumeInterview()
        this.state = {dateValue: props.date,
                      timeValue: '',
                      participantsValue: '',
                      detailsValue: ''};
    
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
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

    handleDetailsChange(event) {
        this.setState({detailsValue: event.target.value})
    }
  
    handleSubmit(event) {
      this.consumeInterview.createInterview({
        host: 'currentuser@email.com',
        details: this.state.detailsValue,
        occursOnDate: this.state.dateValue,
        occursAtTime: this.state.timeValue,
        participants: this.state.participantsValue
      })
      event.preventDefault();
    }

    render() {
        return (
            <Modal size='mini' trigger={ 
                <button class='ui massive circular icon button' attached='right' size='small' role='button'>
                    <i aria-hidden='true' class='add icon' />
                </button>
            }>
            <Header icon='alternate calendar outline' content='Interview Details' />
            <Modal.Content>
                        <List>
                        <List.Item>
                            <Input fluid label='Date' placeholder={this.props.date} onChange={this.handleDateChange}/>
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Time' placeholder='HH:MM:SS' onChange={this.handleTimeChange}/>
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Participants' placeholder={'participant@email.com'} onChange={this.handleParticipantsChange}/>
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Details' placeholder='THese are interview details.' onChange={this.handleDetailsChange}/>
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