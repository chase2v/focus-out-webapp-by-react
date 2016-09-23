import React from 'react';
import INITDATA from '../action/actionTypes'

// 模拟的初始化数据
const initUserInfo = {
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
				},
				{
					date: 1471708800000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1471795200000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1471881600000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1471968000000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1472054400000,
					d: [
						{
							timerId: 1,
							playTimes: 15
						}
					]
				},
				{
					date: 1472140800000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1472227200000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1472313600000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1472400000000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1472486400000,
					d: [
						{
							timerId: 1,
							playTimes: 10
						}
					]
				},
				{
					date: 1472572800000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1472659200000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1472745600000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1472832000000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1472918400000,
					d: [
						{
							timerId: 1,
							playTimes: 15
						}
					]
				},
				{
					date: 1473004800000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1473091200000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1473177600000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1473264000000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1473350400000,
					d: [
						{
							timerId: 1,
							playTimes: 10
						}
					]
				},
				{
					date: 1473436800000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1473523200000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1473609600000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1473696000000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1473782400000,
					d: [
						{
							timerId: 1,
							playTimes: 15
						}
					]
				},
				{
					date: 1473868800000,
					d: [
						{
							timerId: 1,
							playTimes: 14
						}
					]
				},
				{
					date: 1473955200000,
					d: [
						{
							timerId: 1,
							playTimes: 13
						}
					]
				},
				{
					date: 1474041600000,
					d: [
						{
							timerId: 1,
							playTimes: 12
						}
					]
				},
				{
					date: 1474128000000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				},
				{
					date: 1474214400000,
					d: [
						{
							timerId: 1,
							playTimes: 10
						}
					]
				},
				{
					date: 1474300800000,
					d: [
						{
							timerId: 1,
							playTimes: 11
						}
					]
				}
			],
			timers: [
				{
					id: 1,
					name: 'study',
					work: 1,
					break: 1
				},
				{
					id: 2,
					name: 'reading',
					work: 25,
					break: 5
				},
				{
					id: 3,
					name: 'writing',
					work: 25,
					break: 5
				}
			],
		}

const handleUserInfo = (state = initUserInfo, action) => {
	console.log('初始化数据前state为', state);
	console.log('action为：', action);

	return state;
}

export default handleUserInfo;