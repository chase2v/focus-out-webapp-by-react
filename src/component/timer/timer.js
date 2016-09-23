import React, { Component } from 'react';

import Clock from './clock';
import TimerInfo from './timerInfo';

class Timer extends Component {

	render () {

		let currentTimer = this.props.playInfo.currentTimer,
		     timer = this.props.timers[currentTimer - 1];

		return (			
			<div className="timer">
				<Clock dispatch={ this.props.dispatch } playInfo={ this.props.playInfo } timer={ timer } />
				<TimerInfo dispatch={ this.props.dispatch } timer={ timer } playInfo={ this.props.playInfo } />
			</div>
		)
	}

}

export default Timer;
