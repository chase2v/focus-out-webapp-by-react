import React from 'react';

import * as actionTypes from '../action/actionTypes';

const initUserInfoData = {
			currentUser: 1,
			username: 'hajow',
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
	// console.log('初始化数据前state为', state);
	// console.log('action为：', action);

	switch (action.type) {
		case actionTypes.INITUSERINFO :
			state = action.initData;
			console.log(state);
			return {
				...state
			}
		case actionTypes.MODIFYSTATISTIC :
			let index = -1;
			state.statistics.forEach( (v, i) => {
				if (v.date === action.statistic.date) {
					index = i;
				}
			});
			if (index !== -1) {
				let j = -1;
				state.statistics[index].d.forEach( (v, i) => {
					if (v.timerId === action.statistic.id) {
						j = i;
						v.playTimes += action.statistic.change;
					}
				});
				if (j !== -1) {
					return {
						...state
					}
				} else {
					state.statistics[index].d.push({
						timerId: acion.statistic.id,
						playTimes: 1
					});
					return {
						...state
					}
				}
			} else {
				state.statistics.push({
					date: action.statistic.date,
					d: {
						timerId: action.statistic.id,
						playTimes: 1
					}
				});
				console.log(state);
				return {
					...state
				}
			}
			break;
		case actionTypes.ADDTIMERCARD :
			action.timerCard.id = state.timers.length + 1;
			state.timers.push(action.timerCard);
			return {
				...state
			}
			break;
		case actionTypes.UPDATETIMERCARD :
			state.timers[index - 1] = action.timerCard;
			console.log('更新的卡片为：', state.timers[index - 1]);
			return {
				...state
			}
		case actionTypes.DELETETIMERCARD :
			state.timers = action.timerCards;
			return {
				...state
			}
		default:
	}

	return state;
}

export default handleUserInfo;