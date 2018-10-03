import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Header, Modal, List, Icon, Button } from 'semantic-ui-react';

function Asset(props) {
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


class Assets extends Component {
    loadAssetsModal() {
        return (
            <Modal trigger={ <Button fluid content='Load more'/> } closeIcon>
                <Header icon='boxes' content='Select an asset to load' />
                <Modal.Content>
                    <List>
                    <List.Item>
                    <Icon name='mail' />
                        <List.Content>
                            <List.Header>Username</List.Header>
                            <List.Description>
                            test1234@rit.edu
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    </List>
                <br/>
                    <Button as={Link} to="/" fluid>Log out</Button>
                </Modal.Content>
            </Modal>
        )    
    }
    generateAssets() {
        const numOfAssets = Math.floor(Math.random() * 15) + 1
        const assets = []
        for (let i = 0; i < numOfAssets; i++) { 
            const asset = ({
                name: `Asset ${i}`,
                date: `8/${i}/18`
            })
            assets.push(asset)
        }
        return assets.map((asset) => {
            return <Asset name={asset.name} date={asset.date}/>
        })

    }

    render() {
        const css = ` 
        .AssetsList {
            height:250px;
            overflow:scroll;
            max-width: 100%;
            overflow-x: hidden;
        }
        `

        return (
            <div>
                <Header as='h3'>
                    <Icon name='boxes' />
                    Assets
                </Header>
                <List className="AssetsList">
                    {this.generateAssets()}
                </List>
                {this.loadAssetsModal()}
                <style>{css}</style>
            </div>
        );
    }
}

export default Assets;