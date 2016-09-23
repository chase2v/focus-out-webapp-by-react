import React from 'react';

import { UPDATETIME } from './actionTypes';

const updateTime = (time) => {
	return {
		type: UPDATETIME,
		time
	}
}

export default updateTime;