import React from 'react';
import STARTTIMER from '../action/actionTypes'

const handleTimerPlay = (state = {}, action) => {
	console.log('处理计时器播放命令时state为：' + state);
	
	switch(action.type){
		case STARTTIMER:
			return {
				...state,
				...action.playInfo
			}
		default:
	}

	return state;
}

export default handleTimerPlay;