import AssetMgmt from "./templates/AssetMgmt/AssetMgmt";

import RoomList from "./templates/RoomList/RoomList";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

var ReactDOM = require('react-dom');
var React = require('react');

let root = document.getElementById('root');

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component = {RoomList} />
			<Route path='/test' component = {AssetMgmt} />
		</Switch>
	</BrowserRouter>
), root);
