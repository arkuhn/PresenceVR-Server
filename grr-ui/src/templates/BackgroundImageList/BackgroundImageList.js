import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch} from '@blueprintjs/core';
import axios from 'axios';
import {API_URL} from "../api.config";

class BackgroundImageList extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.uploadCustomBackground = this.uploadCustomBackground.bind(this);
        this.setBackground = this.setBackground.bind(this);
    }

    handleClick(e){
        var selectedImage = e.target.textContent;
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
        return (<div className="list-container">
            <Menu className="pt-large">
                <li className="pt-menu-header centered-header">
                    <h6>Background Options</h6>
                </li>
                {this.props.backgroundImgs.map(image => {
                    return <span key={image}><MenuItem key={image} text={image} onClick={this.handleClick}/><MenuDivider /></span>
                })}
                    <input id="customUpload"
                           type="file"
                           style={{display:"none"}}
                           ref={(ref) => this.customUpload = ref}
                           onChange={(e)=>this.uploadCustomBackground(e)} />
                <MenuItem text={"Add custom background"} onClick={(e) => this.customUpload.click()}/><MenuDivider />


                <li className="pt-menu-header centered-header">
                    <h6>Asset Images</h6>
                </li>
                {this.props.assetImgs.map(image => {
                    return <span key={image}><MenuItem key={image} text={image} onClick={this.handleClick}/><MenuDivider /></span>
                })}
                <input id="assetUpload"
                       type="file"
                       style={{display:"none"}}
                       ref={(ref) => this.assetUpload = ref}
                       onChange={(e)=>this.uploadCustomAsset(e)} />
                <MenuItem text={"Add custom background"} onClick={(e) => this.assetUpload.click()}/><MenuDivider />


            </Menu>
        </div>);
    }

}

export default BackgroundImageList;