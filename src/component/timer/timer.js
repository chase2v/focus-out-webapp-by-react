import React, { Component } from 'react';

import Clock from './clock';
import TimerInfo from './timerInfo';

export default class Timer extends Component {
	render () {
		return (	
			<div className="timer">
				<Clock />
				<TimerInfo />
			</div>
		)
	}
}
