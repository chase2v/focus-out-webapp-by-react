import React from 'react';
import { connect } from 'react-redux';

import Clock from '../component/timer/clock';

let clock = connect((state) => {
	return {
		playInfo: state.playInfo,
		timers: state.userInfo.timers
	}
})(Clock);

export default clock;