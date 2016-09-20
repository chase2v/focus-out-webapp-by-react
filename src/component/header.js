import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<Link to="/" className="link" activeClassName="active-link" onlyActiveOnIndex><i className="iconfont icon-timer"></i></Link>
				<Link to="/statistic" className="link" activeClassName="active-link"><i className="iconfont icon-graph"></i></Link>
				<Link to="/setting" className="link" activeClassName="active-link"><i className="iconfont icon-setting"></i></Link>
				<Link to="/user" className="link" activeClassName="active-link"><i className="iconfont icon-user"></i></Link>
			</div>
		);
	}
}
