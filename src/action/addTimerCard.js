import React from 'react';

import { ADDTIMERCARD } from './actionTypes';

const addTimerCard = (timerCard) => {
	return {
		type: ADDTIMERCARD,
		timerCard
	}
}

export default addTimerCard;