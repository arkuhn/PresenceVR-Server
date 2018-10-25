import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Button, Header, Card, Grid, Modal, List, Input, Image, Divider } from 'semantic-ui-react';
import ConsumeInterview from './consumeInterview';
import EditInterview from './editInterview';
import CancelInterview from './cancelInterview'
import _ from 'lodash';

class Interview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        }

    }
    render() {
        return (
            <Card centered>
            <Card.Content textAlign='left'>
                <Image floated='right' size='mini' src={this.props.image} />
                <Card.Header>{this.props.participants}</Card.Header>
                <Card.Meta>{this.props.details}</Card.Meta>
                <Card.Description>
                Scheduled on <strong> {this.props.date} : {this.props.time} </strong>
                </Card.Description>
                <Divider />
                <Card.Content extra>
                    <div className='ui three buttons'>
                    <Button as={Link} to={"/interview/" + this.state.id} basic color='green'>
                        Join
                    </Button>

                    <EditInterview id={this.props.id} participants={this.props.participants} date={this.props.date} time={this.props.time} details={this.props.details}/>
                    
                    <CancelInterview id={this.props.id}/>
                    </div>
                </Card.Content>
            </Card.Content>
            </Card>
        )
    }
}

export default Interview;