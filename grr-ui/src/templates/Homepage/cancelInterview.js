import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Icon, Modal} from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview'

class CancelInterview extends React.Component {
    constructor(props) {
        super(props);
        this.consumeInterview = new ConsumeInterview()
        this.state = {dateValue: props.date,
                      timeValue: props.time,
                      participantsValue: props.participants,
                      detailsValue: props.details,
                      modalOpen: false};
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleSubmit(event) {
        this.consumeInterview.cancelInterview({
            host: 'currentuser@email.com',
            details: this.state.detailsValue,
            occursOnDate: this.state.dateValue,
            occursAtTime: this.state.timeValue,
            participants: this.state.participantsValue
        })
        this.setState({ modalOpen: false })
        window.location.reload();
        event.preventDefault();
    }

    handleOpen(event) {
        this.setState({ modalOpen: true })
    }

    handleCancel(event) {
        this.setState({ modalOpen: false })
    }

    render() {
        return (
            <Modal basic size='small' open={this.state.modalOpen} onClose={this.handleCancel} trigger={ 
                <Button basic color='red' onClick={this.handleOpen} floated='right' size='small' > Delete </Button>     
            }>
            <Header icon='alternate calendar outline' content='Are you sure you want to delete this interview?' />
            <Modal.Content>
                <Button color='green' onClick={this.handleSubmit} inverted>
                    <Icon name='checkmark' /> Yes
                </Button>
                <Button color='red' onClick={this.handleCancel} inverted>
                    <Icon name='cancel' /> No
                </Button>
            </Modal.Content>
            </Modal>
        )
    }
}

export default CancelInterview;