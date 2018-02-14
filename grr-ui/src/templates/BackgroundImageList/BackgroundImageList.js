import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch} from '@blueprintjs/core';


class BackgroundImageList extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {defaultImages: ["stock360.png", "puydesancy.jpg", "city.jpg", "bridge.png"]};
    }

    handleClick(e){
        var selectedImage = e.target.textContent;
        this.props.onSelectedBackground(selectedImage);
    }

    render() {
        return (<div className="list-container">
            <Menu className="pt-large">
                <li className="pt-menu-header centered-header">
                    <h6>Default Background Options</h6>
                </li>
                {this.state.defaultImages.map(image => {
                    return <span key={image}><MenuItem key={image} text={image} onClick={this.handleClick}/><MenuDivider /></span>
                })}
            </Menu>
        </div>);
    }

}

export default BackgroundImageList;