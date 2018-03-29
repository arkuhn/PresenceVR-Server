import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch, Popover, Position, Button} from '@blueprintjs/core';
import axios from 'axios';
import {API_URL} from "../api.config";

class BackgroundImageList extends Component {

    constructor(){
        super();
        this.changeBackground = this.changeBackground.bind(this);
        this.uploadCustomBackground = this.uploadCustomBackground.bind(this);
        this.setBackground = this.setBackground.bind(this);
    }

    changeBackground(e){
        var selectedImage = e.target.value;
        this.props.onSelectedBackground(selectedImage);
    }

    setBackground(src){
        this.props.onSelectedBackground(src);
    }

    uploadCustomBackground(e){
        e.preventDefault();
        let fileInput = document.getElementById("customUpload");
        fileInput.click();
        let file = e.target.files[0];


        let formData = new FormData();

        formData.append('backgroundImage', file);
        console.log(file.name);

        axios.patch(API_URL+'/api/rooms/default', formData).then((result) =>{
            //self.setState({currentBackground: result.data.currentBackground});
            this.props.onSelectedBackground(file.name);
        });

        e.target.value = null;
    }

    uploadCustomAsset(e){
        e.preventDefault();
        let fileInput = document.getElementById("customUpload");
        fileInput.click();
        let file = e.target.files[0];


        let formData = new FormData();

        formData.append('assetImage', file);
        console.log(file.name);

        axios.patch(API_URL+'/api/rooms/default', formData).then((result) =>{
            //self.setState({currentBackground: result.data.currentBackground});
            this.props.onRefreshSettings();
        });

        e.target.value = null;
    }




    render() {


        return (


            <div>
            <Menu className="pt-large">
                <li className="pt-menu-header centered-header">
                    <h6>Room Name: {this.props.roomName}</h6>
                </li>
                <li className="pt-menu-header centered-header">
                    <h6>Settings</h6>
                </li>
                <div className="pt-form-group">
                    <label className="pt-label" for="example-form-group-input-a">
                        Refresh Settings
                    </label>
                    <div className="pt-form-content">
                        <button type="button" className="pt-button pt-small pt-icon-refresh" onClick={this.props.onRefreshSettings}></button>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label" for="example-form-group-input-a">
                        VR Mode
                    </label>
                    <div className="pt-form-content">
                        <Switch  checked={this.props.vrMode} onChange={this.props.onToggleVRMode} />
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label" for="example-form-group-input-a">
                        Background Image
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-select">
                            <select value={this.props.currentBackground} onChange={this.changeBackground} >
                                {this.props.backgroundImages.map(image => {
                                    return <option key={image} value={image}>{image}</option>
                                })}
                            </select>
                        </div>
                        <input id="customUpload"
                               type="file"
                               style={{display:"none"}}
                               ref={(ref) => this.customUpload = ref}
                               onChange={(e)=>this.uploadCustomBackground(e)} />
                        &nbsp;
                        <button type="button" className="pt-button pt-small pt-icon-upload pt-intent-primary" onClick={(e) => this.customUpload.click()}></button>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label" for="example-form-group-input-a">
                        Selected Asset
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-select">
                            <select value="">
                                <option  value="">Choose an asset...</option>
                                {this.props.assetImages.map(image => {
                                    return <option key={image} value={image}>{image}</option>
                                })}
                            </select>
                        </div>
                        <input id="assetUpload"
                               type="file"
                               style={{display:"none"}}
                               ref={(ref) => this.assetUpload = ref}
                               onChange={(e)=>this.uploadCustomAsset(e)} />
                        &nbsp;
                        <button type="button" className="pt-button pt-small pt-icon-upload pt-intent-primary" onClick={(e) => this.assetUpload.click()}></button>
                    </div>
                </div>


                {/*
                <li className="pt-menu-header centered-header">
                    <h6>Asset Images</h6>
                </li>
                {this.props.assetImages.map(image => {
                    return <span key={image}><MenuItem key={image} text={image} onClick={this.changeBackground}/><MenuDivider /></span>
                })}
                <input id="assetUpload"
                       type="file"
                       style={{display:"none"}}
                       ref={(ref) => this.assetUpload = ref}
                       onChange={(e)=>this.uploadCustomAsset(e)} />
                <MenuItem text={"Add custom background"} onClick={(e) => this.assetUpload.click()}/><MenuDivider />
                */}

            </Menu>
        </div>);
    }

}

export default BackgroundImageList;