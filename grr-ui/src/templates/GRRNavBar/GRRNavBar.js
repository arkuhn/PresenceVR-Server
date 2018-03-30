import React, {Component} from 'react';
import './GRRNavBar.css';
import { Link } from 'react-router-dom';


class GRRNavBar extends Component {
    render() {
        return (
            <nav className="pt-navbar pt-dark">
                <div style={{margin: "0 auto; width: 480px"}}>
                    <div className="pt-navbar-group pt-align-left">
                        <Link to="/"><div className="pt-navbar-heading" id="logo">Game Room Recruiting</div></Link>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <button className="pt-button pt-minimal pt-icon-history">Room History</button>
                        <button className="pt-button pt-minimal pt-icon-document">Files</button>
                        <span className="pt-navbar-divider"/>
                        <button className="pt-button pt-minimal pt-icon-notifications"/>
                        <button className="pt-button pt-minimal pt-icon-cog"/>
                        <button className="pt-button pt-minimal pt-icon-user">dxr5716</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default GRRNavBar;