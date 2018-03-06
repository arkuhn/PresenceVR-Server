import React, {Component} from 'react';
import './BackgroundImageList.css';
import {Menu, MenuItem, MenuDivider, Switch} from '@blueprintjs/core';


class BackgroundImageList extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.uploadCustomBackground = this.uploadCustomBackground.bind(this);
        this.setBackground = this.setBackground.bind(this);
        this.state = {defaultImages: ["stock360.png", "puydesancy.jpg", "city.jpg", "bridge.png"], customImage: []};
    }

    handleClick(e){
        var selectedImage = e.target.textContent;
        this.props.onSelectedBackground("/assets/images/"+selectedImage);
    }

    setBackground(src){
        this.props.onSelectedBackground(src);
    }

    uploadCustomBackground(e){
        e.preventDefault();
        let fileInput = document.getElementById("customUpload");
        fileInput.click();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                customImage: this.state.customImage.concat([{name: file.name, file:reader.result }])
            });
            this.props.onSelectedBackground(reader.result);

        }

        reader.readAsDataURL(file);
        e.target.value = null;
    }


    render() {
        return (<div className="list-container">
            <Menu className="pt-large">
                <li className="pt-menu-header centered-header">
                    <h6>Background Options</h6>
                </li>
                {this.state.defaultImages.map(image => {
                    return <span key={image}><MenuItem key={image} text={image} onClick={this.handleClick}/><MenuDivider /></span>
                })}
                {this.state.customImage.map(image => {
                    return <span key={image.name}><MenuItem key={image.name} text={image.name} onClick={() => this.setBackground(image.file)}/><MenuDivider /></span>
                })}
                    <input id="customUpload"
                           type="file"
                           style={{display:"none"}}
                           ref={(ref) => this.customUpload = ref}
                           onChange={(e)=>this.uploadCustomBackground(e)} />
                <MenuItem text={"Add custom background"} onClick={(e) => this.customUpload.click()}/><MenuDivider />


            </Menu>
        </div>);
    }

}

export default BackgroundImageList;