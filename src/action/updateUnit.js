import React from 'react';

import { UPDATEUNIT } from './actionTypes';

const updateUnit = (unit) => {
	return {
		type: UPDATEUNIT,
		unit
	}
}

export default updateUnit;