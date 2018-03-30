import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch, Dialog, Intent, Button} from '@blueprintjs/core';
import axios from 'axios';
import {API_URL} from "../api.config";

class BackgroundImageList extends Component {

    constructor(){
        super();
        this.changeBackground = this.changeBackground.bind(this);
        this.uploadCustomBackground = this.uploadCustomBackground.bind(this);
        this.setBackground = this.setBackground.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.state = {assetUpload: {mtlFile: '', objFile: ''}, isOpen: false};
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

        let file = e.target.files[0];


        let formData = new FormData();

        formData.append('backgroundImage', file);

        axios.patch(API_URL+'/api/rooms/'+this.props.roomName, formData).then((result) =>{
            //self.setState({currentBackground: result.data.currentBackground});
            this.props.onSelectedBackground(file.name);
        });

        e.target.value = null;
    }


    validateAssetUpload(e)  {
        const state = this.state;

        switch (e.target.name) {
            case 'mtlFile':
                state.assetUpload.mtlFile = e.target.files[0];
                break;
            case 'objFile':
                state.assetUpload.objFile = e.target.files[1];
                break;
            default:

        }

        this.setState(state);
    }

    uploadCustomAsset(e){
        e.preventDefault();

        console.log(e.target.files[0]);
        console.log(e.target.files[1]);

        /*
        let file = e.target.files[0];


        let formData = new FormData();

        formData.append('assetImage', file);

        axios.patch(API_URL+'/api/rooms/'+this.props.roomName, formData).then((result) =>{
            //self.setState({currentBackground: result.data.currentBackground});
            this.props.onRefreshSettings();
        });*/

        e.target.value = null;
    }

    toggleDialog () {
        this.setState({ isOpen: !this.state.isOpen });
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
                    <label className="pt-label">
                        Refresh Settings
                    </label>
                    <div className="pt-form-content">
                        <Button type="button" className="pt-button pt-small pt-icon-refresh" onClick={this.props.onRefreshSettings}></Button>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label" >
                        VR Mode
                    </label>
                    <div className="pt-form-content">
                        <Switch  checked={this.props.vrMode} onChange={this.props.onToggleVRMode} />
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">
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
                        <Button type="button" className="pt-button pt-small pt-icon-upload pt-intent-primary" onClick={(e) => this.customUpload.click()}></Button>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">
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
                               multiple
                               type="file"
                               style={{display:"none"}}
                               ref={(ref) => this.assetUpload = ref}
                               onChange={(e)=>this.uploadCustomAsset(e)} />
                        &nbsp;
                        {/*<Button type="button" className="pt-button pt-small pt-icon-upload pt-intent-primary" onClick={(e) => this.assetUpload.click()}></Button>*/}
                        <Button type="button" className="pt-button pt-small pt-icon-upload pt-intent-primary" onClick={this.toggleDialog}></Button>

                        <div>
                            <Dialog
                                icon="inbox"
                                isOpen={this.state.isOpen}
                                onClose={this.toggleDialog.bind(this)}
                                title="Dialog header"
                            >

                                <div className="pt-form-group pt-inline">
                                    <label className="pt-label">
                                        Please select .mtl file
                                    </label>
                                    <div className="pt-form-content">
                                        <div className="pt-input-group">
                                            <span className="pt-icon pt-icon-document"></span>
                                            <input id="example-form-group-input-d" className="pt-input"  type="file"  dir="auto" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-form-group pt-inline">
                                    <label className="pt-label">
                                        Please select .obj file
                                    </label>
                                    <div className="pt-form-content">
                                        <div className="pt-input-group">
                                            <span className="pt-icon pt-icon-document"></span>
                                            <input id="example-form-group-input-d" className="pt-input"  type="file"  dir="auto" />
                                        </div>
                                    </div>
                                </div>






                                <div className="pt-dialog-footer">
                                    <div className="pt-dialog-footer-actions">
                                        <Button
                                            intent={Intent.PRIMARY}
                                            onClick={this.toggleDialog}
                                            text="Primary"
                                        />
                                    </div>
                                </div>
                            </Dialog>
                        </div>

                    </div>
                </div>
            </Menu>
        </div>);
    }

}

export default BackgroundImageList;