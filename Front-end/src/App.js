import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import HomePage from "./components/HomePage/homepage";
import Profile from "./components/Profile/profile";
import AddPost from "./components/AddPost/addPost";

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/homepage">
        <HomePage />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/addpost">
        <AddPost />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
