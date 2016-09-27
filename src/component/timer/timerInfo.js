import React, {Component} from 'react';

import TimerInfoCard from './timerInfoCard';
import TargetInfoCard from './targetInfoCard';
import TimerSwitcher from './timerSwitcher';
import switchTimer from '../../action/switchTimer';
import updateTime from '../../action/updateTime';

class TimerInfo extends Component {

	componentDidUpdate() {
		if (this.props.playInfo.work === 0 && this.props.playInfo.playState === 'stop') {
			console.log('强制刷新');
			this.props.dispatch( updateTime({
				work: this.props.timerInfos[this.props.playInfo.currentTimer - 1].work,
				break: this.props.timerInfos[this.props.playInfo.currentTimer - 1].break
			}) );
		}
	}

	render () {
		let workTimerInfo={
			time: this.props.playInfo.work,
			unit: this.props.playInfo.workUnit,
			type: 'work'
		}
		let breakTimerInfo = {
			time: this.props.playInfo.break,
			unit: this.props.playInfo.breakUnit,
			type: 'break'
		}
		let target = this.props.timerInfos[this.props.playInfo.currentTimer - 1].target;
		let currentTimerName = this.props.timerInfos[this.props.playInfo.currentTimer - 1].name;

		return (
			<div className="timerInfo">
				<div className="frame-timerInfo-card">
					<TimerInfoCard timerInfo={ workTimerInfo } />
					<TimerInfoCard timerInfo={ breakTimerInfo } />
				</div>
				<TargetInfoCard target={ target } />
				<TimerSwitcher currentTimerName={ currentTimerName } switchTimer={ this.switchTimer.bind(this) } />
			</div>
		)
	}

	switchTimer (msg) {
		if (msg === 'right' && this.props.timerInfos.length !== this.props.playInfo.currentTimer) {
			this.props.dispatch( switchTimer(++this.props.playInfo.currentTimer) );
			this.props.dispatch( updateTime({
				work: this.props.timerInfos[this.props.playInfo.currentTimer - 1].work,
				break: this.props.timerInfos[this.props.playInfo.currentTimer - 1].break
			}) );
		} else if (msg === 'left' && this.props.playInfo.currentTimer !== 1) {
			this.props.dispatch( switchTimer(--this.props.playInfo.currentTimer) );
			this.props.dispatch( updateTime({
				work: this.props.timerInfos[this.props.playInfo.currentTimer - 1].work,
				break: this.props.timerInfos[this.props.playInfo.currentTimer - 1].break
			}) );
		}
	}
}

TimerInfo.propTypes = {
	timerInfos: React.PropTypes.array,
	statistic: React.PropTypes.object,
	playInfo: React.PropTypes.object
}

export default TimerInfo;