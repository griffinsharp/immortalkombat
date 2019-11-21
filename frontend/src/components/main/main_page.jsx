import React from "react";
import Home from "../Home"

class MainPage extends React.Component {
	render() {
		return (
			<div className="home-container">
				<Home />
				<footer className="footer">Copyright &copy; 2019 ImmortalKombat</footer>
			</div>
		);
	}
}

export default MainPage;
