import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Grid, Header, Divider, List, Icon, Button } from 'semantic-ui-react';

function Environment(props) {
    return (
    <List.Item as='a'>
        <Icon name='chevron right' />
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

    generateEnvironments() {
        const numOfEnv = Math.floor(Math.random() * 15) + 1
        const envs = []
        for (let i = 0; i < numOfEnv; i++) { 
            const env = ({
                name: `Environment ${i}`,
                date: `8/${i}/18`
            })
            envs.push(env)
        }
        return envs.map((env) => {
            return <Environment name={env.name} date={env.date}/>
        })

    }

    render() {
        const css = ` 
        .EnvironmentsList {
            height:250px;
            overflow:scroll;
            max-width: 100%;
            overflow-x: hidden;
        }
        `
        return (
            <div className="EnvironmentsBox">
            <Header as='h3'>
                <Icon name='images outline' />
                Environments
            </Header>
            <List className="EnvironmentsList">
                {this.generateEnvironments()}
            </List>
            <Button fluid > Load More </Button>
            <style>{css}</style>
            </div>
        );
    }
}

export default Environments;