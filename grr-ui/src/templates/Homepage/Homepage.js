import React, { Component } from 'react';
//import {Button} from '@blueprintjs/core'
import './Homepage.css';
import { Link } from 'react-router-dom';
import GRRNavBar from "../GRRNavBar/GRRNavBar";
import vrimage from "../../assets/images/vrimage.png";
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Icon, Grid, Modal, Menu, Label } from 'semantic-ui-react';


class Homepage extends Component {
    
    appointmentButton () {
        return (
            <Modal color='grey' trigger={ <Menu.Item>Select Appointment</Menu.Item> } closeIcon>
                <Header icon='user outline' content='Appointment information' />
                <Modal.Content>
                    <Label>
                            Date
                            <Label.Detail>Today</Label.Detail><br/>
                            Participant
                            <Label.Detail>Tony</Label.Detail><br/>
                        </Label>
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
                        <Grid.Column width={4} >
                            <div border-style='solid' border-width='medium' border-color='black'>
                                <Header as='h3' textAlign='center'>Upcoming Interviews</Header>
                                {this.appointmentButton()}
                            </div>
                            
                        </Grid.Column>
                        <Grid.Column width={12} color='green'>
                            <Header as='h3' textAlign='center'>calendar</Header>
                            {this.appointmentButton()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
        /*
        return (
            <div className="Homepage">
                <GRRNavBar/>
>>>>>>> Updated Homepage
                <h1 className="centered" id="header-text">Game Room Recruiting</h1>
                <h3 className="centered" id="header-text">The future of remote interviewing</h3>
                    <div className="homepage-container">

                        <div>
                            <div className="block-center">
                                <img src={"/assets/images/vrimage.png"} alt="vr image" />
                            </div>
                        </div>

                        <div className="grey-bg">
                            <div className="block-center fixed-size vert-align">
                                <h2 className="centered">Get Started</h2>
                                <p className="text-settings">
                                    To create or join a call, start by navigating to the room section below. Once 
                                    you've entered a room, you can edit the settings and upload assets as you see fit. 
                                    Make sure VR mode is toggled on to get the full experience. If you're 
                                    ever lost, remember you can click the button in the top left to return here!
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="fixed-size block-center vert-align">
                                <h2 className="centered">Rooms</h2>
                                <p className="text-settings">
                                    From here, you can create a new room starting with our provided template, 
                                    or join an existing room that you've been invited to. 
                                </p>
                                <Link to="/rooms"><Button className="pt-intent-primary vert-group-button full-width">View Room List</Button></Link>
                            </div>                       
                        </div>
                        
                    </div>
                
            </div>
        );
        */
    }
}

export default Homepage;