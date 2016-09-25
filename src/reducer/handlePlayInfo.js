import React from 'react';
import * as actionTypes from '../action/actionTypes';

// 模拟的初始计时器信息
const initPlayInfo = {
				playState: 'stop',
				playType: 'work',
				currentTimer: 1,
				work: 0,
				break: 0,
				workUnit: 'minutes',
				breakUnit: 'minutes'
			}

const handlePlayInfo = (state = initPlayInfo, action) => {
	// console.log('处理计时器播放命令时state为：', state);
	// console.log('action为：', action);

	switch (action.type) {
		case actionTypes.SWITCHPLAYSTATE :
			state.playState = action.nextPlayState;
			return {
				...state
			}
			break;
		case actionTypes.SWITCHPLAYTYPE:
			if ( state.playType === 'work' ) {
				state.playType = 'break'
			} else if ( state.playType === 'break' ) {
				state.playType = 'work'
			}
			return {
				...state
			}
			break;
		case actionTypes.UPDATETIME :
			if (action.time) {
				state = Object.assign(state, action.time);
			}
			return {
				...state
			}
			break;
		case actionTypes.UPDATEUNIT :
			state = Object.assign(state, action.unit);
			return {
				...state
			}
			break;
		case actionTypes.SWITCHTIMER :
			state.currentTimer = action.nextTimer;
			return {
				...state
			}
			break;
		default:
	}
	
	return state;
}

export default handlePlayInfo;