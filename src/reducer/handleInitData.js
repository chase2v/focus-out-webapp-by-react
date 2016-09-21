import React from 'react';
import INITDATA from '../action/actionTypes'

const handleInitData = (state = {}, action) => {
	console.log('初始化数据前state为' + state);
	if (action.type === INITDATA) {
		return {
			...state,
			...action.data
		}
	}
	return state;
}

export default handleInitData;