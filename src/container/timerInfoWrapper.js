import React from 'react';
import { connect } from 'react-redux';

import TimerInfo from '../component/timer/timerInfo';

let timerInfo = connect((state) => {
	let statistic = state.userInfo.statistics[state.userInfo.statistics.length - 1];
	return {
		timerInfos: state.userInfo.timers,
		statistic: statistic,
		playInfo: state.playInfo
	}
})(TimerInfo);

export default timerInfo;
