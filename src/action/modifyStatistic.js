import React from 'react';

import { MODIFYSTATISTIC } from './actionTypes';

const modifyStatistic = (statistic) => {
	return {
		type: MODIFYSTATISTIC,
		statistic
	}
}

export default modifyStatistic;