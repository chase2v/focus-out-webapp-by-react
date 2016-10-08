import React from 'react';

import * as actionTypes from '../action/actionTypes';

const initPlayInfoData = {
				playState: 'stop',
				playType: 'work',
				currentTimer: 1,
				work: 0,
				break: 0,
				workUnit: 'minutes',
				breakUnit: 'minutes'
			}

const handlePlayInfo = (state = initPlayInfoData, action) => {
	switch (action.type) {
		case actionTypes.INITPLAYINFO :
			return {
				...action.initData
			}
		case actionTypes.SWITCHPLAYSTATE :
			return {
				...state,
				playState: action.nextPlayState
			}
		case actionTypes.SWITCHPLAYTYPE:
			return {
				...state,
				playType: action.playType
			}
		case actionTypes.UPDATETIME :
			return {
				...state,
				...action.time
			}
		case actionTypes.UPDATEUNIT :
			return {
				...state,
				...action.unit
			}
		case actionTypes.SWITCHTIMER :
			return {
				...state,
				currentTimer: action.nextTimer
			}
		default:
			return state;
	}
	
	return state;
}

export default handlePlayInfo;