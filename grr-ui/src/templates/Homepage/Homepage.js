import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import InterviewList from "./interviewList"
import { Button, Header, Icon, Grid, Modal, Menu, List} from 'semantic-ui-react';


class Homepage extends Component {
    
    calendar() {
        return (
            <Grid centered className='ui celled grid'>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Sunday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Monday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Tuesday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Wednesday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Thursday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Firday</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='center'>Saturday</Header>
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>1</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>2</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>3</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>4</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>5</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>6</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>7</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>8</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>9</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>10</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>11</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>12</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>13</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>14</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>15</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>16</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>17</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>18</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>19</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>20</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>21</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>22</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>23</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>24</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>25</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>26</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>27</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>28</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>29</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>30</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>31</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>1</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>2</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>3</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header as='h3' textAlign='left'>4</Header>
                        <br />
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    
    appointmentButton() {
        return (
            <Modal color='grey' trigger={<Menu.Item>Select Appointment</Menu.Item>} closeIcon>
                <Header icon='user outline' content='Appointment information' />
                <Modal.Content>
                    <List>
                        <List.Item>
                            <List.Content>
                                <List.Header>Username</List.Header>
                                <List.Description>
                                    test1234@rit.edu
                                </List.Description>
                                <List.Header>Username</List.Header>
                                <List.Description>
                                    test1234@rit.edu
                                </List.Description>
                                <List.Header>Username</List.Header>
                                <List.Description>
                                    test1234@rit.edu
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                    <Button as={Link} to="/interview">Join</Button>
                    <Button >Edit</Button>
                    <Button>Cancel</Button>
                </Modal.Content>
            </Modal>
        );
    }


    render() {
        return (
            <div className="Homepage">
                <PresenceVRNavBar/>
                <Grid centered className='ui internally celled grid'>
                    
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
                            <InterviewList />
                        </Grid.Column>
                        <Grid.Column width={12} divided={true}>
                            <Header as='h3' textAlign='center'>July</Header>
                            {this.calendar()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Homepage;