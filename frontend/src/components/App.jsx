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
import Stats from './stats/stats_container'
import ControllerContainer from "./controller/controller_container";
import leaderboard from './leaderboard/leaderboard_container';
import HowTo from './howto/Howto'


function App() {
  return (
	  <>
			<Switch style={{width: '100%', height: '100%'}}>
				
				<Route exact path="/" component={MainPage} />
				<AuthRoute exact path="/login" component={LoginFormContainer} />
				<AuthRoute exact path="/signup" component={SignupFormContainer} />

				<ProtectedRoute exact path="/play" component={PlayContainer} />
				<ProtectedRoute exact path="/stats" component={Stats} />
			  	<ProtectedRoute exact path="/leaderboard" component={leaderboard} />

				{/* <ProtectedRoute exact path="/game" component={Game} /> */}

				<Route style={{width: '100%', height: '100%'}} exact path="/testgame" component={Game} />
				<Route exact path="/game" component={Game} />
				<Route exact path="/howto" component={HowTo} />
				<ProtectedRoute path="/controller" component={ControllerContainer} />
				<Route exact path="/waitroom" component={WaitRoom} />
			</Switch>
		</>
	);
}

export default App;
