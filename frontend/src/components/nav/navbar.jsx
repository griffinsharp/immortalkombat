import React from "react";
import { Link } from "react-router-dom";
import icon from '../assets/hammer.png'

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.logoutUser = this.logoutUser.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}


	render() {
		return (
			<nav className='navbar'>
				<div style={{height: '50px', width: '50px'}} >
					<img onClick={() => window.location.hash = '/'} style={{maxWidth: '100%', maxHeight: '100%'}}alt='icon' src={icon}/>
				</div>
			{this.props.loggedIn &&  
				<ul>
					<li>
						<Link to={"/"}>Home</Link> 
					</li>
					<li>
						<Link to={"/stats"}>Stats</Link>
					</li>
					<li>
						<Link to={"/play"}>Play</Link>
					</li>
					<li>
						<button className='logout' onClick={this.logoutUser}>Logout</button>
					</li>
				</ul>
			}
			{!this.props.loggedIn &&
				<ul>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/signup"}>Signup</Link>
					</li>
					<li>
						<Link to={"/login"}>Login</Link>
					</li>
				</ul>
			}
			</nav>
		);
	}
}

export default NavBar;
