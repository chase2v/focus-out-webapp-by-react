import React, { Component } from 'react';

class AddCard extends Component {
	render () {

		return (
			<div className="addCard" ref="addCard">
				<div className="plus" onClick={ this.props.addFunc }><i className="iconfont icon-plus"></i></div>
				<div className="editArea">
					<div><label>name</label><input type="text" defaultValue="enterName"/></div>
					<div><label>target</label><input type="text" defaultValue="5"/></div>
					<div><label>work</label><input type="text" defaultValue="5" /></div>
					<div><label>break</label><input type="text" defaultValue="5"/></div>
				</div>
				<div className="buttonGroup">
					<div onClick={ this.props.reject }><i className="iconfont icon-wrong"></i></div>
					<div onClick={ this.props.resolve }><i className="iconfont icon-check"></i></div>
				</div>
			</div>
		)
	}
}

export default AddCard;