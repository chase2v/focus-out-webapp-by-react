import React from 'react';

export default class StatisticHandler {
	/**
	 * 处理数据：
	 * 1.取出近30天的数据
	 * 2.分类
	 * 3.返回
	 * @param  data : 所有数据
	 * @param  timerId : 计时器 id
	 */
	static process (data, timerId) {
		// 数据重排，最近的数据在 0
		data.reverse();

		// 取出近30天数据
		// 获取当天的零点的日期时间
		let data30 = [],
			currentDate = new Date();
		currentDate = +new Date(currentDate.toDateString());
		// 每天间隔为 24 * 60 * 60 * 1000 = 86400000
		let oneday = 86400000;
		for(let i = 0, j = 0; i < 30; i++) {
			let date = currentDate - oneday * i;
			if (data[j].date === date) {
				data30.push(data[j].d);
				j++;
			} else {
				data30.push([]);
			}
		}

		// 分类
		let data30Sorted = [];
		for(let i = 0; i < 30; i++) {
			let data = data30[i];
			if (data[0]) {
				if (data.length > 1) {
					data.forEach((v) => {
						data30Sorted[v.id][i] = v.playTimes;
					});
				}

				if (!data30Sorted[data[0].timerId]) {
					data30Sorted[data[0].timerId] = [];
				}
				data30Sorted[data[0].timerId][i] = data[0].playTimes;
			}
		}

		// 数据重排，返回的数据中，最近的数据在 29
		data30Sorted.forEach((v) => {
			v.reverse();
		});

		return data30Sorted[timerId];
	}
}