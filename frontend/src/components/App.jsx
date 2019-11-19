import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//components imports
import Game from './Game'
import Home from './Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx.js'

function App() {
  return (
    <>
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <ProtectedRoute Route exact path="/game" component={Game} />
          <AuthRoute exact path="/signup" component={Signup} />
          <AuthRoute exact path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
    </>
  );
}

export default App;
