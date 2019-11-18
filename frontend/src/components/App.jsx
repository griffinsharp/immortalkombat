import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//components imports
import Game from './Game'
import Home from './Home'
import Login from './auth/Login'
import Signup from './auth/Signup'

function App() {
  return (
    <>
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route exact path="/game" component={Game} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
    </>
  );
}

export default App;
