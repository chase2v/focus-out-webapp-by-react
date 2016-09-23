import React, {Component} from 'react';

import createAnimationSingleton from '../animation';
import updateTime from '../../action/updateTime';
import updateUnit from '../../action/updateUnit';

class TimerInfo extends Component {

	componentWillMount () {
		this.props.dispatch(updateTime({
			work: this.props.timer.work,
			break: this.props.timer.break
		}));
	}

	componentDidMount () {
		// 获取动画实例
		this.animation = createAnimationSingleton();
		this.animation.addFuncToLoop(this.count, this, this.animation);
	}

	componentWillReceiveProps (nextProps) {
		
	}

	count (that) {
		console.log(that.i);

		let me = this;

		let interval = that.interval,
			timesOneMin = 1000 * 60 / interval,
			timesOneSec = 1000 / interval;

		let workUnit = this.props.playInfo.workUnit,
			breakUnit = this.props.playInfo.breakUnit,
			workTime = this.props.playInfo.work,
			breakTime = this.props.playInfo.break,
			dispatch = this.props.dispatch;

		let workCounter = function () {
			if (workUnit === 'minutes' && that.i % timesOneMin === 0) {
				dispatch(updateTime({work:--workTime,break:breakTime}));
			} else if (workUnit === 'seconds' && that.i % timesOneSec === 0) {
				dispatch(updateTime({work:--workTime,break:breakTime}));
			}
			if (workTime === 1 && workUnit === 'minutes') {
				workUnit = 'seconds';
				dispatch(updateTime({work:60,break:breakTime}));
				dispatch(updateUnit({workUnit:workUnit,breakUnit:breakUnit}));
			}
		}

		let breakCounter = function () {
			if (breakUnit === 'minutes' && that.i % timesOneMin === 0) {
				dispatch(updateTime({work:workTime,break:--breakTime}));
			} else if (breakUnit === 'seconds' && that.i % timesOneSec === 0) {
				dispatch(updateTime({work:workTime,break:--breakTime}));
			}
			if (breakTime === 1 && breakUnit === 'minutes') {
				breakUnit = 'seconds';
				dispatch(updateTime({work:workTime,break:60}));
				dispatch(updateUnit({workUnit:workUnit,breakUnit:breakUnit}));
			}
		}

		this.props.playInfo.playType === 'work' ? workCounter() : breakCounter();
	}

	render () {
		return (
			<div className="timer-info">
				<div className="timer-time">
					<div className="info-card time-card">
						<div>{ this.props.playInfo.work }</div>
						<div>{this.props.playInfo.workUnit}</div>
						<div>work</div>
					</div>
					<div className="info-card time-card">
						<div>{ this.props.playInfo.break }</div>
						<div>{this.props.playInfo.breakUnit}</div>
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
	timer: React.PropTypes.object.isRequired,
	playInfo: React.PropTypes.object.isRequired
}

export default TimerInfo;