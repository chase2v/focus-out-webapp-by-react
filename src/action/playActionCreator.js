import React from 'react';
import STARTTIMER from '../action/actionTypes'

const playActionCreator = () => {
	return function (dispatch, getState) {
		let state = getState(),
		     playInfo;
		if (!state.playInfo) {
			return {
				type: STARTTIMER,
				playInfo: {
					playState: 'play',
					playType: 'work',
					currentTimer: 1
				}
			}
		}
	}
}

export default playActionCreator;