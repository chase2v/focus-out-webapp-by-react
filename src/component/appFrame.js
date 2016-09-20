import React, {Component} from 'react';

import Header from './header';

export default class AppFrame extends Component {
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
