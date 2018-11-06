import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Header, Modal, List, Icon, Button, Divider } from 'semantic-ui-react';
import './a-frame.css'

class AframeInterview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        <div>
        <Header as='h3'>Aframe</Header>
        <a-scene className='aframeComponent' embedded> 
            <a-entity id="box" geometry="primitive: box" material="color: red"></a-entity>
        </a-scene>
        <style>{css}</style>  
        </div>
    }
}

export default AframeInterview;