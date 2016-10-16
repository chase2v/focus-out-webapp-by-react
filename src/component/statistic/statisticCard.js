import React, { Component } from 'react';

export default class StatisticCard extends Component{

	clickHandler (e) {
		let path = `/graph/${ this.refs.card.id }`;
		this.context.router.push(path);
	}

	render () {
		return (
			<div className={ this.props.focus? 'card-statistic card-statistic-focus' : 'card-statistic' } onClick={ () => this.clickHandler() } ref="card" id={ this.props.data.id }>
				<div className="icon"><i className={ 'iconfont ' + this.props.data.iconClass }></i></div>
				<div className="title">{ this.props.data.name }</div>
			</div>
		)
	}
}

StatisticCard.contextTypes = {
	router: React.PropTypes.object
}
