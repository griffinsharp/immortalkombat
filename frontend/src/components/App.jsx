import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./auth/login_form_container";
import SignupFormContainer from "./auth/signup_form_container";
import PlayContainer from "./play/play_container";
import MainPage from "./main/main_page";


//components imports
import Game from './Game'
import Home from './Home'
import WaitRoom from './waitRoom'
import Stats from './stats/stats'
import Controller from "./Controller";

function App() {
  return (
		<div>
			<NavBarContainer />
			<Switch>
				<AuthRoute exact path="/" component={MainPage} />
				<AuthRoute exact path="/login" component={LoginFormContainer} />
				<AuthRoute exact path="/signup" component={SignupFormContainer} />

				<ProtectedRoute exact path="/play" component={PlayContainer} />
				<ProtectedRoute exact path="/stats" component={Stats} />
				{/* <ProtectedRoute exact path="/game" component={Game} /> */}

				<Route exact path="/testgame" component={Game} />
				<Route path="/controller" component={Controller} />
				<Route exact path="/waitroom" component={WaitRoom} />
			</Switch>
		</div>
	);
}

export default App;
