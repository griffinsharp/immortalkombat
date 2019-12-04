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
		this.demoUserLogin = this.demoUserLogin.bind(this);
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.signedIn === true) {
	// 		this.props.history.push("/");
	// 	}

	// 	this.setState({ errors: nextProps.errors });
	// }

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

		this.props.signup(user).then(() => this.props.login(user));
	}


	demoUserLogin(e) {
		e.preventDefault();
		let dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


		function findNum (dictionary) { 

			let counter = 0;
			let num = '';

			while (counter < 4) {
				num += dictionary[Math.floor(Math.random() * 62)];
				counter = counter + 1;
			} 

			return num;
		}

		let randNum = findNum(dictionary);

		const user = Object.assign({}, {
			email: `demouser${randNum}@demo.com`,
			username: `Demo${randNum}`,
			password: 'password',
			password2: 'password'
		});

		this.setState({ email: user.email });
		this.setState({ username: user.username });
		this.setState({ password: user.password });
		this.setState({ password2: user.password2 });

		this.props.signup(user).then( () => this.props.login(user));
		
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
							<button type="submit" className="btn btn-flat" onClick={this.demoUserLogin}> 
								Demo User
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
