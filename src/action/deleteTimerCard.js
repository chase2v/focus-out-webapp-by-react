import React from 'react';

import { DELETETIMERCARD } from './actionTypes';

const deleteTimerCard = (timerCards) => {
	return {
		type: DELETETIMERCARD,
		timerCards
	}
}

export default deleteTimerCard;