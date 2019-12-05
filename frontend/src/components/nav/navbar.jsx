import React from "react";
import { NavLink } from "react-router-dom";
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
			<div>
				<NavLink exact activeStyle={{display: 'none'}} to={"/"}>Home</NavLink> 
				<NavLink exact activeStyle={{display: 'none'}} to={"/stats"}>Stats</NavLink>
				<NavLink exact activeStyle={{ display: 'none' }} to={"/leaderboard"}>Leaderboard</NavLink>
				<NavLink exact activeStyle={{display: 'none'}} to={"/play"}>Play</NavLink>
				
				<button className='logout' onClick={this.logoutUser}>Logout</button>
			</div>
			}
			{!this.props.loggedIn &&
				<div>
					<NavLink exact activeStyle={{display: 'none'}} to={"/"}>Home</NavLink>
					<NavLink exact activeStyle={{display: 'none'}} to={"/signup"}>Signup</NavLink>
					<NavLink exact activeStyle={{display: 'none'}} to={"/login"}>Login</NavLink>
					<NavLink exact activeStyle={{display: 'none'}} to={"/howto"}>How To</NavLink>
				</div>
			}
			</nav>
		);
	}
}

export default NavBar;
