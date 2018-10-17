import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Input, Grid, Modal, List, Image} from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview'

class EditInterview extends React.Component {
    constructor(props) {
        super(props);
        this.consumeInterview = new ConsumeInterview();
        this.state = {
            modalOpen: false,
            dateValue: props.date,
            timeValue: props.time,
            participantsValue: props.participants,
            detailsValue: props.details
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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

    handleDetailChange(event) {
        this.setState({ detailsValue: event.target.value })
    }

    handleSubmit(event) {
        this.consumeInterview.updateInterview(0)
        this.setState({ modalOpen: false })
        event.preventDefault();
    }

    handleDelete(event) {
        this.consumeInterview.cancelInterview(0);
        this.setState({ modalOpen: false })
    }

    handleOpen(event) {
        this.setState({ modalOpen: true })
    }

    render() {
        return (
            <Modal size='small' open={this.state.modalOpen} onClose={this.handleCancel} trigger={ 
                <Button basic onClick={this.handleOpen} color='grey' >Edit</Button>
            }>
            <Header icon='pencil' content='Edit an Interview' />
            <Modal.Content>
                    <List>
                        <List.Item>
                            <Input fluid label='Date' value={this.state.dateValue} placeholder='MM/DD/YYYY' onChange={this.handleDateChange} />
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Time' value={this.state.timeValue} placeholder='HH:MM:SS' onChange={this.handleTimeChange} />
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Participants' value={this.state.participantsValue} placeholder={'No one, I guess'} onChange={this.handleParticipantsChange} />
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Details' value={this.state.detailsValue} placeholder='Art interview' onChange={this.handleDetailChange} />
                        </List.Item>
                    </List>
                    <Button primary onClick={this.handleSubmit}>Edit</Button>
                    <Button secondary onClick={this.handleDelete}>Cancel Interview</Button>
            </Modal.Content>
            </Modal>
        );
    }
}

export default EditInterview;