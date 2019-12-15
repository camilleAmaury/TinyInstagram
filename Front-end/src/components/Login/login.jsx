import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';

import './login-stylesheet.css'

export default class Login extends Component {

state = {
    email: '',
    password: '',
    isSignedUp: false,
    IsError: false,
    redirect_homepage:false,
    redirect_login:false
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value});
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const URL = 'https://tinyinstagram-259109.appspot.com/login';

    axios.get(URL,{
        params: {
            email: this.state.email,
            password: this.state.password
          }
        })
    
      .then(res => {
        if (res.data[0] === "1") {
            localStorage.setItem('idUser', res.data[1]);
            localStorage.setItem('prenomUser', res.data[2]);
            localStorage.setItem('nomUser', res.data[3]);
            this.setState({redirect_homepage:true, isSignedUp:true});
        }
        else {
          this.setState({redirect_login:true, IsError:true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    render() {
        return (
          
<div className="login">

    <h1><img src="https://i.imgur.com/wvLiKam.png" width="200px" height="68px"/></h1>

    <form onSubmit={this.handleSubmit}>

        <input placeholder="email" type="text" name="email" onChange={this.handleChangeEmail.bind(this)}/>
        <input placeholder="Password" type="password" name="password" onChange={this.handleChangePassword.bind(this)}/>

        <input type="submit" value="Se connecter" />

    </form>

    <div className="divider"><b>OU</b></div>

    <div className="forgotwrapper">
        <div className="forgot">
          <Link to={`/signup`}>Vous n'avez pas de compte?</Link>
        </div>
    </div>

    <br/> { this.state.IsError &&
    <div className="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> Mot de passe ou email incorrect !
    </div> }

    {this.state.redirect_homepage ? <Redirect to='/homepage'/> : ''}
    {this.state.redirect_login ? <Redirect to='/login'/> : ''}
</div>

        );
    }
}
