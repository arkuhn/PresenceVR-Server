import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AssetMgmt from "./AssetMgmt/AssetMgmt";

ReactDOM.render(<AssetMgmt />, document.getElementById('root'));
registerServiceWorker();
