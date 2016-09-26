import React from 'react';

import { UPDATETIMERCARD } from './actionTypes';

const updateTimerCard = (timerCard) => {
	let index = timerCard.id;
	return {
		type: UPDATETIMERCARD,
		index: index,
		timerCard
	}
}

export default updateTimerCard;