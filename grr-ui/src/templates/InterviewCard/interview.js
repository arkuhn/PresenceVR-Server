import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image, Divider } from 'semantic-ui-react';
import InterviewAPI from '../../utils/InterviewAPI';
import InterviewForm from './InterviewForm';
import CancelInterview from './cancelInterview'
import _ from 'lodash';
import {firebaseAuth} from "../../utils/firebase";

class Interview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        }

    }
    render() {
        if (_.isEqual(firebaseAuth.currentUser.email, this.props.host)) {
            return (
                <Card centered>
                    <Card.Content textAlign='left'>
                        <Image floated='right' size='mini' src={this.props.image} />
                        <Card.Header> {this.props.date} : {this.props.time} </Card.Header>
                        <Card.Meta>{this.props.details}</Card.Meta>
                        <Card.Description>
                        Participants: {this.props.participants}
                        </Card.Description>
                        <Divider />
                        <Card.Content extra>
                            <div className='ui three buttons'>
                                <Button as={Link} to="/interview" basic color='green'>
                                    Join
                                </Button>

                                <InterviewForm type='edit' id={this.props.id} participants={this.props.participants} date={this.props.date} time={this.props.time} details={this.props.details} />

                                <CancelInterview id={this.props.id} />
                            </div>
                        </Card.Content>
                    </Card.Content>
                </Card>
            )
        }
        else {
            return (
                <Card centered>
                    <Card.Content textAlign='left'>
                        <Image floated='right' size='mini' src={this.props.image} />
                        <Card.Header> {this.props.date} : {this.props.time} </Card.Header>
                        <Card.Meta>{this.props.details}</Card.Meta>
                        <Card.Description>
                            Participants: {this.props.participants}
                        </Card.Description>
                        <Divider />
                        <Card.Content extra>
                            <div className='ui three buttons'>
                                <Button as={Link} to="/interview" basic color='green'>
                                    Join
                                </Button>

                                <CancelInterview id={this.props.id} />
                            </div>
                        </Card.Content>
                    </Card.Content>
                </Card>
            )
        }
    }
}

export default Interview;