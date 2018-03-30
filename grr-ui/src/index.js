import AssetMgmt from "./templates/AssetMgmt/AssetMgmt";
import RoomList from "./templates/RoomList/RoomList";
import Homepage from "./templates/Homepage/Homepage";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

var ReactDOM = require('react-dom');
var React = require('react');

let root = document.getElementById('root');

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component = {Homepage} />
			<Route path='/rooms' component = {RoomList} />
			<Route path='/vrcall' component = {AssetMgmt} />
		</Switch>
	</BrowserRouter>
), root);
