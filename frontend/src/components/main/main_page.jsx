import React from "react";
import Home from "../Home"
import NavBarContainer from "../nav/navbar_container";

class MainPage extends React.Component {
	render() {
		return (
			<>
			<NavBarContainer />
			<div className="home-container">
				<Home />
				<footer className="footer">Copyright &copy; 2019 ImmortalKombat</footer>
			</div>
			</>
		);
	}
}

export default MainPage;
