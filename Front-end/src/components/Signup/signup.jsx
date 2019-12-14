import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    isSignedUp: false,
    lastName: '',
    redirect_login:false
  }

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'https://tinyinstagram-259109.appspot.com/register';

    axios.get(PROXY_URL + URL, {
      params: {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
    })
      .then(res => {
        if (res.data[0] == 1) {
          this.setState({redirect_login:true, isSignedUp:true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div class="login">

        <h1><img src="https://i.imgur.com/wvLiKam.png" width="200px" height="68px" /></h1>

        <form onSubmit={this.handleSubmit}>
          <input placeholder="nom" type="text" name="firstName" onChange={this.handleChangeFirstName} />
          <input placeholder="prénom" type="text" name="lastName" onChange={this.handleChangeLastName} />
          <input placeholder="email" type="text" name="email" onChange={this.handleChangeEmail} />
          <input placeholder="Password" type="password" name="password" onChange={this.handleChangePassword} />

          <input type="submit" value="S'inscrire" />

        </form>

        <div class="divider"><b>OU</b></div>

        <div class="forgotwrapper"><div class="forgot">
          <Link to={`/login`}>Déjà inscrit(e)</Link>
        </div>
        </div>

        <br />
        {this.state.isSignedUp && <div class="alert alert-success" role="alert">Utilisateur crée avec succès</div>}
        {this.state.redirect_login ? <Redirect to='/login'/> : ''}
      </div>
    );
  }
}