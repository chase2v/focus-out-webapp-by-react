import React from 'react';

import * as actionTypes from '../action/actionTypes';

const initUserInfoData = {
			currentUser: 1,
			username: 'hajow',
			interfaceState: 'login',
			statistics: [
				{
					date: 1471622400000,
					d: [
						{
							timerId: 1,
							playTimes: 10
						}
					]
				}
			],
			timers: [
				{
					id: 1,
					name: 'study',
					iconClass: 'icon-study',
					target: 5,
					work: 1,
					break: 1
				}
			],
		}

const handleUserInfo = (state = initUserInfoData, action) => {
	switch (action.type) {
		case actionTypes.INITUSERINFO :
			return {
				...action.initData
			}
		case actionTypes.MODIFYSTATISTIC :
			return {
				...state,
				statistics: action.statistics
			}
		case actionTypes.ADDTIMERCARD :
			return {
				...state,
				timers: action.timers
			}
		case actionTypes.UPDATETIMERCARD :
			return {
				...state,
				timers: action.timers
			}
		case actionTypes.DELETETIMERCARD :
			return {
				...state,
				timers: action.timerCards
			}
		case actionTypes.UPDATEINTERFACESTATE :
			return {
				...state,
				interfaceState: action.newState
			}
		default:
			return state;
	}

	return state;
}

export default handleUserInfo;