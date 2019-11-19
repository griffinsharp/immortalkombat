import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//components imports
import Game from './Game'
import Home from './Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import WaitRoom from './waitRoom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

function App() {
  return (
    <>
    <Router>
        <Switch>
          <ProtectedRoute Route exact path="/game" component={Game} />
          <AuthRoute exact path="/signup" component={Signup} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/waitroom" component={WaitRoom} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
    </>
  );
}

export default App;
