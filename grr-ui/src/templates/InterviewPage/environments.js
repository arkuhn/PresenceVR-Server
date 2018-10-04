import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Header, Modal, List, Icon, Button, Divider } from 'semantic-ui-react';

function Environment(props) {
    return (
    <List.Item as='a'>
        <Icon name={props.icon} />
        <List.Content>
            <List.Header>{props.name}</List.Header>
            <List.Description>
            Uploaded on {props.date}
            </List.Description>
        </List.Content>
    </List.Item>
    )
}


class Environments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }
        this.Environments = []

        this.handleModelClose = this.handleModelClose.bind(this)
        this.handleModelOpen = this.handleModelOpen.bind(this)
        this.loadEnvironmentsModal = this.loadEnvironmentsModal.bind(this);
        this.generateEnvironments = this.generateEnvironments.bind(this)
    }
    handleModelClose() { 
        this.setState({ modalOpen: false })
    }

    handleModelOpen() {
        this.setState({ modalOpen: true})
    }

    loadEnvironmentsModal() {
        return (
            <Modal trigger={ <Button fluid onClick={this.handleModelOpen} content='Load more'/> } open={this.state.modalOpen} onClose={this.handleClose} closeOnDocumentClick closeIcon>
                <Header icon='boxes' content='Select an Environment to load' />
                <Modal.Content>
                    <List horizontal selection>
                    <br/>
                        {this.environments.map((environment)=> {
                            return <Environment name={environment.name} date={environment.date} icon='chevron right'/>
                        })}
                    </List>
                    <Divider />
                    <Button onClick={this.handleModelClose} fluid>Load</Button>
                </Modal.Content>
            </Modal>
        )    
    }
    generateEnvironments() {
        const numOfEnvironments = Math.floor(Math.random() * 15) + 1
        for (let i = 0; i < numOfEnvironments; i++) { 
            const Environment = ({
                name: `Environment ${i}`,
                date: `8/${i}/18`
            })
            this.environments.push(Environment)
        }
        return this.environments.map((environment) => {
            return <Environment name={environment.name} date={environment.date} icon='image outline'/>
        })
    }

    render() {
        this.environments= [] // Clear Environments everytime this is re-rendered

        const css = ` 
        .EnvironmentsList {
            height:250px;
            overflow:scroll;
            max-width: 100%;
            overflow-x: hidden;
        }
        `

        return (
            <div>
                <Header as='h3'>
                    <Icon name='image outline' />
                    Environments
                </Header>
                <List className="EnvironmentsList">
                    {this.generateEnvironments()}
                </List>
                {this.loadEnvironmentsModal()}
                <style>{css}</style>
            </div>
        );
    }
}

export default Environments;