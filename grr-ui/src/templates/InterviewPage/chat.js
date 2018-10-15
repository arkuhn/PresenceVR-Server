import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PresenceVRNavBar from "../PresenceVRNavBar/PresenceVRNavBar"
import { Header, Modal, List, Icon, Button, Divider } from 'semantic-ui-react';

function ChatMessage(props) {
    return <p>Testing</p>;
}

class ChatBox extends Component {
    render() {
        const css = ` 
        .Chat {
            overflow-wrap: break-word;
            max-width: 100%;
            overflow-x: hidden;
        }
        .ChatBox {
            max-width: 100%;
            height: 200px;
            borderWidth: 5px;
            borderColor: black;
            border: 5px;
            padding: 10px;
            margin: 10px;
            color: blue;
        }
        `

        return (
            <div>
                <Header as='h3'>
                    <Icon name='chat' />
                    Chat
                </Header>
                <div className="ChatBox">
                Test This Out
                </div>
                <style>{css}</style>
            </div>
        );
    }
}

class ChatBar extends Component {
    render() {
        return(
            <form>
                <input type="text" name="message" />
                <input type="submit" value="Send" />
            </form>
        )
    }
}

class ChatPane extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: new Array()}
    }

    render() {
        return(
            <div>
                <ChatBox messages={this.state.message} />
                <ChatBar />
            </div>
        )
    }
}

export default ChatPane;