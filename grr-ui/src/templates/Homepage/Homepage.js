import React, { Component } from 'react';
//import {Button} from '@blueprintjs/core'
import './Homepage.css';
import { Link } from 'react-router-dom';
import GRRNavBar from "../GRRNavBar/GRRNavBar";
import vrimage from "../../assets/images/vrimage.png";
import Calendar from 'react-calendar';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Icon, Grid, Modal, Menu, List} from 'semantic-ui-react';


class Homepage extends Component {
    
    appointmentButton () {
        return (
            <Modal color='grey' trigger={ <Menus.Item>Select Appointment</Menu.Item> } closeIcon>
                <Header icon='user outline' content='Appointment information' />
                <Modal.Content>
                    <List>
                            Date
                            <List.Detail>Today</List.Detail><br/>
                            Participant
                            <List.Detail>Tony</List.Detail><br/>
                        </List>
                    <Button as={Link} to="/interview" fluid width={4}>Join</Button>
                    <Button fluid width={4}>Edit</Button>
                    <Button fluid width={4}>Cancel</Button>
                </Modal.Content>
            </Modal>
        );
    }
    
    
    render() {
        return (
            <div className="Homepage">
                <PresenceVRNavBar/>
                <Grid centered>
                    
                    {/* Header */}
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as='h1' textAlign='center'>
                                <Icon name='calendar alternate outline' />
                                <Header.Content>
                                    Interview Schedule
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{height:"100vh"}}>
                        <Grid.Column width={4} divided={true}>
                            <Header as='h3' textAlign='center'>Upcoming Interviews</Header>
                            {this.appointmentButton()}     
                        </Grid.Column>
                        <Grid.Column width={12} divided={true}>
                            <Header as='h3' textAlign='center'>calendar</Header>
                            <Calendar />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Homepage;