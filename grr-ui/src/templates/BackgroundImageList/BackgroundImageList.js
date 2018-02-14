import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch} from '@blueprintjs/core';


class BackgroundImageList extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
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
                <MenuItem text="stock360.png" onClick={this.handleClick}/>
                <MenuDivider/>
                <MenuItem text="puydesancy.jpg" onClick={this.handleClick}/>
                <MenuDivider/>
                <MenuItem text="city.jpg" onClick={this.handleClick}/>
                <MenuDivider/>
                <MenuItem text="bridge.png" onClick={this.handleClick}/>
            </Menu>
        </div>);
    }

}

export default BackgroundImageList;