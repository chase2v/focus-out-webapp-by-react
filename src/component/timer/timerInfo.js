import React from 'react';

const TimerInfo = () => {

	return (
		<div className="timer-info">
			<div className="timer-time">
				<div className="info-card time-card">
					<div>60</div>
					<div>seconds</div>
					<div>work</div>
				</div>
				<div className="info-card time-card">
					<div>60</div>
					<div>seconds</div>
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

export default TimerInfo;