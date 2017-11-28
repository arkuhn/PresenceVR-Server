import React, {Component} from 'react';
import {Menu, MenuItem, MenuDivider} from '@blueprintjs/core'
import GRRNavBar from '../GRRNavBar/GRRNavBar';
import stock360 from '../static/img/stock360.png'
import './AssetMgmt.css';

class AssetMgmt extends Component {
    render() {
        return (
            <div>
                <GRRNavBar/>
                <div className="flex-container">
                    <div className="list-container">
                        <Menu className="pt-large">
                            <li className="pt-menu-header centered-header">
                                <h6>Default</h6>
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
                            <a-scene embedded>
                                <a-assets>
                                    <img id="city" src={stock360} />
                                </a-assets>
                                <a-sky id="image-360" radius="15" src="#city"></a-sky>
                            </a-scene>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default AssetMgmt;