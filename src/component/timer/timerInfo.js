import React, {Component} from 'react';

class TimerInfo extends Component {	

	render () {

		let workTime = this.props.timer.work,
		     breakTime = this.props.timer.break;

		return (
			<div className="timer-info">
				<div className="timer-time">
					<div className="info-card time-card">
						<div>{ workTime }</div>
						<div>minutes</div>
						<div>work</div>
					</div>
					<div className="info-card time-card">
						<div>{ breakTime }</div>
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
}

TimerInfo.propTypes = {
	timer: React.PropTypes.object.isRequired
}

export default TimerInfo;