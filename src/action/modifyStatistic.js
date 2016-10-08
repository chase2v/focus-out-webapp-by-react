import React from 'react';

import { MODIFYSTATISTIC } from './actionTypes';

const modifyStatistic = (statistic) => {
	return (dispatch, getState) => {
		let index = -1,
		statistics = getState().userInfo.statistics.slice(0);
		statistics.forEach( (v, i) => {
			if (v.date === statistic.date) {
				index = i;
			}
		});
		if (index !== -1) {
			let j = -1;
			statistics[index].d.forEach( (v, i) => {
				if (v.timerId === statistic.id) {
					j = i;
					v.playTimes += statistic.change;
				}
			});
			if (j !== -1) {
				dispatch(_modifyStatistic(statistics));
			} else {
				statistics[index].d.push({
					timerId: statistic.id,
					playTimes: 1
				});
				dispatch(_modifyStatistic(statistics));
			}
		} else {
			statistics.push({
				date: statistic.date,
				d: [{
					timerId: statistic.id,
					playTimes: 1
				}]
			});
			dispatch(_modifyStatistic(statistics));
		}
	}
}

const _modifyStatistic = (statistics) => {
	return {
		type: MODIFYSTATISTIC,
		statistics
	}
}

export default modifyStatistic;