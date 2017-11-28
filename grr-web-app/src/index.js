import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Navbar from './'
import registerServiceWorker from './registerServiceWorker';
import Homepage from "./Homepage/Homepage";

ReactDOM.render(<Homepage />, document.getElementById('root'));
registerServiceWorker();
