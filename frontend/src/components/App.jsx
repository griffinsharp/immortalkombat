import React from "react"
import Game from './Game'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/game" component={Game} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
    </>
  );
}

export default App;
