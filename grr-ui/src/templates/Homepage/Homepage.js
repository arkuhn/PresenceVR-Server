import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import InterviewList from "./interviewList"
import ConsumeInterview from "./consumeInterview"
import { Button, Header, Icon, Grid, Modal, Menu, List, Card, Popup, Divider} from 'semantic-ui-react';

class Homepage extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="Homepage">
                <PresenceVRNavBar/>
                <Grid centered className='ui grid'>
                    
                    {/* Header */}
                    <Grid.Column width={4} />

                    <Grid.Column width={8}>
                        <Grid.Row>
                            <br/>
                            <Header as='h1'>
                                <Icon name='calendar alternate outline' />
                                <Header.Content>
                                    Interview Schedule
                                </Header.Content>
                                <Divider />
                            </Header>
                        </Grid.Row>
                        
                        <InterviewList />

                    </Grid.Column>

                    <Grid.Column width={4} />
                            
                </Grid>
            </div>
        );
    }
}

export default Homepage;