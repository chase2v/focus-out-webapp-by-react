import React, { Component } from 'react';

import updateTimerCard from '../../action/updateTimerCard';

class TimerCard extends Component {

	constructor () {
		super();
		this.isChanging = 0;
		this.i = 0;
	}

	updateTimerCard() {
		this.i++;
		let interval;
		if (!this.isChanging) {
			let i = this.i;
			this.isChanging = 1;
			interval = setInterval(() => {
				if (this.i === i) {
					this.update();
					clearInterval(interval);
					this.isChanging = 0;
				} else {
					i = this.i;
				}
			}, 2000);
		}
	}

	update () {
		let obj = {}, data = [];
		this.refs.timerCard.querySelectorAll('input').forEach(v => {
			data.push(v.value);
		});
		this.props.info.name = data[0];
		this.props.info.target = parseInt(data[1]);
		this.props.info.work = parseInt(data[2]);
		this.props.info.break = parseInt(data[3]);

		this.props.dispatch(updateTimerCard(this.props.info))
	}

	render () {

		let info = this.props.info;

		return (
			<div className={ this.props.focus ? 'timerCard timerCard-focus' : 'timerCard'} ref="timerCard">
				<div className="deleteButton" onClick={ () => this.props.delete(this.props.info.id) }><i className="iconfont icon-wrong"></i></div>
				<div><label>name</label><input type="text" defaultValue={ info.name } onChange={ () => this.updateTimerCard() }/></div>
				<div><label>target</label><input type="text" defaultValue={ info.target }  onChange={ () => this.updateTimerCard() }/></div>
				<div><label>work</label><input type="text" defaultValue={ info.work } onChange={ () => this.updateTimerCard() } /></div>
				<div><label>break</label><input type="text" defaultValue={ info.break } onChange={ () => this.updateTimerCard() }/></div>
			</div>
		)
	}
}

export default TimerCard;