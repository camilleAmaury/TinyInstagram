import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import HomePage from "./components//HomePage/homepage.component";
import Profile from "./components/profile.component";
import AddPost from "./components/addPost.component";

function App() {
  return (<Router>
    <div className="App">

          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/connexion" component={Login} />
            <Route path="/inscription" component={SignUp} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path="/addPost" component={AddPost} />
          </Switch>
        </div>

    </Router>
  );
}

export default App;
