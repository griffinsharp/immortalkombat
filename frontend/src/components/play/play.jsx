import React, { Component } from "react";

export default class Play extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			username: this.props.currentUser.username
		};
	}

	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	render() {
		return (
			<div>
				<form className="container">
					<input
						type="text"
						placeholder="Code"
						value={this.state.code}
						onChange={this.update("code")}
					/>
					<button
						className="btn btn-flat"
						type="submit"
						onClick={() => {
							this.props.addGameRoom(this.state.code)
							this.props.history.push('/controller')}
						}
					>Go!</button>
				</form>
			</div>
		);
	}
}
