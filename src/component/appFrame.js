import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './header';

import initData from '../action/initData';

class AppFrame extends Component {

	componentDidMount () {
		this.props.dispatch(initData());
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

let appFrame = connect()(AppFrame);

export default appFrame;
