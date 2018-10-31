import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image, Divider } from 'semantic-ui-react';
import InterviewAPI from '../../utils/InterviewAPI';
import Interview from '../InterviewCard/interview'
import InterviewForm from '../InterviewCard/InterviewForm';
import _ from 'lodash';


class InterviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: []
        }
        this.updateList = this.updateList.bind(this);
        this.populateList = this.populateList.bind(this);
    }

    updateList() {
        InterviewAPI.getAllInterviews(this.props.hostEmail).then((interviews) => {
            this.setState({interviews: interviews.data});
        });
    }

    componentDidMount() {
        this.updateList()
    }

    populateList() {
        if (this.state.interviews.length === 0) {
            return (
            <List.Item>
            <List.Content>
                <List.Header>No interviews to show!</List.Header>
            </List.Content>
            </List.Item>)
        }
        
        const faces = ['https://react.semantic-ui.com/images/avatar/large/steve.jpg', 'https://react.semantic-ui.com/images/avatar/large/molly.png',
            'https://react.semantic-ui.com/images/avatar/large/jenny.jpg'];
        
        return this.state.interviews.map((interview) => {
            return  (  
                <Interview participants={interview.participants.join()} 
                                details={interview.details}
                                date={interview.occursOnDate} 
                                time={interview.occursAtTime}
                                image={faces[Math.floor(Math.random() * 2) + 1]} 
                                icon='calendar alternate outline'
                                id={interview._id}
                                host={interview.host} />
            )
        })
    }

    render() {
        return (
            <div>
                <Grid.Row>
                    <Card.Group>
                        {this.populateList()}
                    </Card.Group>
                </Grid.Row>
            </div>
        )
    }
}

export default InterviewList;