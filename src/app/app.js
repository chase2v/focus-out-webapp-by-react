import React, {Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import AppFrame from '../component/appFrame';
import Timer from '../container/timerWrapper';
import Statistic from '../component/statistic/statistic';
import User from '../component/user/user';
import Setting from '../component/setting/setting';
import GraphCard from '../component/statistic/graphCard';

export class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Router history={ hashHistory }>
					<Route path="/" component={ AppFrame }>
						<IndexRoute component={ Timer }/>
						<Route path="statistic" component={ Statistic }/>
						<Route path="user" component={ User }/>
						<Route path="setting" component={ Setting }/>
						<Route path="graph/:timerId" component={ GraphCard }/>
					</Route>
				</Router>
			</Provider>
		);
	}
}
