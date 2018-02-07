import React, {Component} from 'react';
import {Menu, MenuItem, MenuDivider} from '@blueprintjs/core'
import GRRNavBar from '../GRRNavBar/GRRNavBar';
import Keyer from '../Keyer/Keyer';
//import stock360 from '../stock360.png';
import './AssetMgmt.css';

class AssetMgmt extends Component {
    render() {
        return (
            <div>
                <Keyer></Keyer>
                <GRRNavBar/>
                <div className="flex-container">
                    <div className="list-container">
                        <Menu className="pt-large">
                            <li className="pt-menu-header centered-header">
                                <h6>Default Test</h6>
                            </li>
                            <MenuItem text="GreySkies"/>
                            <MenuDivider/>
                            <MenuItem text="MunsonOffice1"/>
                            <MenuDivider/>
                            <MenuItem text="BLRoom3"/>
                            <li className="pt-menu-header centered-header">
                                <h6>Uploaded</h6>
                            </li>
                            <MenuItem text="MtRushmore"/>
                            <MenuDivider/>
                            <MenuItem text="CourtRoom"/>
                            <MenuDivider/>
                            <MenuItem text="BLRoom2"/>
                            <li className="pt-menu-header centered-header">
                                <h6>User-Contributed</h6>
                            </li>
                            <MenuItem text="PortfolioRoom1"/>
                            <MenuDivider/>
                            <MenuItem text="PortfolioRoom2"/>
                            <MenuDivider/>
                            <MenuItem text="PortfolioRoom3"/>
                        </Menu>
                    </div>
                    <div className="preview-container" >
                        <h6 id="previewItemTitle">Portfolio Room 2</h6>
                        <div id="background-preview">
                            {/*<div className="pt-non-ideal-state">*/}
                                {/*<div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">*/}
                                    {/*<span className="pt-icon pt-icon-cross"/>*/}
                                {/*</div>*/}
                                {/*<h4 className="pt-non-ideal-state-title">No background selected</h4>*/}
                                {/*<div className="pt-non-ideal-state-description">*/}
                                    {/*Select a background to preview it.*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <a-scene>
                                <a-assets>
                                    <img id="city" src="/assets/images/stock360.png"></img>
                                        <video id="v" width="320" height="240" autoPlay></video>
                                        <canvas id="c" width="320" height="240"></canvas>
                                        <canvas id="c2" width="320" height="240"></canvas>
                                        <video  id="self" width="300" height="200" autoPlay></video>
                                        <video  id="caller" width="300" height="200"></video>
                                </a-assets>
                                <a-sky id="image-360" radius="10" src="#city"></a-sky>
                                <a-video src="#c" width="5" height="2.5" position="-6 -4 -2" rotation="-5 65 0"></a-video>
                                <a-video src="#c2" width="5" height="2.5" position="-5 -4 -6" rotation="-5 65 0"></a-video>
                                <a-entity position="0 -5 0">
                                    <a-camera></a-camera>
                                </a-entity>
                                
                            </a-scene>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default AssetMgmt;