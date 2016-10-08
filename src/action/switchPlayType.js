import React from 'react';
import { SWITCHPLAYTYPE } from './actionTypes';

const SwitchPlayType = () => {
	return (dispatch, getState) => {
		let state = getState(),
		playInfo = state.playInfo,
		playType = 'work';
		if ( playInfo.playType === 'work' ) {
			playType = 'break';
		} else if ( playInfo.playType === 'break' ) {
			playType = 'work';
		}
		dispatch(SwitchPlayTypeTo(playType));
	}
}

const SwitchPlayTypeTo = (playType) => {
	return {
		type: SWITCHPLAYTYPE,
		playType
	}
}

export default SwitchPlayType;