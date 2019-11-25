import React from "react";
import { withRouter } from "react-router-dom";
import NavBarContainer from "../nav/navbar_container";


class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			password: "",
			password2: "",
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearedErrors = false;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.signedIn === true) {
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
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.signup(user, this.props.history);
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
			<div className='auth-form'>
			<NavBarContainer />
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="container">
					<div className="login-form">
						<br />
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder="Email"
						/>
						<br />
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
						<input
							type="password"
							value={this.state.password2}
							onChange={this.update("password2")}
							placeholder="Confirm Password"
						/>
						<br />
						<button type="submit" className="btn btn-flat">
							Submit
						</button>
						{this.renderErrors()}
					</div>
				</form>
			</div>
			</div>
		);
	}
}

export default withRouter(SignupForm);
