import React from 'react';
import { connect } from 'react-redux';

const TimerInfo = ({ timer }) => {
	return (
		<div className="timer-info">
			<div className="timer-time">
				<div className="info-card time-card">
					<div>{ timer.work }</div>
					<div>minutes</div>
					<div>work</div>
				</div>
				<div className="info-card time-card">
					<div>{ timer.break }</div>
					<div>minutes</div>
					<div>break</div>
				</div>
			</div>
			<div className="info-card today-card">
				<div>Today: 3</div>
				<div><i className="iconfont icon-star"></i></div>
			</div>
		</div>
	)
}

let timerInfo = connect(state => {
	if (state.data.timers) {
		return {
			timer: state.data.timers[state.data.currentTimer-1]
		}
	}
	return {
		timer: {
			work: 30,
			break: 5
		}
	}
})(TimerInfo);

export default timerInfo;