import React from 'react';

import { UPDATEINTERFACESTATE } from './actionTypes';

const updateInterfaceState = (newState) => {
	return {
		type: UPDATEINTERFACESTATE,
		newState
	}
}

export default updateInterfaceState;