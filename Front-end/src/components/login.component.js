import React, { Component } from "react";
import axios from 'axios';
import './login-stylesheet.css'

export default class Login extends Component {

state = {
    email: '',
    password: '',
    isSignedUp: false,
    IsError: false
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value});
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'https://tinyinstagram-259109.appspot.com/login';

    axios.get(PROXY_URL+URL,{
        params: {
            email: this.state.email,
            password: this.state.password
          }
        })
    
      .then(res => {
        if (res.data[0] == 1) {
            this.state.isSignedUp = true;
            var result=res.data[1].split('user(')[1];
            var id_user =  result.substr(0, result.length-1);
            localStorage.setItem('idUser', id_user);
            this.props.history.push({
                pathname : '/homepage'
              } 
            );
        }
        else {
          this.state.IsError = true;
          this.props.history.push('/connexion');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    render() {
        return (
          
<div class="login">

    <h1><img src="https://i.imgur.com/wvLiKam.png" width="200px" height="68px"/></h1>

    <form onSubmit={this.handleSubmit}>

        <input placeholder="email" type="text" name="email" onChange={this.handleChangeEmail.bind(this)}/>
        <input placeholder="Password" type="password" name="password" onChange={this.handleChangePassword.bind(this)}/>

        <input type="submit" value="Se connecter" />

    </form>

    <div class="divider"><b>OU</b></div>

    <div class="forgotwrapper">
        <div class="forgot"><a href="/inscription">
    Vous n'avez pas de compte?</a></div>
    </div>

    <br/> { this.state.IsError &&
    <div class="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> Mot de passe ou email incorrect !
    </div> }
</div>

        );
    }
}
