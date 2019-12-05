import React, { Component } from "react";
import { Redirect } from 'react-router';
import axios from 'axios';


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
            this.props.history.push('/homepage');
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

            <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email"  placeholder="Saisir votre email" onChange={this.handleChangeEmail.bind(this)}/>
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" name="password" placeholder="Saisir votre mot de passe" onChange={this.handleChangePassword.bind(this)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                <br/>
                { this.state.IsError && <div class="alert alert-danger alert-dismissible fade show">
                <strong>Error!</strong> Mot de passe ou email incorrect !
                </div> }
            </form>

        );
    }
}
