import React from 'react';
import { connect } from 'react-redux';

import Timer from '../component/timer/timer';

let TimerWrapper = connect(state => {
	return {
		playInfo: state.playInfo,
		timers: state.userInfo.timers
	}
})(Timer);

export default TimerWrapper;