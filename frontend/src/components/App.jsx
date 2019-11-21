import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./auth/login_form_container";
import SignupFormContainer from "./auth/signup_form_container";
import PlayContainer from "./play/play_container";
import MainPage from "./main/main_page";

import Game from './Game'
import WaitRoom from './waitRoom'
import Stats from './stats/stats'
import ControllerContainer from "./controller/controller_container";

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
				<ProtectedRoute path="/controller" component={ControllerContainer} />
				<Route exact path="/waitroom" component={WaitRoom} />
			</Switch>
		</div>
	);
}

export default App;
