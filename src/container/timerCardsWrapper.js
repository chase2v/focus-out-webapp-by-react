import React from 'react';
import { connect } from 'react-redux';

import TimerCards from '../component/user/timerCards';

let timerCards = connect((state) => {
	return {
		timers: state.userInfo.timers
	}
})(TimerCards);

export default timerCards;