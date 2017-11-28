import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Navbar from './'
import registerServiceWorker from './registerServiceWorker';
// import Homepage from "./Homepage/Homepage";
import AssetMgmt from "./AssetMgmt/AssetMgmt";

ReactDOM.render(<AssetMgmt />, document.getElementById('root'));
registerServiceWorker();
