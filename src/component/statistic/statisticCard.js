import React, { Component } from 'react';

const StatisticCard = React.createClass({

	clickHandler (e) {
		// this.refs.statisticCard.className += ' card-top-out';
	},

	render () {
		return (
			<div className="card-statistic" onClick={ this.clickHandler } ref="statisticCard">
				<div className="icon"><i className={ 'iconfont ' + this.props.data.iconClass }></i></div>
				<div className="title">{ this.props.data.name }</div>
			</div>
		)
	}
});

export default StatisticCard;
