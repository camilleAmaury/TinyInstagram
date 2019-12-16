import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import HomePage from "./components/HomePage/homepage";
import Profile from "./components/Profile/profile";
import AddPost from "./components/AddPost/addPost";
import CreateUsersBenchmark from './components/Benchmark/create_user';
import CreatePostsBenchmark from './components/Benchmark/create_posts';
import LikePerOneSecond from './components/Benchmark/likeperonesecond';
import RetrievePosts from './components/Benchmark/retrieve_posts';

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
      <Route exact path="/profile/:user" component={Profile}></Route>
      <Route exact path="/addpost">
        <AddPost />
      </Route>
      <Route exact path="/createUsersBenchmark">
        <CreateUsersBenchmark />
      </Route>
      <Route exact path="/createPostsBenchmark">
        <CreatePostsBenchmark />
      </Route>
      <Route exact path="/likeperonesecond">
        <LikePerOneSecond />
      </Route>
      <Route exact path="/retrievePosts">
        <RetrievePosts />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
