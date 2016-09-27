import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './header';
import initPlayInfo from '../action/initPlayInfo';
import initUserInfo from '../action/initUserInfo';

class AppFrame extends Component {

	componentWillMount () {
		const initPlayInfoData = {
						playState: 'stop',
						playType: 'work',
						currentTimer: 1,
						work: 0,
						break: 0,
						workUnit: 'minutes',
						breakUnit: 'minutes'
					}
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
							iconClass: 'icon-study',
							target: 5,
							work: 1,
							break: 1
						},
						{
							id: 2,
							name: 'reading',
							iconClass: 'icon-book',
							target: 6,
							work: 25,
							break: 5
						},
						{
							id: 3,
							name: 'writing',
							iconClass: 'icon-writing',
							target: 7,
							work: 30,
							break: 5
						}
					],
				}

		let openIDBRequest = window.indexedDB.open('focusOut');
		openIDBRequest.onerror = (event) => { console.log(event.target.errorCode)}
		openIDBRequest.onsuccess = (event) => { 
			console.log('创建成功') ;

			let db = openIDBRequest.result;
			this.db = db;
			let playInfo;
			let userInfo;
			db.transaction('playInfo').objectStore('playInfo').get('playInfo').onsuccess = function (event) {
				playInfo = event.target.result;
				this.props.dispatch(initPlayInfo(playInfo));
			}.bind(this)
			db.transaction('userInfo').objectStore('userInfo').get('userInfo').onsuccess = function (event) {
				userInfo = event.target.result;
				this.props.dispatch(initUserInfo(userInfo));
			}.bind(this)
		}
		openIDBRequest.onupgradeneeded = (event) => {
			let db = openIDBRequest.result;
			let playInfo;
			let userInfo;
			if (db.objectStoreNames.length === 0) {
				playInfo = db.createObjectStore('playInfo');
				userInfo = db.createObjectStore('userInfo');
			}
			playInfo.add(initPlayInfoData, 'playInfo');
			userInfo.add(initUserInfoData, 'userInfo');
		}
		window.onbeforeunload = function () {
			console.log('即将关闭')
			this.db.transaction('userInfo','readwrite').objectStore('userInfo').put(this.props.userInfo,'userInfo');
			this.db.transaction('playInfo','readwrite').objectStore('playInfo').put(this.props.playInfo,'playInfo');
			debugger
		}.bind(this);
	}

	render() {
		return (
			<div className="frame">
				<Header />
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

const appFrame = connect(state => {
	return {
		playInfo: state.playInfo,
		userInfo: state.userInfo
	}
})(AppFrame);

export default appFrame;
