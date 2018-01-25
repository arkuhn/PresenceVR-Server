import AssetMgmt from "./templates/AssetMgmt/AssetMgmt";
import style from 'style-loader!css-loader!scss-loader!./scss/main.scss';
var ReactDOM = require('react-dom');
var React = require('react');

let root = document.getElementById('root');

ReactDOM.render(<AssetMgmt />, root);
