import React from 'react';
import { SWITCHPLAYSTATE } from './actionTypes';

const SwitchPlayState = (nextPlayState) => {
	return {
		type: SWITCHPLAYSTATE,
		nextPlayState
	}
}

export default SwitchPlayState;