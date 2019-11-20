import React, { Component } from "react";
import * as io from "socket.io-client";

export default class Play extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			username: this.props.currentUser.username
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.socket = io.connect("http://localhost:5000/games");
		this.socket.emit("joinRoom", this.state.code);
		this.socket.on("newUser", res => console.log(res));
		this.setState({ code: "" });
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
							this.socket.emit("joinRoom", this.state.code);
							this.socket.on("newUser", res => console.log(res));
							this.socket.on("message", msg => console.log(msg));
						}}
					>
						Go!
					</button>
					<button
						onClick={() =>
							this.socket.emit(
								"message",
								JSON.stringify({ msg: "Hi", room: this.state.code })
							)
						}
					>
						Send Msg
					</button>
				</form>
			</div>
		);
	}
}
