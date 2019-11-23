import React from "react";
import { withRouter } from "react-router-dom";
import NavBarContainer from "../nav/navbar_container";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser === true) {
			this.props.history.push("/profile");
		}

		this.setState({ errors: nextProps.errors });
	}

	update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	handleSubmit(e) {
		e.preventDefault();

		let user = {
			username: this.state.username,
			password: this.state.password
		};

		this.props.login(user);
	}

	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>{this.state.errors[error]}</li>
				))}
			</ul>
		);
	}

	render() {
		return (
			<>
			<NavBarContainer />
			<div>
				<form onSubmit={this.handleSubmit} className="container">
					<div>
						<input
							type="text"
							value={this.state.username}
							onChange={this.update("username")}
							placeholder="Username"
						/>
						<br />
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
						/>
						<br />
						<button type="submit" className="btn btn-flat">
							Login
						</button>
						{this.renderErrors()}
					</div>
				</form>
			</div>
			</>
		);
	}
}

export default withRouter(LoginForm);
