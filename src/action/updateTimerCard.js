import React from 'react';

import { UPDATETIMERCARD } from './actionTypes';

const updateTimerCard = (timerCard) => {
	return (dispatch, getState) => {
		let timers = getState().userInfo.timers.slice(0);
		timers[timerCard.id-1] = timerCard;
		dispatch(_updateTimerCard(timers));
	}
}

const _updateTimerCard = (timers) => {
	return {
		type: UPDATETIMERCARD,
		timers
	}
}

export default updateTimerCard;