import React, { Component } from "react";
import * as io from "socket.io-client";

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

	createAction(action) {
		return JSON.stringify({
			action: action,
			username: this.state.username,
			room: this.state.code
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
							this.socket = io.connect("http://localhost:5000/games");
							this.socket.emit("joinRoom", JSON.stringify(this.state));
							this.socket.on("newUser", res => {
								let data = JSON.parse(res);
								console.log(data.msg);
							});
							this.socket.on("message", msg => console.log(msg));
						}}
					>
						Go!
					</button>
					<button
						onClick={() =>
							this.socket.emit(
								"message",
								this.createAction('up'))}
					>up</button>
					<button
						onClick={() =>
							this.socket.emit(
								"message",
								this.createAction('down'))}
					>down</button>
					<button
						onClick={() =>
							this.socket.emit(
								"message",
								this.createAction('jump'))}
					>jump</button>
					<button
						onClick={() =>
							this.socket.emit(
								"message",
								this.createAction('hammer'))}
					>hammer</button>
				</form>
			</div>
		);
	}
}
