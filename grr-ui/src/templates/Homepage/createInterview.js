import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Input, Grid, Modal, List, Image} from 'semantic-ui-react';
import axios from 'axios';
import {API_URL} from "../api.config";

const createInterviewRequest = () => {
    //TODO take values from forum inputs
    axios.post(API_URL + '/api/interviews/', {
        host: 'jaaw1001@rit.edu',
        subject: 'tests',
        occursOnDate: '12/12/1221',
        occursAtTime: '8:31:22',
        participants: 'noone@email.com'
    }).then((result) => {
        console.log('got a result')
        console.log(result)
    });
}


const CreateInterview = () => {
    return (
        <Modal size='mini' trigger={ 
            <Button fluid attached='bottom'>Create an interview</Button>
         }>
        <Header icon='alternate calendar outline' content='Interview Details' />
        <Modal.Content>
                    <List>
                        <List.Item>
                            <Input fluid label='Date' placeholder='MM/DD/YYYY' />
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Time' placeholder='HH:MM:SS'/>
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Participants' placeholder='participant1@email.co' />
                        </List.Item>
                        <List.Item>
                            <Input fluid label='Subject' placeholder='Art interview' />
                        </List.Item>
                    </List>
                    <Button primary onClick={createInterviewRequest}>Create</Button>
                    <Button secondary>Cancel</Button>
                </Modal.Content>
    </Modal>
    )
}

export default CreateInterview