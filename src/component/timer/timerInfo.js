import React, {Component} from 'react';
import { connect } from 'react-redux';

import TimerInfoCard from './timerInfoCard';
import TargetInfoCard from './targetInfoCard';
import TimerSwitcher from './timerSwitcher';
import switchTimer from '../../action/switchTimer';
import updateTime from '../../action/updateTime';

class TimerInfo extends Component {

	componentDidUpdate() {
		// *hotfix
		// 若面板 work 时间显示为 0，同时计时器为停止状态，则强制刷新时间
		// 主要针对初始化时面板时间显示为 0 的臭虫
		if (this.props.playInfo.work === 0 && this.props.playInfo.playState === 'stop') {
			this.props.dispatch( updateTime({
				work: this.props.timerInfos[this.props.playInfo.currentTimer - 1].work,
				break: this.props.timerInfos[this.props.playInfo.currentTimer - 1].break
			}) );
		}
	}

	/**
	 * 切换计时器
	 * @param  msg : 'left' / 'right'
	 */
	switchTimer (msg) {
		if (msg === 'right' && this.props.timerInfos.length !== this.props.playInfo.currentTimer) {
			this.props.dispatch( switchTimer(++this.props.playInfo.currentTimer) );
		} else if (msg === 'left' && this.props.playInfo.currentTimer !== 1) {
			this.props.dispatch( switchTimer(--this.props.playInfo.currentTimer) );
		} else {
			return
		}
		this.props.dispatch( updateTime({
			work: this.props.timerInfos[this.props.playInfo.currentTimer - 1].work,
			break: this.props.timerInfos[this.props.playInfo.currentTimer - 1].break
		}) );
	}

	render () {
		return (
			<div className="timerInfo">
				<div className="frame-timerInfo-card">
					<TimerInfoCard timerInfo={ {
						time: this.props.playInfo.work,
						unit: this.props.playInfo.workUnit,
						type: 'work'
					} } />
					<TimerInfoCard timerInfo={ {
						time: this.props.playInfo.break,
						unit: this.props.playInfo.breakUnit,
						type: 'break'
					} } />
				</div>
				<TargetInfoCard target={ this.props.timerInfos[this.props.playInfo.currentTimer - 1].target } />
				<TimerSwitcher 
					currentTimerName={ this.props.timerInfos[this.props.playInfo.currentTimer - 1].name } 
					switchTimer={ (msg) => this.switchTimer(msg) } 
				/>
			</div>
		)
	}
}

TimerInfo.propTypes = {
	timerInfos: React.PropTypes.array,
	statistic: React.PropTypes.object,
	playInfo: React.PropTypes.object
}

const timerInfo = connect((state) => {
	let statistic = state.userInfo.statistics[state.userInfo.statistics.length - 1];
	return {
		timerInfos: state.userInfo.timers,
		statistic: statistic,
		playInfo: state.playInfo
	}
})(TimerInfo);

export default timerInfo;