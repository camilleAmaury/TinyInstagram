import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import HomePage from "./components/homepage.component";
import Profile from "./components/profile.component";

function App() {
  return (<Router>
    <div className="App">

          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/connexion" component={Login} />
            <Route path="/inscription" component={SignUp} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>

    </Router>
  );
}

export default App;
