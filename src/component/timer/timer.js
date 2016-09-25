import React, { Component } from 'react';

import Clock from '../../container/clockWrapper';
import TimerInfo from '../../container/timerInfoWrapper';

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
