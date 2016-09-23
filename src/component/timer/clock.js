import React, { Component } from 'react';

import switchPlayState from '../../action/switchPlayState';
import switchPlayType from '../../action/switchPlayType';
import updateTime from '../../action/updateTime';
import updateUnit from '../../action/updateUnit';

import createAnimationSingleton from '../animation';

class Clock extends Component {

	componentDidMount () {
		// console.log('Timer组件即将进入！');
		
		let cvs = this.refs.cvs,
		     ctx = cvs.getContext('2d');
		cvs.width = 500; // 设置画布大小
		cvs.height = 500;

		ctx.lineWidth = 1; // 设置线条样式
		ctx.strokeStyle = '#000';

		const center = [250, 250], //设置绘画数据
		     bigR = 200,
		     smallR = 100,
		     bigColor = '#f00',
		     smallColor = '#fff';

		// 暴露绘画数据到全局，便于动画函数调用
		this.drawArg = {
			ctx: ctx,
			center: center,
			r: [bigR, smallR]
		}
		// 创建动画实例
		this.animation = createAnimationSingleton();
		Object.defineProperties(this.animation, {
			'drawArg' : {
				value: this.drawArg
			},
			'clock' : {
				value: this
			}
		});

		// 开始绘制背景时钟
		const drawCircle = (center, r, fillStyle) => {
			ctx.beginPath();
			ctx.fillStyle = fillStyle;
			ctx.arc(center[0], center[1], r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		drawCircle(center, bigR, bigColor); // 绘制大圆
		drawCircle(center, smallR, smallColor); // 绘制小圆

	}

	componentWillUnmount ()  {

	}

	componentWillReceiveProps (nextProps) {
		console.log(nextProps.playInfo.playState);
	}

	render () {
		return (
			<div className="clock">
				<canvas ref="cvs"></canvas>
				<div className="button" onClick={ () => this.clickHandler('play') } ref="playbutton"><i className="iconfont icon-play"></i></div>
				<div className="button-group" ref="buttonGroup">
					<div onClick={ () => this.clickHandler('pause') } id="pause"><i className="iconfont icon-pause"></i></div>
					<div onClick={ () => this.clickHandler('stop') } id="stop"><i className="iconfont icon-stop"></i></div>
				</div>
			</div>
		)
	}

	/**
	 * 播放按钮
	 * @return {} 
	 */
	clickHandler (msg) {
		let playState = this.props.playInfo.playState,
		     dispatch = this.props.dispatch;

		// 设置动画的颜色、执行时间
		let color, totalTime;
		if (this.props.playInfo.playType === 'work') {
			totalTime = this.props.timer.work;
			color = ['#f00', '#0f0'];
		} else {
			totalTime = this.props.timer.break;
			color = ['#0f0', '#f00'];
		}

		switch (playState) {
			case 'stop' :
				this.refs.playbutton.style.display = 'none';
				this.refs.buttonGroup.style.display = 'block';
				dispatch(switchPlayState('play'));
				this.animation.play(totalTime, 50, color);
				break;
			case 'pause' :
				this.refs.playbutton.style.display = 'none';
				this.refs.buttonGroup.style.display = 'block';
				dispatch(switchPlayState('play'));
				this.animation.play(totalTime, 50, color);
				break;
			case 'play' :
				this.refs.playbutton.style.display = 'block';
				this.refs.buttonGroup.style.display = 'none';
				dispatch(switchPlayState(msg));
				this.animation[msg]();
				break;
			default:
		}
	}

	/**
	 * 动画结束时调用次函数
	 * @return {[type]} [description]
	 */
	complete () {
		let dispatch = this.props.dispatch;
		this.refs.playbutton.style.display = 'block';
		this.refs.buttonGroup.style.display = 'none';
		dispatch(switchPlayState('stop'));
		dispatch(switchPlayType());
		dispatch(updateTime({work:this.props.timer.work,break:this.props.timer.break}));
		dispatch(updateUnit({workUnit:'minutes',breakUnit:'minutes'}));
	}


	backup () {
		
	}

	/**
	 * 每次进入时钟，恢复上次动画的会话
	 * @return {[type]} [description]
	 */
	restore () {

	}
}


Clock.propTypes = {
	playInfo: React.PropTypes.shape({
		playState: React.PropTypes.string,
		playType: React.PropTypes.string,
		currentTimer: React.PropTypes.number
	})
}

export default Clock;