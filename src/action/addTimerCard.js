import React from 'react';

import { ADDTIMERCARD } from './actionTypes';

const addTimerCard = (timerCard) => {
	return (dispatch, getState) => {
		let timers = getState().userInfo.timers.slice(0);
		timerCard.id = timers.length + 1;
		timers.push(timerCard);
		dispatch(_addTimerCard(timers));
	}
}

const _addTimerCard = (timers) => {
	return {
		type: ADDTIMERCARD,
		timers
	}
}

export default addTimerCard;